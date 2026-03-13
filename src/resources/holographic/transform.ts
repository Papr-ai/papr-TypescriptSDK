// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Transform extends APIResource {
  /**
   * Core BYOE endpoint. Send text content and your base embedding (any dimensions)
   * to get back holographic-transformed embeddings. Use `output` to control which
   * fields are returned. Default: rotation_v3 + metadata.
   *
   * @example
   * ```ts
   * const transform = await client.holographic.transform.create(
   *   {
   *     content:
   *       'The patient presents with elevated troponin levels indicating myocardial damage',
   *     embedding: [0.1, -0.2, 0.3],
   *   },
   * );
   * ```
   */
  create(body: TransformCreateParams, options?: RequestOptions): APIPromise<TransformCreateResponse> {
    return this._client.post('/v1/holographic/transform', { body, ...options });
  }

  /**
   * Transform up to 50 items in a single request. Same as /transform but batched.
   *
   * @example
   * ```ts
   * const response =
   *   await client.holographic.transform.createBatch({
   *     items: [
   *       {
   *         id: 'id',
   *         content: 'content',
   *         embedding: [0],
   *       },
   *     ],
   *   });
   * ```
   */
  createBatch(
    body: TransformCreateBatchParams,
    options?: RequestOptions,
  ): APIPromise<TransformCreateBatchResponse> {
    return this._client.post('/v1/holographic/transform/batch', { body, ...options });
  }
}

/**
 * Response for POST /v1/holographic/transform
 */
export interface TransformCreateResponse {
  /**
   * Inner data for transform response — only requested fields are populated.
   */
  data: TransformCreateResponse.Data;

  status?: string;
}

export namespace TransformCreateResponse {
  /**
   * Inner data for transform response — only requested fields are populated.
   */
  export interface Data {
    /**
     * Input embedding dimensionality
     */
    base_dim: number;

    /**
     * Domain used for this transform
     */
    domain: string;

    /**
     * Exact frequency schema ID used
     */
    frequency_schema_id: string;

    /**
     * Server-side processing time in milliseconds
     */
    timing_ms: number;

    /**
     * Original embedding echoed back
     */
    base?: Array<number> | null;

    /**
     * Concatenation transform (input_dims + 196)
     */
    concat?: Array<number> | null;

    /**
     * LLM-extracted metadata keyed by frequency field name
     */
    metadata?: { [key: string]: unknown } | null;

    /**
     * Per-frequency metadata embeddings
     */
    metadata_embeddings?: { [key: string]: Array<number> } | null;

    /**
     * 14 raw phase values for on-device reconstruction and fast-path rerank
     */
    phases?: Array<number> | null;

    /**
     * Rotation V1 transform (same dims as input)
     */
    rotation_v1?: Array<number> | null;

    /**
     * Rotation V2 transform (same dims as input)
     */
    rotation_v2?: Array<number> | null;

    /**
     * Rotation V3 transform (recommended for search, same dims as input)
     */
    rotation_v3?: Array<number> | null;
  }
}

/**
 * Response for POST /v1/holographic/transform/batch
 */
export interface TransformCreateBatchResponse {
  results: Array<TransformCreateBatchResponse.Result>;

  timing_ms: number;

  total: number;

  status?: string;
}

export namespace TransformCreateBatchResponse {
  /**
   * Single result in a batch transform response.
   */
  export interface Result {
    id: string;

    /**
     * Inner data for transform response — only requested fields are populated.
     */
    data: Result.Data;
  }

  export namespace Result {
    /**
     * Inner data for transform response — only requested fields are populated.
     */
    export interface Data {
      /**
       * Input embedding dimensionality
       */
      base_dim: number;

      /**
       * Domain used for this transform
       */
      domain: string;

      /**
       * Exact frequency schema ID used
       */
      frequency_schema_id: string;

      /**
       * Server-side processing time in milliseconds
       */
      timing_ms: number;

      /**
       * Original embedding echoed back
       */
      base?: Array<number> | null;

      /**
       * Concatenation transform (input_dims + 196)
       */
      concat?: Array<number> | null;

      /**
       * LLM-extracted metadata keyed by frequency field name
       */
      metadata?: { [key: string]: unknown } | null;

      /**
       * Per-frequency metadata embeddings
       */
      metadata_embeddings?: { [key: string]: Array<number> } | null;

      /**
       * 14 raw phase values for on-device reconstruction and fast-path rerank
       */
      phases?: Array<number> | null;

      /**
       * Rotation V1 transform (same dims as input)
       */
      rotation_v1?: Array<number> | null;

      /**
       * Rotation V2 transform (same dims as input)
       */
      rotation_v2?: Array<number> | null;

      /**
       * Rotation V3 transform (recommended for search, same dims as input)
       */
      rotation_v3?: Array<number> | null;
    }
  }
}

export interface TransformCreateParams {
  /**
   * Text content for LLM metadata extraction
   */
  content: string;

  /**
   * Base embedding vector (any dimensionality)
   */
  embedding: Array<number>;

  /**
   * Domain for frequency schema selection (e.g. 'biomedical', 'code', 'general')
   */
  domain?: string | null;

  /**
   * Specific frequency schema ID override (e.g. 'biomedical:scifact:2.0.0'). Takes
   * precedence over domain.
   */
  frequency_schema_id?: string | null;

  /**
   * Which output fields to return. Default: ['rotation_v3', 'metadata']. Request
   * only what you need to minimize response size.
   */
  output?: Array<
    | 'base'
    | 'rotation_v1'
    | 'rotation_v2'
    | 'rotation_v3'
    | 'concat'
    | 'phases'
    | 'metadata'
    | 'metadata_embeddings'
  > | null;
}

export interface TransformCreateBatchParams {
  /**
   * Items to transform (max 50)
   */
  items: Array<TransformCreateBatchParams.Item>;

  /**
   * Domain for all items
   */
  domain?: string | null;

  /**
   * Schema override for all items
   */
  frequency_schema_id?: string | null;

  /**
   * Which output fields to return for each item
   */
  output?: Array<
    | 'base'
    | 'rotation_v1'
    | 'rotation_v2'
    | 'rotation_v3'
    | 'concat'
    | 'phases'
    | 'metadata'
    | 'metadata_embeddings'
  > | null;
}

export namespace TransformCreateBatchParams {
  /**
   * Single item in a batch transform request.
   */
  export interface Item {
    /**
     * Unique identifier for this item
     */
    id: string;

    /**
     * Text content for metadata extraction
     */
    content: string;

    /**
     * Base embedding vector
     */
    embedding: Array<number>;
  }
}

export declare namespace Transform {
  export {
    type TransformCreateResponse as TransformCreateResponse,
    type TransformCreateBatchResponse as TransformCreateBatchResponse,
    type TransformCreateParams as TransformCreateParams,
    type TransformCreateBatchParams as TransformCreateBatchParams,
  };
}
