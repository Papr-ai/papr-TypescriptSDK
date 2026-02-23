/**
 * Core primitives for the Papr SDK builder API.
 *
 * Provides type-safe property references, search mode helpers, and descriptors
 * for defining node schemas with full IDE support.
 *
 * @example
 * ```typescript
 * import { prop, exact, semantic, fuzzy, Auto } from '@papr/memory/lib';
 *
 * const Task = node("Task", {
 *   id: prop({ search: exact() }),
 *   title: prop({ required: true, search: semantic(0.85) }),
 *   status: prop({ enum_values: ["open", "in_progress", "done"] }),
 *   summary: prop({ description: "Brief summary" }),
 * }, upsert(), constraint({ set: { status: Auto(), summary: Auto("Summarize briefly") } }));
 * ```
 */

import type { SearchModeType, PropertyType, EdgeCreatePolicy, EdgeCardinality } from './types';

/**
 * Sentinel indicating the LLM should extract this value from content.
 *
 * Optionally accepts a prompt to guide extraction.
 *
 * @example
 * ```typescript
 * Auto()                                    // → { mode: "auto" }
 * Auto("Summarize in 1-2 sentences")        // → { mode: "auto", prompt: "Summarize in 1-2 sentences" }
 * ```
 */
export class Auto {
  public readonly prompt: string | undefined;

  constructor(prompt?: string) {
    this.prompt = prompt;
  }

  toDict(): Record<string, string> {
    const result: Record<string, string> = { mode: 'auto' };
    if (this.prompt !== undefined) {
      result['prompt'] = this.prompt;
    }
    return result;
  }

  toString(): string {
    if (this.prompt !== undefined) {
      return `Auto(${JSON.stringify(this.prompt)})`;
    }
    return 'Auto()';
  }
}

/**
 * Describes how a property should be matched during node search.
 *
 * Not typically constructed directly — use `exact()`, `semantic()`, or `fuzzy()`.
 */
export class SearchMode {
  public readonly mode: SearchModeType;
  public readonly threshold: number | undefined;
  public readonly value: unknown;

  constructor(mode: SearchModeType, threshold?: number, value?: unknown) {
    this.mode = mode;
    this.threshold = threshold;
    this.value = value;
  }

  toSearchProperty(name: string): { name: string; mode: string; threshold?: number; value?: unknown } {
    const result: { name: string; mode: string; threshold?: number; value?: unknown } = {
      name,
      mode: this.mode,
    };
    if (this.threshold !== undefined) {
      result.threshold = this.threshold;
    }
    if (this.value !== undefined) {
      result.value = this.value;
    }
    return result;
  }
}

/**
 * Exact string match.
 *
 * @example
 * ```typescript
 * id: prop({ search: exact() })
 * id: prop({ search: exact("TASK-123") })  // with specific value
 * ```
 */
export function exact(value?: unknown): SearchMode {
  return new SearchMode('exact', undefined, value);
}

/**
 * Semantic similarity match using embeddings.
 *
 * @param threshold - Similarity threshold (0.0-1.0). Default: 0.85
 * @param value - Optional specific value to match against
 *
 * @example
 * ```typescript
 * title: prop({ search: semantic(0.85) })
 * title: prop({ search: semantic(0.90, "auth bug") })
 * ```
 */
export function semantic(threshold: number = 0.85, value?: unknown): SearchMode {
  return new SearchMode('semantic', threshold, value);
}

/**
 * Fuzzy string match (Levenshtein distance).
 *
 * @param threshold - Similarity threshold (0.0-1.0). Default: 0.80
 * @param value - Optional specific value to match against
 *
 * @example
 * ```typescript
 * name: prop({ search: fuzzy(0.80) })
 * ```
 */
export function fuzzy(threshold: number = 0.8, value?: unknown): SearchMode {
  return new SearchMode('fuzzy', threshold, value);
}

/**
 * Type-safe reference to a property on a node type.
 *
 * Created automatically when accessing properties on `node()` results.
 * Used with `buildLinkTo()` to generate `link_to` DSL strings.
 *
 * @example
 * ```typescript
 * Task.title                           // PropertyRef("Task", "title")
 * Task.title.exact("Fix auth bug")     // PropertyRef with exact mode + value
 * Task.title.semantic(0.90)            // PropertyRef with semantic mode
 * ```
 */
