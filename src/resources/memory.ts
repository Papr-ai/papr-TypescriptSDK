// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MemoryAPI from './memory';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Memory extends APIResource {
  /**
   * Update an existing memory item by ID.
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
   *
   *     The API validates content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).
   *
   * @example
   * ```ts
   * const memory = await client.memory.update('memory_id');
   * ```
   */
  update(
    memoryID: string,
    params: MemoryUpdateParams,
    options?: RequestOptions,
  ): APIPromise<MemoryUpdateResponse> {
    const { enable_holographic, frequency_schema_id, ...body } = params;
    return this._client.put(path`/v1/memory/${memoryID}`, {
      query: { enable_holographic, frequency_schema_id },
      body,
      ...options,
    });
  }

  /**
   * Delete a memory item by ID.
   *
   *     **Authentication Required**:
   *     One of the following authentication methods must be used:
   *     - Bearer token in `Authorization` header
   *     - API Key in `X-API-Key` header
   *     - Session token in `X-Session-Token` header
   *
   *     **Required Headers**:
   *     - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
   *
   * @example
   * ```ts
   * const memory = await client.memory.delete('memory_id');
   * ```
   */
  delete(
    memoryID: string,
    params: MemoryDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MemoryDeleteResponse> {
    const { skip_parse } = params ?? {};
    return this._client.delete(path`/v1/memory/${memoryID}`, { query: { skip_parse }, ...options });
  }

  /**
   * Add a new memory item to the system with size validation and background
   * processing.
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
   *
   *     **Role-Based Memory Categories**:
   *     - **User memories**: preference, task, goal, facts, context
   *     - **Assistant memories**: skills, learning
   *
   *     **New Metadata Fields**:
   *     - `metadata.role`: Optional field to specify who generated the memory (user or assistant)
   *     - `metadata.category`: Optional field for memory categorization based on role
   *     - Both fields are stored within metadata at the same level as topics, location, etc.
   *
   *     The API validates content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).
   *
   * @example
   * ```ts
   * const addMemoryResponse = await client.memory.add({
   *   content:
   *     'Meeting with John Smith from Acme Corp about the Q4 project timeline',
   * });
   * ```
   */
  add(params: MemoryAddParams, options?: RequestOptions): APIPromise<AddMemoryResponse> {
    const {
      enable_holographic,
      format,
      frequency_schema_id,
      skip_background_processing,
      webhook_secret,
      webhook_url,
      ...body
    } = params;
    return this._client.post('/v1/memory', {
      query: {
        enable_holographic,
        format,
        frequency_schema_id,
        skip_background_processing,
        webhook_secret,
        webhook_url,
      },
      body,
      ...options,
    });
  }

  /**
   * Add multiple memory items in a batch with size validation and background
   * processing.
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
   *
   *     The API validates individual memory content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).
   *
   * @example
   * ```ts
   * const batchMemoryResponse = await client.memory.addBatch({
   *   memories: [
   *     {
   *       content:
   *         'Meeting notes from the product planning session',
   *     },
   *     {
   *       content: 'Follow-up tasks from the planning meeting',
   *     },
   *   ],
   * });
   * ```
   */
  addBatch(params: MemoryAddBatchParams, options?: RequestOptions): APIPromise<BatchMemoryResponse> {
    const { enable_holographic, frequency_schema_id, skip_background_processing, ...body } = params;
    return this._client.post('/v1/memory/batch', {
      query: { enable_holographic, frequency_schema_id, skip_background_processing },
      body,
      ...options,
    });
  }

  /**
   * Delete all memory items for a user.
   *
   *     **Authentication Required**:
   *     One of the following authentication methods must be used:
   *     - Bearer token in `Authorization` header
   *     - API Key in `X-API-Key` header
   *     - Session token in `X-Session-Token` header
   *
   *     **User Resolution**:
   *     - If only API key is provided: deletes memories for the developer
   *     - If user_id or external_user_id is provided: resolves and deletes memories for that user
   *     - Uses the same user resolution logic as other endpoints
   *
   *     **Required Headers**:
   *     - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
   *
   *     **WARNING**: This operation cannot be undone. All memories for the resolved user will be permanently deleted.
   *
   * @example
   * ```ts
   * const batchMemoryResponse = await client.memory.deleteAll();
   * ```
   */
  deleteAll(
    params: MemoryDeleteAllParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BatchMemoryResponse> {
    const { external_user_id, skip_parse, user_id } = params ?? {};
    return this._client.delete('/v1/memory/all', {
      query: { external_user_id, skip_parse, user_id },
      ...options,
    });
  }

  /**
   * Retrieve a memory item by ID.
   *
   *     **Authentication Required**:
   *     One of the following authentication methods must be used:
   *     - Bearer token in `Authorization` header
   *     - API Key in `X-API-Key` header
   *     - Session token in `X-Session-Token` header
   *
   *     **Required Headers**:
   *     - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
   *
   * @example
   * ```ts
   * const searchResponse = await client.memory.get('memory_id');
   * ```
   */
  get(
    memoryID: string,
    query: MemoryGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SearchResponse> {
    return this._client.get(path`/v1/memory/${memoryID}`, { query, ...options });
  }

  /**
   * Search through memories with authentication required.
   *
   *     **Authentication Required**:
   *     One of the following authentication methods must be used:
   *     - Bearer token in `Authorization` header
   *     - API Key in `X-API-Key` header
   *     - Session token in `X-Session-Token` header
   *
   *     **Response Format Options**:
   *     Choose between standard JSON or TOON (Token-Oriented Object Notation) format:
   *     - **JSON (default)**: Standard JSON response format
   *     - **TOON**: Optimized format achieving 30-60% token reduction for LLM contexts
   *       - Use `response_format=toon` query parameter
   *       - Returns `text/plain` with TOON-formatted content
   *       - Ideal for LLM integrations to reduce API costs and latency
   *       - Maintains semantic clarity while minimizing token usage
   *       - Example: `/v1/memory/search?response_format=toon`
   *
   *     **Custom Schema Support**:
   *     This endpoint supports both system-defined and custom user-defined node types:
   *     - **System nodes**: Memory, Person, Company, Project, Task, Insight, Meeting, Opportunity, Code
   *     - **Custom nodes**: Defined by developers via UserGraphSchema (e.g., Developer, Product, Customer, Function)
   *
   *     When custom schema nodes are returned:
   *     - Each custom node includes a `schema_id` field referencing the UserGraphSchema
   *     - The response includes a `schemas_used` array listing all schema IDs used
   *     - Use `GET /v1/schemas/{schema_id}` to retrieve full schema definitions including:
   *       - Node type definitions and properties
   *       - Relationship type definitions and constraints
   *       - Validation rules and requirements
   *
   *     **Recommended Headers**:
   *     ```
   *     Accept-Encoding: gzip
   *     ```
   *
   *     The API supports response compression for improved performance. Responses larger than 1KB will be automatically compressed when this header is present.
   *
   *     **HIGHLY RECOMMENDED SETTINGS FOR BEST RESULTS:**
   *     - Set `enable_agentic_graph: true` for intelligent, context-aware search that can understand ambiguous references
   *     - Use `max_memories: 15-20` for comprehensive memory coverage
   *     - Use `max_nodes: 10-15` for comprehensive graph entity relationships
   *     - Use `response_format: toon` when integrating with LLMs to reduce token costs by 30-60%
   *
   *     **Agentic Graph Benefits:**
   *     When enabled, the system can understand vague references by first identifying specific entities from your memory graph, then performing targeted searches. For example:
   *     - "customer feedback" → identifies your customers first, then finds their specific feedback
   *     - "project issues" → identifies your projects first, then finds related issues
   *     - "team meeting notes" → identifies your team members first, then finds meeting notes
   *     - "code functions" → identifies your functions first, then finds related code
   *
   *     **Role-Based Memory Filtering:**
   *     Filter memories by role and category using metadata fields:
   *     - `metadata.role`: Filter by "user" or "assistant"
   *     - `metadata.category`: Filter by category (user: preference, task, goal, facts, context | assistant: skills, learning)
   *
   *     **User Resolution Precedence:**
   *     - If both user_id and external_user_id are provided, user_id takes precedence.
   *     - If only external_user_id is provided, it will be resolved to the internal user.
   *     - If neither is provided, the authenticated user is used.
   *
   * @example
   * ```ts
   * const searchResponse = await client.memory.search({
   *   query:
   *     "Find recurring customer complaints about API performance from the last month. Focus on issues that multiple customers have mentioned and any specific feature requests or workflow improvements they've suggested.",
   * });
   * ```
   */
  search(params: MemorySearchParams, options?: RequestOptions): APIPromise<SearchResponse> {
    const { max_memories, max_nodes, response_format, 'Accept-Encoding': acceptEncoding, ...body } = params;
    return this._client.post('/v1/memory/search', {
      query: { max_memories, max_nodes, response_format },
      body,
      ...options,
      headers: buildHeaders([
        { ...(acceptEncoding != null ? { 'Accept-Encoding': acceptEncoding } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Request model for adding a new memory
 */
export interface AddMemory {
  /**
   * The content of the memory item you want to add to memory
   */
  content: string;

  /**
   * Conversation history context for this memory. Use for providing message history
   * when adding a memory. Format: [{role: 'user'|'assistant', content: '...'}]
   */
  context?: Array<ContextItem> | null;

  /**
   * Your application's user identifier. This is the primary way to identify users.
   * Use this for your app's user IDs (e.g., 'user_alice_123', UUID, email). Papr
   * will automatically resolve or create internal users as needed.
   */
  external_user_id?: string | null;

  /**
   * @deprecated Graph generation configuration
   */
  graph_generation?: GraphGeneration | null;

  /**
   * Shorthand DSL for node/edge constraints. Expands to
   * memory_policy.node_constraints and edge_constraints. Formats: - String:
   * 'Task:title' (semantic match on Task.title) - List: ['Task:title',
   * 'Person:email'] (multiple constraints) - Dict: {'Task:title': {'set': {...}}}
   * (with options) Syntax: - Node: 'Type:property', 'Type:prop=value' (exact),
   * 'Type:prop~value' (semantic) - Edge: 'Source->EDGE->Target:property' (arrow
   * syntax) - Via: 'Type.via(EDGE->Target:prop)' (relationship traversal) - Special:
   * '$this', '$previous', '$context:N' Example:
   * 'SecurityBehavior->MITIGATES->TacticDef:name' with {'create': 'never'}
   */
  link_to?: string | Array<string> | { [key: string]: unknown } | null;

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
  memory_policy?: Shared.MemoryPolicy | null;

  /**
   * Metadata for memory request
   */
  metadata?: MemoryMetadata | null;

  /**
   * Optional namespace ID for multi-tenant memory scoping. When provided, memory is
   * associated with this namespace.
   */
  namespace_id?: string | null;

  /**
   * @deprecated DEPRECATED - Internal only. Auto-populated from API key scope. Do
   * not set manually. The organization is resolved automatically from the API key's
   * associated organization.
   */
  organization_id?: string | null;

  /**
   * @deprecated DEPRECATED: Use 'memory_policy' instead. Migration options: 1.
   * Specific memory: relationships=[{source: '$this', target: 'mem_123', type:
   * 'FOLLOWS'}] 2. Previous memory: link_to_previous_memory=True 3. Related
   * memories: link_to_related_memories=3
   */
  relationships_json?: Array<RelationshipItem> | null;

  /**
   * Memory item type; defaults to 'text' if omitted
   */
  type?: MemoryType;

  /**
   * @deprecated DEPRECATED: Use 'external_user_id' instead. Internal Papr Parse user
   * ID. Most developers should not use this field directly.
   */
  user_id?: string | null;
}

/**
 * Unified response model for add_memory API endpoint (success or error).
 */
export interface AddMemoryResponse {
  /**
   * HTTP status code
   */
  code?: number;

  /**
   * List of memory items if successful
   */
  data?: Array<Shared.AddMemoryItem> | null;

  /**
   * Additional error details or context
   */
  details?: unknown;

  /**
   * Error message if failed
   */
  error?: string | null;

  /**
   * 'success' or 'error'
   */
  status?: string;
}

/**
 * AI-powered graph generation with optional guidance
 */
export interface AutoGraphGeneration {
  /**
   * Override specific property values in AI-generated nodes with match conditions
   */
  property_overrides?: Array<AutoGraphGeneration.PropertyOverride> | null;

  /**
   * Force AI to use this specific schema instead of auto-selecting
   */
  schema_id?: string | null;
}

export namespace AutoGraphGeneration {
  /**
   * Property override rule with optional match conditions
   */
  export interface PropertyOverride {
    /**
     * Node type to apply overrides to (e.g., 'User', 'SecurityBehavior')
     */
    nodeLabel: string;

    /**
     * Properties to set/override on matching nodes
     */
    set: { [key: string]: unknown };

    /**
     * Optional conditions that must be met for override to apply. If not provided,
     * applies to all nodes of this type
     */
    match?: { [key: string]: unknown } | null;
  }
}

export interface BatchMemoryError {
  error: string;

  index: number;

  code?: number | null;

  details?: unknown;

  status?: string | null;
}

export interface BatchMemoryResponse {
  /**
   * Batch tracking ID for status polling via GET /v1/memory/batch/status/{batch_id}
   * and WebSocket updates
   */
  batch_id?: string | null;

  /**
   * HTTP status code for the batch operation
   */
  code?: number;

  /**
   * Additional error details or context
   */
  details?: unknown;

  /**
   * Batch-level error message, if any
   */
  error?: string | null;

  /**
   * List of errors for failed items
   */
  errors?: Array<BatchMemoryError>;

  /**
   * Human-readable status message
   */
  message?: string | null;

  /**
   * 'success', 'partial', or 'error'
   */
  status?: string;

  /**
   * List of successful add responses
   */
  successful?: Array<AddMemoryResponse>;

  total_content_size?: number;

  total_failed?: number;

  total_processed?: number;

  total_storage_size?: number;

  total_successful?: number;
}

/**
 * Context item for memory request
 */
export interface ContextItem {
  content: string;

  role: 'user' | 'assistant';
}

/**
 * Graph generation configuration
 */
export interface GraphGeneration {
  /**
   * AI-powered graph generation with optional guidance
   */
  auto?: AutoGraphGeneration | null;

  /**
   * Complete manual control over graph structure
   */
  manual?: ManualGraphGeneration | null;

  /**
   * Graph generation mode: 'auto' (AI-powered) or 'manual' (exact specification)
   */
  mode?: 'auto' | 'manual';
}

export interface HTTPValidationError {
  detail?: Array<HTTPValidationError.Detail>;
}

export namespace HTTPValidationError {
  export interface Detail {
    loc: Array<string | number>;

    msg: string;

    type: string;

    ctx?: unknown;

    input?: unknown;
  }
}

/**
 * Complete manual control over graph structure
 */
export interface ManualGraphGeneration {
  /**
   * Exact nodes to create
   */
  nodes: Array<ManualGraphGeneration.Node>;

  /**
   * Exact relationships to create
   */
  relationships?: Array<ManualGraphGeneration.Relationship>;
}

export namespace ManualGraphGeneration {
  /**
   * Developer-specified node for graph override.
   *
   * IMPORTANT:
   *
   * - 'id' is REQUIRED (relationships reference nodes by these IDs)
   * - 'label' must match a node type from your registered UserGraphSchema
   * - 'properties' must include ALL required fields from your schema definition
   *
   * 📋 Schema Management:
   *
   * - Register schemas: POST /v1/schemas
   * - View your schemas: GET /v1/schemas
   */
  export interface Node {
    /**
     * **REQUIRED**: Unique identifier for this node. Must be unique within this
     * request. Relationships reference this via source_node_id/target_node_id.
     * Example: 'person_john_123', 'finding_cve_2024_1234'
     */
    id: string;

    /**
     * **REQUIRED**: Node type from your UserGraphSchema. View available types at GET
     * /v1/schemas. System types: Memory, Person, Company, Project, Task, Insight,
     * Meeting, Opportunity, Code
     */
    label: string;

    /**
     * **REQUIRED**: Node properties matching your UserGraphSchema definition. Must
     * include: (1) All required properties from your schema, (2) unique_identifiers if
     * defined (e.g., 'email' for Person) to enable MERGE deduplication. View schema
     * requirements at GET /v1/schemas
     */
    properties: { [key: string]: unknown };
  }

  /**
   * Developer-specified relationship for graph override.
   *
   * IMPORTANT:
   *
   * - source_node_id MUST exactly match a node 'id' from the 'nodes' array
   * - target_node_id MUST exactly match a node 'id' from the 'nodes' array
   * - relationship_type MUST exist in your registered UserGraphSchema
   */
  export interface Relationship {
    /**
     * **REQUIRED**: Relationship type from your UserGraphSchema. View available types
     * at GET /v1/schemas. System types: WORKS_FOR, WORKS_ON, HAS_PARTICIPANT,
     * DISCUSSES, MENTIONS, RELATES_TO, CREATED_BY
     */
    relationship_type: string;

    /**
     * **REQUIRED**: Must exactly match the 'id' field of a node defined in the 'nodes'
     * array of this request
     */
    source_node_id: string;

    /**
     * **REQUIRED**: Must exactly match the 'id' field of a node defined in the 'nodes'
     * array of this request
     */
    target_node_id: string;

    /**
     * Optional relationship properties (e.g., {'since': '2024-01-01', 'role':
     * 'manager'})
     */
    properties?: { [key: string]: unknown } | null;
  }
}

/**
 * Metadata for memory request
 */
export interface MemoryMetadata {
  /**
   * @deprecated DEPRECATED: Use 'memory_policy.acl' at request level instead.
   * Format: {'read': [...], 'write': [...]}.
   */
  acl?: { [key: string]: Array<string> } | null;

  assistantMessage?: string | null;

  /**
   * Memory category based on role. For users: preference, task, goal, fact, context.
   * For assistants: skills, learning, task, goal, fact, context.
   */
  category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning' | null;

  /**
   * @deprecated DEPRECATED: Use 'memory_policy.consent' at request level instead.
   * Values: 'explicit', 'implicit' (default), 'terms', 'none'.
   */
  consent?: string | null;

  conversationId?: string | null;

  /**
   * ISO datetime when the memory was created
   */
  createdAt?: string | null;

  /**
   * Optional object for arbitrary custom metadata fields. Only string, number,
   * boolean, or list of strings allowed. Nested dicts are not allowed.
   */
  customMetadata?: { [key: string]: string | number | boolean | Array<string> } | null;

  'emoji tags'?: Array<string> | null;

  'emotion tags'?: Array<string> | null;

  /**
   * @deprecated DEPRECATED: Use 'external_user_id' at request level instead. This
   * field will be removed in v2.
   */
  external_user_id?: string | null;

  /**
   * INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl
   * instead.
   */
  external_user_read_access?: Array<string> | null;

  /**
   * INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl
   * instead.
   */
  external_user_write_access?: Array<string> | null;

  goalClassificationScores?: Array<number> | null;

  /**
   * Hierarchical structures to enable navigation from broad topics to specific ones
   */
  hierarchical_structures?: string | Array<unknown> | null;

  location?: string | null;

  /**
   * @deprecated DEPRECATED: Use 'namespace_id' at request level instead. This field
   * will be removed in v2.
   */
  namespace_id?: string | null;

  /**
   * INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl
   * instead.
   */
  namespace_read_access?: Array<string> | null;

  /**
   * INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl
   * instead.
   */
  namespace_write_access?: Array<string> | null;

  /**
   * @deprecated DEPRECATED: Use 'organization_id' at request level instead. This
   * field will be removed in v2.
   */
  organization_id?: string | null;

  /**
   * INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl
   * instead.
   */
  organization_read_access?: Array<string> | null;

  /**
   * INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl
   * instead.
   */
  organization_write_access?: Array<string> | null;

  pageId?: string | null;

  post?: string | null;

  relatedGoals?: Array<string> | null;

  relatedSteps?: Array<string> | null;

  relatedUseCases?: Array<string> | null;

  /**
   * @deprecated DEPRECATED: Use 'memory_policy.risk' at request level instead.
   * Values: 'none' (default), 'sensitive', 'flagged'.
   */
  risk?: string | null;

  /**
   * Role of the message sender
   */
  role?: 'user' | 'assistant' | null;

  /**
   * INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl
   * instead.
   */
  role_read_access?: Array<string> | null;

  /**
   * INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl
   * instead.
   */
  role_write_access?: Array<string> | null;

  sessionId?: string | null;

  sourceType?: string | null;

  sourceUrl?: string | null;

  stepClassificationScores?: Array<number> | null;

  topics?: Array<string> | null;

  /**
   * Upload ID for document processing workflows
   */
  upload_id?: string | null;

  useCaseClassificationScores?: Array<number> | null;

  /**
   * @deprecated DEPRECATED: Use 'external_user_id' at request level instead. This
   * field will be removed in v2.
   */
  user_id?: string | null;

  /**
   * INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl
   * instead.
   */
  user_read_access?: Array<string> | null;

  /**
   * INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl
   * instead.
   */
  user_write_access?: Array<string> | null;

  userMessage?: string | null;

  workspace_id?: string | null;

  /**
   * INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl
   * instead.
   */
  workspace_read_access?: Array<string> | null;

  /**
   * INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl
   * instead.
   */
  workspace_write_access?: Array<string> | null;

  [k: string]: unknown;
}

/**
 * Valid memory types
 */
export type MemoryType = 'text' | 'code_snippet' | 'document';

/**
 * Relationship item for memory request
 */
export interface RelationshipItem {
  relation_type: string;

  metadata?: { [key: string]: unknown };

  related_item_id?: string | null;

  /**
   * Legacy field - not used in processing
   */
  related_item_type?: string | null;

  /**
   * Enum for relationship types
   */
  relationship_type?: 'previous_memory_item_id' | 'all_previous_memory_items' | 'link_to_id' | null;
}

export interface SearchResponse {
  /**
   * HTTP status code
   */
  code?: number;

  /**
   * Return type for SearchResult
   */
  data?: SearchResult | null;

  /**
   * Additional error details or context
   */
  details?: unknown;

  /**
   * Error message if failed
   */
  error?: string | null;

  /**
   * Unique identifier for this search query, maps to QueryLog objectId in Parse
   * Server
   */
  search_id?: string | null;

  /**
   * 'success' or 'error'
   */
  status?: string;
}

/**
 * Return type for SearchResult
 */
export interface SearchResult {
  memories: Array<Shared.MemoryObject>;

  nodes: Array<SearchResult.Node>;

  /**
   * List of UserGraphSchema IDs used in this response. Use GET /v1/schemas/{id} to
   * get full schema definitions.
   */
  schemas_used?: Array<string> | null;
}

export namespace SearchResult {
  /**
   * Public-facing node structure - supports both system and custom schema nodes
   */
  export interface Node {
    /**
     * Node type label - can be system type (Memory, Person, etc.) or custom type from
     * UserGraphSchema
     */
    label: string;

    /**
     * Node properties - structure depends on node type and schema
     */
    properties: { [key: string]: unknown };

    /**
     * Reference to UserGraphSchema ID for custom nodes. Use GET
     * /v1/schemas/{schema_id} to get full schema definition. Null for system nodes.
     */
    schema_id?: string | null;
  }
}

/**
 * Unified response model for update_memory API endpoint (success or error).
 */
export interface MemoryUpdateResponse {
  /**
   * HTTP status code
   */
  code?: number;

  /**
   * Additional error details or context
   */
  details?: unknown;

  /**
   * Error message if failed
   */
  error?: string | null;

  /**
   * List of updated memory items if successful
   */
  memory_items?: Array<MemoryUpdateResponse.MemoryItem> | null;

  /**
   * Status message
   */
  message?: string | null;

  /**
   * 'success' or 'error'
   */
  status?: string;

  /**
   * Status of update operation for each system
   */
  status_obj?: MemoryUpdateResponse.StatusObj | null;
}

export namespace MemoryUpdateResponse {
  /**
   * Model for a single updated memory item
   */
  export interface MemoryItem {
    memoryId: string;

    objectId: string;

    updatedAt: string;

    content?: string | null;

    memoryChunkIds?: Array<string> | null;

    /**
     * Metadata for memory request
     */
    metadata?: MemoryAPI.MemoryMetadata | null;
  }

  /**
   * Status of update operation for each system
   */
  export interface StatusObj {
    neo4j?: boolean;

    parse?: boolean;

    pinecone?: boolean;
  }
}

export interface MemoryDeleteResponse {
  /**
   * HTTP status code
   */
  code?: number;

  deletion_status?: MemoryDeleteResponse.DeletionStatus | null;

  details?: unknown;

  error?: string | null;

  memoryId?: string;

  message?: string | null;

  objectId?: string;

  /**
   * 'success' or 'error'
   */
  status?: string;
}

export namespace MemoryDeleteResponse {
  export interface DeletionStatus {
    holographic?: boolean;

    neo4j?: boolean;

    parse?: boolean;

    pinecone?: boolean;

    qdrant?: boolean;
  }
}

export interface MemoryUpdateParams {
  /**
   * Query param: If True, re-processes holographic neural transforms after content
   * update
   */
  enable_holographic?: boolean;

  /**
   * Query param: Frequency schema for holographic embedding (e.g. 'cosqa',
   * 'scifact').
   */
  frequency_schema_id?: string | null;

  /**
   * Body param: The new content of the memory item
   */
  content?: string | null;

  /**
   * Body param: Updated context for the memory item
   */
  context?: Array<ContextItem> | null;

  /**
   * Body param: Graph generation configuration
   */
  graph_generation?: GraphGeneration | null;

  /**
   * Body param: Shorthand DSL for node/edge constraints. Expands to
   * memory_policy.node_constraints and edge_constraints. Formats: - String:
   * 'Task:title' (semantic match on Task.title) - List: ['Task:title',
   * 'Person:email'] (multiple constraints) - Dict: {'Task:title': {'set': {...}}}
   * (with options) Syntax: - Node: 'Type:property', 'Type:prop=value' (exact),
   * 'Type:prop~value' (semantic) - Edge: 'Source->EDGE->Target:property' (arrow
   * syntax) - Via: 'Type.via(EDGE->Target:prop)' (relationship traversal) - Special:
   * '$this', '$previous', '$context:N' Example:
   * 'SecurityBehavior->MITIGATES->TacticDef:name' with {'create': 'never'}
   */
  link_to?: string | Array<string> | { [key: string]: unknown } | null;

  /**
   * Body param: Unified memory processing policy.
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
  memory_policy?: Shared.MemoryPolicy | null;

  /**
   * Body param: Metadata for memory request
   */
  metadata?: MemoryMetadata | null;

  /**
   * Body param: Optional namespace ID for multi-tenant memory scoping. When
   * provided, update is scoped to memories within this namespace.
   */
  namespace_id?: string | null;

  /**
   * Body param: Optional organization ID for multi-tenant memory scoping. When
   * provided, update is scoped to memories within this organization.
   */
  organization_id?: string | null;

  /**
   * Body param: Updated relationships for Graph DB (neo4J)
   */
  relationships_json?: Array<RelationshipItem> | null;

  /**
   * Body param: Valid memory types
   */
  type?: MemoryType | null;
}

export interface MemoryDeleteParams {
  /**
   * Skip Parse Server deletion
   */
  skip_parse?: boolean;
}

export interface MemoryAddParams {
  /**
   * Body param: The content of the memory item you want to add to memory
   */
  content: string;

  /**
   * Query param: If True, applies holographic neural transforms and stores in
   * holographic collection
   */
  enable_holographic?: boolean;

  /**
   * Query param: Response format. Use 'omo' for Open Memory Object standard format
   * (portable across platforms).
   */
  format?: string | null;

  /**
   * Query param: Frequency schema for holographic embedding (e.g. 'cosqa',
   * 'scifact'). Required when enable_holographic=True. Call GET /v1/frequencies to
   * see available schemas.
   */
  frequency_schema_id?: string | null;

  /**
   * Query param: If True, skips adding background tasks for processing
   */
  skip_background_processing?: boolean;

  /**
   * Query param: Secret for webhook HMAC authentication. Sent as X-Webhook-Secret
   * header and used to generate X-Webhook-Signature.
   */
  webhook_secret?: string | null;

  /**
   * Query param: Webhook URL to notify when background processing completes.
   * Receives POST with {event, memory_id, status, completed_at}.
   */
  webhook_url?: string | null;

  /**
   * Body param: Conversation history context for this memory. Use for providing
   * message history when adding a memory. Format: [{role: 'user'|'assistant',
   * content: '...'}]
   */
  context?: Array<ContextItem> | null;

  /**
   * Body param: Your application's user identifier. This is the primary way to
   * identify users. Use this for your app's user IDs (e.g., 'user_alice_123', UUID,
   * email). Papr will automatically resolve or create internal users as needed.
   */
  external_user_id?: string | null;

  /**
   * Body param: Graph generation configuration
   */
  graph_generation?: GraphGeneration | null;

  /**
   * Body param: Shorthand DSL for node/edge constraints. Expands to
   * memory_policy.node_constraints and edge_constraints. Formats: - String:
   * 'Task:title' (semantic match on Task.title) - List: ['Task:title',
   * 'Person:email'] (multiple constraints) - Dict: {'Task:title': {'set': {...}}}
   * (with options) Syntax: - Node: 'Type:property', 'Type:prop=value' (exact),
   * 'Type:prop~value' (semantic) - Edge: 'Source->EDGE->Target:property' (arrow
   * syntax) - Via: 'Type.via(EDGE->Target:prop)' (relationship traversal) - Special:
   * '$this', '$previous', '$context:N' Example:
   * 'SecurityBehavior->MITIGATES->TacticDef:name' with {'create': 'never'}
   */
  link_to?: string | Array<string> | { [key: string]: unknown } | null;

  /**
   * Body param: Unified memory processing policy.
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
  memory_policy?: Shared.MemoryPolicy | null;

  /**
   * Body param: Metadata for memory request
   */
  metadata?: MemoryMetadata | null;

  /**
   * Body param: Optional namespace ID for multi-tenant memory scoping. When
   * provided, memory is associated with this namespace.
   */
  namespace_id?: string | null;

  /**
   * @deprecated Body param: DEPRECATED - Internal only. Auto-populated from API key
   * scope. Do not set manually. The organization is resolved automatically from the
   * API key's associated organization.
   */
  organization_id?: string | null;

  /**
   * @deprecated Body param: DEPRECATED: Use 'memory_policy' instead. Migration
   * options: 1. Specific memory: relationships=[{source: '$this', target: 'mem_123',
   * type: 'FOLLOWS'}] 2. Previous memory: link_to_previous_memory=True 3. Related
   * memories: link_to_related_memories=3
   */
  relationships_json?: Array<RelationshipItem> | null;

  /**
   * Body param: Memory item type; defaults to 'text' if omitted
   */
  type?: MemoryType;

  /**
   * @deprecated Body param: DEPRECATED: Use 'external_user_id' instead. Internal
   * Papr Parse user ID. Most developers should not use this field directly.
   */
  user_id?: string | null;
}

export interface MemoryAddBatchParams {
  /**
   * Body param: List of memory items to add in batch
   */
  memories: Array<AddMemory>;

  /**
   * Query param: If True, applies holographic neural transforms and stores in
   * holographic collection
   */
  enable_holographic?: boolean;

  /**
   * Query param: Frequency schema for holographic embedding (e.g. 'cosqa',
   * 'scifact'). Required when enable_holographic=True. Call GET /v1/frequencies to
   * see available schemas.
   */
  frequency_schema_id?: string | null;

  /**
   * Query param: If True, skips adding background tasks for processing
   */
  skip_background_processing?: boolean;

  /**
   * Body param: Number of items to process in parallel
   */
  batch_size?: number | null;

  /**
   * Body param: Your application's user identifier for all memories in the batch.
   * This is the primary way to identify users. Papr will automatically resolve or
   * create internal users as needed.
   */
  external_user_id?: string | null;

  /**
   * Body param: Graph generation configuration
   */
  graph_generation?: GraphGeneration | null;

  /**
   * Body param: Shorthand DSL for node/edge constraints. Expands to
   * memory_policy.node_constraints and edge_constraints. Formats: - String:
   * 'Task:title' (semantic match on Task.title) - List: ['Task:title',
   * 'Person:email'] (multiple constraints) - Dict: {'Task:title': {'set': {...}}}
   * (with options) Syntax: - Node: 'Type:property', 'Type:prop=value' (exact),
   * 'Type:prop~value' (semantic) - Edge: 'Source->EDGE->Target:property' (arrow
   * syntax) - Via: 'Type.via(EDGE->Target:prop)' (relationship traversal) - Special:
   * '$this', '$previous', '$context:N' Example:
   * 'SecurityBehavior->MITIGATES->TacticDef:name' with {'create': 'never'}
   */
  link_to?: string | Array<string> | { [key: string]: unknown } | null;

  /**
   * Body param: Unified memory processing policy.
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
  memory_policy?: Shared.MemoryPolicy | null;

  /**
   * Body param: Optional namespace ID for multi-tenant batch memory scoping. When
   * provided, all memories in the batch are associated with this namespace.
   */
  namespace_id?: string | null;

  /**
   * @deprecated Body param: DEPRECATED - Internal only. Auto-populated from API key
   * scope. Do not set manually. The organization is resolved automatically from the
   * API key's associated organization.
   */
  organization_id?: string | null;

  /**
   * @deprecated Body param: DEPRECATED: Use 'external_user_id' instead. Internal
   * Papr Parse user ID.
   */
  user_id?: string | null;

  /**
   * Body param: Optional secret key for webhook authentication. If provided, will be
   * included in the webhook request headers as 'X-Webhook-Secret'.
   */
  webhook_secret?: string | null;

  /**
   * Body param: Optional webhook URL to notify when batch processing is complete.
   * The webhook will receive a POST request with batch completion details.
   */
  webhook_url?: string | null;

  [k: string]: unknown;
}

export interface MemoryDeleteAllParams {
  /**
   * Optional external user ID to resolve and delete memories for
   */
  external_user_id?: string | null;

  /**
   * Skip Parse Server deletion
   */
  skip_parse?: boolean;

  /**
   * Optional user ID to delete memories for (if not provided, uses authenticated
   * user)
   */
  user_id?: string | null;
}

export interface MemoryGetParams {
  /**
   * If true, return 404 if the memory has risk='flagged'. Filters out flagged
   * content.
   */
  exclude_flagged?: boolean;

  /**
   * Maximum risk level allowed. Values: 'none', 'sensitive', 'flagged'. If memory
   * exceeds this, return 404.
   */
  max_risk?: string | null;

  /**
   * If true, return 404 if the memory has consent='none'. Ensures only consented
   * memories are returned.
   */
  require_consent?: boolean;
}

export interface MemorySearchParams {
  /**
   * Body param: Detailed search query describing what you're looking for. For best
   * results, write 2-3 sentences that include specific details, context, and time
   * frame. Examples: 'Find recurring customer complaints about API performance from
   * the last month. Focus on issues where customers specifically mentioned timeout
   * errors or slow response times in their conversations.' 'What are the main issues
   * and blockers in my current projects? Focus on technical challenges and timeline
   * impacts.' 'Find insights about team collaboration and communication patterns
   * from recent meetings and discussions.'
   */
  query: string;

  /**
   * Query param: HIGHLY RECOMMENDED: Maximum number of memories to return. Use at
   * least 15-20 for comprehensive results. Lower values (5-10) may miss relevant
   * information. Default is 20 for optimal coverage.
   */
  max_memories?: number;

  /**
   * Query param: HIGHLY RECOMMENDED: Maximum number of neo nodes to return. Use at
   * least 10-15 for comprehensive graph results. Lower values may miss important
   * entity relationships. Default is 15 for optimal coverage.
   */
  max_nodes?: number;

  /**
   * Query param: Response format: 'json' (default) or 'toon' (Token-Oriented Object
   * Notation for 30-60% token reduction in LLM contexts)
   */
  response_format?: 'json' | 'toon';

  /**
   * Body param: HIGHLY RECOMMENDED: Enable agentic graph search for intelligent,
   * context-aware results. When enabled, the system can understand ambiguous
   * references by first identifying specific entities from your memory graph, then
   * performing targeted searches. Examples: 'customer feedback' → identifies your
   * customers first, then finds their specific feedback; 'project issues' →
   * identifies your projects first, then finds related issues; 'team meeting notes'
   * → identifies team members first, then finds meeting notes. This provides much
   * more relevant and comprehensive results. Set to false only if you need faster,
   * simpler keyword-based search.
   */
  enable_agentic_graph?: boolean;

  /**
   * Body param: Your application's user identifier to filter search results. This is
   * the primary way to identify users. Use this for your app's user IDs (e.g.,
   * 'user_alice_123', UUID, email).
   */
  external_user_id?: string | null;

  /**
   * Body param: Configuration for holographic neural embedding transforms and H-COND
   * scoring.
   *
   * Neural holographic embeddings use 13 brain-inspired frequency bands to encode
   * hierarchical semantic metadata alongside the base embedding. H-COND (Holographic
   * CONDitional) scoring uses phase alignment for improved relevance ranking.
   */
  holographic_config?: MemorySearchParams.HolographicConfig | null;

  /**
   * Body param: Metadata for memory request
   */
  metadata?: MemoryMetadata | null;

  /**
   * Body param: Optional namespace ID for multi-tenant search scoping. When
   * provided, search is scoped to memories within this namespace.
   */
  namespace_id?: string | null;

  /**
   * Body param: Filter for Open Memory Object (OMO) safety standards in
   * search/retrieval.
   *
   * Use this to filter search results by consent level and/or risk level.
   */
  omo_filter?: MemorySearchParams.OmoFilter | null;

  /**
   * Body param: Optional organization ID for multi-tenant search scoping. When
   * provided, search is scoped to memories within this organization.
   */
  organization_id?: string | null;

  /**
   * @deprecated Body param: DEPRECATED: Use 'reranking_config' instead. Whether to
   * enable additional ranking of search results. Default is false because results
   * are already ranked when using an LLM for search (recommended approach). Only
   * enable this if you're not using an LLM in your search pipeline and need
   * additional result ranking. Migration: Replace 'rank_results: true' with
   * 'reranking_config: {reranking_enabled: true, reranking_provider: "cohere",
   * reranking_model: "rerank-v3.5"}'
   */
  rank_results?: boolean;

  /**
   * Body param: Configuration for reranking memory search results
   */
  reranking_config?: MemorySearchParams.RerankingConfig | null;

  /**
   * Body param: Optional user-defined schema ID to use for this search. If provided,
   * this schema (plus system schema) will be used for query generation. If not
   * provided, system will automatically select relevant schema based on query
   * content.
   */
  schema_id?: string | null;

  /**
   * Body param: Simplified Access Control List configuration.
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
  search_acl?: Shared.ACLConfig | null;

  /**
   * Body param: Complete search override specification provided by developer
   */
  search_override?: MemorySearchParams.SearchOverride | null;

  /**
   * @deprecated Body param: DEPRECATED: Use 'external_user_id' instead. Internal
   * Papr Parse user ID. Most developers should not use this field directly.
   */
  user_id?: string | null;

  /**
   * Header param: Recommended to use 'gzip' for response compression
   */
  'Accept-Encoding'?: string;
}

export namespace MemorySearchParams {
  /**
   * Configuration for holographic neural embedding transforms and H-COND scoring.
   *
   * Neural holographic embeddings use 13 brain-inspired frequency bands to encode
   * hierarchical semantic metadata alongside the base embedding. H-COND (Holographic
   * CONDitional) scoring uses phase alignment for improved relevance ranking.
   */
  export interface HolographicConfig {
    /**
     * Whether to enable holographic embedding transforms
     */
    enabled?: boolean;

    /**
     * Frequency schema for holographic scoring. Use full ID (e.g.
     * 'code_search:cosqa:2.0.0') or shorthand (e.g. 'cosqa'). Call GET /v1/frequencies
     * to see available schemas and shortcuts.
     */
    frequency_schema_id?: string | null;

    /**
     * Maximum boost to add for high alignment (0.0-0.5)
     */
    hcond_boost_factor?: number;

    /**
     * Phase alignment threshold above which to apply boost (0.0-1.0)
     */
    hcond_boost_threshold?: number;

    /**
     * Maximum penalty for low alignment (0.0-0.5)
     */
    hcond_penalty_factor?: number;

    /**
     * Scoring method for holographic search results. Default: 'egr_rerank' (highest
     * accuracy, requires GPU). Options include: baseline, caesar8, egr_rerank, and
     * 160+ others. If null, uses the schema's default_scoring_method.
     */
    scoring_method?: string | null;

    /**
     * Search mode: 'disabled' (off), 'integrated' (search transformed embeddings),
     * 'post_search' (fetch then rerank with H-COND)
     */
    search_mode?: 'disabled' | 'integrated' | 'post_search';
  }

  /**
   * Filter for Open Memory Object (OMO) safety standards in search/retrieval.
   *
   * Use this to filter search results by consent level and/or risk level.
   */
  export interface OmoFilter {
    /**
     * Explicitly exclude memories with these consent levels. Example:
     * exclude_consent=['none'] filters out all memories without consent.
     */
    exclude_consent?: Array<'explicit' | 'implicit' | 'terms' | 'none'> | null;

    /**
     * If true, exclude all flagged content (risk == 'flagged'). Shorthand for
     * exclude_risk=['flagged'].
     */
    exclude_flagged?: boolean;

    /**
     * Explicitly exclude memories with these risk levels. Example:
     * exclude_risk=['flagged'] filters out all flagged content.
     */
    exclude_risk?: Array<'none' | 'sensitive' | 'flagged'> | null;

    /**
     * Post-ingest safety assessment of memory content.
     *
     * Aligned with Open Memory Object (OMO) standard.
     */
    max_risk?: 'none' | 'sensitive' | 'flagged' | null;

    /**
     * How the data owner allowed this memory to be stored/used.
     *
     * Aligned with Open Memory Object (OMO) standard.
     */
    min_consent?: 'explicit' | 'implicit' | 'terms' | 'none' | null;

    /**
     * If true, only return memories with explicit consent (consent != 'none').
     * Shorthand for exclude_consent=['none'].
     */
    require_consent?: boolean;
  }

  /**
   * Configuration for reranking memory search results
   */
  export interface RerankingConfig {
    /**
     * Whether to enable reranking of search results
     */
    reranking_enabled?: boolean;

    /**
     * Model to use for reranking. OpenAI (LLM): 'gpt-5-nano' (fast reasoning,
     * default), 'gpt-5-mini' (better quality reasoning). Cohere (cross-encoder):
     * 'rerank-v3.5' (latest), 'rerank-english-v3.0', 'rerank-multilingual-v3.0'
     */
    reranking_model?: string;

    /**
     * Reranking provider: 'openai' (better quality, slower) or 'cohere' (faster,
     * optimized for reranking)
     */
    reranking_provider?: 'openai' | 'cohere';
  }

  /**
   * Complete search override specification provided by developer
   */
  export interface SearchOverride {
    /**
     * Graph pattern to search for (source)-[relationship]->(target)
     */
    pattern: SearchOverride.Pattern;

    /**
     * Property filters to apply to the search pattern
     */
    filters?: Array<SearchOverride.Filter>;

    /**
     * Specific properties to return. If not specified, returns all properties.
     */
    return_properties?: Array<string> | null;
  }

  export namespace SearchOverride {
    /**
     * Graph pattern to search for (source)-[relationship]->(target)
     */
    export interface Pattern {
      /**
       * Relationship type (e.g., 'ASSOCIATED_WITH', 'WORKS_FOR'). Must match schema
       * relationship types.
       */
      relationship_type: string;

      /**
       * Source node label (e.g., 'Memory', 'Person', 'Company'). Must match schema node
       * types.
       */
      source_label: string;

      /**
       * Target node label (e.g., 'Person', 'Company', 'Project'). Must match schema node
       * types.
       */
      target_label: string;

      /**
       * Relationship direction: '->' (outgoing), '<-' (incoming), or '-' (bidirectional)
       */
      direction?: string;
    }

    /**
     * Property filters for search override
     */
    export interface Filter {
      /**
       * Node type to filter (e.g., 'Person', 'Memory', 'Company')
       */
      node_type: string;

      /**
       * Filter operator: 'CONTAINS', 'EQUALS', 'STARTS_WITH', 'IN'
       */
      operator: string;

      /**
       * Property name to filter on (e.g., 'name', 'content', 'role')
       */
      property_name: string;

      /**
       * Filter value(s). Use list for 'IN' operator.
       */
      value: string | Array<string> | number | boolean;
    }
  }
}

export declare namespace Memory {
  export {
    type AddMemory as AddMemory,
    type AddMemoryResponse as AddMemoryResponse,
    type AutoGraphGeneration as AutoGraphGeneration,
    type BatchMemoryError as BatchMemoryError,
    type BatchMemoryResponse as BatchMemoryResponse,
    type ContextItem as ContextItem,
    type GraphGeneration as GraphGeneration,
    type HTTPValidationError as HTTPValidationError,
    type ManualGraphGeneration as ManualGraphGeneration,
    type MemoryMetadata as MemoryMetadata,
    type MemoryType as MemoryType,
    type RelationshipItem as RelationshipItem,
    type SearchResponse as SearchResponse,
    type SearchResult as SearchResult,
    type MemoryUpdateResponse as MemoryUpdateResponse,
    type MemoryDeleteResponse as MemoryDeleteResponse,
    type MemoryUpdateParams as MemoryUpdateParams,
    type MemoryDeleteParams as MemoryDeleteParams,
    type MemoryAddParams as MemoryAddParams,
    type MemoryAddBatchParams as MemoryAddBatchParams,
    type MemoryDeleteAllParams as MemoryDeleteAllParams,
    type MemoryGetParams as MemoryGetParams,
    type MemorySearchParams as MemorySearchParams,
  };
}
