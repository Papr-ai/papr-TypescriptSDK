// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CatalogAPI from './catalog';
import { Catalog as CatalogAPICatalog, CatalogRefreshResponse, CatalogRetrieveResponse } from './catalog';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Domains extends APIResource {
  catalog: CatalogAPI.Catalog = new CatalogAPI.Catalog(this._client);

  /**
   * Create a custom domain
   */
  create(body: DomainCreateParams, options?: RequestOptions): APIPromise<DomainCreateResponse> {
    return this._client.post('/v1/graph/domains', { body, ...options });
  }

  /**
   * Get a single domain by id
   */
  retrieve(domainID: string, options?: RequestOptions): APIPromise<DomainRetrieveResponse> {
    return this._client.get(path`/v1/graph/domains/${domainID}`, options);
  }

  /**
   * Update name, description, or signal_multipliers for a custom domain
   */
  update(
    domainID: string,
    body: DomainUpdateParams,
    options?: RequestOptions,
  ): APIPromise<DomainUpdateResponse> {
    return this._client.put(path`/v1/graph/domains/${domainID}`, { body, ...options });
  }

  /**
   * List available domains (builtins + caller's custom domains)
   */
  list(options?: RequestOptions): APIPromise<DomainListResponse> {
    return this._client.get('/v1/graph/domains', options);
  }

  /**
   * Delete a custom domain
   */
  delete(domainID: string, options?: RequestOptions): APIPromise<DomainDeleteResponse> {
    return this._client.delete(path`/v1/graph/domains/${domainID}`, options);
  }
}

export interface DomainCreateResponse {
  description: string;

  domain_id: string;

  name: string;

  signals: Array<DomainCreateResponse.Signal>;

  /**
   * True for built-in domains shipped with Papr (read-only).
   */
  builtin?: boolean;

  /**
   * Curated summary of what's in a domain's frequency space.
   */
  catalog?: DomainCreateResponse.Catalog | null;

  /**
   * Buffered raw signals awaiting LLM clustering (internal).
   */
  catalog_buffer?: Array<DomainCreateResponse.CatalogBuffer>;

  /**
   * Catalog settings on a domain.
   */
  catalog_config?: DomainCreateResponse.CatalogConfig | null;

  created_at?: string | null;

  /**
   * Namespace this domain belongs to, if any.
   */
  owner_namespace_id?: string | null;

  /**
   * Organization that owns this domain.
   */
  owner_organization_id?: string | null;

  owner_user_id?: string | null;

  /**
   * Workspace that owns this domain. Domains are scoped to workspace when set.
   */
  owner_workspace_id?: string | null;

  /**
   * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
   */
  routing_config?: DomainCreateResponse.RoutingConfig | null;

  /**
   * Domain-level default signal multipliers (see GraphDomainCreate).
   */
  signal_multipliers?: { [key: string]: number } | null;
}

export namespace DomainCreateResponse {
  export interface Signal {
    /**
     * Human prompt used by extractor.
     */
    description: string;

    /**
     * Snake_case signal identifier.
     */
    name: string;

    /**
     * For type='enum': allowed vocabulary.
     */
    allowed_values?: Array<string> | null;

    /**
     * Hz band mapping (0.1 … 70.0). Auto-assigned if omitted.
     */
    frequency_hz?: number | null;

    /**
     * Warn when missing at extract time.
     */
    required?: boolean;

    /**
     * Extraction / phase type for this signal.
     */
    type?: 'enum' | 'text' | 'numeric' | 'date' | 'boolean' | 'multi_value_text';

    /**
     * Relative weight in the fusion.
     */
    weight?: number;
  }

  /**
   * Curated summary of what's in a domain's frequency space.
   */
  export interface Catalog {
    /**
     * Signal band name -> total doc count.
     */
    domain_distribution?: { [key: string]: number };

    entity_clusters?: Array<Catalog.EntityCluster>;

    /**
     * ISO timestamp of last LLM clustering run.
     */
    last_refreshed?: string | null;

    /**
     * ISO timestamp of last buffer append.
     */
    last_updated?: string | null;

    relationship_patterns?: Array<Catalog.RelationshipPattern>;

    /**
     * Per-band raw value counts, e.g. {'domain': {'Health': 500, 'Tech': 200}}.
     */
    signal_value_counts?: { [key: string]: { [key: string]: number } };

    /**
     * Total transforms processed.
     */
    total_documents?: number;
  }

