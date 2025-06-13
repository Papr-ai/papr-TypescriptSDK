// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MemoryAPI from './memory';
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
    body: MemoryUpdateParams,
    options?: RequestOptions,
  ): APIPromise<MemoryUpdateResponse> {
    return this._client.put(path`/v1/memory/${memoryID}`, { body, ...options });
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
   *     The API validates content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).
   *
   * @example
   * ```ts
   * const addMemoryResponse = await client.memory.add({
   *   content:
   *     'Meeting notes from the product planning session',
   *   type: 'text',
   * });
   * ```
   */
  add(params: MemoryAddParams, options?: RequestOptions): APIPromise<AddMemoryResponse> {
    const { skip_background_processing, ...body } = params;
    return this._client.post('/v1/memory', { query: { skip_background_processing }, body, ...options });
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
   * const response = await client.memory.addBatch({
   *   memories: [
   *     {
   *       content:
   *         'Meeting notes from the product planning session',
   *       type: 'text',
   *     },
   *     {
   *       content: 'Follow-up tasks from the planning meeting',
   *       type: 'text',
   *     },
   *   ],
   * });
   * ```
   */
  addBatch(params: MemoryAddBatchParams, options?: RequestOptions): APIPromise<MemoryAddBatchResponse> {
    const { skip_background_processing, ...body } = params;
    return this._client.post('/v1/memory/batch', { query: { skip_background_processing }, body, ...options });
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
  get(memoryID: string, options?: RequestOptions): APIPromise<SearchResponse> {
    return this._client.get(path`/v1/memory/${memoryID}`, options);
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
   *     **Recommended Headers**:
   *     ```
   *     Accept-Encoding: gzip
   *     ```
   *
   *     The API supports response compression for improved performance. Responses larger than 1KB will be automatically compressed when this header is present.
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
    const { max_memories, max_nodes, 'Accept-Encoding': acceptEncoding, ...body } = params;
    return this._client.post('/v1/memory/search', {
      query: { max_memories, max_nodes },
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
   * Valid memory types
   */
  type: MemoryType;

  /**
   * Context can be conversation history or any relevant context for a memory item
   */
  context?: Array<ContextItem> | null;

  /**
   * Metadata for memory request
   */
  metadata?: MemoryMetadata | null;

  /**
   * Array of relationships that we can use in Graph DB (neo4J)
   */
  relationships_json?: Array<RelationshipItem> | null;
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
  data?: Array<AddMemoryResponse.Data> | null;

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

export namespace AddMemoryResponse {
  /**
   * Response model for a single memory item in add_memory response
   */
  export interface Data {
    createdAt: string;

    memoryId: string;

    objectId: string;

    memoryChunkIds?: Array<string>;
  }
}

/**
 * Context item for memory request
 */
export interface ContextItem {
  content: string;

  role: 'user' | 'assistant';
}

/**
 * Metadata for memory request
 */
export interface MemoryMetadata {
  conversationId?: string | null;

  /**
   * ISO datetime when the memory was created
   */
  createdAt?: string | null;

  /**
   * Optional object for arbitrary custom metadata fields. Only string, number,
   * boolean, or list of strings allowed. Nested dicts are not allowed.
   */
  customMetadata?: Record<string, string | number | boolean | Array<string>> | null;

  'emoji tags'?: Array<string> | null;

  'emotion tags'?: Array<string> | null;

  external_user_id?: string | null;

  external_user_read_access?: Array<string> | null;

  external_user_write_access?: Array<string> | null;

  /**
   * Hierarchical structures to enable navigation from broad topics to specific ones
   */
  hierarchical_structures?: string | null;

  location?: string | null;

  pageId?: string | null;

  role_read_access?: Array<string> | null;

  role_write_access?: Array<string> | null;

  sourceType?: string | null;

  sourceUrl?: string | null;

  topics?: Array<string> | null;

  user_id?: string | null;

  user_read_access?: Array<string> | null;

  user_write_access?: Array<string> | null;

  workspace_id?: string | null;

  workspace_read_access?: Array<string> | null;

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
  related_item_id: 'TextMemoryItem' | 'previous_memory_item_id';

  related_item_type: 'TextMemoryItem';

  relation_type: string;

  metadata?: Record<string, unknown>;
}

export interface SearchResponse {
  /**
   * HTTP status code
   */
  code?: number;

  /**
   * Return type for SearchResult
   */
  data?: SearchResponse.Data | null;

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

export namespace SearchResponse {
  /**
   * Return type for SearchResult
   */
  export interface Data {
    memories: Array<Data.Memory>;

    nodes: Array<Data.Node>;
  }

  export namespace Data {
    /**
     * A memory item in the knowledge base
     */
    export interface Memory {
      id: string;

      acl: Record<string, Record<string, boolean>>;

      content: string;

      type: string;

      user_id: string;

      context?: Array<MemoryAPI.ContextItem> | null;

      conversation_id?: string;

      created_at?: string | null;

      current_step?: string | null;

      customMetadata?: Record<string, unknown> | null;

      external_user_id?: string | null;

      external_user_read_access?: Array<string> | null;

      external_user_write_access?: Array<string> | null;

      file_url?: string | null;

      filename?: string | null;

      hierarchical_structures?: string;

      location?: string | null;

      metadata?: string | Record<string, unknown> | null;

      page?: string | null;

      page_number?: number | null;

      role_read_access?: Array<string> | null;

      role_write_access?: Array<string> | null;

      source_document_id?: string | null;

      source_message_id?: string | null;

      source_type?: string;

      source_url?: string;

      steps?: Array<string>;

      tags?: Array<string>;

      title?: string | null;

      topics?: Array<string>;

      total_pages?: number | null;

      updated_at?: string | null;

      user_read_access?: Array<string> | null;

      user_write_access?: Array<string> | null;

      workspace_id?: string | null;

      workspace_read_access?: Array<string> | null;

      workspace_write_access?: Array<string> | null;

      [k: string]: unknown;
    }

    /**
     * Public-facing node structure matching our internal representation
     */
    export interface Node {
      label:
        | 'Memory'
        | 'Person'
        | 'Company'
        | 'Project'
        | 'Task'
        | 'Insight'
        | 'Meeting'
        | 'Opportunity'
        | 'Code';

      /**
       * Memory node properties
       */
      properties:
        | Node.PaprMemoryNodeProperties
        | Node.PersonNodeProperties
        | Node.CompanyNodeProperties
        | Node.ProjectNodeProperties
        | Node.TaskNodeProperties
        | Node.InsightNodeProperties
        | Node.MeetingNodeProperties
        | Node.OpportunityNodeProperties
        | Node.CodeNodeProperties;
    }

    export namespace Node {
      /**
       * Memory node properties
       */
      export interface PaprMemoryNodeProperties {
        id: string;

        content: string;

        current_step: string;

        emotion_tags: Array<string>;

        steps: Array<string>;

        topics: Array<string>;

        type: string;

        conversationId?: string | null;

        createdAt?: string | null;

        emoji_tags?: Array<string> | null;

        external_user_read_access?: Array<string> | null;

        external_user_write_access?: Array<string> | null;

        hierarchical_structures?: string | null;

        pageId?: string | null;

        role_read_access?: Array<string> | null;

        role_write_access?: Array<string> | null;

        sourceType?: string | null;

        sourceUrl?: string | null;

        title?: string | null;

        updatedAt?: string | null;

        user_id?: string | null;

        user_read_access?: Array<string> | null;

        user_write_access?: Array<string> | null;

        workspace_id?: string | null;

        workspace_read_access?: Array<string> | null;

        workspace_write_access?: Array<string> | null;
      }

      /**
       * Person node properties
       */
      export interface PersonNodeProperties {
        id: string;

        description: string;

        name: string;

        role: string;

        conversationId?: string | null;

        createdAt?: string | null;

        external_user_read_access?: Array<string> | null;

        external_user_write_access?: Array<string> | null;

        pageId?: string | null;

        role_read_access?: Array<string> | null;

        role_write_access?: Array<string> | null;

        sourceType?: string | null;

        sourceUrl?: string | null;

        updatedAt?: string | null;

        user_id?: string | null;

        user_read_access?: Array<string> | null;

        user_write_access?: Array<string> | null;

        workspace_id?: string | null;

        workspace_read_access?: Array<string> | null;

        workspace_write_access?: Array<string> | null;
      }

      /**
       * Company node properties
       */
      export interface CompanyNodeProperties {
        id: string;

        description: string;

        name: string;

        conversationId?: string | null;

        createdAt?: string | null;

        external_user_read_access?: Array<string> | null;

        external_user_write_access?: Array<string> | null;

        pageId?: string | null;

        role_read_access?: Array<string> | null;

        role_write_access?: Array<string> | null;

        sourceType?: string | null;

        sourceUrl?: string | null;

        updatedAt?: string | null;

        user_id?: string | null;

        user_read_access?: Array<string> | null;

        user_write_access?: Array<string> | null;

        workspace_id?: string | null;

        workspace_read_access?: Array<string> | null;

        workspace_write_access?: Array<string> | null;
      }

      /**
       * Project node properties
       */
      export interface ProjectNodeProperties {
        id: string;

        description: string;

        name: string;

        type: string;

        conversationId?: string | null;

        createdAt?: string | null;

        external_user_read_access?: Array<string> | null;

        external_user_write_access?: Array<string> | null;

        pageId?: string | null;

        role_read_access?: Array<string> | null;

        role_write_access?: Array<string> | null;

        sourceType?: string | null;

        sourceUrl?: string | null;

        updatedAt?: string | null;

        user_id?: string | null;

        user_read_access?: Array<string> | null;

        user_write_access?: Array<string> | null;

        workspace_id?: string | null;

        workspace_read_access?: Array<string> | null;

        workspace_write_access?: Array<string> | null;
      }

      /**
       * Task node properties
       */
      export interface TaskNodeProperties {
        id: string;

        description: string;

        status: 'new' | 'in_progress' | 'completed';

        title: string;

        type: 'task' | 'subtask' | 'bug' | 'feature_request' | 'epic' | 'support_ticket';

        conversationId?: string | null;

        createdAt?: string | null;

        /**
         * Due date for the task in ISO 8601 format
         */
        date?: string | null;

        external_user_read_access?: Array<string> | null;

        external_user_write_access?: Array<string> | null;

        pageId?: string | null;

        role_read_access?: Array<string> | null;

        role_write_access?: Array<string> | null;

        sourceType?: string | null;

        sourceUrl?: string | null;

        updatedAt?: string | null;

        user_id?: string | null;

        user_read_access?: Array<string> | null;

        user_write_access?: Array<string> | null;

        workspace_id?: string | null;

        workspace_read_access?: Array<string> | null;

        workspace_write_access?: Array<string> | null;
      }

      /**
       * Insight node properties
       */
      export interface InsightNodeProperties {
        id: string;

        description: string;

        source: string;

        title: string;

        type:
          | 'customer_insight'
          | 'product_insight'
          | 'market_insight'
          | 'competitive_insight'
          | 'technical_insight'
          | 'other';

        conversationId?: string | null;

        createdAt?: string | null;

        external_user_read_access?: Array<string> | null;

        external_user_write_access?: Array<string> | null;

        pageId?: string | null;

        role_read_access?: Array<string> | null;

        role_write_access?: Array<string> | null;

        sourceType?: string | null;

        sourceUrl?: string | null;

        updatedAt?: string | null;

        user_id?: string | null;

        user_read_access?: Array<string> | null;

        user_write_access?: Array<string> | null;

        workspace_id?: string | null;

        workspace_read_access?: Array<string> | null;

        workspace_write_access?: Array<string> | null;
      }

      /**
       * Meeting node properties
       */
      export interface MeetingNodeProperties {
        id: string;

        action_items: Array<string>;

        agenda: string;

        date: string;

        outcome: string;

        participants: Array<string>;

        summary: string;

        time: string;

        title: string;

        type: string;

        conversationId?: string | null;

        createdAt?: string | null;

        external_user_read_access?: Array<string> | null;

        external_user_write_access?: Array<string> | null;

        pageId?: string | null;

        role_read_access?: Array<string> | null;

        role_write_access?: Array<string> | null;

        sourceType?: string | null;

        sourceUrl?: string | null;

        updatedAt?: string | null;

        user_id?: string | null;

        user_read_access?: Array<string> | null;

        user_write_access?: Array<string> | null;

        workspace_id?: string | null;

        workspace_read_access?: Array<string> | null;

        workspace_write_access?: Array<string> | null;
      }

      /**
       * Opportunity node properties
       */
      export interface OpportunityNodeProperties {
        id: string;

        close_date: string;

        description: string;

        next_steps: Array<string>;

        probability: number;

        stage: 'prospect' | 'lead' | 'opportunity' | 'won' | 'lost';

        title: string;

        value: number;

        conversationId?: string | null;

        createdAt?: string | null;

        external_user_read_access?: Array<string> | null;

        external_user_write_access?: Array<string> | null;

        pageId?: string | null;

        role_read_access?: Array<string> | null;

        role_write_access?: Array<string> | null;

        sourceType?: string | null;

        sourceUrl?: string | null;

        updatedAt?: string | null;

        user_id?: string | null;

        user_read_access?: Array<string> | null;

        user_write_access?: Array<string> | null;

        workspace_id?: string | null;

        workspace_read_access?: Array<string> | null;

        workspace_write_access?: Array<string> | null;
      }

      /**
       * Code node properties
       */
      export interface CodeNodeProperties {
        id: string;

        author: string;

        language: string;

        name: string;

        conversationId?: string | null;

        createdAt?: string | null;

        external_user_read_access?: Array<string> | null;

        external_user_write_access?: Array<string> | null;

        pageId?: string | null;

        role_read_access?: Array<string> | null;

        role_write_access?: Array<string> | null;

        sourceType?: string | null;

        sourceUrl?: string | null;

        updatedAt?: string | null;

        user_id?: string | null;

        user_read_access?: Array<string> | null;

        user_write_access?: Array<string> | null;

        workspace_id?: string | null;

        workspace_read_access?: Array<string> | null;

        workspace_write_access?: Array<string> | null;
      }
    }
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
    neo4j?: boolean;

    parse?: boolean;

    pinecone?: boolean;
  }
}

export interface MemoryAddBatchResponse {
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
  errors?: Array<MemoryAddBatchResponse.Error>;

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

export namespace MemoryAddBatchResponse {
  export interface Error {
    error: string;

    index: number;

    code?: number | null;

    details?: unknown;

    status?: string | null;
  }
}

export interface MemoryUpdateParams {
  /**
   * The new content of the memory item
   */
  content?: string | null;

  /**
   * Updated context for the memory item
   */
  context?: Array<ContextItem> | null;

  /**
   * Metadata for memory request
   */
  metadata?: MemoryMetadata | null;

  /**
   * Updated relationships for Graph DB (neo4J)
   */
  relationships_json?: Array<RelationshipItem> | null;

  /**
   * Valid memory types
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
   * Body param: Valid memory types
   */
  type: MemoryType;

  /**
   * Query param: If True, skips adding background tasks for processing
   */
  skip_background_processing?: boolean;

  /**
   * Body param: Context can be conversation history or any relevant context for a
   * memory item
   */
  context?: Array<ContextItem> | null;

  /**
   * Body param: Metadata for memory request
   */
  metadata?: MemoryMetadata | null;

  /**
   * Body param: Array of relationships that we can use in Graph DB (neo4J)
   */
  relationships_json?: Array<RelationshipItem> | null;
}

export interface MemoryAddBatchParams {
  /**
   * Body param: List of memory items to add in batch
   */
  memories: Array<AddMemory>;

  /**
   * Query param: If True, skips adding background tasks for processing
   */
  skip_background_processing?: boolean;

  /**
   * Body param: Number of items to process in parallel
   */
  batch_size?: number | null;

  /**
   * Body param: External user ID for all memories in the batch. If provided and
   * user_id is not, will be resolved to internal user ID.
   */
  external_user_id?: string | null;

  /**
   * Body param: Internal user ID for all memories in the batch. If not provided,
   * developer's user ID will be used.
   */
  user_id?: string | null;
}

export interface MemorySearchParams {
  /**
   * Body param: Detailed search query describing what you're looking for. For best
   * results, write 2-3 sentences that include specific details, context, and time
   * frame. For example: 'Find recurring customer complaints about API performance
   * from the last month. Focus on issues where customers specifically mentioned
   * timeout errors or slow response times in their conversations.'
   */
  query: string;

  /**
   * Query param: Maximum number of memories to return
   */
  max_memories?: number;

  /**
   * Query param: Maximum number of neo nodes to return
   */
  max_nodes?: number;

  /**
   * Body param: Optional external user ID to filter search results by a specific
   * external user. If both user_id and external_user_id are provided, user_id takes
   * precedence.
   */
  external_user_id?: string | null;

  /**
   * Body param: Metadata for memory request
   */
  metadata?: MemoryMetadata | null;

  /**
   * Body param: Whether to enable additional ranking of search results. Default is
   * false because results are already ranked when using an LLM for search
   * (recommended approach). Only enable this if you're not using an LLM in your
   * search pipeline and need additional result ranking.
   */
  rank_results?: boolean;

  /**
   * Body param: Optional internal user ID to filter search results by a specific
   * user. If not provided, results are not filtered by user. If both user_id and
   * external_user_id are provided, user_id takes precedence.
   */
  user_id?: string | null;

  /**
   * Header param: Recommended to use 'gzip' for response compression
   */
  'Accept-Encoding'?: string;
}

export declare namespace Memory {
  export {
    type AddMemory as AddMemory,
    type AddMemoryResponse as AddMemoryResponse,
    type ContextItem as ContextItem,
    type MemoryMetadata as MemoryMetadata,
    type MemoryType as MemoryType,
    type RelationshipItem as RelationshipItem,
    type SearchResponse as SearchResponse,
    type MemoryUpdateResponse as MemoryUpdateResponse,
    type MemoryDeleteResponse as MemoryDeleteResponse,
    type MemoryAddBatchResponse as MemoryAddBatchResponse,
    type MemoryUpdateParams as MemoryUpdateParams,
    type MemoryDeleteParams as MemoryDeleteParams,
    type MemoryAddParams as MemoryAddParams,
    type MemoryAddBatchParams as MemoryAddBatchParams,
    type MemorySearchParams as MemorySearchParams,
  };
}
