// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';

export class Transform extends APIResource {}

/**
 * Inner data for transform response — only requested fields are populated.
 */
export interface TransformData {
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
   * Adaptive per-field weights (queries only, when is_query=true). Pass to /rerank
   * as query_dimension_weights to skip recomputation.
   */
  dimension_weights?: { [key: string]: number } | null;

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

export declare namespace Transform {
  export { type TransformData as TransformData };
}
