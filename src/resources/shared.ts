// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as MemoryAPI from './memory';

/**
 * Simplified Access Control List configuration.
 *
 * Aligned with Open Memory Object (OMO) standard. See:
 * https://github.com/anthropics/open-memory-object
 *
 * **Supported Entity Prefixes:**
 *
 * | Prefix           | Description           | Validation                           |
 * | ---------------- | --------------------- | ------------------------------------ |
 * | `user:`          | Internal Papr user ID | Validated against Parse users        |
 * | `external_user:` | Your app's user ID    | Not validated (your responsibility)  |
 * | `organization:`  | Organization ID       | Validated against your organizations |
 * | `namespace:`     | Namespace ID          | Validated against your namespaces    |
 * | `workspace:`     | Workspace ID          | Validated against your workspaces    |
 * | `role:`          | Parse role ID         | Validated against your roles         |
 *
 * **Examples:**
 *
 * ```python
 * acl = ACLConfig(
 *     read=["external_user:alice_123", "organization:org_acme"],
 *     write=["external_user:alice_123"]
 * )
 * ```
 *
 * **Validation Rules:**
 *
 * - Internal entities (user, organization, namespace, workspace, role) are
 *   validated
 * - External entities (external_user) are NOT validated - your app is responsible
 * - Invalid internal entities will return an error
 * - Unprefixed values default to `external_user:` for backwards compatibility
 */
export interface ACLConfig {
  /**
   * Entity IDs that can read this memory. Format: 'prefix:id' (e.g.,
   * 'external_user:alice', 'organization:org_123'). Supported prefixes: user,
   * external_user, organization, namespace, workspace, role. Unprefixed values
   * treated as external_user for backwards compatibility.
   */
  read?: Array<string>;

  /**
   * Entity IDs that can write/modify this memory. Format: 'prefix:id' (e.g.,
   * 'external_user:alice'). Supported prefixes: user, external_user, organization,
   * namespace, workspace, role.
   */
  write?: Array<string>;
}

/**
 * Response model for a single memory item in add_memory response
 */
export interface AddMemoryItem {
  createdAt: string;

  memoryId: string;

  objectId: string;

  memoryChunkIds?: Array<string>;
}

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
export interface EdgeConstraintInput {
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
  search?: SearchConfigInput | null;

