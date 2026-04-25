// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Login extends APIResource {
  /**
   * OAuth2 login endpoint. Initiates the OAuth2 authorization code flow.
   *
   *     **Query Parameters:**
   *     - `redirect_uri`: The URI to redirect to after authentication (required)
   *     - `state`: A random string for CSRF protection (optional but recommended)
   *
   *     **Flow:**
   *     1. Client redirects user to this endpoint with `redirect_uri` and `state`
   *     2. This endpoint redirects user to Auth0 for authentication
   *     3. After authentication, Auth0 redirects to `/callback` with authorization code
   *     4. `/callback` redirects back to the original `redirect_uri` with code and state
   *
   *     **Example:**
   *     ```
   *     GET /login?redirect_uri=https://chat.openai.com&state=abc123
   *     ```
   */
  initiate(options?: RequestOptions): APIPromise<LoginInitiateResponse> {
    return this._client.get('/login', options);
  }
}

/**
 * Response model for OAuth2 login endpoint
 */
export interface LoginInitiateResponse {
  message?: string;

  redirect_url?: string | null;
}

export declare namespace Login {
  export { type LoginInitiateResponse as LoginInitiateResponse };
}
