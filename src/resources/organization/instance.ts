// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as NamespaceAPI from '../namespace/namespace';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Instance extends APIResource {
  /**
   * Get organization-level instance configuration (masked passwords).
   *
   * @example
   * ```ts
   * const instance =
   *   await client.organization.instance.retrieve();
   * ```
   */
  retrieve(options?: RequestOptions): APIPromise<InstanceRetrieveResponse> {
    return this._client.get('/v1/organization/instance', options);
  }

  /**
   * Set default dedicated instance configuration for the organization (inherited by
   * namespaces without their own config).
   *
   * @example
   * ```ts
   * const instance =
   *   await client.organization.instance.update();
   * ```
   */
  update(params: InstanceUpdateParams, options?: RequestOptions): APIPromise<InstanceUpdateResponse> {
    const { validate, ...body } = params;
    return this._client.put('/v1/organization/instance', { query: { validate }, body, ...options });
  }

  /**
   * Remove organization-level instance configuration (all namespaces revert to
   * shared).
   *
   * @example
   * ```ts
   * const instance =
   *   await client.organization.instance.delete();
   * ```
   */
  delete(options?: RequestOptions): APIPromise<InstanceDeleteResponse> {
    return this._client.delete('/v1/organization/instance', options);
  }
}

/**
 * Standard response envelope for instance config operations.
 */
export interface InstanceRetrieveResponse {
  /**
   * HTTP status code
   */
  code?: number;

  /**
   * Instance configuration — response model for GET endpoints.
   */
  data?: NamespaceAPI.InstanceConfigItem | null;

  /**
   * Additional context
   */
  details?: unknown;

  /**
   * Error message if failed
   */
  error?: string | null;

  /**
   * 'success' or 'error'
   */
  status?: string;
}

/**
 * Standard response envelope for instance config operations.
 */
export interface InstanceUpdateResponse {
  /**
   * HTTP status code
   */
  code?: number;

  /**
   * Instance configuration — response model for GET endpoints.
   */
  data?: NamespaceAPI.InstanceConfigItem | null;

  /**
   * Additional context
   */
  details?: unknown;

  /**
   * Error message if failed
   */
  error?: string | null;

  /**
   * 'success' or 'error'
   */
  status?: string;
}

/**
 * Standard response envelope for instance config operations.
 */
export interface InstanceDeleteResponse {
  /**
   * HTTP status code
   */
  code?: number;

  /**
   * Instance configuration — response model for GET endpoints.
   */
  data?: NamespaceAPI.InstanceConfigItem | null;

  /**
   * Additional context
   */
  details?: unknown;

  /**
   * Error message if failed
   */
  error?: string | null;

  /**
   * 'success' or 'error'
   */
  status?: string;
}

export interface InstanceUpdateParams {
  /**
   * Query param: Test connection before saving
   */
  validate?: boolean;

  /**
   * Body param: Neo4j AuraDB instance configuration — input (plain password).
   */
  neo4j?: InstanceUpdateParams.Neo4j | null;

  /**
   * Body param: Cloud provider (only 'gcp' supported today)
   */
  provider?: string;

  /**
   * Body param: Cloud region (only 'us-west1' supported today)
   */
  region?: string;
}

export namespace InstanceUpdateParams {
  /**
   * Neo4j AuraDB instance configuration — input (plain password).
   */
  export interface Neo4j {
    /**
     * Neo4j bolt connection URL (e.g. 'neo4j+s://xxxxx.databases.neo4j.io')
     */
    bolt_url: string;

    /**
     * Neo4j password (encrypted before storage)
     */
    password: string;

    /**
     * Neo4j hosted GraphQL endpoint URL (e.g.
     * 'https://xxxxx-graphql.production-orch-xxxx.neo4j.io/graphql')
     */
    graphql_endpoint?: string | null;

    /**
     * Neo4j username
     */
    username?: string;
  }
}

export declare namespace Instance {
  export {
    type InstanceRetrieveResponse as InstanceRetrieveResponse,
    type InstanceUpdateResponse as InstanceUpdateResponse,
    type InstanceDeleteResponse as InstanceDeleteResponse,
    type InstanceUpdateParams as InstanceUpdateParams,
  };
}
