// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Me extends APIResource {
  /**
   * Get current user information. Validates authentication and returns user details.
   *
   *     **Authentication Required:**
   *     One of the following authentication methods must be used:
   *     - Bearer token in `Authorization` header: `Authorization: Bearer <access_token>`
   *     - Session token in `Authorization` header: `Authorization: Session <session_token>`
   *     - API Key in `Authorization` header: `Authorization: APIKey <api_key>`
   *
   *     **Headers:**
   *     - `Authorization`: Authentication token (required)
   *     - `X-Client-Type`: Client type for logging (optional, default: papr_plugin)
   *
   *     **Response:**
   *     - `user_id`: Internal user ID
   *     - `sessionToken`: Session token for API access (if available)
   *     - `imageUrl`: User profile image URL (if available)
   *     - `displayName`: User display name (if available)
   *     - `email`: User email address (if available)
   *     - `message`: Authentication status message
   *
   *     **Example:**
   *     ```
   *     GET /me
   *     Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
   *     X-Client-Type: papr_plugin
   *     ```
   */
  retrieve(options?: RequestOptions): APIPromise<MeRetrieveResponse> {
    return this._client.get('/me', options);
  }
}

/**
 * Response model for /me endpoint
 */
export interface MeRetrieveResponse {
  /**
   * Internal user ID
   */
  user_id: string;

  /**
   * User display name
   */
  displayName?: string | null;

  /**
   * User email address
   */
  email?: string | null;

  /**
   * User profile image URL
   */
  imageUrl?: string | null;

  /**
   * Authentication status message
   */
  message?: string;

  /**
   * Session token for API access
   */
  sessionToken?: string | null;
}

export declare namespace Me {
  export { type MeRetrieveResponse as MeRetrieveResponse };
}
