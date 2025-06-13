// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Document extends APIResource {}

/**
 * Response model for a single memory item in add_memory response
 */
export interface AddMemoryItem {
  createdAt: string;

  memoryId: string;

  objectId: string;

  memoryChunkIds?: Array<string>;
}

export declare namespace Document {
  export { type AddMemoryItem as AddMemoryItem };
}
