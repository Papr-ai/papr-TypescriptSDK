/**
 * Builder functions that convert schema definitions and property refs
 * to API-compatible dicts (SchemaCreateParams, link_to, MemoryPolicy).
 *
 * @example
 * ```typescript
 * import { buildSchemaParams, buildLinkTo, buildMemoryPolicy, serializeSetValues } from '@papr/memory/lib';
 *
 * // Build schema params for API
 * const params = buildSchemaParams(ProjectSchema);
 * await client.schemas.create(params);
 *
 * // Build type-safe link_to
 * await client.memory.add({
 *   content: "John fixed the auth bug",
 *   link_to: buildLinkTo(Task.title, Person.email.exact("john@papr.ai")),
 * });
 *
 * // Build memory policy for per-memory overrides
 * const policy = buildMemoryPolicy({
 *   schemaId: "my_schema",
 *   nodeConstraints: [{
 *     node_type: "Task",
 *     create: "upsert",
 *     set: serializeSetValues({ summary: Auto(), status: "open" }),
 *   }],
 * });
 * ```
 */

import type { SchemaCreateParams } from '../resources/schemas';
import type { MemoryPolicy } from '../resources/shared';
import type { SchemaMetadata, NodeMetadata } from './schema';
import type { EdgeDescriptor } from './properties';
import { Auto, PropertyRef } from './properties';
import { And, Or, Not } from './conditions';

/**
 * Convert PropertyRef objects to `link_to` DSL strings.
 *
 * @example
 * ```typescript
 * // Single ref → string
 * buildLinkTo(Task.title)
 * // → "Task:title"
 *
 * // Multiple refs → list
 * buildLinkTo(Task.title, Person.email)
 * // → ["Task:title", "Person:email"]
 *
 * // With exact value
 * buildLinkTo(Task.id.exact("TASK-123"))
 * // → "Task:id=TASK-123"
 * ```
 */
export function buildLinkTo(...refs: PropertyRef[]): string | string[] {
  const strings = refs.map((ref) => ref.toLinkToString());
  if (strings.length === 1) {
    return strings[0]!;
  }
  return strings;
}

/**
 * Convert a SchemaMetadata to a SchemaCreateParams object.
 *
 * The output is compatible with `client.schemas.create(params)`.
 *
 * @example
 * ```typescript
 * const params = buildSchemaParams(ProjectSchema);
 * const response = await client.schemas.create(params);
 * ```
 */
export function buildSchemaParams(schemaMeta: SchemaMetadata): SchemaCreateParams {
  // Build node_types
  const nodeTypes: Record<string, SchemaCreateParams.NodeTypes> = {};
  for (const [typeName, nodeMeta] of schemaMeta.nodeTypes) {
    nodeTypes[typeName] = buildNodeType(nodeMeta);
  }

  // Build relationship_types from edges
  const relationshipTypes: Record<string, SchemaCreateParams.RelationshipTypes> = {};
  for (const [edgeName, edgeDesc] of schemaMeta.edges) {
    const relName = edgeName.toUpperCase();
    relationshipTypes[relName] = buildRelationshipType(edgeName, edgeDesc);
  }

  const params: SchemaCreateParams = {
    name: schemaMeta.name,
    node_types: nodeTypes,
    relationship_types: relationshipTypes,
    status: 'active',
  };
  if (schemaMeta.description) {
    params.description = schemaMeta.description;
  }

  return params;
}

