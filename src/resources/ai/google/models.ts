// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Models extends APIResource {
  /**
   * Google Gemini generateContent API proxy
   */
  generateContent(modelID: string, options?: RequestOptions): APIPromise<ModelGenerateContentResponse> {
    return this._client.post(path`/v1/ai/google/models/${modelID}:generateContent`, options);
  }

  /**
   * Google Gemini streamGenerateContent API proxy
   */
  streamGenerateContent(
    modelID: string,
    options?: RequestOptions,
  ): APIPromise<ModelStreamGenerateContentResponse> {
    return this._client.post(path`/v1/ai/google/models/${modelID}:streamGenerateContent`, options);
  }
}

/**
 * Generic JSON response object
 */
export type ModelGenerateContentResponse = { [key: string]: unknown };

/**
 * Generic JSON response object
 */
export type ModelStreamGenerateContentResponse = { [key: string]: unknown };

export declare namespace Models {
  export {
    type ModelGenerateContentResponse as ModelGenerateContentResponse,
    type ModelStreamGenerateContentResponse as ModelStreamGenerateContentResponse,
  };
}
