// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GraphAPI from './graph';
import * as DomainsAPI from './domains';
import {
  CatalogBufferEntry,
  CatalogEntityCluster,
  CatalogRelationshipPattern,
  DomainCreateParams,
  DomainCreateResponse,
  DomainDeleteResponse,
  DomainListResponse,
  DomainRetrieveResponse,
  DomainUpdateParams,
  DomainUpdateResponse,
  Domains,
  SignalField,
} from './domains';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Graph extends APIResource {
  domains: DomainsAPI.Domains = new DomainsAPI.Domains(this._client);

  /**
   * Rerank candidate documents against a query
   */
  rerank(body: GraphRerankParams, options?: RequestOptions): APIPromise<GraphRerankResponse> {
    return this._client.post('/v1/graph/rerank', { body, ...options });
  }

  /**
   * Vector-store agnostic producer.
   *
   * Returns everything you'd want to index in any vector DB -- base embedding,
   * 14-band extracted signals, per-band SBERT/Qwen embeddings, phases, and optional
   * rot_v3 / concat reconstructions.
   *
   * Uses the SAME extraction + embedding path as /v1/graph/rerank uses for queries,
   * so artifacts produced here can be scored by /v1/graph/rerank without any drift.
   */
  transform(body: GraphTransformParams, options?: RequestOptions): APIPromise<GraphTransformResponse> {
    return this._client.post('/v1/graph/transform', { body, ...options });
  }
}

/**
 * Object form of a document (when developer wants to attach an id/metadata).
 *
 * Either `embedding` or `text` should be set; both are accepted by the rerank
 * pipeline. `metadata` round-trips into the response if requested.
 *
 * BYO artifact fields (`signals`, `signal_embeddings`, `phases`, `rot_v3`,
 * `concat_embedding`) are all optional and let callers skip the per-doc
 * extract+embed pass at scoring time. They map 1:1 to the producer fields returned
 * by /v1/graph/transform.
 */
export interface DocumentInput {
  /**
   * Stable doc identifier echoed back in results.
   */
  id?: string | null;

  /**
   * Pre-computed concat reconstruction.
   */
  concat_embedding?: Array<number> | null;

  /**
   * Pre-computed base embedding (BYOE). Qwen 2560-d expected.
   */
  embedding?: Array<number> | null;

  /**
   * Free-form user metadata, echoed back if return_documents=true.
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * Pre-computed per-frequency phase angles (14-dim). If provided, phase computation
   * is skipped.
   */
  phases?: Array<number> | null;

  /**
   * Pre-computed rotation v3 vector.
   */
  rot_v3?: Array<number> | null;

  /**
   * Pre-computed signal band-name -> vector (typically 384d sbert). If provided,
   * per-band embedding step is skipped.
   */
  signal_embeddings?: { [key: string]: Array<number> } | null;

  /**
   * Pre-extracted signal band-name -> text. If provided, the LLM extractor is
   * skipped for this doc.
   */
  signals?: { [key: string]: string } | null;

  /**
   * Document text (if not BYOE).
   */
  text?: string | null;
}

/**
 * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
 */
export interface GraphDomainRoutingConfig {
  /**
   * Which ranking is exposed as rankings['caesar4'] to CAESAR-VIII rules
   * (c4_c7_diverge, etc.). Accepts 'v4a' (default — alias to family-routed v4a / v3a
   * fallback), 'v3a' (force v3a only), or 'legacy' (SKIP the alias; keep the
   * original Jaccard / trust-score selection at rankings['caesar4'] and stash a copy
   * at rankings['_caesar4_legacy']). Use 'legacy' to A/B C-VIII rules against the
   * original SciFact calibration semantics. Label-free in all modes.
   */
  caesar4_source?: string | null;

  /**
   * Minimum phi to allow caesar7/baseline_rerank to bypass holographic floor.
   */
  ce_gate_min_phi?: number | null;

