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
   * Get processing status for an uploaded document
   */
  getStatus(uploadID: string, options?: RequestOptions): APIPromise<DocumentGetStatusResponse> {
    return this._client.get(path`/v1/document/status/${uploadID}`, options);
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

export type DocumentGetStatusResponse = { [key: string]: unknown };

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

export interface DocumentUploadParams {
  file: Uploadable;

  end_user_id?: string | null;

  graph_override?: string | null;

  hierarchical_enabled?: boolean;

  metadata?: string | null;

  namespace?: string | null;

  /**
   * Preferred provider for document processing.
   */
  preferred_provider?: 'gemini' | 'tensorlake' | 'reducto' | 'auto' | null;

  property_overrides?: string | null;

  schema_id?: string | null;

  simple_schema_mode?: boolean;

  user_id?: string | null;

  webhook_secret?: string | null;

  webhook_url?: string | null;
}

export declare namespace Document {
  export {
    type DocumentCancelProcessingResponse as DocumentCancelProcessingResponse,
    type DocumentGetStatusResponse as DocumentGetStatusResponse,
    type DocumentUploadResponse as DocumentUploadResponse,
    type DocumentUploadParams as DocumentUploadParams,
  };
}
