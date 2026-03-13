// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Namespace extends APIResource {
  /**
   * Create a new namespace within the developer's organization.
   *
   * @example
   * ```ts
   * const namespace = await client.namespace.create({
   *   name: 'acme-production',
   * });
   * ```
   */
  create(body: NamespaceCreateParams, options?: RequestOptions): APIPromise<NamespaceCreateResponse> {
    return this._client.post('/v1/namespace', { body, ...options });
  }

  /**
   * Retrieve a single namespace by ID.
   *
   * @example
   * ```ts
   * const namespace = await client.namespace.retrieve(
   *   'namespace_id',
   * );
   * ```
   */
  retrieve(namespaceID: string, options?: RequestOptions): APIPromise<NamespaceRetrieveResponse> {
    return this._client.get(path`/v1/namespace/${namespaceID}`, options);
  }

  /**
   * Update an existing namespace.
   *
   * @example
   * ```ts
   * const namespace = await client.namespace.update(
   *   'namespace_id',
   * );
   * ```
   */
  update(
    namespaceID: string,
    body: NamespaceUpdateParams,
    options?: RequestOptions,
  ): APIPromise<NamespaceUpdateResponse> {
    return this._client.put(path`/v1/namespace/${namespaceID}`, { body, ...options });
  }

  /**
   * List namespaces for the developer's organization.
   *
   * @example
   * ```ts
   * const namespaces = await client.namespace.list();
   * ```
   */
  list(
    query: NamespaceListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NamespaceListResponse> {
    return this._client.get('/v1/namespace', { query, ...options });
  }

  /**
   * Delete a namespace and optionally cascade-delete all memories, Neo4j nodes, and
   * ACL references associated with it.
   *
   * @example
   * ```ts
   * const namespace = await client.namespace.delete(
   *   'namespace_id',
   * );
   * ```
   */
  delete(
    namespaceID: string,
    params: NamespaceDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NamespaceDeleteResponse> {
    const { delete_memories, delete_neo4j_nodes, remove_acl_references } = params ?? {};
    return this._client.delete(path`/v1/namespace/${namespaceID}`, {
      query: { delete_memories, delete_neo4j_nodes, remove_acl_references },
      ...options,
    });
  }
}

/**
 * Response for single-namespace operations (create, get, update).
 */
export interface NamespaceCreateResponse {
  /**
   * HTTP status code
   */
  code?: number;

  /**
   * Public-facing namespace data returned in API responses.
   */
  data?: NamespaceCreateResponse.Data | null;

  /**
   * Additional error details or context
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

export namespace NamespaceCreateResponse {
  /**
   * Public-facing namespace data returned in API responses.
   */
  export interface Data {
    /**
     * Creation timestamp
     */
    createdAt?: string | null;

    /**
     * Environment type
     */
    environment_type?: string | null;

    /**
     * Whether namespace is active
     */
    is_active?: boolean | null;

    /**
     * Total memories
     */
    memoriesCount?: number | null;

    /**
     * Namespace name
     */
    name?: string | null;

    /**
     * Parse objectId
     */
    objectId?: string | null;

    /**
     * Owning organization ID
     */
    organization_id?: string | null;

    /**
     * Rate limits
     */
    rate_limits?: { [key: string]: number | null } | null;

    /**
     * Total storage items
     */
    storageCount?: number | null;

    /**
     * Last update timestamp
     */
    updatedAt?: string | null;

    [k: string]: unknown;
  }
}

/**
 * Response for single-namespace operations (create, get, update).
 */
export interface NamespaceRetrieveResponse {
  /**
   * HTTP status code
   */
  code?: number;

  /**
   * Public-facing namespace data returned in API responses.
   */
  data?: NamespaceRetrieveResponse.Data | null;

  /**
   * Additional error details or context
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

export namespace NamespaceRetrieveResponse {
  /**
   * Public-facing namespace data returned in API responses.
   */
  export interface Data {
    /**
     * Creation timestamp
     */
    createdAt?: string | null;

    /**
     * Environment type
     */
    environment_type?: string | null;

    /**
     * Whether namespace is active
     */
    is_active?: boolean | null;

    /**
     * Total memories
     */
    memoriesCount?: number | null;

    /**
     * Namespace name
     */
    name?: string | null;

    /**
     * Parse objectId
     */
    objectId?: string | null;

    /**
     * Owning organization ID
     */
    organization_id?: string | null;

    /**
     * Rate limits
     */
    rate_limits?: { [key: string]: number | null } | null;

    /**
     * Total storage items
     */
    storageCount?: number | null;

    /**
     * Last update timestamp
     */
    updatedAt?: string | null;

    [k: string]: unknown;
  }
}

/**
 * Response for single-namespace operations (create, get, update).
 */
export interface NamespaceUpdateResponse {
  /**
   * HTTP status code
   */
  code?: number;

  /**
   * Public-facing namespace data returned in API responses.
   */
  data?: NamespaceUpdateResponse.Data | null;

  /**
   * Additional error details or context
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

export namespace NamespaceUpdateResponse {
  /**
   * Public-facing namespace data returned in API responses.
   */
  export interface Data {
    /**
     * Creation timestamp
     */
    createdAt?: string | null;

    /**
     * Environment type
     */
    environment_type?: string | null;

    /**
     * Whether namespace is active
     */
    is_active?: boolean | null;

    /**
     * Total memories
     */
    memoriesCount?: number | null;

    /**
     * Namespace name
     */
    name?: string | null;

    /**
     * Parse objectId
     */
    objectId?: string | null;

    /**
     * Owning organization ID
     */
    organization_id?: string | null;

    /**
     * Rate limits
     */
    rate_limits?: { [key: string]: number | null } | null;

    /**
     * Total storage items
     */
    storageCount?: number | null;

    /**
     * Last update timestamp
     */
    updatedAt?: string | null;

    [k: string]: unknown;
  }
}

/**
 * Response for listing namespaces with pagination.
 */
export interface NamespaceListResponse {
  /**
   * HTTP status code
   */
  code?: number;

  /**
   * List of namespaces
   */
  data?: Array<NamespaceListResponse.Data> | null;

  /**
   * Additional error details or context
   */
  details?: unknown;

  /**
   * Error message if failed
   */
  error?: string | null;

  /**
   * Current page (0-indexed skip)
   */
  page?: number | null;

  /**
   * Items per page
   */
  page_size?: number | null;

  /**
   * 'success' or 'error'
   */
  status?: string;

  /**
   * Total matching namespaces
   */
  total?: number | null;
}

export namespace NamespaceListResponse {
  /**
   * Public-facing namespace data returned in API responses.
   */
  export interface Data {
    /**
     * Creation timestamp
     */
    createdAt?: string | null;

    /**
     * Environment type
     */
    environment_type?: string | null;

    /**
     * Whether namespace is active
     */
    is_active?: boolean | null;

    /**
     * Total memories
     */
    memoriesCount?: number | null;

    /**
     * Namespace name
     */
    name?: string | null;

    /**
     * Parse objectId
     */
    objectId?: string | null;

    /**
     * Owning organization ID
     */
    organization_id?: string | null;

    /**
     * Rate limits
     */
    rate_limits?: { [key: string]: number | null } | null;

    /**
     * Total storage items
     */
    storageCount?: number | null;

    /**
     * Last update timestamp
     */
    updatedAt?: string | null;

    [k: string]: unknown;
  }
}

/**
 * Response for DELETE /v1/namespace/{namespace_id} with cascade results.
 */
export interface NamespaceDeleteResponse {
  /**
   * Details of the cascade deletion performed when a namespace is removed.
   */
  cascade?: NamespaceDeleteResponse.Cascade | null;

  /**
   * HTTP status code
   */
  code?: number;

  /**
   * Additional error details or context
   */
  details?: unknown;

  /**
   * Error message if failed
   */
  error?: string | null;

  /**
   * Human-readable message
   */
  message?: string | null;

  /**
   * ID of deleted namespace
   */
  namespace_id?: string | null;

  /**
   * 'success' or 'error'
   */
  status?: string;
}

export namespace NamespaceDeleteResponse {
  /**
   * Details of the cascade deletion performed when a namespace is removed.
   */
  export interface Cascade {
    /**
     * Nodes with namespace_read_access cleaned
     */
    acl_read_cleaned?: number;

    /**
     * Nodes with namespace_write_access cleaned
     */
    acl_write_cleaned?: number;

    /**
     * Number of memories deleted
     */
    memories_deleted?: number;

    /**
     * Number of memories that failed to delete
     */
    memories_failed?: number;

    /**
     * Number of Neo4j nodes deleted
     */
    neo4j_nodes_deleted?: number;
  }
}

export interface NamespaceCreateParams {
  /**
   * Namespace name (e.g., 'acme-production')
   */
  name: string;

  /**
   * Environment type: development, staging, production
   */
  environment_type?: 'development' | 'staging' | 'production';

  /**
   * Whether this namespace is active
   */
  is_active?: boolean;

  /**
   * Rate limits for this namespace (None values inherit from organization)
   */
  rate_limits?: { [key: string]: number | null } | null;
}

export interface NamespaceUpdateParams {
  /**
   * Environment types for namespaces
   */
  environment_type?: 'development' | 'staging' | 'production' | null;

  /**
   * Whether this namespace is active
   */
  is_active?: boolean | null;

  /**
   * Updated namespace name
   */
  name?: string | null;

  /**
   * Updated rate limits (None values inherit from organization)
   */
  rate_limits?: { [key: string]: number | null } | null;
}

export interface NamespaceListParams {
  /**
   * Max items to return
   */
  limit?: number;

  /**
   * Number of items to skip
   */
  skip?: number;
}

export interface NamespaceDeleteParams {
  /**
   * Delete all memories in this namespace
   */
  delete_memories?: boolean;

  /**
   * Delete all Neo4j nodes in this namespace
   */
  delete_neo4j_nodes?: boolean;

  /**
   * Remove namespace from ACL arrays on remaining nodes
   */
  remove_acl_references?: boolean;
}

export declare namespace Namespace {
  export {
    type NamespaceCreateResponse as NamespaceCreateResponse,
    type NamespaceRetrieveResponse as NamespaceRetrieveResponse,
    type NamespaceUpdateResponse as NamespaceUpdateResponse,
    type NamespaceListResponse as NamespaceListResponse,
    type NamespaceDeleteResponse as NamespaceDeleteResponse,
    type NamespaceCreateParams as NamespaceCreateParams,
    type NamespaceUpdateParams as NamespaceUpdateParams,
    type NamespaceListParams as NamespaceListParams,
    type NamespaceDeleteParams as NamespaceDeleteParams,
  };
}
