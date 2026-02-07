// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Sync extends APIResource {
  /**
   * Return upserts/deletes since the provided cursor for a user/workspace. Cursor is
   * an opaque watermark over updatedAt and objectId.
   *
   * @example
   * ```ts
   * const response = await client.sync.getDelta();
   * ```
   */
  getDelta(
    query: SyncGetDeltaParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SyncGetDeltaResponse> {
    return this._client.get('/v1/sync/delta', { query, ...options });
  }

  /**
   * Return initial Tier 0 (goals/OKRs/use-cases --> tier 0 memories) and Tier 1 (hot
   * memories) for the requesting user/workspace.
   *
   * This is a minimal initial implementation to enable SDK integration. It uses
   * simple heuristics and will be enhanced with analytics-driven selection.
   *
   * @example
   * ```ts
   * const response = await client.sync.getTiers();
   * ```
   */
  getTiers(body: SyncGetTiersParams, options?: RequestOptions): APIPromise<SyncGetTiersResponse> {
    return this._client.post('/v1/sync/tiers', { body, ...options });
  }
}

export type SyncGetDeltaResponse = { [key: string]: unknown };

/**
 * Response model for sync tiers endpoint
 */
export interface SyncGetTiersResponse {
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
   * Whether there are more items available
   */
  has_more?: boolean;

  /**
   * Cursor for pagination
   */
  next_cursor?: string | null;

  /**
   * 'success' or 'error'
   */
  status?: string;

  /**
   * Tier 0 items (goals/OKRs/use-cases)
   */
  tier0?: Array<Shared.Memory>;

  /**
   * Tier 1 items (hot memories)
   */
  tier1?: Array<Shared.Memory>;

  /**
   * Transition items between tiers
   */
  transitions?: Array<{ [key: string]: unknown }>;
}

export interface SyncGetDeltaParams {
  /**
   * Opaque cursor from previous sync
   */
  cursor?: string | null;

  include_embeddings?: boolean;

  limit?: number;

  workspace_id?: string | null;
}

export interface SyncGetTiersParams {
  /**
   * Max items to embed per tier to control latency
   */
  embed_limit?: number;

  /**
   * Embedding model hint: 'sbert' or 'bigbird' or 'Qwen4B'
   */
  embed_model?: string;

  /**
   * Embedding format: 'int8' (quantized, 4x smaller, default for efficiency),
   * 'float32' (full precision, recommended for CoreML/ANE fp16 models). Only applies
   * to Tier1; Tier0 always uses float32 when embeddings are included.
   */
  embedding_format?: 'int8' | 'float32';

  /**
   * Optional external user ID to filter tiers by a specific external user. If both
   * user_id and external_user_id are provided, user_id takes precedence.
   */
  external_user_id?: string | null;

  /**
   * Include embeddings in the response. Format controlled by embedding_format
   * parameter.
   */
  include_embeddings?: boolean;

  /**
   * Max Tier 0 items (goals/OKRs/use-cases)
   */
  max_tier0?: number;

  /**
   * Max Tier 1 items (hot memories)
   */
  max_tier1?: number;

  /**
   * Optional namespace ID for multi-tenant scoping. When provided, tiers are scoped
   * to memories within this namespace.
   */
  namespace_id?: string | null;

  /**
   * Optional organization ID for multi-tenant scoping. When provided, tiers are
   * scoped to memories within this organization.
   */
  organization_id?: string | null;

  /**
   * Optional internal user ID to filter tiers by a specific user. If not provided,
   * results are not filtered by user. If both user_id and external_user_id are
   * provided, user_id takes precedence.
   */
  user_id?: string | null;

  /**
   * Optional workspace id to scope tiers
   */
  workspace_id?: string | null;
}

export declare namespace Sync {
  export {
    type SyncGetDeltaResponse as SyncGetDeltaResponse,
    type SyncGetTiersResponse as SyncGetTiersResponse,
    type SyncGetDeltaParams as SyncGetDeltaParams,
    type SyncGetTiersParams as SyncGetTiersParams,
  };
}