  /**
   * Global SciFact routing rule names to skip for this domain (e.g.
   * 'DANGER_LOW_RSG_LOW_PHI').
   */
  disabled_rules?: Array<string> | null;

  /**
   * Stacked EGR entailment fusion weight (0–1). Lower for code domains.
   */
  egr_lambda_ce?: number | null;

  /**
   * Named domain rule packs to run after global rules (e.g. 'cosqa_caesar8_v2').
   */
  enabled_rule_packs?: Array<string> | null;

  /**
   * CAESAR-VIII initial source for the CE-on path. Domain defaults may pin
   * 'caesar4_5_v4a' on code_search for public enhanced; public max overrides to
   * 'caesar7' unless this field is set.
   */
  enhanced_initial_source?: string | null;

  /**
   * When true, never return a ranking worse than max(v4a, baseline) unless CE gate
   * (ce_gate_min_phi) passes.
   */
  holographic_floor?: boolean | null;

  /**
   * Optional CaesarConfig field overrides keyed by threshold name (e.g.
   * {'cmas_c4_trust_jaccard_threshold': 0.95}).
   */
  threshold_overrides?: { [key: string]: number } | null;
}

export interface GraphRerankResponse {
  /**
   * Request id for log correlation.
   */
  id: string;

  meta: GraphRerankResponse.Meta;

  results: Array<GraphRerankResponse.Result>;
}

export namespace GraphRerankResponse {
  export interface Meta {
    domain_id: string;

    method_used: 'enhanced' | 'max' | 'fast';

    /**
     * Mini interactions consumed.
     */
    billed_units?: number;

    /**
     * Debug payload when return_debug=true. Includes: `selection_signals` (scalar
     * routing inputs), `v3a_routing` / `v4a_routing` (method selection diagnostics),
     * `routing_signals` (method_bgrs, method_t1lrs, pool quality), `spread_signals`
     * (gauss/sfi/hcond spread boosters), `signal_multipliers`, `signal_weights`,
     * `signal_weights_sparse`, `routing_config`, `domain_method_priors`, `doc_scores`
     * (per-doc method score vectors), `router_state` (v4a EMA snapshot), `rule_fired`,
     * `zone`, `caesar8_mode`. Per-phase timings live in `timing_ms.phases`.
     */
    debug?: { [key: string]: unknown } | null;

    /**
     * Latency breakdown in milliseconds. Top-level keys: `services_init`, `pipeline`,
     * `total`. Optional `phases` is a nested dict with per-stage timings:
     * query_processing, retrieval, rerank, caesar_routing.
     */
    timing_ms?: { [key: string]: unknown };

    /**
     * Cohere/Voyage-compatible usage block, e.g. {'search_units': 1, 'docs_scored':
     * 100}. Populated for /v1/graph/rerank and /v1/graph/search.
     */
    usage?: { [key: string]: unknown } | null;
  }

  export interface Result {
    /**
     * Position in the input documents array.
     */
    index: number;

    /**
     * Final ranked score — the real similarity from the CAESAR-8 routed method.
     */
    relevance_score: number;

    /**
     * Doc id if input was an object, else null.
     */
    id?: string | null;

    /**
     * Kitchen-sink: every \*\_sim signal computed by the pipeline. Only if
     * return_debug=true. NOT a stable contract — keys may change.
     */
    debug_scores?: { [key: string]: number } | null;

    /**
     * Object form of a document (when developer wants to attach an id/metadata).
     *
     * Either `embedding` or `text` should be set; both are accepted by the rerank
     * pipeline. `metadata` round-trips into the response if requested.
     *
     * BYO artifact fields (`signals`, `signal_embeddings`, `phases`, `rot_v3`,
     * `concat_embedding`) are all optional and let callers skip the per-doc
     * extract+embed pass at scoring time. They map 1:1 to the producer fields returned
     * by /v1/graph/transform.
     */
    document?: GraphAPI.DocumentInput | null;

