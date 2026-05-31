// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Catalog extends APIResource {
  /**
   * Return the LLM-curated catalog showing what signal values exist in this domain.
   *
   * The catalog is built incrementally from transform calls. It contains:
   *
   * - entity_clusters: semantically-grouped entity values
   * - relationship_patterns: clustered relationship types
   * - signal_value_counts: raw per-band value frequencies
   * - domain_distribution: per-band document counts
   * - total_documents: total transforms processed
   */
  retrieve(domainID: string, options?: RequestOptions): APIPromise<CatalogRetrieveResponse> {
    return this._client.get(path`/v1/graph/domains/${domainID}/catalog`, options);
  }

  /**
   * Process any buffered signal values through LLM clustering.
   *
   * This merges raw signal values from recent transform calls into semantic
   * clusters. Normally happens automatically every N transforms, but this endpoint
   * lets you trigger it on-demand.
   */
  refresh(domainID: string, options?: RequestOptions): APIPromise<CatalogRefreshResponse> {
    return this._client.post(path`/v1/graph/domains/${domainID}/catalog/refresh`, options);
  }
}

/**
 * Curated summary of what's in a domain's frequency space.
 */
export interface CatalogRetrieveResponse {
  /**
   * Signal band name -> total doc count.
   */
  domain_distribution?: { [key: string]: number };

  entity_clusters?: Array<CatalogRetrieveResponse.EntityCluster>;

  /**
   * ISO timestamp of last LLM clustering run.
   */
  last_refreshed?: string | null;

  /**
   * ISO timestamp of last buffer append.
   */
  last_updated?: string | null;

  relationship_patterns?: Array<CatalogRetrieveResponse.RelationshipPattern>;

  /**
   * Per-band raw value counts, e.g. {'domain': {'Health': 500, 'Tech': 200}}.
   */
  signal_value_counts?: { [key: string]: { [key: string]: number } };

  /**
   * Total transforms processed.
   */
  total_documents?: number;
}

export namespace CatalogRetrieveResponse {
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
 * Curated summary of what's in a domain's frequency space.
 */
export interface CatalogRefreshResponse {
  /**
   * Signal band name -> total doc count.
   */
  domain_distribution?: { [key: string]: number };

  entity_clusters?: Array<CatalogRefreshResponse.EntityCluster>;

  /**
   * ISO timestamp of last LLM clustering run.
   */
  last_refreshed?: string | null;

  /**
   * ISO timestamp of last buffer append.
   */
  last_updated?: string | null;

  relationship_patterns?: Array<CatalogRefreshResponse.RelationshipPattern>;

  /**
   * Per-band raw value counts, e.g. {'domain': {'Health': 500, 'Tech': 200}}.
   */
  signal_value_counts?: { [key: string]: { [key: string]: number } };

  /**
   * Total transforms processed.
   */
  total_documents?: number;
}

export namespace CatalogRefreshResponse {
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

export declare namespace Catalog {
  export {
    type CatalogRetrieveResponse as CatalogRetrieveResponse,
    type CatalogRefreshResponse as CatalogRefreshResponse,
  };
}
