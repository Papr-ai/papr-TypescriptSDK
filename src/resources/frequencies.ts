// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Frequencies extends APIResource {}

/**
 * Single frequency band definition.
 */
export interface FrequencyFieldResponse {
  /**
   * Frequency in Hz (brain-inspired band)
   */
  frequency_hz: number;

  /**
   * Field name extracted at this frequency
   */
  name: string;

  /**
   * Field type: ENUM, FREE_TEXT, NUMERIC, DATE, MULTI_VALUE
   */
  type: string;

  /**
   * Human-readable field description
   */
  description?: string;

  /**
   * Default weight for this frequency band
   */
  weight?: number;
}

/**
 * Operational configuration for a frequency schema.
 */
export interface SchemaConfigResponse {
  /**
   * Contrast enhancement gamma
   */
  contrast_gamma?: number;

  /**
   * Cross-encoder reranking model
   */
  cross_encoder_model?: string;

  /**
   * Number of candidates for cross-encoder reranking
   */
  cross_encoder_topk?: number;

  /**
   * Default scoring method for this schema
   */
  default_scoring_method?: string;

  /**
   * Path to DSPy-optimized extractor model (null = use direct LLM)
   */
  dspy_model_path?: string | null;

  /**
   * Enable entailment-gated reranking (EGR)
   */
  enable_entailment_rerank?: boolean;

  /**
   * LLM model for metadata extraction
   */
  llm_metadata_model?: string;

  /**
   * Over-fetch count from Qdrant for reranking
   */
  qdrant_topk?: number;

  /**
   * Enable query-adaptive frequency weights
   */
  use_adaptive_weights?: boolean;

  /**
   * Enable complex interference scoring (PDCI, SFI)
   */
  use_complex_interference?: boolean;

  /**
   * Enable sparse frequency weights
   */
  use_sparse_weights?: boolean;

  /**
   * Frequency weight mode (legacy_sparse, code_search_v2, hybrid_optimized_v2)
   */
  weight_mode?: string;
}

export declare namespace Frequencies {
  export {
    type FrequencyFieldResponse as FrequencyFieldResponse,
    type SchemaConfigResponse as SchemaConfigResponse,
  };
}
