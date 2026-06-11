// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Anthropic extends APIResource {
  /**
   * Anthropic Messages API proxy (Claude models)
   */
  sendMessage(options?: RequestOptions): APIPromise<AnthropicSendMessageResponse> {
    return this._client.post('/v1/ai/anthropic/messages', options);
  }
}

/**
 * Generic JSON response object
 */
export type AnthropicSendMessageResponse = { [key: string]: unknown };

export declare namespace Anthropic {
  export { type AnthropicSendMessageResponse as AnthropicSendMessageResponse };
}
