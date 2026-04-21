// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Anthropic extends APIResource {
  /**
   * Anthropic Messages API proxy (Claude models)
   */
  sendMessage(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/ai/anthropic/messages', options);
  }
}

export type AnthropicSendMessageResponse = unknown;

export declare namespace Anthropic {
  export { type AnthropicSendMessageResponse as AnthropicSendMessageResponse };
}