    /**
     * Which method CAESAR-8 routed to for this query (e.g. 'caesar7',
     * 'baseline_rerank'). Tells you what kind of signal `relevance_score` reflects.
     */
    score_method?: string | null;

    /**
     * Stable, documented signals (only if return_signal_scores=true). Always includes
     * `base_sim` and `caesar8_score`. On `enhanced` method, also includes
     * `rot_k{32,128,256,512}_sim` low-rank rotation variants.
     */
    signal_scores?: { [key: string]: number } | null;

    /**
     * Per-band signal similarities, keyed by band name (e.g. {'causal_agent': 0.83,
     * 'causal_verb': 0.91}). Only set if return_signal_scores=true and the pipeline
     * computed gated SFI.
     */
    signal_scores_by_band?: { [key: string]: number } | null;
  }
}

/**
 * Transform response - returns artifacts that can be passed to rerank/search.
 *
 * All fields map 1:1 to DocumentInput fields for rerank.
 */
export interface GraphTransformResponse {
  /**
   * Request id for log correlation.
   */
  id: string;

  /**
   * Domain used for extraction.
   */
  domain_id: string;

  /**
   * Base embedding (normalized Qwen 2560-d).
   */
  embedding: Array<number>;

  /**
   * Per-frequency phase angles (14-dim).
   */
  phases: Array<number>;

  /**
   * Base + bands concatenation (only when return_concat=true).
   */
  concat_embedding?: Array<number> | null;

  /**
   * Timing and stats.
   */
  meta?: { [key: string]: unknown };

  /**
   * Rotation v3 vector (only when return_rot_v3=true).
   */
  rot_v3?: Array<number> | null;

  /**
   * Signal band-name -> embedding vector (384-d sbert or 2560-d qwen).
   */
  signal_embeddings?: { [key: string]: Array<number> };

  /**
   * Signal band-name -> extracted text (e.g. {'docstring': '...', 'function_name':
   * '...'}).
   */
  signals?: { [key: string]: string };
}

export interface GraphRerankParams {
  /**
   * Candidate documents (string or DocumentInput with pre-computed artifacts).
   */
  documents: Array<string | DocumentInput>;

  /**
   * Query text (string) or QueryItem with pre-computed artifacts.
   */
  query: string | GraphRerankParams.QueryItem;

  /**
   * Domain shortname or full schema id controlling which frequency bands and
   * extraction rules are used. Built-in shortnames: "general" (default), "code",
   * "cosqa", "codetrans", "codetransocean", "codetransocean_hybrid", "text2sql",
   * "scifact", "nfcorpus", "fiqa", "legal", "medical", "ecommerce", "coffee_shops".
   * You can also pass a full schema id (e.g. "code_search:cosqa:2.0.0") or a custom
   * domain_id registered via POST /v1/graph/domains.
   */
  domain_id?: string | null;

  /**
   * Public: enhanced (CAESAR-8) or max (CE+entailment). Accepts deprecated
   * 'fast'/'enhanced' aliases.
   */
  method?: 'fast' | 'enhanced';

  /**
   * If true, include CAESAR meta-signals + timing in `meta.debug`.
   */
  return_debug?: boolean;

  /**
   * If true, echo back each input document in the result.
   */
  return_documents?: boolean;

  /**
   * If true, each result carries `signal_scores` (method-level scores like
   * `base_sim`, `caesar8_score`) and `signal_scores_by_band` (per-frequency band
   * alignments such as `key_apis`, `language`).
   */
  return_signal_scores?: boolean;

  /**
   * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
   */
  routing_config?: GraphDomainRoutingConfig | null;

  /**
   * Embedder for per-band signal vectors when extracting query/docs. 'sbert' (384d,
   * default) is ~10x cheaper to store than 'qwen' (2560d). Must match the embedder
   * used for any BYO signal_embeddings.
   */
  signal_embedder?: 'sbert' | 'qwen';

  /**
   * Hard cutoffs on per-frequency signals, e.g. {'domain_match': 0.6}. Docs below
   * are dropped.
   */
  signal_filters?: { [key: string]: number } | null;

