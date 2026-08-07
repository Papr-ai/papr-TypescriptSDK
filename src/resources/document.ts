// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Document extends APIResource {
  /**
   * Cancel document processing
   */
  cancelProcessing(uploadID: string, options?: RequestOptions): APIPromise<DocumentCancelProcessingResponse> {
    return this._client.delete(path`/v1/document/${uploadID}`, options);
  }

  /**
   * Get processing status for an uploaded document.
   *
   * Pass `?timeline=true` to include step-by-step processing detail without changing
   * the default flat status fields.
   */
  getStatus(
    uploadID: string,
    query: DocumentGetStatusParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DocumentGetStatusResponse> {
    return this._client.get(path`/v1/document/status/${uploadID}`, { query, ...options });
  }

  /**
   * Upload and process documents using the pluggable architecture.
   *
   *     **Authentication Required**: Bearer token or API key
   *
   *     **Supported Providers**: TensorLake.ai, Reducto AI, Gemini Vision (fallback)
   *
   *     **Features**:
   *     - Multi-tenant organization/namespace scoping
   *     - Temporal workflow for durable execution
   *     - Real-time WebSocket status updates
   *     - Integration with Parse Server (Post/PostSocial/PageVersion)
   *     - Automatic fallback between providers
   */
  upload(body: DocumentUploadParams, options?: RequestOptions): APIPromise<DocumentUploadResponse> {
    return this._client.post('/v1/document', multipartFormRequestOptions({ body, ...options }, this._client));
  }
}

export type DocumentCancelProcessingResponse = { [key: string]: unknown };

/**
 * GET /v1/document/status/{upload_id} response. Pass ?timeline=true to include
 * timeline.
 */
export interface DocumentGetStatusResponse {
  /**
   * Current processing status
   */
  status: string;

  /**
   * Document upload identifier
   */
  upload_id: string;

  /**
   * Current page being processed
   */
  current_page?: number | null;

  /**
   * Customer-safe error message when processing failed
   */
  error?: string | null;

  /**
   * Additional status message
   */
  message?: string | null;

  /**
   * User-facing document Post ID, when available
   */
  page_id?: string | null;

  /**
   * Overall progress from 0.0 to 1.0
   */
  progress?: number | null;

  /**
   * Optional step-by-step detail included when GET
   * /document/status/{id}?timeline=true.
   */
  timeline?: DocumentGetStatusResponse.Timeline | null;

  /**
   * Timestamp of the latest status update
   */
  timestamp?: string | null;

  /**
   * Total pages in the document
   */
  total_pages?: number | null;

  /**
   * Processing backend type
   */
  workflow_type?: string | null;
}

export namespace DocumentGetStatusResponse {
  /**
   * Optional step-by-step detail included when GET
   * /document/status/{id}?timeline=true.
   */
  export interface Timeline {
    /**
     * Ordered processing steps with per-step status and timing
     */
    steps?: Array<Timeline.Step>;

    /**
     * Total elapsed processing time in milliseconds
     */
    total_elapsed_ms?: number | null;

    /**
     * Timestamp of the latest timeline update
     */
    updated_at?: string | null;
  }

  export namespace Timeline {
    export interface Step {
      /**
       * Stable step identifier for UI rendering
       */
      id: string;

      /**
       * Customer-facing step description
       */
      description: string;

      /**
       * Customer-facing step title
       */
      label: string;

      /**
       * Current state of this step
       */
      status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';

      /**
       * When this step completed
       */
      completed_at?: string | null;

      /**
       * Step duration in milliseconds
       */
      duration_ms?: number | null;

      /**
       * Customer-safe error message for failed steps
       */
      error?: string | null;

      /**
       * User-facing document Post ID, when available
       */
      page_id?: string | null;

      /**
       * Overall pipeline progress when this step was last updated (0.0-1.0)
       */
      progress?: number | null;

      /**
       * When this step started
       */
      started_at?: string | null;

      /**
       * Total pages processed, when known
       */
      total_pages?: number | null;
    }
  }
}

export interface DocumentUploadResponse {
  /**
   * Status and progress of the document upload
   */
  document_status: DocumentUploadResponse.DocumentStatus;

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
   * For backward compatibility
   */
  memories?: Array<Shared.AddMemoryItem> | null;

  /**
   * List of memory items created from the document
   */
  memory_items?: Array<Shared.AddMemoryItem>;

  /**
   * Human-readable status message
   */
  message?: string | null;

  /**
   * 'success', 'processing', 'error', etc.
   */
  status?: string;
}

export namespace DocumentUploadResponse {
  /**
   * Status and progress of the document upload
   */
  export interface DocumentStatus {
    /**
     * 0.0 to 1.0 for percentage
     */
    progress: number;

    current_filename?: string | null;

    current_page?: number | null;

    /**
     * Error message if failed
     */
    error?: string | null;

    /**
     * Post ID in Parse Server (user-facing page ID)
     */
    page_id?: string | null;

    /**
     * Processing status type
     */
    status_type?: 'processing' | 'completed' | 'failed' | 'not_found' | 'queued' | 'cancelled' | null;

    total_pages?: number | null;

    upload_id?: string | null;
  }
}

export interface DocumentGetStatusParams {
  /**
   * When true, include a `timeline` object with ordered processing steps, per-step
   * status, and timing. Default response shape is unchanged.
   */
  timeline?: boolean;
}

export interface DocumentUploadParams {
  file: Uploadable;

  /**
   * @deprecated DEPRECATED: Use policy.transform_embedding instead. If True, applies
   * holographic neural transforms and stores in holographic collection.
   */
  enable_holographic?: boolean;

  /**
   * Your application's user identifier. This is the primary way to identify users.
   * Also accepts legacy 'end_user_id'.
   */
  external_user_id?: string | null;

  /**
   * @deprecated DEPRECATED: Use policy.transform_embedding.domain_id instead.
   * Frequency schema for holographic embedding (e.g. 'cosqa', 'scifact'). Required
   * when enable_holographic=True. Call GET /v1/frequencies to see available schemas.
   */
  frequency_schema_id?: string | null;

  graph_override?: string | null;

  hierarchical_enabled?: boolean;

  /**
   * @deprecated DEPRECATED: Use 'policy' instead. JSON-encoded memory policy.
   * Includes mode ('auto'/'manual'), schema_id, node_constraints (applied in auto
   * mode when present), and OMO fields (consent, risk, acl).
   */
  memory_policy?: string | null;

  metadata?: string | null;

  namespace_id?: string | null;

  /**
   * JSON-encoded unified processing policy (transform_embedding, graph incl.
   * link_to, consent, risk, acl). Applies to all chunks from this document.
   */
  policy?: string | null;

  /**
   * Preferred provider for document processing.
   */
  preferred_provider?: 'gemini' | 'tensorlake' | 'reducto' | 'paddleocr' | 'auto' | null;

  property_overrides?: string | null;

  schema_id?: string | null;

  /**
   * DEPRECATED: Internal Papr Parse user ID. Most developers should use
   * external_user_id.
   */
  user_id?: string | null;

  webhook_secret?: string | null;

  webhook_url?: string | null;
}

export declare namespace Document {
  export {
    type DocumentCancelProcessingResponse as DocumentCancelProcessingResponse,
    type DocumentGetStatusResponse as DocumentGetStatusResponse,
    type DocumentUploadResponse as DocumentUploadResponse,
    type DocumentGetStatusParams as DocumentGetStatusParams,
    type DocumentUploadParams as DocumentUploadParams,
  };
}
