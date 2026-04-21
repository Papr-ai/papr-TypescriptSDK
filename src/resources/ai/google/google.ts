// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ModelsAPI from './models';
import { ModelGenerateContentResponse, ModelStreamGenerateContentResponse, Models } from './models';

export class Google extends APIResource {
  models: ModelsAPI.Models = new ModelsAPI.Models(this._client);
}

Google.Models = Models;

export declare namespace Google {
  export {
    Models as Models,
    type ModelGenerateContentResponse as ModelGenerateContentResponse,
    type ModelStreamGenerateContentResponse as ModelStreamGenerateContentResponse,
  };
}
