// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AnthropicAPI from './anthropic';
import { Anthropic, AnthropicSendMessageResponse } from './anthropic';
import * as GoogleAPI from './google/google';
import { Google } from './google/google';
import * as OpenAIAPI from './openai/openai';
import { OpenAI, OpenAICreateResponseResponse } from './openai/openai';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class AI extends APIResource {
  openai: OpenAIAPI.OpenAI = new OpenAIAPI.OpenAI(this._client);
  anthropic: AnthropicAPI.Anthropic = new AnthropicAPI.Anthropic(this._client);
  google: GoogleAPI.Google = new GoogleAPI.Google(this._client);

  /**
   * Get user's AI proxy usage stats and subscription info.
   */
  getUsage(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/v1/ai/usage', options);
  }
}

export type AIGetUsageResponse = unknown;

AI.OpenAI = OpenAI;
AI.Anthropic = Anthropic;
AI.Google = Google;

export declare namespace AI {
  export { type AIGetUsageResponse as AIGetUsageResponse };

  export { OpenAI as OpenAI, type OpenAICreateResponseResponse as OpenAICreateResponseResponse };

  export { Anthropic as Anthropic, type AnthropicSendMessageResponse as AnthropicSendMessageResponse };

  export { Google as Google };
}