export class PropertyRef {
  public readonly _nodeType: string;
  public readonly _propName: string;
  public readonly _mode: SearchModeType | undefined;
  public readonly _threshold: number | undefined;
  public readonly _value: unknown;

  constructor(
    nodeType: string,
    propName: string,
    mode?: SearchModeType,
    threshold?: number,
    value?: unknown,
  ) {
    this._nodeType = nodeType;
    this._propName = propName;
    this._mode = mode;
    this._threshold = threshold;
    this._value = value;
  }

  /** Create an exact-match version of this reference. */
  exact(value?: unknown): PropertyRef {
    return new PropertyRef(this._nodeType, this._propName, 'exact', undefined, value);
  }

  /** Create a semantic-match version of this reference. */
  semantic(threshold: number = 0.85, value?: unknown): PropertyRef {
    return new PropertyRef(this._nodeType, this._propName, 'semantic', threshold, value);
  }

  /** Create a fuzzy-match version of this reference. */
  fuzzy(threshold: number = 0.8, value?: unknown): PropertyRef {
    return new PropertyRef(this._nodeType, this._propName, 'fuzzy', threshold, value);
  }

  /**
   * Convert to link_to DSL string.
   *
   * @example
   * ```typescript
   * "Task:title"             // no value
   * "Task:id=TASK-123"       // exact match with value
   * "Task:title~auth bug"    // semantic match with value
   * ```
   */
  toLinkToString(): string {
    const base = `${this._nodeType}:${this._propName}`;
    if (this._value !== undefined) {
      if (this._mode === 'exact') {
        return `${base}=${this._value}`;
      }
      if (this._mode === 'semantic') {
        return `${base}~${this._value}`;
      }
    }
    return base;
  }

  /** Convert to a SearchConfigInput.Property dict. */
  toSearchProperty(): { name: string; mode?: string; threshold?: number; value?: unknown } {
    const result: { name: string; mode?: string; threshold?: number; value?: unknown } = {
      name: this._propName,
    };
    if (this._mode !== undefined) {
      result.mode = this._mode;
    }
    if (this._threshold !== undefined) {
      result.threshold = this._threshold;
    }
    if (this._value !== undefined) {
      result.value = this._value;
    }
    return result;
  }

  toString(): string {
    return `PropertyRef(${JSON.stringify(this._nodeType)}, ${JSON.stringify(this._propName)})`;
  }
}

/**
 * Data container for node property definitions.
 *
 * Unlike Python, this does NOT use `__get__`/`__set_name__` descriptors.
 * Property-ref access is handled by the Proxy in `node()`.
 */
export class PropDescriptor {
  public readonly type: PropertyType;
  public readonly required: boolean;
  public readonly description: string | undefined;
  public readonly enumValues: string[] | undefined;
  public readonly defaultValue: unknown;
  public readonly search: SearchMode | undefined;
  /** Set by node() during construction. */
  public _name: string | undefined;
  /** Set by node() during construction. */
  public _ownerName: string | undefined;

  constructor(
    options: {
      type?: PropertyType;
      required?: boolean;
      description?: string;
      enum_values?: string[];
      default?: unknown;
      search?: SearchMode;
    } = {},
  ) {
    this.type = options.type ?? 'string';
    this.required = options.required ?? false;
    this.description = options.description;
    this.enumValues = options.enum_values;
    this.defaultValue = options.default;
    this.search = options.search;
  }

  /** Convert to a PropertyDefinition dict for the API. */
  toPropertyDefinition(): Record<string, unknown> {
    const result: Record<string, unknown> = { type: this.type };
    if (this.required) {
      result['required'] = true;
    }
    if (this.description !== undefined) {
      result['description'] = this.description;
    }
    if (this.enumValues !== undefined) {
      result['enum_values'] = this.enumValues;
    }
    if (this.defaultValue !== undefined) {
      result['default'] = this.defaultValue;
    }
    return result;
  }

