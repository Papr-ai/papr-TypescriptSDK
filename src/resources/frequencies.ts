// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FrequenciesAPI from './frequencies';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Frequencies extends APIResource {
  /**
   * Retrieve a specific frequency schema by its full ID (e.g.
   * 'code_search:cosqa:2.0.0') or shorthand alias (e.g. 'cosqa').
   */
  retrieve(frequencySchemaID: string, options?: RequestOptions): APIPromise<FrequencyRetrieveResponse> {
    return this._client.get(path`/v1/frequencies/${frequencySchemaID}`, options);
  }

  /**
   * Returns all built-in frequency schemas with their field definitions and
   * operational configuration. Use the schema_id or a shorthand alias when adding or
   * searching memories with holographic embedding enabled.
   */
  list(options?: RequestOptions): APIPromise<FrequencyListResponse> {
    return this._client.get('/v1/frequencies', options);
  }
}

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

/**
 * Full frequency schema with fields and config.
 */
export interface FrequencyRetrieveResponse {
  /**
   * Operational configuration
   */
  config: SchemaConfigResponse;

  /**
   * Domain (e.g. code_search, biomedical)
   */
  domain: string;

  /**
   * Frequency band definitions
   */
  frequencies: Array<FrequencyFieldResponse>;

  /**
   * Schema name
   */
  name: string;

  /**
   * Number of frequency bands
   */
  num_frequencies: number;

  /**
   * Unique schema ID (domain:name:version)
   */
  schema_id: string;

  /**
   * Schema version
   */
  version: string;

  /**
   * Human-readable description
   */
  description?: string;
}

/**
 * Response for listing all frequency schemas.
 */
export interface FrequencyListResponse {
  schemas: Array<FrequencyListResponse.Schema>;

  total: number;

  /**
   * Shorthand aliases (e.g. 'cosqa' -> 'code_search:cosqa:2.0.0')
   */
  shortcuts?: { [key: string]: string };

  success?: boolean;
}

export namespace FrequencyListResponse {
  /**
   * Full frequency schema with fields and config.
   */
  export interface Schema {
    /**
     * Operational configuration
     */
    config: FrequenciesAPI.SchemaConfigResponse;

    /**
     * Domain (e.g. code_search, biomedical)
     */
    domain: string;

    /**
     * Frequency band definitions
     */
    frequencies: Array<FrequenciesAPI.FrequencyFieldResponse>;

    /**
     * Schema name
     */
    name: string;

    /**
     * Number of frequency bands
     */
    num_frequencies: number;

    /**
     * Unique schema ID (domain:name:version)
     */
    schema_id: string;

    /**
     * Schema version
     */
    version: string;

    /**
     * Human-readable description
     */
    description?: string;
  }
}

export declare namespace Frequencies {
  export {
    type FrequencyFieldResponse as FrequencyFieldResponse,
    type SchemaConfigResponse as SchemaConfigResponse,
    type FrequencyRetrieveResponse as FrequencyRetrieveResponse,
    type FrequencyListResponse as FrequencyListResponse,
  };
}
