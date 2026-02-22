/**
 * Papr SDK Builder API — Simplified memory policy definitions.
 *
 * This module provides a function-based API for defining graph schemas
 * and type-safe builders for memory operations, reducing boilerplate by ~80%.
 *
 * @example
 * ```typescript
 * import {
 *   schema, node, lookup, upsert, resolve, constraint,
 *   prop, edge, exact, semantic, fuzzy, Auto,
 *   And, Or, Not,
 *   buildLinkTo, buildSchemaParams,
 * } from '@papr/memory/lib';
 *
 * const Person = node("Person", {
 *   email: prop({ search: exact() }),
 *   name: prop({ required: true, search: semantic(0.90) }),
 * }, lookup());
 *
 * const Task = node("Task", {
 *   id: prop({ search: exact() }),
 *   title: prop({ required: true, search: semantic(0.85) }),
 *   status: prop(),
 * }, upsert());
 *
 * const ProjectSchema = schema("my_project", {
 *   nodes: [Person, Task],
 *   edges: [edge(Person, Task, { name: "works_on", create: "upsert" })],
 * });
 *
 * // Register schema
 * const params = buildSchemaParams(ProjectSchema);
 * await client.schemas.create(params);
 *
 * // Add memory with type-safe linking
 * await client.memory.add({
 *   content: "John fixed the auth bug",
 *   link_to: buildLinkTo(Task.title, Person.email),
 * });
 * ```
 */

// Schema definition functions
export { schema, node, lookup, upsert, resolve, constraint } from './schema';
export { NodeMetadata, SchemaMetadata } from './schema';
export type { NodeDef } from './schema';

// Property/search helpers
export {
  Auto,
  SearchMode,
  exact,
  semantic,
  fuzzy,
  PropertyRef,
  PropDescriptor,
  prop,
  EdgeDescriptor,
  edge,
} from './properties';

// Logical operators
export { And, Or, Not } from './conditions';
export type { Condition } from './conditions';

// Builders
export { buildLinkTo, buildSchemaParams, buildMemoryPolicy, serializeSetValues } from './builders';
