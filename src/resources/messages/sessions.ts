// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Sessions extends APIResource {
  /**
   * Update session properties (e.g., title, metadata).
   *
   *     **Authentication Required**: Bearer token, API key, or session token
   *
   *     **Updatable Fields**:
   *     - `title`: Update the conversation title
   *     - `metadata`: Update session metadata (merged with existing)
   *
   *     **Example Request**:
   *     ```json
   *     {
   *         "title": "Updated Session Title",
   *         "metadata": {"custom_field": "value"}
   *     }
   *     ```
   *
   * @example
   * ```ts
   * const session = await client.messages.sessions.update(
   *   'session_id',
   * );
   * ```
   */
  update(sessionID: string, body: SessionUpdateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/v1/messages/sessions/${sessionID}`, { body, ...options });
  }

  /**
   * Get compressed conversation context for a session.
   *
   *     Compress your conversation into hierarchical summaries with rich metadata,
   *     perfect for reducing token usage in LLM context windows.
   *
   *     **Authentication Required**: Bearer token, API key, or session token
   *
   *     **What it returns**:
   *     - **short_term**: Last 15 messages compressed
   *     - **medium_term**: Last ~100 messages compressed
   *     - **long_term**: Full session compressed
   *     - **topics**: Key topics discussed
   *     - **enhanced_fields**: Project context, tech stack, key decisions, next steps, files accessed
   *
   *     **Perfect for**:
   *     - Reducing token usage in LLM prompts (96% savings)
   *     - Providing conversation context without full history
   *     - Quick conversation overview for AI agents
   *     - Project documentation and status snapshots
   *
   *     **Input**: Just the session ID - all context is extracted automatically
   *
   * @example
   * ```ts
   * const response = await client.messages.sessions.compress(
   *   'session_id',
   * );
   * ```
   */
  compress(sessionID: string, options?: RequestOptions): APIPromise<SessionCompressResponse> {
    return this._client.get(path`/v1/messages/sessions/${sessionID}/compress`, options);
  }

  /**
   * Process all stored messages in a session that were previously stored with
   * process_messages=false.
   *
   *     **Authentication Required**: Bearer token, API key, or session token
   *
   *     This endpoint allows you to retroactively process messages that were initially stored
   *     without processing. Useful for:
   *     - Processing messages after deciding you want them as memories
   *     - Batch processing large conversation sessions
   *     - Re-processing sessions with updated AI models
   *
   *     **Processing Behavior**:
   *     - Only processes messages with status 'stored_only' or 'pending'
   *     - Uses the same smart batch analysis (every 15 messages)
   *     - Respects existing memory creation pipeline
   *
   * @example
   * ```ts
   * const response = await client.messages.sessions.process(
   *   'session_id',
   * );
   * ```
   */
  process(sessionID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/v1/messages/sessions/${sessionID}/process`, options);
  }

  /**
   * Retrieve message history for a specific conversation session.
   *
   *     **Authentication Required**: Bearer token, API key, or session token
   *
   *     **Pagination**:
   *     - Use `limit` and `skip` parameters for pagination
   *     - Messages are returned in **reverse chronological order** (newest first)
   *     - `total_count` indicates total messages in the session
   *
   *     **Summaries** (if available):
   *     - Returns hierarchical conversation summaries (short/medium/long-term)
   *     - Includes `context_for_llm` field with pre-compressed context
   *     - Summaries are automatically generated every 15 messages
   *     - Use `/sessions/{session_id}/compress` endpoint to retrieve on-demand
   *
   *     **Access Control**:
   *     - Only returns messages for the authenticated user
   *     - Workspace scoping is applied if available
   *
   * @example
   * ```ts
   * const response =
   *   await client.messages.sessions.retrieveHistory(
   *     'session_id',
   *   );
   * ```
   */
  retrieveHistory(
    sessionID: string,
    query: SessionRetrieveHistoryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SessionRetrieveHistoryResponse> {
    return this._client.get(path`/v1/messages/sessions/${sessionID}`, { query, ...options });
  }

  /**
   * Get processing status for messages in a session.
   *
   *     **Authentication Required**: Bearer token, API key, or session token
   *
   *     **Status Information**:
   *     - Total messages in session
   *     - Processing status breakdown (queued, analyzing, completed, failed)
   *     - Any messages with processing errors
   *
   * @example
   * ```ts
   * const response =
   *   await client.messages.sessions.retrieveStatus(
   *     'session_id',
   *   );
   * ```
   */
  retrieveStatus(sessionID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/v1/messages/sessions/${sessionID}/status`, options);
  }
}

export type SessionUpdateResponse = unknown;

/**
 * Response model for session summarization endpoint
 */
export interface SessionCompressResponse {
  /**
   * Instructions for AI agents on how to search for more details about this
   * conversation
   */
  ai_agent_note: string;

  /**
   * Whether summaries were retrieved from cache (true) or just generated (false)
   */
  from_cache: boolean;

  /**
   * Session ID of the conversation
   */
  session_id: string;

  /**
   * Hierarchical conversation summaries
   */
  summaries: SessionCompressResponse.Summaries;

  /**
   * Number of messages summarized (only present if just generated)
   */
  message_count?: number | null;
}

export namespace SessionCompressResponse {
  /**
   * Hierarchical conversation summaries
   */
  export interface Summaries {
    /**
     * When summaries were last updated
     */
    last_updated?: string | null;

    /**
     * Full session summary
     */
    long_term?: string | null;

    /**
     * Summary of last ~100 messages
     */
    medium_term?: string | null;

    /**
     * Summary of last 15 messages
     */
    short_term?: string | null;

    /**
     * Key topics discussed
     */
    topics?: Array<string>;
  }
}

export type SessionProcessResponse = unknown;

/**
 * Response model for retrieving message history
 */
export interface SessionRetrieveHistoryResponse {
  /**
   * List of messages in chronological order
   */
  messages: Array<SessionRetrieveHistoryResponse.Message>;

  /**
   * Session ID of the conversation
   */
  sessionId: string;

  /**
   * Total number of messages in the session
   */
  total_count: number;

  /**
   * Pre-formatted compressed context ready for LLM consumption (summaries + recent
   * messages)
   */
  context_for_llm?: string | null;

  /**
   * Hierarchical conversation summaries for context window compression
   */
  summaries?: SessionRetrieveHistoryResponse.Summaries | null;
}

export namespace SessionRetrieveHistoryResponse {
  /**
   * Response model for message storage
   */
  export interface Message {
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

  /**
   * Hierarchical conversation summaries for context window compression
   */
  export interface Summaries {
    /**
     * When summaries were last updated
     */
    last_updated?: string | null;

    /**
     * Full session summary
     */
    long_term?: string | null;

    /**
     * Summary of last ~100 messages
     */
    medium_term?: string | null;

    /**
     * Summary of last 15 messages
     */
    short_term?: string | null;

    /**
     * Key topics discussed
     */
    topics?: Array<string>;
  }
}

export type SessionRetrieveStatusResponse = unknown;

export interface SessionUpdateParams {
  /**
   * Metadata to merge with existing session metadata
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * New title for the session
   */
  title?: string | null;
}

export interface SessionRetrieveHistoryParams {
  /**
   * Maximum number of messages to return
   */
  limit?: number;

  /**
   * Number of messages to skip for pagination
   */
  skip?: number;
}

export declare namespace Sessions {
  export {
    type SessionUpdateResponse as SessionUpdateResponse,
    type SessionCompressResponse as SessionCompressResponse,
    type SessionProcessResponse as SessionProcessResponse,
    type SessionRetrieveHistoryResponse as SessionRetrieveHistoryResponse,
    type SessionRetrieveStatusResponse as SessionRetrieveStatusResponse,
    type SessionUpdateParams as SessionUpdateParams,
    type SessionRetrieveHistoryParams as SessionRetrieveHistoryParams,
  };
}