function buildNodeType(meta: NodeMetadata): SchemaCreateParams.NodeTypes {
  // Build properties
  const properties: Record<string, Record<string, unknown>> = {};
  const requiredProperties: string[] = [];
  const searchProperties: Array<{
    name: string;
    mode: string;
    threshold?: number;
    value?: unknown;
  }> = [];

  for (const [propName, propDesc] of meta.properties) {
    properties[propName] = propDesc.toPropertyDefinition();
    if (propDesc.required) {
      requiredProperties.push(propName);
    }
    const searchProp = propDesc.toSearchProperty();
    if (searchProp !== null) {
      searchProperties.push(searchProp);
    }
  }

  const nodeType: Record<string, unknown> = {
    name: meta.name,
    label: meta.label,
    properties,
  };

  if (meta.description) {
    nodeType['description'] = meta.description;
  }
  if (meta.icon) {
    nodeType['icon'] = meta.icon;
  }
  if (meta.color) {
    nodeType['color'] = meta.color;
  }
  if (requiredProperties.length > 0) {
    nodeType['required_properties'] = requiredProperties;
  }

  // Build constraint
  const constraint: Record<string, unknown> = {
    create: meta.createPolicy,
  };
  if (meta.onMiss !== undefined) {
    constraint['on_miss'] = meta.onMiss;
  }
  if (searchProperties.length > 0) {
    constraint['search'] = { properties: searchProperties };
  }
  if (meta.when !== undefined) {
    constraint['when'] = meta.when;
  }
  if (meta.set !== undefined) {
    constraint['set'] = meta.set;
  }

  nodeType['constraint'] = constraint;
  nodeType['resolution_policy'] = meta.createPolicy;

  return nodeType as unknown as SchemaCreateParams.NodeTypes;
}

function buildRelationshipType(
  edgeName: string,
  edgeDesc: EdgeDescriptor,
): SchemaCreateParams.RelationshipTypes {
  const relName = edgeName.toUpperCase();

  const relType: Record<string, unknown> = {
    name: relName,
    label: edgeName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    allowed_source_types: [edgeDesc.sourceType],
    allowed_target_types: [edgeDesc.targetType],
  };

  if (edgeDesc.cardinality) {
    relType['cardinality'] = edgeDesc.cardinality;
  }
  if (edgeDesc.description) {
    relType['description'] = edgeDesc.description;
  }

  // Build edge constraint
  const constraint: Record<string, unknown> = {
    create: edgeDesc.create,
  };
  if (edgeDesc.search) {
    const searchProps = edgeDesc.search.map((ref) => ref.toSearchProperty());
    constraint['search'] = { properties: searchProps };
  }
  if (edgeDesc.when) {
    if (edgeDesc.when instanceof And || edgeDesc.when instanceof Or || edgeDesc.when instanceof Not) {
      constraint['when'] = (edgeDesc.when as And | Or | Not).toDict();
    } else {
      constraint['when'] = edgeDesc.when;
    }
  }

  relType['constraint'] = constraint;

  return relType as unknown as SchemaCreateParams.RelationshipTypes;
}

/**
 * Build a `memory_policy` dict from structured inputs.
 *
 * For per-memory overrides to schema defaults.
 *
 * @example
 * ```typescript
 * const policy = buildMemoryPolicy({
 *   schemaId: "my_schema_id",
 *   nodeConstraints: [{
 *     node_type: "Task",
 *     create: "upsert",
 *     set: serializeSetValues({ status: Auto() }),
 *   }],
 * });
 * await client.memory.add({ content: "...", memory_policy: policy });
 * ```
 */
export function buildMemoryPolicy(options: {
  nodeConstraints?: Array<Record<string, unknown>>;
  edgeConstraints?: Array<Record<string, unknown>>;
  schemaId?: string;
  mode?: 'auto' | 'manual';
} = {}): MemoryPolicy {
  const policy: Record<string, unknown> = {};
  if (options.mode !== undefined) {
    policy['mode'] = options.mode;
  }
  if (options.schemaId !== undefined) {
    policy['schema_id'] = options.schemaId;
  }
  if (options.nodeConstraints && options.nodeConstraints.length > 0) {
    policy['node_constraints'] = options.nodeConstraints;
  }
  if (options.edgeConstraints && options.edgeConstraints.length > 0) {
    policy['edge_constraints'] = options.edgeConstraints;
  }
  return policy as MemoryPolicy;
}

/**
 * Convert set values dict, replacing `Auto()` sentinels with `{ mode: "auto" }`.
 *
 * @example
 * ```typescript
 * serializeSetValues({ status: "done", summary: Auto() })
 * // → { status: "done", summary: { mode: "auto" } }
 *
 * serializeSetValues({ summary: Auto("Summarize briefly") })
 * // → { summary: { mode: "auto", prompt: "Summarize briefly" } }
 * ```
 */
export function serializeSetValues(values: Record<string, unknown>): Record<string, unknown> {
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
