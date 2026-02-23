/**
 * Schema definition functions for the Papr SDK.
 *
 * Provides `schema()`, `node()`, `lookup()`, `upsert()`, `resolve()`,
 * and `constraint()` for defining graph schemas with full IDE support.
 *
 * @example
 * ```typescript
 * import { schema, node, lookup, upsert, resolve, constraint } from '@papr/memory/lib';
 * import { prop, exact, semantic, Auto } from '@papr/memory/lib';
 *
 * const Person = node("Person", {
 *   email: prop({ search: exact() }),
 *   name: prop({ required: true, search: semantic(0.90) }),
 * }, lookup());
 *
 * const Task = node("Task", {
 *   id: prop({ search: exact() }),
 *   title: prop({ required: true, search: semantic(0.85) }),
 *   status: prop({ enum_values: ["open", "in_progress", "done"] }),
 * }, upsert(), constraint({ set: { status: Auto() } }));
 *
 * const ProjectSchema = schema("project_tracker", {
 *   nodes: [Person, Task],
 *   edges: [edge(Person, Task, { name: "works_on", create: "upsert" })],
 * });
 * ```
 */

import type { Policy, ResolvePolicy, ConstraintPolicy } from './types';
import { And, Or, Not } from './conditions';
import { Auto, PropDescriptor, EdgeDescriptor, PropertyRef } from './properties';

/**
 * Metadata collected from a node definition.
 */
export class NodeMetadata {
  public readonly name: string;
  public readonly label: string;
  public description: string | undefined;
  public icon: string | undefined;
  public color: string | undefined;
  public createPolicy: 'upsert' | 'lookup' = 'upsert';
  public onMiss: 'error' | 'create' | 'ignore' | undefined;
  public readonly properties: Map<string, PropDescriptor> = new Map();
  public when: Record<string, unknown> | undefined;
  public set: Record<string, unknown> | undefined;

  constructor(name: string, label?: string, description?: string, icon?: string, color?: string) {
    this.name = name;
    this.label = label ?? name;
    this.description = description;
    this.icon = icon;
    this.color = color;
  }
}

/**
 * Metadata collected from a schema definition.
 */
export class SchemaMetadata {
  public readonly name: string;
  public readonly description: string | undefined;
  public readonly nodeTypes: Map<string, NodeMetadata> = new Map();
  public readonly edges: Map<string, EdgeDescriptor> = new Map();

  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description;
  }
}

// ---- Policy factory functions ----

/**
 * Mark a node as controlled vocabulary — never create new nodes.
 *
 * Use for pre-populated reference data like MITRE tactics, users from IdP,
 * product catalogs.
 *
 * @example
 * ```typescript
 * const TacticDef = node("TacticDef", {
 *   id: prop({ search: exact() }),
 *   name: prop({ search: semantic(0.90) }),
 * }, lookup());
 * ```
 */
export function lookup(): Policy {
  return { type: 'lookup' };
}

/**
 * Mark a node to create if not found (default behavior).
 *
 * Use for dynamic entities like conversations, actions, events.
 *
 * @example
 * ```typescript
 * const Conversation = node("Conversation", {
 *   call_id: prop({ required: true, search: exact() }),
 * }, upsert());
 * ```
 */
export function upsert(): Policy {
  return { type: 'upsert' };
}

/**
 * Mark a node for strict validation — fail if not found.
 *
 * @param options.onMiss - Behavior when no match found. Default: "error"
 *
 * @example
 * ```typescript
 * const RequiredRef = node("RequiredRef", {
 *   id: prop({ search: exact() }),
 * }, resolve({ onMiss: "error" }));
 * ```
 */
export function resolve(options: { onMiss?: 'error' | 'create' | 'ignore' } = {}): Policy {
  return { type: 'resolve', onMiss: options.onMiss ?? 'error' } as ResolvePolicy;
}

/**
 * Add conditional logic and property values to a node type.
 *
 * @param options.when - Condition for when this constraint applies.
 *   Accepts plain objects or And/Or/Not operators.
 * @param options.set - Property values to set.
 *   Use `Auto()` for LLM extraction, `Auto("prompt")` for guided extraction.
 *
 * @example
 * ```typescript
 * const Alert = node("Alert", {
 *   title: prop({ required: true, search: semantic(0.85) }),
 *   severity: prop(),
 * }, upsert(), constraint({
 *   when: { severity: "critical" },
 *   set: { flagged: true, reviewed_by: Auto() },
 * }));
 * ```
 */
export function constraint(options: {
  when?: Record<string, unknown> | And | Or | Not;
  set?: Record<string, unknown>;
}): Policy {
  let when: Record<string, unknown> | undefined;
  if (options.when !== undefined) {
    if (options.when instanceof And || options.when instanceof Or || options.when instanceof Not) {
      when = options.when.toDict();
    } else {
      when = options.when;
    }
  }

  let set: Record<string, unknown> | undefined;
  if (options.set !== undefined) {
    set = serializeSetValuesInternal(options.set);
  }

  return { type: 'constraint', when, set } as ConstraintPolicy;
}

