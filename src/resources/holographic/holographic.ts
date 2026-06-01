// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DomainsAPI from './domains';
import { Domains } from './domains';
import * as TransformAPI from './transform';
import { Transform, TransformData } from './transform';

export class Holographic extends APIResource {
  transform: TransformAPI.Transform = new TransformAPI.Transform(this._client);
  domains: DomainsAPI.Domains = new DomainsAPI.Domains(this._client);
}

Holographic.Transform = Transform;
Holographic.Domains = Domains;

export declare namespace Holographic {
  export { Transform as Transform, type TransformData as TransformData };

  export { Domains as Domains };
}