  export namespace Catalog {
    /**
     * A cluster of semantically-similar entity values.
     */
    export interface EntityCluster {
      /**
       * LLM-chosen canonical label for this cluster.
       */
      label: string;

      /**
       * Total occurrences across all transforms.
       */
      count?: number;

      /**
       * Raw signal values merged into this cluster.
       */
      members?: Array<string>;
    }

    /**
     * A cluster of semantically-similar relationship types.
     */
    export interface RelationshipPattern {
      /**
       * Canonical label (e.g. 'Causal', 'Preventive').
       */
      label: string;

      /**
       * Total occurrences.
       */
      count?: number;

      /**
       * Raw relationship values in this cluster.
       */
      members?: Array<string>;
    }
  }

  /**
   * Raw signal snapshot from a single transform call.
   */
  export interface CatalogBuffer {
    /**
     * Band name -> extracted value.
     */
    signals: { [key: string]: string };

    /**
     * ISO timestamp of the transform call.
     */
    timestamp: string;
  }

  /**
   * Catalog settings on a domain.
   */
  export interface CatalogConfig {
    /**
     * Whether to auto-accumulate signals on transform.
     */
    enabled?: boolean;

    /**
     * Run LLM clustering after this many buffered entries.
     */
    refresh_every_n?: number;
  }

  /**
   * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
   */
  export interface RoutingConfig {
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
}

export interface DomainRetrieveResponse {
  description: string;

  domain_id: string;

  name: string;

  signals: Array<DomainRetrieveResponse.Signal>;

  /**
   * True for built-in domains shipped with Papr (read-only).
   */
  builtin?: boolean;

  /**
   * Curated summary of what's in a domain's frequency space.
   */
  catalog?: DomainRetrieveResponse.Catalog | null;

  /**
   * Buffered raw signals awaiting LLM clustering (internal).
   */
  catalog_buffer?: Array<DomainRetrieveResponse.CatalogBuffer>;

  /**
   * Catalog settings on a domain.
   */
  catalog_config?: DomainRetrieveResponse.CatalogConfig | null;

  created_at?: string | null;

  /**
   * Namespace this domain belongs to, if any.
   */
  owner_namespace_id?: string | null;

  /**
   * Organization that owns this domain.
   */
  owner_organization_id?: string | null;

  owner_user_id?: string | null;

  /**
   * Workspace that owns this domain. Domains are scoped to workspace when set.
   */
  owner_workspace_id?: string | null;

  /**
   * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
   */
  routing_config?: DomainRetrieveResponse.RoutingConfig | null;

  /**
   * Domain-level default signal multipliers (see GraphDomainCreate).
   */
  signal_multipliers?: { [key: string]: number } | null;
}

export namespace DomainRetrieveResponse {
  export interface Signal {
    /**
     * Human prompt used by extractor.
     */
    description: string;

    /**
     * Snake_case signal identifier.
     */
    name: string;

    /**
     * For type='enum': allowed vocabulary.
     */
    allowed_values?: Array<string> | null;

    /**
     * Hz band mapping (0.1 … 70.0). Auto-assigned if omitted.
     */
    frequency_hz?: number | null;

    /**
     * Warn when missing at extract time.
     */
    required?: boolean;

    /**
     * Extraction / phase type for this signal.
     */
    type?: 'enum' | 'text' | 'numeric' | 'date' | 'boolean' | 'multi_value_text';

    /**
     * Relative weight in the fusion.
     */
    weight?: number;
  }

  /**
   * Curated summary of what's in a domain's frequency space.
   */
  export interface Catalog {
    /**
     * Signal band name -> total doc count.
     */
    domain_distribution?: { [key: string]: number };

    entity_clusters?: Array<Catalog.EntityCluster>;

    /**
     * ISO timestamp of last LLM clustering run.
     */
    last_refreshed?: string | null;

    /**
     * ISO timestamp of last buffer append.
     */
    last_updated?: string | null;

    relationship_patterns?: Array<Catalog.RelationshipPattern>;

    /**
     * Per-band raw value counts, e.g. {'domain': {'Health': 500, 'Tech': 200}}.
     */
    signal_value_counts?: { [key: string]: { [key: string]: number } };

    /**
     * Total transforms processed.
     */
    total_documents?: number;
  }

  export namespace Catalog {
    /**
     * A cluster of semantically-similar entity values.
     */
    export interface EntityCluster {
      /**
       * LLM-chosen canonical label for this cluster.
       */
      label: string;

      /**
       * Total occurrences across all transforms.
       */
      count?: number;

