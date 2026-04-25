// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InstanceAPI from './instance';
import {
  Instance,
  InstanceDeleteResponse,
  InstanceRetrieveResponse,
  InstanceUpdateParams,
  InstanceUpdateResponse,
} from './instance';

export class Organization extends APIResource {
  instance: InstanceAPI.Instance = new InstanceAPI.Instance(this._client);
}

Organization.Instance = Instance;

export declare namespace Organization {
  export {
    Instance as Instance,
    type InstanceRetrieveResponse as InstanceRetrieveResponse,
    type InstanceUpdateResponse as InstanceUpdateResponse,
    type InstanceDeleteResponse as InstanceDeleteResponse,
    type InstanceUpdateParams as InstanceUpdateParams,
  };
}
