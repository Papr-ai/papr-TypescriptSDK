// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DomainsAPI from './domains';
import { DomainCreateParams, DomainCreateResponse, DomainListResponse, Domains } from './domains';
import * as TransformAPI from './transform';
import {
  Transform,
  TransformCreateBatchParams,
  TransformCreateBatchResponse,
  TransformCreateParams,
  TransformCreateResponse,
} from './transform';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Holographic extends APIResource {
  transform: TransformAPI.Transform = new TransformAPI.Transform(this._client);
  domains: DomainsAPI.Domains = new DomainsAPI.Domains(this._client);

  /**
   * Extracts frequency metadata from text content without requiring an embedding.
   * Returns metadata + phases that can be used with the on-device SDK for local
   * transforms. Call this once per document at index time, then use phases locally
   * for scoring.
   *
   * @example
   * ```ts
   * const response = await client.holographic.extractMetadata({
   *   content: 'content',
   * });
   * ```
   */
  extractMetadata(
    body: HolographicExtractMetadataParams,
    options?: RequestOptions,
  ): APIPromise<HolographicExtractMetadataResponse> {
    return this._client.post('/v1/holographic/metadata', { body, ...options });
  }

  /**
   * The simplest entry point — zero infrastructure needed. Send your search query
   * and candidate results, get back better-ranked results using CAESAR ensemble.
   *
   * **Auto-detection:** candidates with `phases` use the fast path (~2-5ms each).
   * Candidates with only `content` use the cold path (~100ms each, includes LLM
   * extraction). You can mix both in a single request.
   *
   * @example
   * ```ts
   * const response = await client.holographic.rerank({
   *   candidates: [{ id: 'doc_1' }, { id: 'doc_2' }],
   *   query:
   *     'How does troponin relate to myocardial infarction?',
   * });
   * ```
   */
  rerank(body: HolographicRerankParams, options?: RequestOptions): APIPromise<HolographicRerankResponse> {
    return this._client.post('/v1/holographic/rerank', { body, ...options });
  }
}

/**
 * Response for POST /v1/holographic/metadata
 */
export interface HolographicExtractMetadataResponse {
  data: HolographicExtractMetadataResponse.Data;

  status?: string;
}

export namespace HolographicExtractMetadataResponse {
  export interface Data {
    domain: string;

    frequency_schema_id: string;

    /**
     * LLM-extracted metadata keyed by frequency field name
     */
    metadata: { [key: string]: unknown };

    /**
     * 14 phase values for on-device transform
     */
    phases: Array<number>;

    timing_ms: number;
  }
}

/**
 * Response for POST /v1/holographic/rerank
 */
export interface HolographicRerankResponse {
  data: HolographicRerankResponse.Data;

  status?: string;
}

export namespace HolographicRerankResponse {
  export interface Data {
    domain: string;

    ensemble_used: string;

    rankings: Array<Data.Ranking>;

    timing_ms: number;

    /**
     * Present when cold path was used. Suggests storing phases for faster reranking.
     */
    optimization_hint?: string | null;
  }

  export namespace Data {
    /**
     * Single ranked result.
     */
    export interface Ranking {
      id: string;

      /**
       * 'fast' (phases provided) or 'cold' (content-only)
       */
      path: string;

      rank: number;

      /**
       * Ensemble score
       */
      score: number;

      /**
       * Per-frequency-field alignment scores (when
       * options.include_frequency_scores=true).
       */
      frequency_scores?: { [key: string]: number } | null;

      /**
       * Original retrieval score if provided
       */
      original_score?: number | null;

      /**
       * Per-method score breakdown (if return_scores=true)
       */
      scores?: { [key: string]: number } | null;
    }
  }
}

export interface HolographicExtractMetadataParams {
  /**
   * Text content for metadata extraction
   */
  content: string;

  /**
   * Optional context metadata (createdAt, sourceType, etc.) to improve extraction.
   */
  context_metadata?: { [key: string]: unknown } | null;

  /**
   * Domain for frequency schema
   */
  domain?: string | null;

  /**
   * Schema override
   */
  frequency_schema_id?: string | null;
}

export interface HolographicRerankParams {
  /**
   * Candidate documents to rerank (max 100)
   */
  candidates: Array<HolographicRerankParams.Candidate>;

  /**
   * The search query text
   */
  query: string;

  /**
   * Domain for frequency schema
   */
  domain?: string | null;

  /**
   * Schema override
   */
  frequency_schema_id?: string | null;

  /**
   * Options for the rerank endpoint.
   */
  options?: HolographicRerankParams.Options | null;