      /**
       * Raw signal values merged into this cluster.
       */
      members?: Array<string>;
    }

    /**
     * A cluster of semantically-similar relationship types.
     */
    export interface RelationshipPattern {
      /**
       * Canonical label (e.g. 'Causal', 'Preventive').
       */
      label: string;

      /**
       * Total occurrences.
       */
      count?: number;

      /**
       * Raw relationship values in this cluster.
       */
      members?: Array<string>;
    }
  }

  /**
   * Raw signal snapshot from a single transform call.
   */
  export interface CatalogBuffer {
    /**
     * Band name -> extracted value.
     */
    signals: { [key: string]: string };

    /**
     * ISO timestamp of the transform call.
     */
    timestamp: string;
  }

  /**
   * Catalog settings on a domain.
   */
  export interface CatalogConfig {
    /**
     * Whether to auto-accumulate signals on transform.
     */
    enabled?: boolean;

    /**
     * Run LLM clustering after this many buffered entries.
     */
    refresh_every_n?: number;
  }

  /**
   * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
   */
  export interface RoutingConfig {
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
}

export interface DomainUpdateResponse {
  description: string;

  domain_id: string;

  name: string;

  signals: Array<DomainUpdateResponse.Signal>;

  /**
   * True for built-in domains shipped with Papr (read-only).
   */
  builtin?: boolean;

  /**
   * Curated summary of what's in a domain's frequency space.
   */
  catalog?: DomainUpdateResponse.Catalog | null;

  /**
   * Buffered raw signals awaiting LLM clustering (internal).
   */
  catalog_buffer?: Array<DomainUpdateResponse.CatalogBuffer>;

  /**
   * Catalog settings on a domain.
   */
  catalog_config?: DomainUpdateResponse.CatalogConfig | null;

  created_at?: string | null;

  /**
   * Namespace this domain belongs to, if any.
   */
  owner_namespace_id?: string | null;

  /**
   * Organization that owns this domain.
   */
  owner_organization_id?: string | null;

  owner_user_id?: string | null;

  /**
   * Workspace that owns this domain. Domains are scoped to workspace when set.
   */
  owner_workspace_id?: string | null;

  /**
   * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
   */
  routing_config?: DomainUpdateResponse.RoutingConfig | null;

  /**
   * Domain-level default signal multipliers (see GraphDomainCreate).
   */
  signal_multipliers?: { [key: string]: number } | null;
}

export namespace DomainUpdateResponse {
  export interface Signal {
    /**
     * Human prompt used by extractor.
     */
    description: string;

    /**
     * Snake_case signal identifier.
     */
    name: string;

    /**
     * For type='enum': allowed vocabulary.
     */
    allowed_values?: Array<string> | null;

    /**
     * Hz band mapping (0.1 … 70.0). Auto-assigned if omitted.
     */
    frequency_hz?: number | null;

    /**
     * Warn when missing at extract time.
     */
    required?: boolean;

    /**
     * Extraction / phase type for this signal.
     */
    type?: 'enum' | 'text' | 'numeric' | 'date' | 'boolean' | 'multi_value_text';

    /**
     * Relative weight in the fusion.
     */
    weight?: number;
  }

  /**
   * Curated summary of what's in a domain's frequency space.
   */
  export interface Catalog {
    /**
     * Signal band name -> total doc count.
     */
    domain_distribution?: { [key: string]: number };

    entity_clusters?: Array<Catalog.EntityCluster>;

    /**
     * ISO timestamp of last LLM clustering run.
     */
    last_refreshed?: string | null;

    /**
     * ISO timestamp of last buffer append.
     */
    last_updated?: string | null;

    relationship_patterns?: Array<Catalog.RelationshipPattern>;

    /**
     * Per-band raw value counts, e.g. {'domain': {'Health': 500, 'Tech': 200}}.
     */
    signal_value_counts?: { [key: string]: { [key: string]: number } };

    /**
     * Total transforms processed.
     */
    total_documents?: number;
  }

  export namespace Catalog {
    /**
     * A cluster of semantically-similar entity values.
     */
    export interface EntityCluster {
      /**
       * LLM-chosen canonical label for this cluster.
       */
      label: string;

      /**
       * Total occurrences across all transforms.
       */
      count?: number;

      /**
       * Raw signal values merged into this cluster.
       */
      members?: Array<string>;
    }

    /**
     * A cluster of semantically-similar relationship types.
     */
    export interface RelationshipPattern {
      /**
       * Canonical label (e.g. 'Causal', 'Preventive').
       */
      label: string;