  /** Convert search config to a Property dict, or null if no search. */
  toSearchProperty(): { name: string; mode: string; threshold?: number; value?: unknown } | null {
    if (this.search === undefined || this._name === undefined) {
      return null;
    }
    return this.search.toSearchProperty(this._name);
  }
}

/**
 * Define a property on a node type.
 *
 * @example
 * ```typescript
 * const Task = node("Task", {
 *   id: prop({ search: exact() }),
 *   title: prop({ required: true, search: semantic(0.85) }),
 *   status: prop({ enum_values: ["open", "in_progress", "completed"] }),
 *   priority: prop(),
 * });
 * ```
 */
export function prop(
  options: {
    type?: PropertyType;
    required?: boolean;
    description?: string;
    enum_values?: string[];
    default?: unknown;
    search?: SearchMode;
  } = {},
): PropDescriptor {
  return new PropDescriptor(options);
}

/**
 * Edge definition descriptor.
 *
 * Stores metadata about a relationship between node types.
 */
export class EdgeDescriptor {
  public readonly sourceType: string;
  public readonly targetType: string;
  public readonly search: PropertyRef[] | undefined;
  public readonly create: EdgeCreatePolicy;
  public readonly when: Record<string, unknown> | undefined;
  public readonly description: string | undefined;
  public readonly cardinality: EdgeCardinality;
  public _name: string | undefined;

  constructor(options: {
    sourceType: string;
    targetType: string;
    search?: PropertyRef[];
    create?: EdgeCreatePolicy;
    when?: Record<string, unknown>;
    description?: string;
    cardinality?: EdgeCardinality;
  }) {
    this.sourceType = options.sourceType;
    this.targetType = options.targetType;
    this.search = options.search;
    this.create = options.create ?? 'upsert';
    this.when = options.when;
    this.description = options.description;
    this.cardinality = options.cardinality ?? 'many-to-many';
  }
}

/** Resolve node name from a NodeDef proxy or string. */
function resolveNodeName(nodeRef: unknown): string {
  if (typeof nodeRef === 'string') {
    return nodeRef;
  }
  if (typeof nodeRef === 'object' && nodeRef !== null && '__papr_node__' in nodeRef) {
    return (nodeRef as { __papr_node__: { name: string } }).__papr_node__.name;
  }
  throw new TypeError(`Expected a node definition or string, got ${typeof nodeRef}`);
}

/**
 * Define an edge (relationship) between node types.
 *
 * @param source - Source node (NodeDef or string name)
 * @param target - Target node (NodeDef or string name)
 * @param options - Edge configuration
 *
 * @example
 * ```typescript
 * // Simple edge
 * edge(Person, Task, { name: "works_on", create: "upsert" })
 *
 * // Edge with search properties
 * edge(SecurityBehavior, TacticDef, {
 *   name: "mitigates",
 *   search: [TacticDef.id.exact(), TacticDef.name.semantic(0.90)],
 *   create: "lookup",
 * })
 * ```
 */
export function edge(
  source: unknown,
  target: unknown,
  options: {
    name?: string;
    search?: PropertyRef | PropertyRef[];
    create?: EdgeCreatePolicy;
    when?: Record<string, unknown>;
    description?: string;
    cardinality?: EdgeCardinality;
  } = {},
): EdgeDescriptor {
  let searchArr: PropertyRef[] | undefined;
  if (options.search !== undefined) {
    searchArr = Array.isArray(options.search) ? options.search : [options.search];
  }
  const ctorOpts: {
    sourceType: string;
    targetType: string;
    search?: PropertyRef[];
    create?: EdgeCreatePolicy;
    when?: Record<string, unknown>;
    description?: string;
    cardinality?: EdgeCardinality;
  } = {
    sourceType: resolveNodeName(source),
    targetType: resolveNodeName(target),
  };
  if (searchArr !== undefined) ctorOpts.search = searchArr;
  if (options.create !== undefined) ctorOpts.create = options.create;
  if (options.when !== undefined) ctorOpts.when = options.when;
  if (options.description !== undefined) ctorOpts.description = options.description;
  if (options.cardinality !== undefined) ctorOpts.cardinality = options.cardinality;
  const desc = new EdgeDescriptor(ctorOpts);
  if (options.name !== undefined) {
    desc._name = options.name;
  }
  return desc;
}
