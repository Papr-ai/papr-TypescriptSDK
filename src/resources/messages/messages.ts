// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MemoryAPI from '../memory';
import * as Shared from '../shared';
import * as SessionsAPI from './sessions';
import {
  SessionCompressResponse,
  SessionProcessResponse,
  SessionRetrieveHistoryParams,
  SessionRetrieveHistoryResponse,
  SessionRetrieveStatusResponse,
  SessionUpdateParams,
  SessionUpdateResponse,
  Sessions,
} from './sessions';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Messages extends APIResource {
  sessions: SessionsAPI.Sessions = new SessionsAPI.Sessions(this._client);

  /**
   * Store a chat message and queue it for AI analysis and memory creation.
   *
   *     **Authentication Required**: Bearer token, API key, or session token
   *
   *     **Processing Control**:
   *     - Set `process_messages: true` (default) to enable full AI analysis and memory creation
   *     - Set `process_messages: false` to store messages only without processing into memories
   *
   *     **Processing Flow** (when process_messages=true):
   *     1. Message is immediately stored in PostMessage class
   *     2. Background processing analyzes the message for memory-worthiness
   *     3. If worthy, creates a memory with appropriate role-based categorization
   *     4. Links the message to the created memory
   *
   *     **Role-Based Categories**:
   *     - **User messages**: preference, task, goal, facts, context
   *     - **Assistant messages**: skills, learning
   *
   *     **Session Management**:
   *     - `sessionId` is required to group related messages
   *     - Use the same `sessionId` for an entire conversation
   *     - **Optional `title`**: Set a human-readable title for the conversation (e.g., "Q4 Planning Session")
   *     - Retrieve conversation history using GET /messages/sessions/{sessionId}
   *
   * @example
   * ```ts
   * const response = await client.messages.store({
   *   content: 'string',
   *   role: 'user',
   *   sessionId: 'sessionId',
   * });
   * ```
   */
  store(body: MessageStoreParams, options?: RequestOptions): APIPromise<MessageStoreResponse> {
    return this._client.post('/v1/messages', { body, ...options });
  }
}

/**
 * Response model for message storage
 */
export interface MessageStoreResponse {
  /**
   * Content of the message - can be a simple string or structured content objects
   */
  content: string | Array<{ [key: string]: unknown }>;

  /**
   * When the message was created
   */
  createdAt: string;

  /**
   * Parse Server objectId of the stored message
   */
  objectId: string;

  /**
   * Role of the message sender
   */
  role: 'user' | 'assistant';

  /**
   * Session ID of the conversation
   */
  sessionId: string;

  /**
   * Status of background processing (queued, analyzing, completed, failed)
   */
  processing_status?: string;
}

export interface MessageStoreParams {
  /**
   * The content of the chat message - can be a simple string or structured content
   * objects
   */
  content: string | Array<{ [key: string]: unknown }>;

  /**
   * Role of the message sender (user or assistant)
   */
  role: 'user' | 'assistant';

  /**
   * Session ID to group related messages in a conversation
   */
  sessionId: string;

  /**
   * Optional context for the message (conversation history or relevant context)
   */
  context?: Array<{ [key: string]: unknown }> | null;

  /**
   * Graph generation configuration
   */
  graph_generation?: MemoryAPI.GraphGeneration | null;

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
  metadata?: MemoryAPI.MemoryMetadata | null;

  /**
   * Optional namespace ID for multi-tenant message scoping
   */
  namespace_id?: string | null;

  /**
   * Optional organization ID for multi-tenant message scoping
   */
  organization_id?: string | null;

  /**
   * Whether to process messages into memories (true) or just store them (false).
   * Default is true.
   */
  process_messages?: boolean;

  /**
   * Optional array of relationships for Graph DB (Neo4j)
   */
  relationships_json?: Array<{ [key: string]: unknown }> | null;

  /**
   * Optional title for the conversation session. Sets the Chat.title in Parse Server
   * for easy identification.
   */
  title?: string | null;
}

Messages.Sessions = Sessions;

export declare namespace Messages {
  export { type MessageStoreResponse as MessageStoreResponse, type MessageStoreParams as MessageStoreParams };

  export {
    Sessions as Sessions,
    type SessionUpdateResponse as SessionUpdateResponse,
    type SessionCompressResponse as SessionCompressResponse,
    type SessionProcessResponse as SessionProcessResponse,
    type SessionRetrieveHistoryResponse as SessionRetrieveHistoryResponse,
    type SessionRetrieveStatusResponse as SessionRetrieveStatusResponse,
    type SessionUpdateParams as SessionUpdateParams,
    type SessionRetrieveHistoryParams as SessionRetrieveHistoryParams,
  };
}