      /**
       * Total occurrences.
       */
      count?: number;

      /**
       * Raw relationship values in this cluster.
       */
      members?: Array<string>;
    }
  }

  /**
   * Raw signal snapshot from a single transform call.
   */
  export interface CatalogBuffer {
    /**
     * Band name -> extracted value.
     */
    signals: { [key: string]: string };

    /**
     * ISO timestamp of the transform call.
     */
    timestamp: string;
  }

  /**
   * Catalog settings on a domain.
   */
  export interface CatalogConfig {
    /**
     * Whether to auto-accumulate signals on transform.
     */
    enabled?: boolean;

    /**
     * Run LLM clustering after this many buffered entries.
     */
    refresh_every_n?: number;
  }

  /**
   * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
   */
  export interface RoutingConfig {
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
}

export interface DomainListResponse {
  domains: Array<DomainListResponse.Domain>;
}

export namespace DomainListResponse {
  export interface Domain {
    description: string;

    domain_id: string;

    name: string;

    signals: Array<Domain.Signal>;

    /**
     * True for built-in domains shipped with Papr (read-only).
     */
    builtin?: boolean;

    /**
     * Curated summary of what's in a domain's frequency space.
     */
    catalog?: Domain.Catalog | null;

    /**
     * Buffered raw signals awaiting LLM clustering (internal).
     */
    catalog_buffer?: Array<Domain.CatalogBuffer>;

    /**
     * Catalog settings on a domain.
     */
    catalog_config?: Domain.CatalogConfig | null;

    created_at?: string | null;

    /**
     * Namespace this domain belongs to, if any.
     */
    owner_namespace_id?: string | null;

    /**
     * Organization that owns this domain.
     */
    owner_organization_id?: string | null;

    owner_user_id?: string | null;

    /**
     * Workspace that owns this domain. Domains are scoped to workspace when set.
     */
    owner_workspace_id?: string | null;

    /**
     * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
     */
    routing_config?: Domain.RoutingConfig | null;

    /**
     * Domain-level default signal multipliers (see GraphDomainCreate).
     */
    signal_multipliers?: { [key: string]: number } | null;
  }

  export namespace Domain {
    export interface Signal {
      /**
       * Human prompt used by extractor.
       */
      description: string;

      /**
       * Snake_case signal identifier.
       */
      name: string;

      /**
       * For type='enum': allowed vocabulary.
       */
      allowed_values?: Array<string> | null;

      /**
       * Hz band mapping (0.1 … 70.0). Auto-assigned if omitted.
       */
      frequency_hz?: number | null;

      /**
       * Warn when missing at extract time.
       */
      required?: boolean;

      /**
       * Extraction / phase type for this signal.
       */
      type?: 'enum' | 'text' | 'numeric' | 'date' | 'boolean' | 'multi_value_text';

      /**
       * Relative weight in the fusion.
       */
      weight?: number;
    }

    /**
     * Curated summary of what's in a domain's frequency space.
     */
    export interface Catalog {
      /**
       * Signal band name -> total doc count.
       */
      domain_distribution?: { [key: string]: number };

      entity_clusters?: Array<Catalog.EntityCluster>;

      /**
       * ISO timestamp of last LLM clustering run.
       */
      last_refreshed?: string | null;

      /**
       * ISO timestamp of last buffer append.
       */
      last_updated?: string | null;

      relationship_patterns?: Array<Catalog.RelationshipPattern>;

      /**
       * Per-band raw value counts, e.g. {'domain': {'Health': 500, 'Tech': 200}}.
       */
      signal_value_counts?: { [key: string]: { [key: string]: number } };

      /**
       * Total transforms processed.
       */
      total_documents?: number;
    }

    export namespace Catalog {
      /**
       * A cluster of semantically-similar entity values.
       */
      export interface EntityCluster {
        /**
         * LLM-chosen canonical label for this cluster.
         */
        label: string;

        /**
         * Total occurrences across all transforms.
         */
        count?: number;

        /**
         * Raw signal values merged into this cluster.
         */
        members?: Array<string>;
      }

      /**
       * A cluster of semantically-similar relationship types.
       */
      export interface RelationshipPattern {
        /**
         * Canonical label (e.g. 'Causal', 'Preventive').
         */
        label: string;

        /**
         * Total occurrences.
         */
        count?: number;

        /**
         * Raw relationship values in this cluster.
         */
        members?: Array<string>;
      }
    }

