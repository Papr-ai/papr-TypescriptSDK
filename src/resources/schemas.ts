// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Schemas extends APIResource {
  /**
   * Create a new user-defined graph schema.
   *
   *     This endpoint allows users to define custom node types and relationships for their knowledge graph.
   *     The schema will be validated and stored for use in future memory extractions.
   *
   *     **Features:**
   *     - Define custom node types with properties and validation rules
   *     - Define custom relationship types with constraints
   *     - Automatic validation against system schemas
   *     - Support for different scopes (personal, workspace, namespace, organization)
   *     - **Status control**: Set `status` to "active" to immediately activate the schema, or "draft" to save as draft (default)
   *     - **Enum support**: Use `enum_values` to restrict property values to a predefined list (max 15 values)
   *     - **Auto-indexing**: Required properties are automatically indexed in Neo4j when schema becomes active
   *
   *     **Schema Limits (optimized for LLM performance):**
   *     - **Maximum 10 node types** per schema
   *     - **Maximum 20 relationship types** per schema
   *     - **Maximum 10 properties** per node type
   *     - **Maximum 15 enum values** per property
   *
   *     **Property Types & Validation:**
   *     - `string`: Text values with optional `enum_values`, `min_length`, `max_length`, `pattern`
   *     - `integer`: Whole numbers with optional `min_value`, `max_value`
   *     - `float`: Decimal numbers with optional `min_value`, `max_value`
   *     - `boolean`: True/false values
   *     - `datetime`: ISO 8601 timestamp strings
   *     - `array`: Lists of values
   *     - `object`: Complex nested objects
   *
   *     **Enum Values:**
   *     - Add `enum_values` to any string property to restrict values to a predefined list
   *     - Maximum 15 enum values allowed per property
   *     - Use with `default` to set a default enum value
   *     - Example: `"enum_values": ["small", "medium", "large"]`
   *
   *     **When to Use Enums:**
   *     - Limited, well-defined options (≤15 values): sizes, statuses, categories, priorities
   *     - Controlled vocabularies: "active/inactive", "high/medium/low", "bronze/silver/gold"
   *     - When you want exact matching and no variations
   *
   *     **When to Avoid Enums:**
   *     - Open-ended text fields: names, titles, descriptions, addresses
   *     - Large sets of options (>15): countries, cities, product models
   *     - When you want semantic similarity matching for entity resolution
   *     - Dynamic or frequently changing value sets
   *
   *     **Unique Identifiers & Entity Resolution:**
   *     - Properties marked as `unique_identifiers` are used for entity deduplication and merging
   *     - **With enum_values**: Exact matching is used - entities with the same enum value are considered identical
   *     - **Without enum_values**: Semantic similarity matching is used - entities with similar meanings are automatically merged
   *     - Example: A "name" unique_identifier without enums will merge "Apple Inc" and "Apple Inc." as the same entity
   *     - Example: A "sku" unique_identifier with enums will only merge entities with exactly matching SKU codes
   *     - Use enums for unique_identifiers when you have a limited, predefined set of values (≤15 options)
   *     - Avoid enums for unique_identifiers when you have broad, open-ended values or >15 possible options
   *     - **Best practices**: Use enums for controlled vocabularies (status codes, categories), avoid for open text (company names, product titles)
   *     - **In the example above**: "name" uses semantic similarity (open-ended), "sku" uses exact matching (controlled set)
   *
   *     **LLM-Friendly Descriptions:**
   *     - Write detailed property descriptions that guide the LLM on expected formats and usage
   *     - Include examples of typical values (e.g., "Product name, typically 2-4 words like 'iPhone 15 Pro'")
   *     - Specify data formats and constraints clearly (e.g., "Price in USD as decimal number")
   *     - For enums, explain when to use each option (e.g., "use 'new' for brand new items")
   *
   *     **Authentication Required**:
   *     One of the following authentication methods must be used:
   *     - Bearer token in `Authorization` header
   *     - API Key in `X-API-Key` header
   *     - Session token in `X-Session-Token` header
   *
   *     **Required Headers**:
   *     - Content-Type: application/json
   *     - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
   */
  create(body: SchemaCreateParams, options?: RequestOptions): APIPromise<SchemaCreateResponse> {
    return this._client.post('/v1/schemas', { body, ...options });
  }

  /**
   * Get a specific schema by ID.
   *
   *     Returns the complete schema definition including node types, relationship types,
   *     and metadata. User must have read access to the schema.
   */
  retrieve(schemaID: string, options?: RequestOptions): APIPromise<SchemaRetrieveResponse> {
    return this._client.get(path`/v1/schemas/${schemaID}`, options);
  }

  /**
   * Update an existing schema.
   *
   *     Allows modification of schema properties, node types, relationship types, and status.
   *     User must have write access to the schema. Updates create a new version
   *     while preserving the existing data.
   *
   *     **Status Management:**
   *     - Set `status` to "active" to activate the schema and trigger Neo4j index creation
   *     - Set `status` to "draft" to deactivate the schema
   *     - Set `status` to "archived" to soft-delete the schema
   */
  update(
    schemaID: string,
    params: SchemaUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SchemaUpdateResponse> {
    const { body } = params;
    return this._client.put(path`/v1/schemas/${schemaID}`, { body: body, ...options });
  }

  /**
   * List all schemas accessible to the authenticated user.
   *
   *     Returns schemas that the user owns or has read access to, including:
   *     - Personal schemas created by the user
   *     - Workspace schemas shared within the user's workspace (legacy)
   *     - Namespace schemas shared within the user's namespace
   *     - Organization schemas available to the user's organization
   *
   *     **Authentication Required**:
   *     One of the following authentication methods must be used:
   *     - Bearer token in `Authorization` header
   *     - API Key in `X-API-Key` header
   *     - Session token in `X-Session-Token` header
   */
  list(
    query: SchemaListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SchemaListResponse> {
    return this._client.get('/v1/schemas', { query, ...options });
  }

  /**
   * Delete a schema.
   *
   *     Soft deletes the schema by marking it as archived. The schema data and
   *     associated graph nodes/relationships are preserved for data integrity.
   *     User must have write access to the schema.
   */
  delete(schemaID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/v1/schemas/${schemaID}`, options);
  }
}

/**
 * Complete user-defined graph schema
 */
export interface UserGraphSchemaOutput {
  name: string;

  id?: string;

  created_at?: string;

  description?: string | null;

  last_used_at?: string | null;

  /**
   * Default memory policy for memories using this schema. Includes mode ('auto',
   * 'manual'), node_constraints (applied in auto mode when present), and OMO safety
   * settings (consent, risk). Memory-level policies override schema-level.
   */
  memory_policy?: { [key: string]: unknown } | null;

  /**
   * @deprecated DEPRECATED: Use 'namespace_id' instead. Accepts Parse pointer or
   * objectId.
   */
  namespace?: string | { [key: string]: unknown } | null;

  /**
   * Namespace ID this schema belongs to. Accepts legacy 'namespace' alias.
   */
  namespace_id?: string | null;

  /**
   * Custom node types (max 10 per schema)
   */
  node_types?: { [key: string]: UserGraphSchemaOutput.NodeTypes };

  /**
   * @deprecated DEPRECATED: Use 'organization_id' instead. Accepts Parse pointer or
   * objectId.
   */
  organization?: string | { [key: string]: unknown } | null;

  /**
   * Organization ID this schema belongs to. Accepts legacy 'organization' alias.
   */
  organization_id?: string | null;

  read_access?: Array<string>;

  /**
   * Custom relationship types (max 20 per schema)
   */
  relationship_types?: { [key: string]: UserGraphSchemaOutput.RelationshipTypes };

  /**
   * Schema scopes available through the API
   */
  scope?: 'personal' | 'workspace' | 'namespace' | 'organization';

  status?: 'draft' | 'active' | 'deprecated' | 'archived';

  updated_at?: string | null;

  usage_count?: number;

  user_id?: string | { [key: string]: unknown } | null;

  version?: string;

  workspace_id?: string | { [key: string]: unknown } | null;

  write_access?: Array<string>;
}

export namespace UserGraphSchemaOutput {
  /**
   * User-defined node type with optional inline constraint.
   *
   * The `constraint` field allows defining default matching/creation behavior
   * directly within the node type definition. This replaces the need to put
   * constraints only in memory_policy.node_constraints.
   *
   * Schema-level constraints:
   *
   * - `node_type` is implicit (taken from parent UserNodeType.name)
   * - Defines default matching strategy via `search.properties`
   * - Can be overridden per-memory via memory_policy.node_constraints
   *
   * Example: UserNodeType( name="Task", label="Task", properties={ "id":
   * PropertyDefinition(type="string"), "title": PropertyDefinition(type="string",
   * required=True) }, constraint=NodeConstraint( search=SearchConfig(properties=[
   * PropertyMatch(name="id", mode="exact"), PropertyMatch(name="title",
   * mode="semantic", threshold=0.85) ]), create="auto" ) )
   */
  export interface NodeTypes {
    label: string;

    name: string;

    color?: string | null;

    /**
     * Policy for how nodes of a specific type should be handled.
     *
     * Used in two places:
     *
     * 1. **Schema level**: Inside `UserNodeType.constraint` - `node_type` is implicit
     *    from parent
     * 2. **Memory level**: In `memory_policy.node_constraints[]` - `node_type` is
     *    required
     *
     * Node constraints allow developers to control:
     *
     * - Which node types can be created vs. linked
     * - How to find/select existing nodes (via `search`)
     * - What property values to set (exact or auto-extracted)
     * - When to apply the constraint (conditional with logical operators)
     *
     * **The `search` field** handles node selection:
     *
     * - Uses PropertyMatch list to define unique identifiers and matching strategy
     * - Example:
     *   `{"properties": [{"name": "id", "mode": "exact"}, {"name": "title", "mode": "semantic"}]}`
     * - For direct selection, use PropertyMatch with value:
     *   `{"name": "id", "mode": "exact", "value": "proj_123"}`
     *
     * **The `set` field** controls property values:
     *
     * - Exact value: `{"status": "done"}` - sets exact value
     * - Auto-extract: `{"status": {"mode": "auto"}}` - LLM extracts from content
     *
     * **The `when` field** supports logical operators:
     *
     * - Simple: `{"priority": "high"}`
     * - AND: `{"_and": [{"priority": "high"}, {"status": "active"}]}`
     * - OR: `{"_or": [{"status": "active"}, {"status": "pending"}]}`
     * - NOT: `{"_not": {"status": "completed"}}`
     * - Complex:
     *   `{"_and": [{"priority": "high"}, {"_or": [{"status": "active"}, {"urgent": true}]}]}`
     */
    constraint?: NodeTypes.Constraint | null;

    description?: string | null;

    icon?: string | null;

    /**
     * DEPRECATED: Use resolution_policy='lookup' instead. Shorthand for constraint
     * with create='lookup'. When True, only links to existing nodes (controlled
     * vocabulary). Equivalent to @lookup decorator. If constraint is also provided,
     * link_only=True will override constraint.create to 'lookup'.
     */
    link_only?: boolean;

    /**
     * Node properties (max 10 per node type)
     */
    properties?: { [key: string]: NodeTypes.Properties };

    required_properties?: Array<string>;

    /**
     * Shorthand for constraint.create. 'upsert': Create if not found (default).
     * 'lookup': Only link to existing nodes (controlled vocabulary). Equivalent to
     * @upsert/@lookup decorators. If constraint is also provided, resolution_policy
     * will set constraint.create accordingly.
     */
    resolution_policy?: 'upsert' | 'lookup';

    /**
     * DEPRECATED: Use 'constraint.search.properties' instead. Properties that uniquely
     * identify this node type. Example: ['name', 'email'] for Customer nodes.
     */
    unique_identifiers?: Array<string>;
  }

  export namespace NodeTypes {
    /**
     * Policy for how nodes of a specific type should be handled.
     *
     * Used in two places:
     *
     * 1. **Schema level**: Inside `UserNodeType.constraint` - `node_type` is implicit
     *    from parent
     * 2. **Memory level**: In `memory_policy.node_constraints[]` - `node_type` is
     *    required
     *
     * Node constraints allow developers to control:
     *
     * - Which node types can be created vs. linked
     * - How to find/select existing nodes (via `search`)
     * - What property values to set (exact or auto-extracted)
     * - When to apply the constraint (conditional with logical operators)
     *
     * **The `search` field** handles node selection:
     *
     * - Uses PropertyMatch list to define unique identifiers and matching strategy
     * - Example:
     *   `{"properties": [{"name": "id", "mode": "exact"}, {"name": "title", "mode": "semantic"}]}`
     * - For direct selection, use PropertyMatch with value:
     *   `{"name": "id", "mode": "exact", "value": "proj_123"}`
     *
     * **The `set` field** controls property values:
     *
     * - Exact value: `{"status": "done"}` - sets exact value
     * - Auto-extract: `{"status": {"mode": "auto"}}` - LLM extracts from content
     *
     * **The `when` field** supports logical operators:
     *
     * - Simple: `{"priority": "high"}`
     * - AND: `{"_and": [{"priority": "high"}, {"status": "active"}]}`
     * - OR: `{"_or": [{"status": "active"}, {"status": "pending"}]}`
     * - NOT: `{"_not": {"status": "completed"}}`
     * - Complex:
     *   `{"_and": [{"priority": "high"}, {"_or": [{"status": "active"}, {"urgent": true}]}]}`
     */
    export interface Constraint {
      /**
       * 'upsert': Create if not found via search (default). 'lookup': Only link to
       * existing nodes (controlled vocabulary). Deprecated aliases: 'auto' -> 'upsert',
       * 'never' -> 'lookup'.
       */
      create?: 'upsert' | 'lookup' | 'auto' | 'never';

      /**
       * DEPRECATED: Use create='lookup' instead. Shorthand for create='lookup'. When
       * True, only links to existing nodes (controlled vocabulary). Equivalent to
       * @lookup decorator in schema definitions.
       */
      link_only?: boolean;

      /**
       * Node type this constraint applies to (e.g., 'Task', 'Project', 'Person').
       * Optional at schema level (implicit from parent UserNodeType), required at memory
       * level (in memory_policy.node_constraints).
       */
      node_type?: string | null;

      /**
       * Explicit behavior when no match found via search. 'create': create new node
       * (same as upsert). 'ignore': skip node creation (same as lookup). 'error': raise
       * error if node not found. If specified, overrides 'create' field.
       */
      on_miss?: 'create' | 'ignore' | 'error' | null;

      /**
       * Configuration for finding/selecting existing nodes.
       *
       * Defines which properties to match on and how, in priority order. The first
       * matching property wins.
       *
       * **String Shorthand** (simple cases - converts to exact match):
       * SearchConfig(properties=["id", "email"]) # Equivalent to:
       * SearchConfig(properties=[PropertyMatch.exact("id"),
       * PropertyMatch.exact("email")])
       *
       * **Mixed Form** (combine strings and PropertyMatch): SearchConfig(properties=[
       * "id", # String -> exact match PropertyMatch.semantic("title", 0.9) # Full
       * control ])
       *
       * **Full Form** (maximum control): SearchConfig(properties=[
       * PropertyMatch(name="id", mode="exact"), PropertyMatch(name="title",
       * mode="semantic", threshold=0.85) ])
       *
       * **To select a specific node by ID**:
       * SearchConfig(properties=[PropertyMatch.exact("id", "TASK-123")])
       */
      search?: Constraint.Search | null;

      /**
       * Set property values on nodes. Supports: 1. Exact value: {'status': 'done'} -
       * sets exact value. 2. Auto-extract: {'status': {'mode': 'auto'}} - LLM extracts
       * from content. 3. Text mode: {'summary': {'mode': 'auto', 'text_mode':
       * 'merge'}} - controls text updates. For text properties, text_mode can be
       * 'replace', 'append', or 'merge'.
       */
      set?: {
        [key: string]:
          | string
          | number
          | boolean
          | Array<unknown>
          | { [key: string]: unknown }
          | Constraint.PropertyValue;
      } | null;

      /**
       * Condition for when this constraint applies. Supports logical operators: '\_and',
       * '\_or', '\_not'. Examples: Simple: {'priority': 'high'} - matches when priority
       * equals 'high'. AND: {'\_and': [{'priority': 'high'}, {'status': 'active'}]} -
       * all must match. OR: {'\_or': [{'status': 'active'}, {'status': 'pending'}]} -
       * any must match. NOT: {'\_not': {'status': 'completed'}} - negation. Complex:
       * {'\_and': [{'priority': 'high'}, {'\_or': [{'status': 'active'}, {'urgent':
       * true}]}]}
       */
      when?: { [key: string]: unknown } | null;
    }

    export namespace Constraint {
      /**
       * Configuration for finding/selecting existing nodes.
       *
       * Defines which properties to match on and how, in priority order. The first
       * matching property wins.
       *
       * **String Shorthand** (simple cases - converts to exact match):
       * SearchConfig(properties=["id", "email"]) # Equivalent to:
       * SearchConfig(properties=[PropertyMatch.exact("id"),
       * PropertyMatch.exact("email")])
       *
       * **Mixed Form** (combine strings and PropertyMatch): SearchConfig(properties=[
       * "id", # String -> exact match PropertyMatch.semantic("title", 0.9) # Full
       * control ])
       *
       * **Full Form** (maximum control): SearchConfig(properties=[
       * PropertyMatch(name="id", mode="exact"), PropertyMatch(name="title",
       * mode="semantic", threshold=0.85) ])
       *
       * **To select a specific node by ID**:
       * SearchConfig(properties=[PropertyMatch.exact("id", "TASK-123")])
       */
      export interface Search {
        /**
         * Default search mode when property doesn't specify one. 'semantic' (vector
         * similarity), 'exact' (property match), 'fuzzy' (partial match).
         */
        mode?: 'semantic' | 'exact' | 'fuzzy';

        /**
         * Properties to match on, in priority order (first match wins). Accepts strings
         * (converted to exact match) or PropertyMatch objects. Use PropertyMatch with
         * 'value' field for specific node selection.
         */
        properties?: Array<Search.Property> | null;

        /**
         * Default similarity threshold for semantic/fuzzy matching (0.0-1.0). Used when
         * property doesn't specify its own threshold.
         */
        threshold?: number;

        /**
         * Search for nodes via their relationships. Example: Find tasks assigned to a
         * specific person. Each RelationshipMatch specifies edge_type, target_type, and
         * target_search. Multiple relationship matches are ANDed together.
         */
        via_relationship?: Array<unknown> | null;
      }

      export namespace Search {
        /**
         * Property matching configuration.
         *
         * Defines which property to match on and how. When listed in search.properties,
         * this property becomes a unique identifier.
         *
         * **Shorthand Helpers** (recommended for common cases):
         * PropertyMatch.exact("id") # Exact match on id PropertyMatch.exact("id",
         * "TASK-123") # Exact match with specific value PropertyMatch.semantic("title") #
         * Semantic match with default threshold PropertyMatch.semantic("title", 0.9) #
         * Semantic match with custom threshold PropertyMatch.semantic("title",
         * value="bug") # Semantic search for "bug" PropertyMatch.fuzzy("name", 0.8) #
         * Fuzzy match
         *
         * **Full Form** (when you need all options): PropertyMatch(name="title",
         * mode="semantic", threshold=0.9, value="auth bug")
         *
         * **String Shorthand** (in SearchConfig.properties): properties=["id", "email"] #
         * Equivalent to [PropertyMatch.exact("id"), PropertyMatch.exact("email")]
         */
        export interface Property {
          /**
           * Property name to match on (e.g., 'id', 'email', 'title')
           */
          name: string;

          /**
           * Matching mode: 'exact' (string match), 'semantic' (embedding similarity),
           * 'fuzzy' (Levenshtein distance)
           */
          mode?: 'semantic' | 'exact' | 'fuzzy';

          /**
           * Similarity threshold for semantic/fuzzy modes (0.0-1.0). Ignored for exact mode.
           */
          threshold?: number;

          /**
           * Runtime value override. If set, use this value for matching instead of
           * extracting from content. Useful for memory-level overrides when you know the
           * exact value to search for.
           */
          value?: unknown;
        }
      }

      /**
       * Configuration for a property value in NodeConstraint.set.
       *
       * Supports two modes:
       *
       * 1. Exact value: Just pass the value directly (e.g., "done", 123, True)
       * 2. Auto-extract: {"mode": "auto"} - LLM extracts from memory content
       *
       * For text properties, use text_mode to control how updates are applied.
       */
      export interface PropertyValue {
        /**
         * 'auto': LLM extracts value from memory content.
         */
        mode?: 'auto';

        /**
         * For text properties: 'replace' (overwrite), 'append' (add to), 'merge' (LLM
         * combines existing + new).
         */
        text_mode?: 'replace' | 'append' | 'merge';
      }
    }

    /**
     * Property definition for nodes/relationships
     */
    export interface Properties {
      type: 'string' | 'integer' | 'float' | 'boolean' | 'array' | 'datetime' | 'object';

      default?: unknown;

      description?: string | null;

      /**
       * List of allowed enum values (max 15)
       */
      enum_values?: Array<string> | null;

      max_length?: number | null;

      max_value?: number | null;

      min_length?: number | null;

      min_value?: number | null;

      pattern?: string | null;

      required?: boolean;
    }
  }

  /**
   * User-defined relationship type with optional inline constraint.
   *
   * The `constraint` field allows defining default matching/creation behavior
   * directly within the relationship type definition. This mirrors the pattern used
   * in UserNodeType.constraint for nodes.
   *
   * Schema-level edge constraints:
   *
   * - `edge_type` is implicit (taken from parent UserRelationshipType.name)
   * - Defines default target node matching strategy via `search.properties`
   * - Can be overridden per-memory via memory_policy.edge_constraints
   *
   * Example: UserRelationshipType( name="MITIGATES", label="Mitigates",
   * allowed_source_types=["SecurityBehavior"], allowed_target_types=["TacticDef"],
   * constraint=EdgeConstraint( search=SearchConfig(properties=[
   * PropertyMatch(name="name", mode="semantic", threshold=0.90) ]), create="never" #
   * Controlled vocabulary - only link to existing targets ) )
   */
  export interface RelationshipTypes {
    allowed_source_types: Array<string>;

    allowed_target_types: Array<string>;

    label: string;

    name: string;

    cardinality?: 'one-to-one' | 'one-to-many' | 'many-to-many';

    color?: string | null;

    /**
     * Policy for how edges/relationships of a specific type should be handled.
     *
     * Used in two places:
     *
     * 1. **Schema level**: Inside `UserRelationshipType.constraint` - `edge_type` is
     *    implicit from parent
     * 2. **Memory level**: In `memory_policy.edge_constraints[]` - `edge_type` is
     *    required
     *
     * Edge constraints allow developers to control:
     *
     * - Which edge types can be created vs. linked to existing targets
     * - How to find/select target nodes (via `search`)
     * - What edge property values to set (exact or auto-extracted)
     * - When to apply the constraint (conditional with logical operators)
     * - Filter by source/target node types
     *
     * **The `search` field** handles target node selection:
     *
     * - Uses SearchConfig to define how to find existing target nodes
     * - Example: `{"properties": [{"name": "name", "mode": "semantic"}]}`
     * - For controlled vocabulary: find existing target, don't create new
     *
     * **The `set` field** controls edge property values:
     *
     * - Exact value: `{"weight": 1.0}` - sets exact value
     * - Auto-extract: `{"reason": {"mode": "auto"}}` - LLM extracts from content
     *
     * **The `when` field** supports logical operators (same as NodeConstraint):
     *
     * - Simple: `{"severity": "high"}`
     * - AND: `{"_and": [{"severity": "high"}, {"confirmed": true}]}`
     * - OR: `{"_or": [{"type": "MITIGATES"}, {"type": "PREVENTS"}]}`
     * - NOT: `{"_not": {"status": "deprecated"}}`
     */
    constraint?: RelationshipTypes.Constraint | null;

    description?: string | null;

    /**
     * DEPRECATED: Use resolution_policy='lookup' instead. Shorthand for constraint
     * with create='lookup'. When True, only links to existing target nodes (controlled
     * vocabulary). Equivalent to @lookup decorator. If constraint is also provided,
     * link_only=True will override constraint.create to 'lookup'.
     */
    link_only?: boolean;

    properties?: { [key: string]: RelationshipTypes.Properties };

    /**
     * Shorthand for constraint.create. 'upsert': Create target if not found (default).
     * 'lookup': Only link to existing targets (controlled vocabulary). Equivalent to
     * @upsert/@lookup decorators. If constraint is also provided, resolution_policy
     * will set constraint.create accordingly.
     */
    resolution_policy?: 'upsert' | 'lookup';
  }

  export namespace RelationshipTypes {
    /**
     * Policy for how edges/relationships of a specific type should be handled.
     *
     * Used in two places:
     *
     * 1. **Schema level**: Inside `UserRelationshipType.constraint` - `edge_type` is
     *    implicit from parent
     * 2. **Memory level**: In `memory_policy.edge_constraints[]` - `edge_type` is
     *    required
     *
     * Edge constraints allow developers to control:
     *
     * - Which edge types can be created vs. linked to existing targets
     * - How to find/select target nodes (via `search`)
     * - What edge property values to set (exact or auto-extracted)
     * - When to apply the constraint (conditional with logical operators)
     * - Filter by source/target node types
     *
     * **The `search` field** handles target node selection:
     *
     * - Uses SearchConfig to define how to find existing target nodes
     * - Example: `{"properties": [{"name": "name", "mode": "semantic"}]}`
     * - For controlled vocabulary: find existing target, don't create new
     *
     * **The `set` field** controls edge property values:
     *
     * - Exact value: `{"weight": 1.0}` - sets exact value
     * - Auto-extract: `{"reason": {"mode": "auto"}}` - LLM extracts from content
     *
     * **The `when` field** supports logical operators (same as NodeConstraint):
     *
     * - Simple: `{"severity": "high"}`
     * - AND: `{"_and": [{"severity": "high"}, {"confirmed": true}]}`
     * - OR: `{"_or": [{"type": "MITIGATES"}, {"type": "PREVENTS"}]}`
     * - NOT: `{"_not": {"status": "deprecated"}}`
     */
    export interface Constraint {
      /**
       * 'upsert': Create target node if not found via search (default). 'lookup': Only
       * link to existing target nodes (controlled vocabulary). When 'lookup', edges to
       * non-existing targets are skipped. Deprecated aliases: 'auto' -> 'upsert',
       * 'never' -> 'lookup'.
       */
      create?: 'upsert' | 'lookup' | 'auto' | 'never';

      /**
       * Direction of edges this constraint applies to. 'outgoing': edges where current
       * node is source (default). 'incoming': edges where current node is target.
       * 'both': applies in either direction.
       */
      direction?: 'outgoing' | 'incoming' | 'both';

      /**
       * Edge/relationship type this constraint applies to (e.g., 'MITIGATES',
       * 'ASSIGNED_TO'). Optional at schema level (implicit from parent
       * UserRelationshipType), required at memory level (in
       * memory_policy.edge_constraints).
       */
      edge_type?: string | null;

      /**
       * DEPRECATED: Use create='lookup' instead. Shorthand for create='lookup'. When
       * True, only links to existing target nodes. Equivalent to @lookup decorator in
       * schema definitions.
       */
      link_only?: boolean;

      /**
       * Explicit behavior when no target match found via search. 'create': create new
       * target node (same as upsert). 'ignore': skip edge creation (same as lookup).
       * 'error': raise error if target not found. If specified, overrides 'create'
       * field.
       */
      on_miss?: 'create' | 'ignore' | 'error' | null;

      /**
       * Configuration for finding/selecting existing nodes.
       *
       * Defines which properties to match on and how, in priority order. The first
       * matching property wins.
       *
       * **String Shorthand** (simple cases - converts to exact match):
       * SearchConfig(properties=["id", "email"]) # Equivalent to:
       * SearchConfig(properties=[PropertyMatch.exact("id"),
       * PropertyMatch.exact("email")])
       *
       * **Mixed Form** (combine strings and PropertyMatch): SearchConfig(properties=[
       * "id", # String -> exact match PropertyMatch.semantic("title", 0.9) # Full
       * control ])
       *
       * **Full Form** (maximum control): SearchConfig(properties=[
       * PropertyMatch(name="id", mode="exact"), PropertyMatch(name="title",
       * mode="semantic", threshold=0.85) ])
       *
       * **To select a specific node by ID**:
       * SearchConfig(properties=[PropertyMatch.exact("id", "TASK-123")])
       */
      search?: Constraint.Search | null;

      /**
       * Set property values on edges. Supports: 1. Exact value: {'weight': 1.0} - sets
       * exact value. 2. Auto-extract: {'reason': {'mode': 'auto'}} - LLM extracts from
       * content. Edge properties are useful for relationship metadata (weight,
       * timestamp, reason, etc.).
       */
      set?: {
        [key: string]:
          | string
          | number
          | boolean
          | Array<unknown>
          | { [key: string]: unknown }
          | Constraint.PropertyValue;
      } | null;

      /**
       * Filter: only apply when source node is of this type. Example:
       * source_type='SecurityBehavior' - only applies to edges from SecurityBehavior
       * nodes.
       */
      source_type?: string | null;

      /**
       * Filter: only apply when target node is of this type. Example:
       * target_type='TacticDef' - only applies to edges targeting TacticDef nodes.
       */
      target_type?: string | null;

      /**
       * Condition for when this constraint applies. Supports logical operators: '\_and',
       * '\_or', '\_not'. Applied to edge properties or context. Example: {'\_and':
       * [{'severity': 'high'}, {'_not': {'status': 'deprecated'}}]}
       */
      when?: { [key: string]: unknown } | null;
    }

    export namespace Constraint {
      /**
       * Configuration for finding/selecting existing nodes.
       *
       * Defines which properties to match on and how, in priority order. The first
       * matching property wins.
       *
       * **String Shorthand** (simple cases - converts to exact match):
       * SearchConfig(properties=["id", "email"]) # Equivalent to:
       * SearchConfig(properties=[PropertyMatch.exact("id"),
       * PropertyMatch.exact("email")])
       *
       * **Mixed Form** (combine strings and PropertyMatch): SearchConfig(properties=[
       * "id", # String -> exact match PropertyMatch.semantic("title", 0.9) # Full
       * control ])
       *
       * **Full Form** (maximum control): SearchConfig(properties=[
       * PropertyMatch(name="id", mode="exact"), PropertyMatch(name="title",
       * mode="semantic", threshold=0.85) ])
       *
       * **To select a specific node by ID**:
       * SearchConfig(properties=[PropertyMatch.exact("id", "TASK-123")])
       */
      export interface Search {
        /**
         * Default search mode when property doesn't specify one. 'semantic' (vector
         * similarity), 'exact' (property match), 'fuzzy' (partial match).
         */
        mode?: 'semantic' | 'exact' | 'fuzzy';

        /**
         * Properties to match on, in priority order (first match wins). Accepts strings
         * (converted to exact match) or PropertyMatch objects. Use PropertyMatch with
         * 'value' field for specific node selection.
         */
        properties?: Array<Search.Property> | null;

        /**
         * Default similarity threshold for semantic/fuzzy matching (0.0-1.0). Used when
         * property doesn't specify its own threshold.
         */
        threshold?: number;

        /**
         * Search for nodes via their relationships. Example: Find tasks assigned to a
         * specific person. Each RelationshipMatch specifies edge_type, target_type, and
         * target_search. Multiple relationship matches are ANDed together.
         */
        via_relationship?: Array<unknown> | null;
      }

      export namespace Search {
        /**
         * Property matching configuration.
         *
         * Defines which property to match on and how. When listed in search.properties,
         * this property becomes a unique identifier.
         *
         * **Shorthand Helpers** (recommended for common cases):
         * PropertyMatch.exact("id") # Exact match on id PropertyMatch.exact("id",
         * "TASK-123") # Exact match with specific value PropertyMatch.semantic("title") #
         * Semantic match with default threshold PropertyMatch.semantic("title", 0.9) #
         * Semantic match with custom threshold PropertyMatch.semantic("title",
         * value="bug") # Semantic search for "bug" PropertyMatch.fuzzy("name", 0.8) #
         * Fuzzy match
         *
         * **Full Form** (when you need all options): PropertyMatch(name="title",
         * mode="semantic", threshold=0.9, value="auth bug")
         *
         * **String Shorthand** (in SearchConfig.properties): properties=["id", "email"] #
         * Equivalent to [PropertyMatch.exact("id"), PropertyMatch.exact("email")]
         */
        export interface Property {
          /**
           * Property name to match on (e.g., 'id', 'email', 'title')
           */
          name: string;

          /**
           * Matching mode: 'exact' (string match), 'semantic' (embedding similarity),
           * 'fuzzy' (Levenshtein distance)
           */
          mode?: 'semantic' | 'exact' | 'fuzzy';

          /**
           * Similarity threshold for semantic/fuzzy modes (0.0-1.0). Ignored for exact mode.
           */
          threshold?: number;

          /**
           * Runtime value override. If set, use this value for matching instead of
           * extracting from content. Useful for memory-level overrides when you know the
           * exact value to search for.
           */
          value?: unknown;
        }
      }

      /**
       * Configuration for a property value in NodeConstraint.set.
       *
       * Supports two modes:
       *
       * 1. Exact value: Just pass the value directly (e.g., "done", 123, True)
       * 2. Auto-extract: {"mode": "auto"} - LLM extracts from memory content
       *
       * For text properties, use text_mode to control how updates are applied.
       */
      export interface PropertyValue {
        /**
         * 'auto': LLM extracts value from memory content.
         */
        mode?: 'auto';

        /**
         * For text properties: 'replace' (overwrite), 'append' (add to), 'merge' (LLM
         * combines existing + new).
         */
        text_mode?: 'replace' | 'append' | 'merge';
      }
    }

    /**
     * Property definition for nodes/relationships
     */
    export interface Properties {
      type: 'string' | 'integer' | 'float' | 'boolean' | 'array' | 'datetime' | 'object';

      default?: unknown;

      description?: string | null;

      /**
       * List of allowed enum values (max 15)
       */
      enum_values?: Array<string> | null;

      max_length?: number | null;

      max_value?: number | null;

      min_length?: number | null;

      min_value?: number | null;

      pattern?: string | null;

      required?: boolean;
    }
  }
}

/**
 * Response model for schema operations
 */
export interface SchemaCreateResponse {
  success: boolean;

  code?: number;

  /**
   * Complete user-defined graph schema
   */
  data?: UserGraphSchemaOutput | null;

  error?: string | null;
}

/**
 * Response model for schema operations
 */
export interface SchemaRetrieveResponse {
  success: boolean;

  code?: number;

  /**
   * Complete user-defined graph schema
   */
  data?: UserGraphSchemaOutput | null;

  error?: string | null;
}

/**
 * Response model for schema operations
 */
export interface SchemaUpdateResponse {
  success: boolean;

  code?: number;

  /**
   * Complete user-defined graph schema
   */
  data?: UserGraphSchemaOutput | null;

  error?: string | null;
}

/**
 * Response model for listing schemas
 */
export interface SchemaListResponse {
  success: boolean;

  code?: number;

  data?: Array<UserGraphSchemaOutput> | null;

  error?: string | null;

  total?: number;
}

export type SchemaDeleteResponse = unknown;

export interface SchemaCreateParams {
  name: string;

  id?: string;

  created_at?: string;

  description?: string | null;

  last_used_at?: string | null;

  /**
   * Default memory policy for memories using this schema. Includes mode ('auto',
   * 'manual'), node_constraints (applied in auto mode when present), and OMO safety
   * settings (consent, risk). Memory-level policies override schema-level.
   */
  memory_policy?: { [key: string]: unknown } | null;

  /**
   * @deprecated DEPRECATED: Use 'namespace_id' instead. Accepts Parse pointer or
   * objectId.
   */
  namespace?: string | { [key: string]: unknown } | null;

  /**
   * Namespace ID this schema belongs to. Accepts legacy 'namespace' alias.
   */
  namespace_id?: string | null;

  /**
   * Custom node types (max 10 per schema)
   */
  node_types?: { [key: string]: SchemaCreateParams.NodeTypes };

  /**
   * @deprecated DEPRECATED: Use 'organization_id' instead. Accepts Parse pointer or
   * objectId.
   */
  organization?: string | { [key: string]: unknown } | null;

  /**
   * Organization ID this schema belongs to. Accepts legacy 'organization' alias.
   */
  organization_id?: string | null;

  read_access?: Array<string>;

  /**
   * Custom relationship types (max 20 per schema)
   */
  relationship_types?: { [key: string]: SchemaCreateParams.RelationshipTypes };

  /**
   * Schema scopes available through the API
   */
  scope?: 'personal' | 'workspace' | 'namespace' | 'organization';

  status?: 'draft' | 'active' | 'deprecated' | 'archived';

  updated_at?: string | null;

  usage_count?: number;

  user_id?: string | { [key: string]: unknown } | null;

  version?: string;

  workspace_id?: string | { [key: string]: unknown } | null;

  write_access?: Array<string>;
}

export namespace SchemaCreateParams {
  /**
   * User-defined node type with optional inline constraint.
   *
   * The `constraint` field allows defining default matching/creation behavior
   * directly within the node type definition. This replaces the need to put
   * constraints only in memory_policy.node_constraints.
   *
   * Schema-level constraints:
   *
   * - `node_type` is implicit (taken from parent UserNodeType.name)
   * - Defines default matching strategy via `search.properties`
   * - Can be overridden per-memory via memory_policy.node_constraints
   *
   * Example: UserNodeType( name="Task", label="Task", properties={ "id":
   * PropertyDefinition(type="string"), "title": PropertyDefinition(type="string",
   * required=True) }, constraint=NodeConstraint( search=SearchConfig(properties=[
   * PropertyMatch(name="id", mode="exact"), PropertyMatch(name="title",
   * mode="semantic", threshold=0.85) ]), create="auto" ) )
   */
  export interface NodeTypes {
    label: string;

    name: string;

    color?: string | null;

    /**
     * Policy for how nodes of a specific type should be handled.
     *
     * Used in two places:
     *
     * 1. **Schema level**: Inside `UserNodeType.constraint` - `node_type` is implicit
     *    from parent
     * 2. **Memory level**: In `memory_policy.node_constraints[]` - `node_type` is
     *    required
     *
     * Node constraints allow developers to control:
     *
     * - Which node types can be created vs. linked
     * - How to find/select existing nodes (via `search`)
     * - What property values to set (exact or auto-extracted)
     * - When to apply the constraint (conditional with logical operators)
     *
     * **The `search` field** handles node selection:
     *
     * - Uses PropertyMatch list to define unique identifiers and matching strategy
     * - Example:
     *   `{"properties": [{"name": "id", "mode": "exact"}, {"name": "title", "mode": "semantic"}]}`
     * - For direct selection, use PropertyMatch with value:
     *   `{"name": "id", "mode": "exact", "value": "proj_123"}`
     *
     * **The `set` field** controls property values:
     *
     * - Exact value: `{"status": "done"}` - sets exact value
     * - Auto-extract: `{"status": {"mode": "auto"}}` - LLM extracts from content
     *
     * **The `when` field** supports logical operators:
     *
     * - Simple: `{"priority": "high"}`
     * - AND: `{"_and": [{"priority": "high"}, {"status": "active"}]}`
     * - OR: `{"_or": [{"status": "active"}, {"status": "pending"}]}`
     * - NOT: `{"_not": {"status": "completed"}}`
     * - Complex:
     *   `{"_and": [{"priority": "high"}, {"_or": [{"status": "active"}, {"urgent": true}]}]}`
     */
    constraint?: NodeTypes.Constraint | null;

    description?: string | null;

    icon?: string | null;

    /**
     * DEPRECATED: Use resolution_policy='lookup' instead. Shorthand for constraint
     * with create='lookup'. When True, only links to existing nodes (controlled
     * vocabulary). Equivalent to @lookup decorator. If constraint is also provided,
     * link_only=True will override constraint.create to 'lookup'.
     */
    link_only?: boolean;

    /**
     * Node properties (max 10 per node type)
     */
    properties?: { [key: string]: NodeTypes.Properties };

    required_properties?: Array<string>;

    /**
     * Shorthand for constraint.create. 'upsert': Create if not found (default).
     * 'lookup': Only link to existing nodes (controlled vocabulary). Equivalent to
     * @upsert/@lookup decorators. If constraint is also provided, resolution_policy
     * will set constraint.create accordingly.
     */
    resolution_policy?: 'upsert' | 'lookup';

    /**
     * DEPRECATED: Use 'constraint.search.properties' instead. Properties that uniquely
     * identify this node type. Example: ['name', 'email'] for Customer nodes.
     */
    unique_identifiers?: Array<string>;
  }

  export namespace NodeTypes {
    /**
     * Policy for how nodes of a specific type should be handled.
     *
     * Used in two places:
     *
     * 1. **Schema level**: Inside `UserNodeType.constraint` - `node_type` is implicit
     *    from parent
     * 2. **Memory level**: In `memory_policy.node_constraints[]` - `node_type` is
     *    required
     *
     * Node constraints allow developers to control:
     *
     * - Which node types can be created vs. linked
     * - How to find/select existing nodes (via `search`)
     * - What property values to set (exact or auto-extracted)
     * - When to apply the constraint (conditional with logical operators)
     *
     * **The `search` field** handles node selection:
     *
     * - Uses PropertyMatch list to define unique identifiers and matching strategy
     * - Example:
     *   `{"properties": [{"name": "id", "mode": "exact"}, {"name": "title", "mode": "semantic"}]}`
     * - For direct selection, use PropertyMatch with value:
     *   `{"name": "id", "mode": "exact", "value": "proj_123"}`
     *
     * **The `set` field** controls property values:
     *
     * - Exact value: `{"status": "done"}` - sets exact value
     * - Auto-extract: `{"status": {"mode": "auto"}}` - LLM extracts from content
     *
     * **The `when` field** supports logical operators:
     *
     * - Simple: `{"priority": "high"}`
     * - AND: `{"_and": [{"priority": "high"}, {"status": "active"}]}`
     * - OR: `{"_or": [{"status": "active"}, {"status": "pending"}]}`
     * - NOT: `{"_not": {"status": "completed"}}`
     * - Complex:
     *   `{"_and": [{"priority": "high"}, {"_or": [{"status": "active"}, {"urgent": true}]}]}`
     */
    export interface Constraint {
      /**
       * 'upsert': Create if not found via search (default). 'lookup': Only link to
       * existing nodes (controlled vocabulary). Deprecated aliases: 'auto' -> 'upsert',
       * 'never' -> 'lookup'.
       */
      create?: 'upsert' | 'lookup' | 'auto' | 'never';

      /**
       * DEPRECATED: Use create='lookup' instead. Shorthand for create='lookup'. When
       * True, only links to existing nodes (controlled vocabulary). Equivalent to
       * @lookup decorator in schema definitions.
       */
      link_only?: boolean;

      /**
       * Node type this constraint applies to (e.g., 'Task', 'Project', 'Person').
       * Optional at schema level (implicit from parent UserNodeType), required at memory
       * level (in memory_policy.node_constraints).
       */
      node_type?: string | null;

      /**
       * Explicit behavior when no match found via search. 'create': create new node
       * (same as upsert). 'ignore': skip node creation (same as lookup). 'error': raise
       * error if node not found. If specified, overrides 'create' field.
       */
      on_miss?: 'create' | 'ignore' | 'error' | null;

      /**
       * Configuration for finding/selecting existing nodes.
       *
       * Defines which properties to match on and how, in priority order. The first
       * matching property wins.
       *
       * **String Shorthand** (simple cases - converts to exact match):
       * SearchConfig(properties=["id", "email"]) # Equivalent to:
       * SearchConfig(properties=[PropertyMatch.exact("id"),
       * PropertyMatch.exact("email")])
       *
       * **Mixed Form** (combine strings and PropertyMatch): SearchConfig(properties=[
       * "id", # String -> exact match PropertyMatch.semantic("title", 0.9) # Full
       * control ])
       *
       * **Full Form** (maximum control): SearchConfig(properties=[
       * PropertyMatch(name="id", mode="exact"), PropertyMatch(name="title",
       * mode="semantic", threshold=0.85) ])
       *
       * **To select a specific node by ID**:
       * SearchConfig(properties=[PropertyMatch.exact("id", "TASK-123")])
       */
      search?: Constraint.Search | null;

      /**
       * Set property values on nodes. Supports: 1. Exact value: {'status': 'done'} -
       * sets exact value. 2. Auto-extract: {'status': {'mode': 'auto'}} - LLM extracts
       * from content. 3. Text mode: {'summary': {'mode': 'auto', 'text_mode':
       * 'merge'}} - controls text updates. For text properties, text_mode can be
       * 'replace', 'append', or 'merge'.
       */
      set?: {
        [key: string]:
          | string
          | number
          | boolean
          | Array<unknown>
          | { [key: string]: unknown }
          | Constraint.PropertyValue;
      } | null;

      /**
       * Condition for when this constraint applies. Supports logical operators: '\_and',
       * '\_or', '\_not'. Examples: Simple: {'priority': 'high'} - matches when priority
       * equals 'high'. AND: {'\_and': [{'priority': 'high'}, {'status': 'active'}]} -
       * all must match. OR: {'\_or': [{'status': 'active'}, {'status': 'pending'}]} -
       * any must match. NOT: {'\_not': {'status': 'completed'}} - negation. Complex:
       * {'\_and': [{'priority': 'high'}, {'\_or': [{'status': 'active'}, {'urgent':
       * true}]}]}
       */
      when?: { [key: string]: unknown } | null;
    }

    export namespace Constraint {
      /**
       * Configuration for finding/selecting existing nodes.
       *
       * Defines which properties to match on and how, in priority order. The first
       * matching property wins.
       *
       * **String Shorthand** (simple cases - converts to exact match):
       * SearchConfig(properties=["id", "email"]) # Equivalent to:
       * SearchConfig(properties=[PropertyMatch.exact("id"),
       * PropertyMatch.exact("email")])
       *
       * **Mixed Form** (combine strings and PropertyMatch): SearchConfig(properties=[
       * "id", # String -> exact match PropertyMatch.semantic("title", 0.9) # Full
       * control ])
       *
       * **Full Form** (maximum control): SearchConfig(properties=[
       * PropertyMatch(name="id", mode="exact"), PropertyMatch(name="title",
       * mode="semantic", threshold=0.85) ])
       *
       * **To select a specific node by ID**:
       * SearchConfig(properties=[PropertyMatch.exact("id", "TASK-123")])
       */
      export interface Search {
        /**
         * Default search mode when property doesn't specify one. 'semantic' (vector
         * similarity), 'exact' (property match), 'fuzzy' (partial match).
         */
        mode?: 'semantic' | 'exact' | 'fuzzy';

        /**
         * Properties to match on, in priority order (first match wins). Accepts strings
         * (converted to exact match) or PropertyMatch objects. Use PropertyMatch with
         * 'value' field for specific node selection.
         */
        properties?: Array<Search.Property> | null;

        /**
         * Default similarity threshold for semantic/fuzzy matching (0.0-1.0). Used when
         * property doesn't specify its own threshold.
         */
        threshold?: number;

        /**
         * Search for nodes via their relationships. Example: Find tasks assigned to a
         * specific person. Each RelationshipMatch specifies edge_type, target_type, and
         * target_search. Multiple relationship matches are ANDed together.
         */
        via_relationship?: Array<unknown> | null;
      }

      export namespace Search {
        /**
         * Property matching configuration.
         *
         * Defines which property to match on and how. When listed in search.properties,
         * this property becomes a unique identifier.
         *
         * **Shorthand Helpers** (recommended for common cases):
         * PropertyMatch.exact("id") # Exact match on id PropertyMatch.exact("id",
         * "TASK-123") # Exact match with specific value PropertyMatch.semantic("title") #
         * Semantic match with default threshold PropertyMatch.semantic("title", 0.9) #
         * Semantic match with custom threshold PropertyMatch.semantic("title",
         * value="bug") # Semantic search for "bug" PropertyMatch.fuzzy("name", 0.8) #
         * Fuzzy match
         *
         * **Full Form** (when you need all options): PropertyMatch(name="title",
         * mode="semantic", threshold=0.9, value="auth bug")
         *
         * **String Shorthand** (in SearchConfig.properties): properties=["id", "email"] #
         * Equivalent to [PropertyMatch.exact("id"), PropertyMatch.exact("email")]
         */
        export interface Property {
          /**
           * Property name to match on (e.g., 'id', 'email', 'title')
           */
          name: string;

          /**
           * Matching mode: 'exact' (string match), 'semantic' (embedding similarity),
           * 'fuzzy' (Levenshtein distance)
           */
          mode?: 'semantic' | 'exact' | 'fuzzy';

          /**
           * Similarity threshold for semantic/fuzzy modes (0.0-1.0). Ignored for exact mode.
           */
          threshold?: number;

          /**
           * Runtime value override. If set, use this value for matching instead of
           * extracting from content. Useful for memory-level overrides when you know the
           * exact value to search for.
           */
          value?: unknown;
        }
      }

      /**
       * Configuration for a property value in NodeConstraint.set.
       *
       * Supports two modes:
       *
       * 1. Exact value: Just pass the value directly (e.g., "done", 123, True)
       * 2. Auto-extract: {"mode": "auto"} - LLM extracts from memory content
       *
       * For text properties, use text_mode to control how updates are applied.
       */
      export interface PropertyValue {
        /**
         * 'auto': LLM extracts value from memory content.
         */
        mode?: 'auto';

        /**
         * For text properties: 'replace' (overwrite), 'append' (add to), 'merge' (LLM
         * combines existing + new).
         */
        text_mode?: 'replace' | 'append' | 'merge';
      }
    }

    /**
     * Property definition for nodes/relationships
     */
    export interface Properties {
      type: 'string' | 'integer' | 'float' | 'boolean' | 'array' | 'datetime' | 'object';

      default?: unknown;

      description?: string | null;

      /**
       * List of allowed enum values (max 15)
       */
      enum_values?: Array<string> | null;

      max_length?: number | null;

      max_value?: number | null;

      min_length?: number | null;

      min_value?: number | null;

      pattern?: string | null;

      required?: boolean;
    }
  }

  /**
   * User-defined relationship type with optional inline constraint.
   *
   * The `constraint` field allows defining default matching/creation behavior
   * directly within the relationship type definition. This mirrors the pattern used
   * in UserNodeType.constraint for nodes.
   *
   * Schema-level edge constraints:
   *
   * - `edge_type` is implicit (taken from parent UserRelationshipType.name)
   * - Defines default target node matching strategy via `search.properties`
   * - Can be overridden per-memory via memory_policy.edge_constraints
   *
   * Example: UserRelationshipType( name="MITIGATES", label="Mitigates",
   * allowed_source_types=["SecurityBehavior"], allowed_target_types=["TacticDef"],
   * constraint=EdgeConstraint( search=SearchConfig(properties=[
   * PropertyMatch(name="name", mode="semantic", threshold=0.90) ]), create="never" #
   * Controlled vocabulary - only link to existing targets ) )
   */
  export interface RelationshipTypes {
    allowed_source_types: Array<string>;

    allowed_target_types: Array<string>;

    label: string;

    name: string;

    cardinality?: 'one-to-one' | 'one-to-many' | 'many-to-many';

    color?: string | null;

    /**
     * Policy for how edges/relationships of a specific type should be handled.
     *
     * Used in two places:
     *
     * 1. **Schema level**: Inside `UserRelationshipType.constraint` - `edge_type` is
     *    implicit from parent
     * 2. **Memory level**: In `memory_policy.edge_constraints[]` - `edge_type` is
     *    required
     *
     * Edge constraints allow developers to control:
     *
     * - Which edge types can be created vs. linked to existing targets
     * - How to find/select target nodes (via `search`)
     * - What edge property values to set (exact or auto-extracted)
     * - When to apply the constraint (conditional with logical operators)
     * - Filter by source/target node types
     *
     * **The `search` field** handles target node selection:
     *
     * - Uses SearchConfig to define how to find existing target nodes
     * - Example: `{"properties": [{"name": "name", "mode": "semantic"}]}`
     * - For controlled vocabulary: find existing target, don't create new
     *
     * **The `set` field** controls edge property values:
     *
     * - Exact value: `{"weight": 1.0}` - sets exact value
     * - Auto-extract: `{"reason": {"mode": "auto"}}` - LLM extracts from content
     *
     * **The `when` field** supports logical operators (same as NodeConstraint):
     *
     * - Simple: `{"severity": "high"}`
     * - AND: `{"_and": [{"severity": "high"}, {"confirmed": true}]}`
     * - OR: `{"_or": [{"type": "MITIGATES"}, {"type": "PREVENTS"}]}`
     * - NOT: `{"_not": {"status": "deprecated"}}`
     */
    constraint?: RelationshipTypes.Constraint | null;

    description?: string | null;

    /**
     * DEPRECATED: Use resolution_policy='lookup' instead. Shorthand for constraint
     * with create='lookup'. When True, only links to existing target nodes (controlled
     * vocabulary). Equivalent to @lookup decorator. If constraint is also provided,
     * link_only=True will override constraint.create to 'lookup'.
     */
    link_only?: boolean;

    properties?: { [key: string]: RelationshipTypes.Properties };

    /**
     * Shorthand for constraint.create. 'upsert': Create target if not found (default).
     * 'lookup': Only link to existing targets (controlled vocabulary). Equivalent to
     * @upsert/@lookup decorators. If constraint is also provided, resolution_policy
     * will set constraint.create accordingly.
     */
    resolution_policy?: 'upsert' | 'lookup';
  }

  export namespace RelationshipTypes {
    /**
     * Policy for how edges/relationships of a specific type should be handled.
     *
     * Used in two places:
     *
     * 1. **Schema level**: Inside `UserRelationshipType.constraint` - `edge_type` is
     *    implicit from parent
     * 2. **Memory level**: In `memory_policy.edge_constraints[]` - `edge_type` is
     *    required
     *
     * Edge constraints allow developers to control:
     *
     * - Which edge types can be created vs. linked to existing targets
     * - How to find/select target nodes (via `search`)
     * - What edge property values to set (exact or auto-extracted)
     * - When to apply the constraint (conditional with logical operators)
     * - Filter by source/target node types
     *
     * **The `search` field** handles target node selection:
     *
     * - Uses SearchConfig to define how to find existing target nodes
     * - Example: `{"properties": [{"name": "name", "mode": "semantic"}]}`
     * - For controlled vocabulary: find existing target, don't create new
     *
     * **The `set` field** controls edge property values:
     *
     * - Exact value: `{"weight": 1.0}` - sets exact value
     * - Auto-extract: `{"reason": {"mode": "auto"}}` - LLM extracts from content
     *
     * **The `when` field** supports logical operators (same as NodeConstraint):
     *
     * - Simple: `{"severity": "high"}`
     * - AND: `{"_and": [{"severity": "high"}, {"confirmed": true}]}`
     * - OR: `{"_or": [{"type": "MITIGATES"}, {"type": "PREVENTS"}]}`
     * - NOT: `{"_not": {"status": "deprecated"}}`
     */
    export interface Constraint {
      /**
       * 'upsert': Create target node if not found via search (default). 'lookup': Only
       * link to existing target nodes (controlled vocabulary). When 'lookup', edges to
       * non-existing targets are skipped. Deprecated aliases: 'auto' -> 'upsert',
       * 'never' -> 'lookup'.
       */
      create?: 'upsert' | 'lookup' | 'auto' | 'never';

      /**
       * Direction of edges this constraint applies to. 'outgoing': edges where current
       * node is source (default). 'incoming': edges where current node is target.
       * 'both': applies in either direction.
       */
      direction?: 'outgoing' | 'incoming' | 'both';

      /**
       * Edge/relationship type this constraint applies to (e.g., 'MITIGATES',
       * 'ASSIGNED_TO'). Optional at schema level (implicit from parent
       * UserRelationshipType), required at memory level (in
       * memory_policy.edge_constraints).
       */
      edge_type?: string | null;

      /**
       * DEPRECATED: Use create='lookup' instead. Shorthand for create='lookup'. When
       * True, only links to existing target nodes. Equivalent to @lookup decorator in
       * schema definitions.
       */
      link_only?: boolean;

      /**
       * Explicit behavior when no target match found via search. 'create': create new
       * target node (same as upsert). 'ignore': skip edge creation (same as lookup).
       * 'error': raise error if target not found. If specified, overrides 'create'
       * field.
       */
      on_miss?: 'create' | 'ignore' | 'error' | null;

      /**
       * Configuration for finding/selecting existing nodes.
       *
       * Defines which properties to match on and how, in priority order. The first
       * matching property wins.
       *
       * **String Shorthand** (simple cases - converts to exact match):
       * SearchConfig(properties=["id", "email"]) # Equivalent to:
       * SearchConfig(properties=[PropertyMatch.exact("id"),
       * PropertyMatch.exact("email")])
       *
       * **Mixed Form** (combine strings and PropertyMatch): SearchConfig(properties=[
       * "id", # String -> exact match PropertyMatch.semantic("title", 0.9) # Full
       * control ])
       *
       * **Full Form** (maximum control): SearchConfig(properties=[
       * PropertyMatch(name="id", mode="exact"), PropertyMatch(name="title",
       * mode="semantic", threshold=0.85) ])
       *
       * **To select a specific node by ID**:
       * SearchConfig(properties=[PropertyMatch.exact("id", "TASK-123")])
       */
      search?: Constraint.Search | null;

      /**
       * Set property values on edges. Supports: 1. Exact value: {'weight': 1.0} - sets
       * exact value. 2. Auto-extract: {'reason': {'mode': 'auto'}} - LLM extracts from
       * content. Edge properties are useful for relationship metadata (weight,
       * timestamp, reason, etc.).
       */
      set?: {
        [key: string]:
          | string
          | number
          | boolean
          | Array<unknown>
          | { [key: string]: unknown }
          | Constraint.PropertyValue;
      } | null;

      /**
       * Filter: only apply when source node is of this type. Example:
       * source_type='SecurityBehavior' - only applies to edges from SecurityBehavior
       * nodes.
       */
      source_type?: string | null;

      /**
       * Filter: only apply when target node is of this type. Example:
       * target_type='TacticDef' - only applies to edges targeting TacticDef nodes.
       */
      target_type?: string | null;

      /**
       * Condition for when this constraint applies. Supports logical operators: '\_and',
       * '\_or', '\_not'. Applied to edge properties or context. Example: {'\_and':
       * [{'severity': 'high'}, {'_not': {'status': 'deprecated'}}]}
       */
      when?: { [key: string]: unknown } | null;
    }

    export namespace Constraint {
      /**
       * Configuration for finding/selecting existing nodes.
       *
       * Defines which properties to match on and how, in priority order. The first
       * matching property wins.
       *
       * **String Shorthand** (simple cases - converts to exact match):
       * SearchConfig(properties=["id", "email"]) # Equivalent to:
       * SearchConfig(properties=[PropertyMatch.exact("id"),
       * PropertyMatch.exact("email")])
       *
       * **Mixed Form** (combine strings and PropertyMatch): SearchConfig(properties=[
       * "id", # String -> exact match PropertyMatch.semantic("title", 0.9) # Full
       * control ])
       *
       * **Full Form** (maximum control): SearchConfig(properties=[
       * PropertyMatch(name="id", mode="exact"), PropertyMatch(name="title",
       * mode="semantic", threshold=0.85) ])
       *
       * **To select a specific node by ID**:
       * SearchConfig(properties=[PropertyMatch.exact("id", "TASK-123")])
       */
      export interface Search {
        /**
         * Default search mode when property doesn't specify one. 'semantic' (vector
         * similarity), 'exact' (property match), 'fuzzy' (partial match).
         */
        mode?: 'semantic' | 'exact' | 'fuzzy';

        /**
         * Properties to match on, in priority order (first match wins). Accepts strings
         * (converted to exact match) or PropertyMatch objects. Use PropertyMatch with
         * 'value' field for specific node selection.
         */
        properties?: Array<Search.Property> | null;

        /**
         * Default similarity threshold for semantic/fuzzy matching (0.0-1.0). Used when
         * property doesn't specify its own threshold.
         */
        threshold?: number;

        /**
         * Search for nodes via their relationships. Example: Find tasks assigned to a
         * specific person. Each RelationshipMatch specifies edge_type, target_type, and
         * target_search. Multiple relationship matches are ANDed together.
         */
        via_relationship?: Array<unknown> | null;
      }

      export namespace Search {
        /**
         * Property matching configuration.
         *
         * Defines which property to match on and how. When listed in search.properties,
         * this property becomes a unique identifier.
         *
         * **Shorthand Helpers** (recommended for common cases):
         * PropertyMatch.exact("id") # Exact match on id PropertyMatch.exact("id",
         * "TASK-123") # Exact match with specific value PropertyMatch.semantic("title") #
         * Semantic match with default threshold PropertyMatch.semantic("title", 0.9) #
         * Semantic match with custom threshold PropertyMatch.semantic("title",
         * value="bug") # Semantic search for "bug" PropertyMatch.fuzzy("name", 0.8) #
         * Fuzzy match
         *
         * **Full Form** (when you need all options): PropertyMatch(name="title",
         * mode="semantic", threshold=0.9, value="auth bug")
         *
         * **String Shorthand** (in SearchConfig.properties): properties=["id", "email"] #
         * Equivalent to [PropertyMatch.exact("id"), PropertyMatch.exact("email")]
         */
        export interface Property {
          /**
           * Property name to match on (e.g., 'id', 'email', 'title')
           */
          name: string;

          /**
           * Matching mode: 'exact' (string match), 'semantic' (embedding similarity),
           * 'fuzzy' (Levenshtein distance)
           */
          mode?: 'semantic' | 'exact' | 'fuzzy';

          /**
           * Similarity threshold for semantic/fuzzy modes (0.0-1.0). Ignored for exact mode.
           */
          threshold?: number;

          /**
           * Runtime value override. If set, use this value for matching instead of
           * extracting from content. Useful for memory-level overrides when you know the
           * exact value to search for.
           */
          value?: unknown;
        }
      }

      /**
       * Configuration for a property value in NodeConstraint.set.
       *
       * Supports two modes:
       *
       * 1. Exact value: Just pass the value directly (e.g., "done", 123, True)
       * 2. Auto-extract: {"mode": "auto"} - LLM extracts from memory content
       *
       * For text properties, use text_mode to control how updates are applied.
       */
      export interface PropertyValue {
        /**
         * 'auto': LLM extracts value from memory content.
         */
        mode?: 'auto';

        /**
         * For text properties: 'replace' (overwrite), 'append' (add to), 'merge' (LLM
         * combines existing + new).
         */
        text_mode?: 'replace' | 'append' | 'merge';
      }
    }

    /**
     * Property definition for nodes/relationships
     */
    export interface Properties {
      type: 'string' | 'integer' | 'float' | 'boolean' | 'array' | 'datetime' | 'object';

      default?: unknown;

      description?: string | null;

      /**
       * List of allowed enum values (max 15)
       */
      enum_values?: Array<string> | null;

      max_length?: number | null;

      max_value?: number | null;

      min_length?: number | null;

      min_value?: number | null;

      pattern?: string | null;

      required?: boolean;
    }
  }
}

export interface SchemaUpdateParams {
  body: { [key: string]: unknown };
}

export interface SchemaListParams {
  /**
   * Filter by status (draft, active, deprecated, archived)
   */
  status_filter?: string | null;

  /**
   * Filter by workspace ID
   */
  workspace_id?: string | null;
}

export declare namespace Schemas {
  export {
    type UserGraphSchemaOutput as UserGraphSchemaOutput,
    type SchemaCreateResponse as SchemaCreateResponse,
    type SchemaRetrieveResponse as SchemaRetrieveResponse,
    type SchemaUpdateResponse as SchemaUpdateResponse,
    type SchemaListResponse as SchemaListResponse,
    type SchemaDeleteResponse as SchemaDeleteResponse,
    type SchemaCreateParams as SchemaCreateParams,
    type SchemaUpdateParams as SchemaUpdateParams,
    type SchemaListParams as SchemaListParams,
  };
}
