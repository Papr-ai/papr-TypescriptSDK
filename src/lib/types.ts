/**
 * Internal type definitions for the Papr SDK builder API.
 *
 * These types are used by schema.ts and other lib modules.
 * User-facing types are re-exported from index.ts.
 */

// Policy marker types (returned by lookup(), upsert(), resolve(), constraint())
export type PolicyType = 'lookup' | 'upsert' | 'resolve' | 'constraint';

export interface Policy {
  readonly type: PolicyType;
}

export interface LookupPolicy extends Policy {
  readonly type: 'lookup';
}

export interface UpsertPolicy extends Policy {
  readonly type: 'upsert';
}

export interface ResolvePolicy extends Policy {
  readonly type: 'resolve';
  readonly onMiss: 'error' | 'create' | 'ignore';
}

export interface ConstraintPolicy extends Policy {
  readonly type: 'constraint';
  readonly when?: Record<string, unknown> | null;
  readonly set?: Record<string, unknown> | null;
}

// Search mode type union
export type SearchModeType = 'exact' | 'semantic' | 'fuzzy';

// Property type union (matching PropertyDefinition.type in schemas.ts)
export type PropertyType = 'string' | 'integer' | 'float' | 'boolean' | 'array' | 'datetime' | 'object';

// Edge create policy
export type EdgeCreatePolicy = 'upsert' | 'lookup';

// Edge cardinality
export type EdgeCardinality = 'one-to-one' | 'one-to-many' | 'many-to-many';
