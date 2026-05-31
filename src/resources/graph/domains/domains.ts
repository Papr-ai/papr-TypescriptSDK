// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as DomainsAPI from './domains';
import * as GraphAPI from '../graph';
import * as CatalogAPI from './catalog';
import { Catalog } from './catalog';
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

/**
 * Raw signal snapshot from a single transform call.
 */
export interface CatalogBufferEntry {
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
 * A cluster of semantically-similar entity values.
 */
export interface CatalogEntityCluster {
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
export interface CatalogRelationshipPattern {
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

/**
 * Curated summary of what's in a domain's frequency space.
 */
export interface DomainCatalog {
  /**
   * Signal band name -> total doc count.
   */
  domain_distribution?: { [key: string]: number };

  entity_clusters?: Array<CatalogEntityCluster>;

  /**
   * ISO timestamp of last LLM clustering run.
   */
  last_refreshed?: string | null;

  /**
   * ISO timestamp of last buffer append.
   */
  last_updated?: string | null;

  relationship_patterns?: Array<CatalogRelationshipPattern>;

  /**
   * Per-band raw value counts, e.g. {'domain': {'Health': 500, 'Tech': 200}}.
   */
  signal_value_counts?: { [key: string]: { [key: string]: number } };

  /**
   * Total transforms processed.
   */
  total_documents?: number;
}

/**
 * Catalog settings on a domain.
 */
export interface DomainCatalogConfig {
  /**
   * Whether to auto-accumulate signals on transform.
   */
  enabled?: boolean;

  /**
   * Run LLM clustering after this many buffered entries.
   */
  refresh_every_n?: number;
}

export interface SignalField {
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

export interface DomainCreateResponse {
  description: string;

  domain_id: string;

  name: string;

  signals: Array<SignalField>;

  /**
   * True for built-in domains shipped with Papr (read-only).
   */
  builtin?: boolean;

  /**
   * Curated summary of what's in a domain's frequency space.
   */
  catalog?: DomainCatalog | null;

  /**
   * Buffered raw signals awaiting LLM clustering (internal).
   */
  catalog_buffer?: Array<CatalogBufferEntry>;

  /**
   * Catalog settings on a domain.
   */
  catalog_config?: DomainCatalogConfig | null;

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
  routing_config?: GraphAPI.GraphDomainRoutingConfig | null;

  /**
   * Domain-level default signal multipliers (see GraphDomainCreate).
   */
  signal_multipliers?: { [key: string]: number } | null;
}

export interface DomainRetrieveResponse {
  description: string;

  domain_id: string;

  name: string;

  signals: Array<SignalField>;

  /**
   * True for built-in domains shipped with Papr (read-only).
   */
  builtin?: boolean;

  /**
   * Curated summary of what's in a domain's frequency space.
   */
  catalog?: DomainCatalog | null;

  /**
   * Buffered raw signals awaiting LLM clustering (internal).
   */
  catalog_buffer?: Array<CatalogBufferEntry>;

  /**
   * Catalog settings on a domain.
   */
  catalog_config?: DomainCatalogConfig | null;

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
  routing_config?: GraphAPI.GraphDomainRoutingConfig | null;

  /**
   * Domain-level default signal multipliers (see GraphDomainCreate).
   */
  signal_multipliers?: { [key: string]: number } | null;
}

export interface DomainUpdateResponse {
  description: string;

  domain_id: string;

  name: string;

  signals: Array<SignalField>;

  /**
   * True for built-in domains shipped with Papr (read-only).
   */
  builtin?: boolean;

  /**
   * Curated summary of what's in a domain's frequency space.
   */
  catalog?: DomainCatalog | null;

  /**
   * Buffered raw signals awaiting LLM clustering (internal).
   */
  catalog_buffer?: Array<CatalogBufferEntry>;

  /**
   * Catalog settings on a domain.
   */
  catalog_config?: DomainCatalogConfig | null;

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
  routing_config?: GraphAPI.GraphDomainRoutingConfig | null;

  /**
   * Domain-level default signal multipliers (see GraphDomainCreate).
   */
  signal_multipliers?: { [key: string]: number } | null;
}

export interface DomainListResponse {
  domains: Array<DomainListResponse.Domain>;
}

export namespace DomainListResponse {
  export interface Domain {
    description: string;

    domain_id: string;

    name: string;

    signals: Array<DomainsAPI.SignalField>;

    /**
     * True for built-in domains shipped with Papr (read-only).
     */
    builtin?: boolean;

    /**
     * Curated summary of what's in a domain's frequency space.
     */
    catalog?: DomainsAPI.DomainCatalog | null;

    /**
     * Buffered raw signals awaiting LLM clustering (internal).
     */
    catalog_buffer?: Array<DomainsAPI.CatalogBufferEntry>;

    /**
     * Catalog settings on a domain.
     */
    catalog_config?: DomainsAPI.DomainCatalogConfig | null;

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
    routing_config?: GraphAPI.GraphDomainRoutingConfig | null;

    /**
     * Domain-level default signal multipliers (see GraphDomainCreate).
     */
    signal_multipliers?: { [key: string]: number } | null;
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
  signals: Array<SignalField>;

  /**
   * Catalog settings on a domain.
   */
  catalog_config?: DomainCatalogConfig | null;

  /**
   * Domain-scoped CAESAR-VIII routing overrides (stored on graph_domains).
   */
  routing_config?: GraphAPI.GraphDomainRoutingConfig | null;

  /**
   * Domain-level default signal weight multipliers. Applied automatically on every
   * rerank/search request for this domain (unless the caller supplies their own
   * signal_multipliers, which take priority). Keys are field names (e.g.
   * 'key_claim') or Hz-strings (e.g. '70.0'). Values: 0.0 = disable band, 1.0 =
   * unchanged, 2.0 = 2× boost.
   */
  signal_multipliers?: { [key: string]: number } | null;
}

export interface DomainUpdateParams {
  /**
   * Catalog settings on a domain.
   */
  catalog_config?: DomainCatalogConfig | null;

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
  routing_config?: GraphAPI.GraphDomainRoutingConfig | null;

  /**
   * Replace the domain-level signal_multipliers entirely. Pass an empty dict {} to
   * clear all multipliers. Omit the field to leave existing multipliers unchanged.
   */
  signal_multipliers?: { [key: string]: number } | null;
}

Domains.Catalog = Catalog;

export declare namespace Domains {
  export {
    type CatalogBufferEntry as CatalogBufferEntry,
    type CatalogEntityCluster as CatalogEntityCluster,
    type CatalogRelationshipPattern as CatalogRelationshipPattern,
    type DomainCatalog as DomainCatalog,
    type DomainCatalogConfig as DomainCatalogConfig,
    type SignalField as SignalField,
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainUpdateResponse as DomainUpdateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainDeleteResponse as DomainDeleteResponse,
    type DomainCreateParams as DomainCreateParams,
    type DomainUpdateParams as DomainUpdateParams,
  };

  export { Catalog as Catalog };
}
