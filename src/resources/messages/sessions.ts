// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Sessions extends APIResource {
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
   * const response =
   *   await client.messages.sessions.processMessages(
   *     'sessionId',
   *   );
   * ```
   */
  processMessages(sessionID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/v1/messages/sessions/${sessionID}/process`, options);
  }

  /**
   * Retrieve message history for a specific conversation session.
   *
   *     **Authentication Required**: Bearer token, API key, or session token
   *
   *     **Pagination**:
   *     - Use `limit` and `skip` parameters for pagination
   *     - Messages are returned in chronological order (oldest first)
   *     - `total_count` indicates total messages in the session
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

export type SessionProcessMessagesResponse = unknown;

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
}

export type SessionRetrieveStatusResponse = unknown;

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
    type SessionProcessMessagesResponse as SessionProcessMessagesResponse,
    type SessionRetrieveHistoryResponse as SessionRetrieveHistoryResponse,
    type SessionRetrieveStatusResponse as SessionRetrieveStatusResponse,
    type SessionRetrieveHistoryParams as SessionRetrieveHistoryParams,
  };
}
