// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ChatAPI from './chat';
import { Chat, ChatCreateCompletionResponse } from './chat';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class OpenAI extends APIResource {
  chat: ChatAPI.Chat = new ChatAPI.Chat(this._client);

  /**
   * OpenAI Responses API proxy (GPT-5+, o-series reasoning models)
   */
  createResponse(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/ai/openai/responses', options);
  }
}

export type OpenAICreateResponseResponse = unknown;

OpenAI.Chat = Chat;

export declare namespace OpenAI {
  export { type OpenAICreateResponseResponse as OpenAICreateResponseResponse };

  export { Chat as Chat, type ChatCreateCompletionResponse as ChatCreateCompletionResponse };
}
