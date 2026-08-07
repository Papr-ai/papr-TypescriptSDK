// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FeedbackAPI from './feedback';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Feedback extends APIResource {
  /**
   * Retrieve feedback by ID.
   *
   *     This endpoint allows developers to fetch feedback details by feedback ID.
   *     Only the user who created the feedback or users with appropriate permissions can access it.
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
   * const feedbackResponse = await client.feedback.getByID(
   *   'feedback_id',
   * );
   * ```
   */
  getByID(feedbackID: string, options?: RequestOptions): APIPromise<FeedbackResponse> {
    return this._client.get(path`/v1/feedback/${feedbackID}`, options);
  }

  /**
   * Submit feedback on search results to help improve model performance.
   *
   *     This endpoint allows developers to provide feedback on:
   *     - Overall answer quality (thumbs up/down, ratings)
   *     - Specific memory relevance and accuracy
   *     - User engagement signals (copy, save, create document actions)
   *     - Corrections and improvements
   *
   *     The feedback is used to train and improve:
   *     - Router model tier predictions
   *     - Memory retrieval ranking
   *     - Answer generation quality
   *     - Agentic graph search performance
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
   * @example
   * ```ts
   * const feedbackResponse = await client.feedback.submit({
   *   feedbackData: {
   *     feedbackSource: 'inline',
   *     feedbackType: 'thumbs_up',
   *   },
   *   search_id: 'abc123def456',
   * });
   * ```
   */
  submit(body: FeedbackSubmitParams, options?: RequestOptions): APIPromise<FeedbackResponse> {
    return this._client.post('/v1/feedback', { body, ...options });
  }

  /**
   * Submit multiple feedback items in a single request.
   *
   *     Useful for submitting session-end feedback or bulk feedback collection.
   *     Each feedback item is processed independently, so partial success is possible.
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
   * @example
   * ```ts
   * const batchResponse = await client.feedback.submitBatch({
   *   feedback_items: [
   *     {
   *       feedbackData: {
   *         feedbackSource: 'inline',
   *         feedbackType: 'thumbs_up',
   *       },
   *       search_id: 'abc123def456',
   *     },
   *   ],
   * });
   * ```
   */
  submitBatch(body: FeedbackSubmitBatchParams, options?: RequestOptions): APIPromise<BatchResponse> {
    return this._client.post('/v1/feedback/batch', { body, ...options });
  }
}

/**
 * Request model for submitting multiple feedback items
 */
export interface BatchRequest {
  /**
   * List of feedback items to submit
   */
  feedback_items: Array<FeedbackRequest>;

  /**
   * Session-level context for batch feedback
   */
  session_context?: { [key: string]: unknown } | null;
}

/**
 * Response model for batch feedback submission
 */
export interface BatchResponse {
  /**
   * HTTP status code
   */
  code: number;

  /**
   * Human-readable message
   */
  message: string;

  /**
   * 'success' or 'error'
   */
  status: string;

  /**
   * Error message if status is 'error'
   */
  error?: string | null;

  /**
   * List of error details
   */
  errors?: Array<{ [key: string]: unknown }>;

  /**
   * Number of failed feedback items
   */
  failed_count?: number;

  /**
   * List of feedback IDs
   */
  feedback_ids?: Array<string>;

  /**
   * Number of successfully processed feedback items
   */
  successful_count?: number;
}

/**
 * Request model for submitting feedback on search results
 */
export interface FeedbackRequest {
  /**
   * The feedback data containing all feedback information
   */
  feedbackData: FeedbackRequest.FeedbackData;

  /**
   * The search_id from SearchResponse that this feedback relates to
   */
  search_id: string;

  /**
   * External user ID for developer API keys acting on behalf of end users
   */
  external_user_id?: string | null;

  /**
   * Optional namespace ID for multi-tenant feedback scoping. When provided, feedback
   * is scoped to this namespace.
   */
  namespace_id?: string | null;

  /**
   * Optional organization ID for multi-tenant feedback scoping. When provided,
   * feedback is scoped to this organization.
   */
  organization_id?: string | null;

  /**
   * Internal user ID (if not provided, will be resolved from authentication)
   */
  user_id?: string | null;
}

