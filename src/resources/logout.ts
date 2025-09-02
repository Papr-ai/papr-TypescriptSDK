// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Logout extends APIResource {
  /**
   * OAuth2 logout endpoint. Logs out the user from Auth0 and redirects to specified
   * URL.
   *
   *     **Query Parameters:**
   *     - `returnTo`: URL to redirect to after logout (optional, default: extension logout page)
   *     - `client_type`: Client type for determining Auth0 client ID (optional, default: papr_plugin)
   *
   *     **Flow:**
   *     1. Client redirects user to this endpoint
   *     2. This endpoint redirects to Auth0 logout URL
   *     3. Auth0 logs out the user and redirects to the specified return URL
   *
   *     **Example:**
   *     ```
   *     GET /logout?returnTo=https://chat.openai.com
   *     ```
   *
   *     **Note:** This endpoint initiates the logout process. The actual logout completion happens on Auth0's side.
   */
  logout(options?: RequestOptions): APIPromise<LogoutLogoutResponse> {
    return this._client.get('/logout', options);
  }
}

/**
 * Response model for logout endpoint
 */
export interface LogoutLogoutResponse {
  /**
   * URL to complete logout process
   */
  logout_url: string;

  /**
   * Logout status message
   */
  message?: string;
}

export declare namespace Logout {
  export { type LogoutLogoutResponse as LogoutLogoutResponse };
}
