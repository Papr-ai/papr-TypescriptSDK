// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Domains extends APIResource {
  /**
   * Define a custom frequency schema for your specific domain. Maps your metadata
   * fields to the 14 standard brain-inspired frequency bands. Custom schemas are
   * scoped to your API key.
   *
   * @example
   * ```ts
   * const domain = await client.holographic.domains.create({
   *   fields: [
   *     {
   *       frequency: 4,
   *       name: 'priority',
   *       type: 'enum',
   *     },
   *     {
   *       frequency: 6,
   *       name: 'component',
   *       type: 'free_text',
   *     },
   *     {
   *       frequency: 12,
   *       name: 'resolution_type',
   *       type: 'enum',
   *     },
   *   ],
   *   name: 'acme:support_tickets:1.0.0',
   * });
   * ```
   */
  create(body: DomainCreateParams, options?: RequestOptions): APIPromise<DomainCreateResponse> {
    return this._client.post('/v1/holographic/domains', { body, ...options });
  }

  /**
   * Returns all available frequency schemas organized by domain. Use the schema_id
   * or domain shortname in transform/rerank calls.
   *
   * @example
   * ```ts
   * const domains = await client.holographic.domains.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<DomainListResponse> {
    return this._client.get('/v1/holographic/domains', options);
  }
}

/**
 * Response for POST /v1/holographic/domains
 */
export interface DomainCreateResponse {
  domain: string;

  num_frequencies: number;

  /**
   * Generated schema ID
   */
  schema_id: string;

  status?: string;
}

/**
 * Response for GET /v1/holographic/domains
 */
export interface DomainListResponse {
  domains: Array<DomainListResponse.Domain>;

  total: number;

  /**
   * Shorthand aliases (e.g. 'cosqa' -> 'code_search:cosqa:2.0.0')
   */
  shortcuts?: { [key: string]: string };

  status?: string;
}

export namespace DomainListResponse {
  /**
   * Summary of an available domain.
   */
  export interface Domain {
    domain: string;

    name: string;

    num_frequencies: number;

    schema_id: string;

    description?: string;

    /**
     * True if created by developer via POST
     */
    is_custom?: boolean;
  }
}

export interface DomainCreateParams {
  /**
   * Frequency field definitions (1-14 fields, one per frequency band)
   */
  fields: Array<DomainCreateParams.Field>;

  /**
   * Schema name in format 'company:domain:version' (e.g.
   * 'acme:support_tickets:1.0.0')
   */
  name: string;

  /**
   * Human-readable description
   */
  description?: string | null;
}

export namespace DomainCreateParams {
  /**
   * Single field definition for a custom frequency schema.
   */
  export interface Field {
    /**
     * Hz value (must be one of the 14 standard frequencies: 0.1, 0.5, 2.0, 4.0, 6.0,
     * 10.0, 12.0, 18.0, 19.0, 24.0, 30.0, 40.0, 50.0, 70.0)
     */
    frequency: number;

    /**
     * Field name (e.g. 'ticket_priority', 'component')
     */
    name: string;

    /**
     * Field type
     */
    type: 'enum' | 'free_text' | 'numeric' | 'boolean' | 'date' | 'sequence' | 'multi_value_text';

    /**
     * Field description
     */
    description?: string | null;

    /**
     * Allowed values for enum type
     */
    values?: Array<string> | null;

    /**
     * Importance weight
     */
    weight?: number;
  }
}

export declare namespace Domains {
  export {
    type DomainCreateResponse as DomainCreateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainCreateParams as DomainCreateParams,
  };
}