export namespace FeedbackRequest {
  /**
   * The feedback data containing all feedback information
   */
  export interface FeedbackData {
    /**
     * Where the feedback was provided from
     */
    feedbackSource: 'inline' | 'post_query' | 'session_end' | 'memory_citation' | 'answer_panel';

    /**
     * Types of feedback that can be provided
     */
    feedbackType:
      | 'thumbs_up'
      | 'thumbs_down'
      | 'rating'
      | 'correction'
      | 'report'
      | 'copy_action'
      | 'save_action'
      | 'create_document'
      | 'memory_relevance'
      | 'answer_quality';

    /**
     * A pointer to a Parse object
     */
    assistantMessage?: FeedbackAPI.ParsePointer | null;

    citedMemoryIds?: Array<string> | null;

    citedNodeIds?: Array<string> | null;

    feedbackImpact?: string | null;

    feedbackProcessed?: boolean | null;

    feedbackScore?: number | null;

    feedbackText?: string | null;

    feedbackValue?: string | null;

    /**
     * A pointer to a Parse object
     */
    userMessage?: FeedbackAPI.ParsePointer | null;
  }
}

/**
 * Response model for feedback submission
 */
export interface FeedbackResponse {
  /**
   * HTTP status code
   */
  code: number;

  /**
   * Human-readable message
   */
  message: string;

  /**
   * 'success' or 'error'
   */
  status: string;

  /**
   * Additional error details
   */
  details?: { [key: string]: unknown } | null;

  /**
   * Error message if status is 'error'
   */
  error?: string | null;

  /**
   * Unique feedback ID
   */
  feedback_id?: string | null;
}

/**
 * A pointer to a Parse object
 */
export interface ParsePointer {
  className: string;

  objectId: string;

  __type?: string;
}

export interface FeedbackSubmitParams {
  /**
   * The feedback data containing all feedback information
   */
  feedbackData: FeedbackSubmitParams.FeedbackData;

  /**
   * The search_id from SearchResponse that this feedback relates to
   */
  search_id: string;

  /**
   * External user ID for developer API keys acting on behalf of end users
   */
  external_user_id?: string | null;

  /**
   * Optional namespace ID for multi-tenant feedback scoping. When provided, feedback
   * is scoped to this namespace.
   */
  namespace_id?: string | null;

  /**
   * Optional organization ID for multi-tenant feedback scoping. When provided,
   * feedback is scoped to this organization.
   */
  organization_id?: string | null;

  /**
   * Internal user ID (if not provided, will be resolved from authentication)
   */
  user_id?: string | null;
}

export namespace FeedbackSubmitParams {
  /**
   * The feedback data containing all feedback information
   */
  export interface FeedbackData {
    /**
     * Where the feedback was provided from
     */
    feedbackSource: 'inline' | 'post_query' | 'session_end' | 'memory_citation' | 'answer_panel';

    /**
     * Types of feedback that can be provided
     */
    feedbackType:
      | 'thumbs_up'
      | 'thumbs_down'
      | 'rating'
      | 'correction'
      | 'report'
      | 'copy_action'
      | 'save_action'
      | 'create_document'
      | 'memory_relevance'
      | 'answer_quality';

    /**
     * A pointer to a Parse object
     */
    assistantMessage?: FeedbackAPI.ParsePointer | null;

    citedMemoryIds?: Array<string> | null;

    citedNodeIds?: Array<string> | null;

    feedbackImpact?: string | null;

    feedbackProcessed?: boolean | null;

    feedbackScore?: number | null;

    feedbackText?: string | null;

    feedbackValue?: string | null;

    /**
     * A pointer to a Parse object
     */
    userMessage?: FeedbackAPI.ParsePointer | null;
  }
}

export interface FeedbackSubmitBatchParams {
  /**
   * List of feedback items to submit
   */
  feedback_items: Array<FeedbackRequest>;

  /**
   * Session-level context for batch feedback
   */
  session_context?: { [key: string]: unknown } | null;
}

export declare namespace Feedback {
  export {
    type BatchRequest as BatchRequest,
    type BatchResponse as BatchResponse,
    type FeedbackRequest as FeedbackRequest,
    type FeedbackResponse as FeedbackResponse,
    type ParsePointer as ParsePointer,
    type FeedbackSubmitParams as FeedbackSubmitParams,
    type FeedbackSubmitBatchParams as FeedbackSubmitBatchParams,
  };
}