  /**
   * Query embedding in the same space as candidate embeddings. If provided, used for
   * cosine similarity. If omitted, computed server-side (Qwen 2560d).
   */
  query_embedding?: Array<number> | null;

  /**
   * Pre-computed query metadata embeddings from a prior /transform call (keyed by
   * frequency string, e.g. '0.1'). Required for full HCond scoring with phase
   * alignment.
   */
  query_metadata_embeddings?: { [key: string]: Array<number> } | null;

  /**
   * Pre-computed query phases from a prior /transform call. If provided alongside
   * query_embedding, skips LLM extraction entirely (hot path).
   */
  query_phases?: Array<number> | null;

  /**
   * Number of results to return
   */
  top_k?: number;
}

export namespace HolographicRerankParams {
  /**
   * A candidate document for reranking.
   *
   * Auto-detection:
   *
   * - If `phases` is provided → FAST PATH (skip LLM extraction, ~2-5ms)
   * - If only `content` → COLD PATH (LLM extraction + optional cross-encoder,
   *   ~100ms)
   * - Must have at least one of `content` or `phases`
   */
  export interface Candidate {
    /**
     * Unique identifier
     */
    id: string;

    /**
     * Text content. Required for cold path (LLM extraction + cross-encoder).
     */
    content?: string | null;

    /**
     * Optional context metadata for cold-path LLM extraction (createdAt, sourceType,
     * etc.)
     */
    context_metadata?: { [key: string]: unknown } | null;

    /**
     * Base embedding. If missing and content provided, computed server-side.
     */
    embedding?: Array<number> | null;

    /**
     * Pre-computed SBERT metadata embeddings from a prior /transform call (keyed by
     * frequency string, e.g. '0.1'). Enables full HCond scoring.
     */
    metadata_embeddings?: { [key: string]: Array<number> } | null;

    /**
     * Pre-computed phases from a prior /transform call. Enables fast path.
     */
    phases?: Array<number> | null;

    /**
     * Original retrieval score (used as a signal in ensemble methods)
     */
    score?: number | null;
  }

  /**
   * Options for the rerank endpoint.
   */
  export interface Options {
    /**
     * Cross-encoder model name. Options: 'BAAI/bge-reranker-v2-m3' (fast, default),
     * 'Qwen/Qwen3-Reranker-0.6B' (balanced), 'Qwen/Qwen3-Reranker-4B' (best quality).
     */
    cross_encoder_model?: string;

    /**
     * Weight for cross-encoder score in final blend. final = (1 - weight) _ hcond +
     * weight _ cross_encoder. Default 0.3.
     */
    cross_encoder_weight?: number;

    /**
     * Ensemble method: 'auto' (recommended), 'caesar_8', or 'caesar_9'
     */
    ensemble?: 'auto' | 'caesar_8' | 'caesar_9';

    /**
     * Filter candidates by minimum per-frequency-field score. Keys are field names
     * (e.g. 'date', 'entity'), values are min scores [0, 1].
     */
    frequency_filters?: { [key: string]: number } | null;

    /**
     * Include per-frequency-field alignment scores (e.g. date: 0.92, entity: 0.45).
     * Requires return_scores=true to take effect.
     */
    include_frequency_scores?: boolean;

    /**
     * Include per-method score breakdown in response
     */
    return_scores?: boolean;

    /**
     * Specific scoring method from 160+ available (power user). Overrides ensemble.
     */
    scoring_method?: string | null;

    /**
     * Enable cross-encoder scoring. Requires content on candidates. Adds ~20-50ms per
     * candidate but improves ranking quality by 3-8%%.
     */
    use_cross_encoder?: boolean;
  }
}

Holographic.Transform = Transform;
Holographic.Domains = Domains;

export declare namespace Holographic {
  export {
    type HolographicExtractMetadataResponse as HolographicExtractMetadataResponse,
    type HolographicRerankResponse as HolographicRerankResponse,
    type HolographicExtractMetadataParams as HolographicExtractMetadataParams,
    type HolographicRerankParams as HolographicRerankParams,
  };

  export {
    Transform as Transform,
    type TransformCreateResponse as TransformCreateResponse,
    type TransformCreateBatchResponse as TransformCreateBatchResponse,
    type TransformCreateParams as TransformCreateParams,
    type TransformCreateBatchParams as TransformCreateBatchParams,
  };

  export {
    Domains as Domains,
    type DomainCreateResponse as DomainCreateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainCreateParams as DomainCreateParams,
  };
}