function serializeSetValuesInternal(values: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(values)) {
    if (val instanceof Auto) {
      result[key] = val.toDict();
    } else {
      result[key] = val;
    }
  }
  return result;
}

// ---- NodeDef type ----

/**
 * Return type of `node()`. Provides typed property access that returns `PropertyRef`.
 *
 * @example
 * ```typescript
 * const Task = node("Task", { title: prop({ search: semantic() }) }, upsert());
 * Task.title            // PropertyRef("Task", "title")
 * Task.__papr_node__    // NodeMetadata
 * ```
 */
export type NodeDef<T extends Record<string, PropDescriptor>> = {
  readonly __papr_node__: NodeMetadata;
} & { readonly [K in keyof T]: PropertyRef };

// ---- node() function ----

/**
 * Define a node type with properties and policies.
 *
 * Returns a Proxy-wrapped object where accessing any defined property
 * returns a `PropertyRef` for type-safe `buildLinkTo()` usage.
 *
 * @param name - Node type name (e.g., "Task", "Person")
 * @param properties - Property definitions using `prop()`
 * @param policies - Resolution policies: `lookup()`, `upsert()`, `resolve()`, `constraint()`
 *
 * @example
 * ```typescript
 * const Task = node("Task", {
 *   id: prop({ search: exact() }),
 *   title: prop({ required: true, search: semantic(0.85) }),
 *   status: prop({ enum_values: ["open", "in_progress", "done"] }),
 * }, upsert(), constraint({ set: { status: Auto() } }));
 *
 * // Property access returns PropertyRef:
 * Task.title            // PropertyRef("Task", "title")
 * Task.title.exact()    // PropertyRef with exact mode
 * ```
 */
export function node<T extends Record<string, PropDescriptor>>(
  name: string,
  properties: T,
  ...policies: Policy[]
): NodeDef<T> {
  const meta = new NodeMetadata(name);

  // Register properties and set their internal names
  for (const [propName, propDesc] of Object.entries(properties)) {
    propDesc._name = propName;
    propDesc._ownerName = name;
    meta.properties.set(propName, propDesc);
  }

  // Apply policies in order
  for (const policy of policies) {
    switch (policy.type) {
      case 'lookup':
        meta.createPolicy = 'lookup';
        break;
      case 'upsert':
        meta.createPolicy = 'upsert';
        break;
      case 'resolve': {
        const rp = policy as ResolvePolicy;
        meta.onMiss = rp.onMiss;
        if (rp.onMiss === 'error') {
          meta.createPolicy = 'lookup';
        }
        break;
      }
      case 'constraint': {
        const cp = policy as ConstraintPolicy;
        if (cp.when != null) {
          meta.when = cp.when as Record<string, unknown>;
        }
        if (cp.set != null) {
          meta.set = cp.set as Record<string, unknown>;
        }
        break;
      }
    }
  }

  // Create proxy for property-ref access
  const target = { __papr_node__: meta } as Record<string, unknown>;

  return new Proxy(target, {
    get(obj, prop, receiver) {
      if (prop === '__papr_node__') {
        return obj['__papr_node__'];
      }
      if (typeof prop === 'string' && meta.properties.has(prop)) {
        return new PropertyRef(name, prop);
      }
      return Reflect.get(obj, prop, receiver);
    },
  }) as unknown as NodeDef<T>;
}

// ---- schema() function ----

/**
 * Define a graph schema with nodes and edges.
 *
 * @param name - Schema name
 * @param config - Schema configuration with nodes and optional edges
 *
 * @example
 * ```typescript
 * const ProjectSchema = schema("project_tracker", {
 *   nodes: [Person, Task],
 *   edges: [
 *     edge(Person, Task, { name: "works_on", create: "upsert" }),
 *   ],
 *   description: "Project management schema",
 * });
 *
 * const params = buildSchemaParams(ProjectSchema);
 * await client.schemas.create(params);
 * ```
 */
export function schema(
  name: string,
  config: {
    nodes: Array<{ readonly __papr_node__: NodeMetadata }>;
    edges?: EdgeDescriptor[];
    description?: string;
  },
): SchemaMetadata {
  const meta = new SchemaMetadata(name, config.description);

  // Collect nodes
  for (const nodeDef of config.nodes) {
    const nodeMeta = nodeDef.__papr_node__;
    meta.nodeTypes.set(nodeMeta.name, nodeMeta);
  }

  // Collect edges
  if (config.edges) {
    for (const edgeDesc of config.edges) {
      // Use explicit name if set, otherwise generate from source/target
      const edgeName =
        edgeDesc._name ?? `${edgeDesc.sourceType.toLowerCase()}_${edgeDesc.targetType.toLowerCase()}`;
      edgeDesc._name = edgeName;
      meta.edges.set(edgeName, edgeDesc);
    }
  }

  return meta;
}
