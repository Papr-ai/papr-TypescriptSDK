// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Token extends APIResource {
  /**
   * OAuth2 token endpoint. Exchanges authorization code for access tokens.
   *
   *     **Request Body (JSON or Form):**
   *     - `grant_type`: OAuth2 grant type - "authorization_code" or "refresh_token" (required)
   *     - `code`: Authorization code from OAuth2 callback (required for authorization_code grant)
   *     - `redirect_uri`: Redirect URI used in authorization (required for authorization_code grant)
   *     - `client_type`: Client type - "papr_plugin" or "browser_extension" (optional, default: papr_plugin)
   *     - `refresh_token`: Refresh token for token refresh (required for refresh_token grant)
   *
   *     **Response:**
   *     - `access_token`: OAuth2 access token for API authentication
   *     - `token_type`: Token type (Bearer)
   *     - `expires_in`: Token expiration time in seconds
   *     - `refresh_token`: Refresh token for getting new access tokens
   *     - `scope`: OAuth2 scopes granted
   *     - `user_id`: User ID from Auth0
   *
   *     **Example Request:**
   *     ```json
   *     {
   *         "grant_type": "authorization_code",
   *         "code": "abc123...",
   *         "redirect_uri": "https://chat.openai.com",
   *         "client_type": "papr_plugin"
   *     }
   *     ```
   */
  create(options?: RequestOptions): APIPromise<TokenCreateResponse> {
    return this._client.post('/token', options);
  }
}

/**
 * Response model for OAuth2 token endpoint
 */
export interface TokenCreateResponse {
  /**
   * OAuth2 access token
   */
  access_token: string;

  /**
   * Token expiration time in seconds
   */
  expires_in: number;

  /**
   * OAuth2 scopes granted
   */
  scope: string;

  /**
   * Additional message or status
   */
  message?: string | null;

  /**
   * Refresh token for getting new access tokens
   */
  refresh_token?: string | null;

  /**
   * Token type
   */
  token_type?: string;

  /**
   * User ID from Auth0
   */
  user_id?: string | null;
}

export declare namespace Token {
  export { type TokenCreateResponse as TokenCreateResponse };
}
