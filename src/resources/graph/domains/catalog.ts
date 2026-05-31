// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as DomainsAPI from './domains';
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
  retrieve(domainID: string, options?: RequestOptions): APIPromise<DomainsAPI.DomainCatalog> {
    return this._client.get(path`/v1/graph/domains/${domainID}/catalog`, options);
  }

  /**
   * Process any buffered signal values through LLM clustering.
   *
   * This merges raw signal values from recent transform calls into semantic
   * clusters. Normally happens automatically every N transforms, but this endpoint
   * lets you trigger it on-demand.
   */
  refresh(domainID: string, options?: RequestOptions): APIPromise<DomainsAPI.DomainCatalog> {
    return this._client.post(path`/v1/graph/domains/${domainID}/catalog/refresh`, options);
  }
}
