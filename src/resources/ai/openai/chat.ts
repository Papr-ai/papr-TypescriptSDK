// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class Chat extends APIResource {
  /**
   * OpenAI Chat Completions API proxy (GPT-4, GPT-4-turbo, etc.)
   */
  createCompletion(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/ai/openai/chat/completions', options);
  }
}

export type ChatCreateCompletionResponse = unknown;

export declare namespace Chat {
  export { type ChatCreateCompletionResponse as ChatCreateCompletionResponse };
}