  /**
   * Per-frequency scoring weight multipliers. Keys may be field names (e.g.
   * 'claim_stance', 'causal_verb') or Hz-strings (e.g. '19.0'). Values: 'auto'
   * (default) or 1.0 = unchanged, 2.0 = 2x boost, 0.0 = disable that band. Fields
   * not specified default to 'auto'. Stacks on top of the schema-level
   * FrequencyField.weight multipliers; request-level overrides win on conflict.
   */
  signal_multipliers?: { [key: string]: unknown } | null;

  /**
   * Return at most this many results. Defaults to len(documents).
   */
  top_k?: number | null;
}

export namespace GraphRerankParams {
  /**
   * Query with optional pre-computed artifacts from /v1/graph/transform.
   *
   * Similar to DocumentInput but for queries. Pass pre-computed artifacts to skip
   * LLM extraction and embedding for faster reranking.
   */
  export interface QueryItem {
    /**
     * Query text.
     */
    text: string;

    /**
     * Pre-computed concat reconstruction.
     */
    concat_embedding?: Array<number> | null;

    /**
     * Pre-computed base embedding. Skips embedder call.
     */
    embedding?: Array<number> | null;

    /**
     * Pre-computed per-frequency phase angles (14-dim).
     */
    phases?: Array<number> | null;

    /**
     * Pre-computed rotation v3 vector.
     */
    rot_v3?: Array<number> | null;

    /**
     * Pre-computed signal band-name -> vector. Skips per-band embed.
     */
    signal_embeddings?: { [key: string]: Array<number> } | null;

    /**
     * Pre-extracted signal band-name -> text. Skips LLM extractor.
     */
    signals?: { [key: string]: string } | null;
  }
}

export interface GraphTransformParams {
  /**
   * Source text to transform.
   */
  text: string;

  /**
   * Domain shortname or full schema id controlling which frequency bands and
   * extraction rules are used. Built-in shortnames: "general" (default), "code",
   * "cosqa", "codetrans", "codetransocean", "codetransocean_hybrid", "text2sql",
   * "scifact", "nfcorpus", "fiqa", "legal", "medical", "ecommerce", "coffee_shops".
   * You can also pass a full schema id (e.g. "code_search:cosqa:2.0.0") or a custom
   * domain_id registered via POST /v1/graph/domains.
   */
  domain_id?: string | null;

  /**
   * Optional caller-provided base embedding (Qwen 2560-d). If omitted, the server
   * computes it.
   */
  embedding?: Array<number> | null;

  /**
   * Free-form user metadata to attach (optional, not used for scoring).
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * If true, include the base + bands concatenation embedding.
   */
  return_concat?: boolean;

  /**
   * If true, include the rot_v3 vector in the response.
   */
  return_rot_v3?: boolean;

  /**
   * Embedder for per-band signal vectors. 'sbert' (384d, default) is ~10x cheaper to
   * store than 'qwen' (2560d, matched to base).
   */
  signal_embedder?: 'sbert' | 'qwen';
}

Graph.Domains = Domains;

export declare namespace Graph {
  export {
    type DocumentInput as DocumentInput,
    type GraphDomainRoutingConfig as GraphDomainRoutingConfig,
    type GraphRerankResponse as GraphRerankResponse,
    type GraphTransformResponse as GraphTransformResponse,
    type GraphRerankParams as GraphRerankParams,
    type GraphTransformParams as GraphTransformParams,
  };

  export {
    Domains as Domains,
    type CatalogBufferEntry as CatalogBufferEntry,
    type CatalogEntityCluster as CatalogEntityCluster,
    type CatalogRelationshipPattern as CatalogRelationshipPattern,
    type SignalField as SignalField,
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainUpdateResponse as DomainUpdateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainDeleteResponse as DomainDeleteResponse,
    type DomainCreateParams as DomainCreateParams,
    type DomainUpdateParams as DomainUpdateParams,
  };
}