    /**
     * Raw signal snapshot from a single transform call.
     */
    export interface CatalogBuffer {
      /**
       * Band name -> extracted value.
       */
      signals: { [key: string]: string };

      /**
       * ISO timestamp of the transform call.
       */
      timestamp: string;
    }

    /**
     * Catalog settings on a domain.
     */
    export interface CatalogConfig {
      /**
       * Whether to auto-accumulate signals on transform.
       */
      enabled?: boolean;

      /**
       * Run LLM clustering after this many buffered entries.
       */
      refresh_every_n?: number;
    }

    /**
     * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
     */
    export interface RoutingConfig {
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
  }
}

export interface DomainDeleteResponse {
  deleted: boolean;

  domain_id: string;
}

export interface DomainCreateParams {
  /**
   * What this domain models.
   */
  description: string;

  /**
   * Custom id, e.g. 'acme:support_tickets:1.0.0'.
   */
  domain_id: string;

  /**
   * Human-readable domain name.
   */
  name: string;

  /**
   * Per-domain signal definitions.
   */
  signals: Array<DomainCreateParams.Signal>;

  /**
   * Catalog settings on a domain.
   */
  catalog_config?: DomainCreateParams.CatalogConfig | null;

  /**
   * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
   */
  routing_config?: DomainCreateParams.RoutingConfig | null;

  /**
   * Domain-level default signal weight multipliers. Applied automatically on every
   * rerank/search request for this domain (unless the caller supplies their own
   * signal_multipliers, which take priority). Keys are field names (e.g.
   * 'key_claim') or Hz-strings (e.g. '70.0'). Values: 0.0 = disable band, 1.0 =
   * unchanged, 2.0 = 2× boost.
   */
  signal_multipliers?: { [key: string]: number } | null;
}

export namespace DomainCreateParams {
  export interface Signal {
    /**
     * Human prompt used by extractor.
     */
    description: string;

    /**
     * Snake_case signal identifier.
     */
    name: string;

    /**
     * For type='enum': allowed vocabulary.
     */
    allowed_values?: Array<string> | null;

    /**
     * Hz band mapping (0.1 … 70.0). Auto-assigned if omitted.
     */
    frequency_hz?: number | null;

    /**
     * Warn when missing at extract time.
     */
    required?: boolean;

    /**
     * Extraction / phase type for this signal.
     */
    type?: 'enum' | 'text' | 'numeric' | 'date' | 'boolean' | 'multi_value_text';

    /**
     * Relative weight in the fusion.
     */
    weight?: number;
  }

  /**
   * Catalog settings on a domain.
   */
  export interface CatalogConfig {
    /**
     * Whether to auto-accumulate signals on transform.
     */
    enabled?: boolean;

    /**
     * Run LLM clustering after this many buffered entries.
     */
    refresh_every_n?: number;
  }

  /**
   * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
   */
  export interface RoutingConfig {
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
}

export interface DomainUpdateParams {
  /**
   * Catalog settings on a domain.
   */
  catalog_config?: DomainUpdateParams.CatalogConfig | null;

  /**
   * Updated description.
   */
  description?: string | null;

  /**
   * Updated human-readable name.
   */
  name?: string | null;

  /**
   * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
   */
  routing_config?: DomainUpdateParams.RoutingConfig | null;

  /**
   * Replace the domain-level signal_multipliers entirely. Pass an empty dict {} to
   * clear all multipliers. Omit the field to leave existing multipliers unchanged.
   */
  signal_multipliers?: { [key: string]: number } | null;
}

export namespace DomainUpdateParams {
  /**
   * Catalog settings on a domain.
   */
  export interface CatalogConfig {
    /**
     * Whether to auto-accumulate signals on transform.
     */
    enabled?: boolean;

    /**
     * Run LLM clustering after this many buffered entries.
     */
    refresh_every_n?: number;
  }

  /**
   * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
   */
  export interface RoutingConfig {
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
}

Domains.Catalog = CatalogAPICatalog;

export declare namespace Domains {
  export {
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainUpdateResponse as DomainUpdateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainDeleteResponse as DomainDeleteResponse,
    type DomainCreateParams as DomainCreateParams,
    type DomainUpdateParams as DomainUpdateParams,
  };

  export {
    CatalogAPICatalog as Catalog,
    type CatalogRetrieveResponse as CatalogRetrieveResponse,
    type CatalogRefreshResponse as CatalogRefreshResponse,
  };
}
