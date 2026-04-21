// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as NamespaceAPI from './namespace';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Instance extends APIResource {
  /**
   * Get resolved instance configuration for a namespace (namespace > org). Passwords
   * are masked.
   *
   * @example
   * ```ts
   * const instance = await client.namespace.instance.retrieve(
   *   'namespace_id',
   * );
   * ```
   */
  retrieve(namespaceID: string, options?: RequestOptions): APIPromise<InstanceRetrieveResponse> {
    return this._client.get(path`/v1/namespace/${namespaceID}/instance`, options);
  }

  /**
   * Set dedicated instance configuration for a namespace.
   *
   * @example
   * ```ts
   * const instance = await client.namespace.instance.update(
   *   'namespace_id',
   * );
   * ```
   */
  update(
    namespaceID: string,
    params: InstanceUpdateParams,
    options?: RequestOptions,
  ): APIPromise<InstanceUpdateResponse> {
    const { validate, ...body } = params;
    return this._client.put(path`/v1/namespace/${namespaceID}/instance`, {
      query: { validate },
      body,
      ...options,
    });
  }

  /**
   * Remove dedicated instance configuration from a namespace (reverts to org or
   * shared).
   *
   * @example
   * ```ts
   * const instance = await client.namespace.instance.delete(
   *   'namespace_id',
   * );
   * ```
   */
  delete(namespaceID: string, options?: RequestOptions): APIPromise<InstanceDeleteResponse> {
    return this._client.delete(path`/v1/namespace/${namespaceID}/instance`, options);
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
