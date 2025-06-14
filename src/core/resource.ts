// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Papr } from '../client';

export abstract class APIResource {
  protected _client: Papr;

  constructor(client: Papr) {
    this._client = client;
  }
}
