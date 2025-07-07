// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as UserAPI from './user';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class User extends APIResource {
  /**
   * Create a new user or link existing user to developer
   *
   * @example
   * ```ts
   * const userResponse = await client.user.create({
   *   external_id: 'user123',
   * });
   * ```
   */
  create(body: UserCreateParams, options?: RequestOptions): APIPromise<UserResponse> {
    return this._client.post('/v1/user', { body, ...options });
  }

  /**
   * Update user details by user_id (\_User.objectId) and developer association
   *
   * @example
   * ```ts
   * const userResponse = await client.user.update('user_id');
   * ```
   */
  update(userID: string, body: UserUpdateParams, options?: RequestOptions): APIPromise<UserResponse> {
    return this._client.put(path`/v1/user/${userID}`, { body, ...options });
  }

  /**
   * List users for a developer
   *
   * @example
   * ```ts
   * const users = await client.user.list();
   * ```
   */
  list(
    query: UserListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UserListResponse> {
    return this._client.get('/v1/user', { query, ...options });
  }

  /**
   * Delete user association with developer and the user itself by , assume external
   * user_id is provided, and resolve to internal user_id (\_User.objectId)
   *
   * @example
   * ```ts
   * const user = await client.user.delete('user_id');
   * ```
   */
  delete(
    userID: string,
    params: UserDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UserDeleteResponse> {
    const { is_external } = params ?? {};
    return this._client.delete(path`/v1/user/${userID}`, { query: { is_external }, ...options });
  }

  /**
   * Create multiple users or link existing users to developer, and add each to the
   * developer's workspace (if one exists).
   *
   * @example
   * ```ts
   * const response = await client.user.createBatch({
   *   users: [{ external_id: 'user123' }],
   * });
   * ```
   */
  createBatch(body: UserCreateBatchParams, options?: RequestOptions): APIPromise<UserCreateBatchResponse> {
    return this._client.post('/v1/user/batch', { body, ...options });
  }

  /**
   * Get user details by user_id (\_User.objectId) and developer association
   *
   * @example
   * ```ts
   * const userResponse = await client.user.get('user_id');
   * ```
   */
  get(userID: string, options?: RequestOptions): APIPromise<UserResponse> {
    return this._client.get(path`/v1/user/${userID}`, options);
  }
}

/**
 * Response model for user operations
 */
export interface UserResponse {
  /**
   * HTTP status code
   */
  code: number;

  /**
   * 'success' or 'error'
   */
  status: string;

  created_at?: string | null;

  details?: unknown;

  email?: string | null;

  error?: string | null;

  external_id?: string | null;

  metadata?: { [key: string]: unknown } | null;

  updated_at?: string | null;

  user_id?: string | null;
}

export type UserType = 'developerUser' | 'user' | 'agent';

export interface UserListResponse {
  /**
   * HTTP status code
   */
  code: number;

  /**
   * 'success' or 'error'
   */
  status: string;

  data?: Array<UserResponse> | null;

  details?: unknown;

  error?: string | null;

  page?: number | null;

  page_size?: number | null;

  total?: number | null;
}

export interface UserDeleteResponse {
  /**
   * HTTP status code
   */
  code: number;

  /**
   * 'success' or 'error'
   */
  status: string;

  /**
   * Additional error details or context
   */
  details?: unknown;

  /**
   * Error message if failed
   */
  error?: string | null;

  /**
   * Success or error message
   */
  message?: string | null;

  /**
   * ID of the user attempted to delete
   */
  user_id?: string | null;
}

export interface UserCreateBatchResponse {
  /**
   * HTTP status code
   */
  code: number;

  /**
   * 'success' or 'error'
   */
  status: string;

  data?: Array<UserResponse> | null;

  details?: unknown;

  error?: string | null;

  page?: number | null;

  page_size?: number | null;

  total?: number | null;
}

export interface UserCreateParams {
  external_id: string;

  email?: string | null;

  metadata?: { [key: string]: unknown } | null;

  type?: UserType;
}

export interface UserUpdateParams {
  email?: string | null;

  external_id?: string | null;

  metadata?: { [key: string]: unknown } | null;

  type?: UserType | null;
}

export interface UserListParams {
  email?: string | null;

  external_id?: string | null;

  page?: number;

  page_size?: number;
}

export interface UserDeleteParams {
  /**
   * Is this an external user ID?
   */
  is_external?: boolean;
}

export interface UserCreateBatchParams {
  users: Array<UserCreateBatchParams.User>;
}

export namespace UserCreateBatchParams {
  /**
   * Request model for creating a user
   */
  export interface User {
    external_id: string;

    email?: string | null;

    metadata?: { [key: string]: unknown } | null;

    type?: UserAPI.UserType;
  }
}

export declare namespace User {
  export {
    type UserResponse as UserResponse,
    type UserType as UserType,
    type UserListResponse as UserListResponse,
    type UserDeleteResponse as UserDeleteResponse,
    type UserCreateBatchResponse as UserCreateBatchResponse,
    type UserCreateParams as UserCreateParams,
    type UserUpdateParams as UserUpdateParams,
    type UserListParams as UserListParams,
    type UserDeleteParams as UserDeleteParams,
    type UserCreateBatchParams as UserCreateBatchParams,
  };
}
