// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Callback extends APIResource {
  /**
   * OAuth2 callback endpoint. Processes the authorization code from Auth0.
   *
   *     **Query Parameters:**
   *     - `code`: Authorization code from Auth0 (required)
   *     - `state`: State parameter for CSRF protection (required)
   *
   *     **Flow:**
   *     1. Auth0 redirects to this endpoint after successful authentication
   *     2. This endpoint validates the authorization code and state
   *     3. Redirects back to the original `redirect_uri` with code and state
   *     4. Client can then exchange the code for tokens at `/token` endpoint
   *
   *     **Security:**
   *     - Validates state parameter to prevent CSRF attacks
   *     - Checks authorization code expiration
   *     - Cleans up session data after processing
   */
  process(options?: RequestOptions): APIPromise<CallbackProcessResponse> {
    return this._client.get('/callback', options);
  }
}

/**
 * Response model for OAuth2 callback endpoint
 */
export interface CallbackProcessResponse {
  /**
   * Authorization code
   */
  code?: string | null;

  /**
   * Callback status message
   */
  message?: string;

  /**
   * State parameter for security
   */
  state?: string | null;
}

export declare namespace Callback {
  export { type CallbackProcessResponse as CallbackProcessResponse };
}