  /**
   * Set property values on edges. Supports: 1. Exact value: {'weight': 1.0} - sets
   * exact value. 2. Auto-extract: {'reason': {'mode': 'auto'}} - LLM extracts from
   * content. Edge properties are useful for relationship metadata (weight,
   * timestamp, reason, etc.).
   */
  set?: {
    [key: string]: string | number | boolean | Array<unknown> | { [key: string]: unknown } | PropertyValue;
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

/**
 * A memory item in the knowledge base
 */
export interface MemoryObject {
  id: string;

  acl: { [key: string]: { [key: string]: boolean } };

  content: string;

  type: string;

  user_id: string;

  /**
   * Memory category based on role
   */
  category?: string | null;

  context?: Array<MemoryAPI.ContextItem> | null;

  conversation_id?: string;

  createdAt?: string | null;

  current_step?: string | null;

  customMetadata?: { [key: string]: unknown } | null;

  /**
   * Full precision (float32) embedding vector from Qdrant. Typically 2560 dimensions
   * for Qwen4B. Used for CoreML/ANE fp16 models.
   */
  embedding?: Array<number> | null;

  /**
   * Quantized INT8 embedding vector (values -128 to 127). 4x smaller than float32.
   * Default format for efficiency.
   */
  embedding_int8?: Array<number> | null;

  external_user_id?: string | null;

  external_user_read_access?: Array<string> | null;

  external_user_write_access?: Array<string> | null;

  file_url?: string | null;

  filename?: string | null;

  hierarchical_structures?: string;

  location?: string | null;

  metadata?: string | { [key: string]: unknown } | null;

  metrics?: { [key: string]: unknown } | null;

  /**
   * Namespace ID this memory belongs to
   */
  namespace_id?: string | null;

  namespace_read_access?: Array<string> | null;

  namespace_write_access?: Array<string> | null;

  /**
   * Organization ID that owns this memory
   */
  organization_id?: string | null;

  organization_read_access?: Array<string> | null;

  organization_write_access?: Array<string> | null;

  page?: string | null;

  page_number?: number | null;

  /**
   * Popularity signal (0-1): 0.5*cacheConfidenceWeighted30d +
   * 0.5*citationConfidenceWeighted30d. Uses stored EMA fields.
   */
  popularity_score?: number | null;

  /**
   * Recency signal (0-1): exp(-0.05 \* days_since_last_access). Half-life ~14 days.
   */
  recency_score?: number | null;

  /**
   * Final relevance (0-1). rank_results=False: 0.6*sim + 0.25*pop + 0.15\*recency.
   * rank_results=True: RRF-based fusion.
   */
  relevance_score?: number | null;

  /**
   * Reranker confidence (0-1). Meaningful for LLM reranking; equals reranker_score
   * for cross-encoders.
   */
  reranker_confidence?: number | null;

  /**
   * Reranker relevance (0-1). From cross-encoder (Cohere/Qwen3/BGE) or LLM
   * (GPT-5-nano).
   */
  reranker_score?: number | null;

  /**
   * Reranker type: 'cross_encoder' (Cohere/Qwen3/BGE) or 'llm'
   * (GPT-5-nano/GPT-4o-mini).
   */
  reranker_type?: string | null;

  /**
   * Role that generated this memory (user or assistant)
   */
  role?: string | null;

  role_read_access?: Array<string> | null;

  role_write_access?: Array<string> | null;

  /**
   * Cosine similarity from vector search (0-1). Measures semantic relevance to
   * query.
   */
  similarity_score?: number | null;

  source_document_id?: string | null;

  source_message_id?: string | null;

  source_type?: string;

  source_url?: string;

  steps?: Array<string>;

  tags?: Array<string>;

  title?: string | null;

  topics?: Array<string>;

  total_pages?: number | null;

  totalProcessingCost?: number | null;

  updatedAt?: string | null;

  user_read_access?: Array<string> | null;

  user_write_access?: Array<string> | null;

  workspace_id?: string | null;

  workspace_read_access?: Array<string> | null;

  workspace_write_access?: Array<string> | null;

  [k: string]: unknown;
}

/**
 * Unified memory processing policy.
 *
 * This is the SINGLE source of truth for how a memory should be processed,
 * combining graph generation control AND OMO (Open Memory Object) safety
 * standards.
 *
 * **Graph Generation Modes:**
 *
 * - auto: LLM extracts entities freely (default)
 * - manual: Developer provides exact nodes (no LLM extraction)
 *
 * **OMO Safety Standards:**
 *
 * - consent: How data owner allowed storage (explicit, implicit, terms, none)
 * - risk: Safety assessment (none, sensitive, flagged)
 * - acl: Access control list for read/write permissions
 *
 * **Schema Integration:**
 *
 * - schema_id: Reference a schema that may have its own default memory_policy
 * - Schema-level policies are merged with request-level (request takes precedence)
 */
export interface MemoryPolicy {
  /**
   * Simplified Access Control List configuration.
   *
   * Aligned with Open Memory Object (OMO) standard. See:
   * https://github.com/anthropics/open-memory-object
   *
   * **Supported Entity Prefixes:**
   *
   * | Prefix           | Description           | Validation                           |
   * | ---------------- | --------------------- | ------------------------------------ |
   * | `user:`          | Internal Papr user ID | Validated against Parse users        |
   * | `external_user:` | Your app's user ID    | Not validated (your responsibility)  |
   * | `organization:`  | Organization ID       | Validated against your organizations |
   * | `namespace:`     | Namespace ID          | Validated against your namespaces    |
   * | `workspace:`     | Workspace ID          | Validated against your workspaces    |
   * | `role:`          | Parse role ID         | Validated against your roles         |
   *
   * **Examples:**
   *
   * ```python
   * acl = ACLConfig(
   *     read=["external_user:alice_123", "organization:org_acme"],
   *     write=["external_user:alice_123"]
   * )
   * ```
   *
   * **Validation Rules:**
   *
   * - Internal entities (user, organization, namespace, workspace, role) are
   *   validated
   * - External entities (external_user) are NOT validated - your app is responsible
   * - Invalid internal entities will return an error
   * - Unprefixed values default to `external_user:` for backwards compatibility
   */
  acl?: ACLConfig | null;

  /**
   * How the data owner allowed this memory to be stored/used. 'explicit': User
   * explicitly agreed. 'implicit': Inferred from context (default). 'terms': Covered
   * by Terms of Service. 'none': No consent - graph extraction will be SKIPPED.
   */
  consent?: 'explicit' | 'implicit' | 'terms' | 'none';

  /**
   * Rules for how LLM-extracted edges/relationships should be created/handled. Used
   * in 'auto' mode when present. Controls: - create: 'auto' (create target if not
   * found) or 'never' (controlled vocabulary) - search: How to find existing target
   * nodes - set: Edge property values (exact or auto-extracted) -
   * source_type/target_type: Filter by connected node types Example: {edge_type:
   * 'MITIGATES', create: 'never', search: {properties: ['name']}}
   */
  edge_constraints?: Array<EdgeConstraintInput> | null;

  /**
   * How to generate graph from this memory. 'auto': LLM extracts entities freely.
   * 'manual': You provide exact nodes (no LLM). Note: 'structured' is accepted as
   * deprecated alias for 'manual'.
   */
  mode?: 'auto' | 'manual';

  /**
   * Rules for how LLM-extracted nodes should be created/updated. Used in 'auto' mode
   * when present. Controls creation policy, property forcing, and merge behavior.
   */
  node_constraints?: Array<NodeConstraintInput> | null;

  /**
   * For manual mode: Exact nodes to create (no LLM extraction). Required when
   * mode='manual'. Each node needs id, type, and properties.
   */
  nodes?: Array<NodeSpec> | null;

  /**
   * Relationships between nodes. Supports special placeholders:
   * '$this' = the Memory node being created, '$previous' = the user's most recent
   * memory. Examples: {source: '$this', target: '$previous', type: 'FOLLOWS'} links
   * to previous memory. {source: '$this', target: 'mem_abc', type: 'REFERENCES'}
   * links to specific memory.
   */
  relationships?: Array<RelationshipSpec> | null;

  /**
   * Safety assessment for this memory. 'none': Safe content (default). 'sensitive':
   * Contains PII or sensitive info. 'flagged': Requires review - ACL will be
   * restricted to owner only.
   */
  risk?: 'none' | 'sensitive' | 'flagged';

  /**
   * Reference a UserGraphSchema by ID. The schema's memory_policy (if defined) will
   * be used as defaults, with this request's settings taking precedence.
   */
  schema_id?: string | null;
}

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
export interface NodeConstraintInput {
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
  search?: SearchConfigInput | null;

  /**
   * Set property values on nodes. Supports: 1. Exact value: {'status': 'done'} -
   * sets exact value. 2. Auto-extract: {'status': {'mode': 'auto'}} - LLM extracts
   * from content. 3. Text mode: {'summary': {'mode': 'auto', 'text_mode':
   * 'merge'}} - controls text updates. For text properties, text_mode can be
   * 'replace', 'append', or 'merge'.
   */
  set?: {
    [key: string]: string | number | boolean | Array<unknown> | { [key: string]: unknown } | PropertyValue;
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

/**
 * Specification for a node in manual mode.
 *
 * Used when mode='manual' to define exact nodes to create.
 */
export interface NodeSpec {
  /**
   * Unique identifier for this node
   */
  id: string;

  /**
   * Node type/label (e.g., 'Transaction', 'Product', 'Person')
   */
  type: string;

  /**
   * Properties for this node
   */
  properties?: { [key: string]: unknown };
}

/**
 * Configuration for a property value in NodeConstraint.set.
 *
 * Supports two modes:
 *
 * 1. Exact value: Just pass the value directly (e.g., "done", 123, True)
 * 2. Auto-extract: {"mode": "auto"} - LLM extracts from memory content
 *
 * For text properties, use text_mode to control how updates are applied. Use
 * prompt to provide per-field extraction guidance to the LLM.
 */
export interface PropertyValue {
  /**
   * 'auto': LLM extracts value from memory content.
   */
  mode?: 'auto';

  /**
   * Custom extraction prompt for this field. Guides the LLM on what to extract and
   * how to format it. Example: 'Summarize in 1-2 sentences with attack vector and
   * affected systems.'
   */
  prompt?: string | null;

  /**
   * For text properties: 'replace' (overwrite), 'append' (add to), 'merge' (LLM
   * combines existing + new).
   */
  text_mode?: 'replace' | 'append' | 'merge';
}

/**
 * Specification for a relationship in manual mode.
 *
 * Used when mode='manual' to define exact relationships between nodes.
 */
export interface RelationshipSpec {
  /**
   * ID of the source node
   */
  source: string;

  /**
   * ID of the target node
   */
  target: string;

  /**
   * Relationship type (e.g., 'PURCHASED', 'WORKS_AT', 'ASSIGNED_TO')
   */
  type: string;

  /**
   * Optional properties for this relationship
   */
  properties?: { [key: string]: unknown } | null;
}

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
export interface SearchConfigInput {
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
  properties?: Array<SearchConfigInput.Property> | null;

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

export namespace SearchConfigInput {
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
