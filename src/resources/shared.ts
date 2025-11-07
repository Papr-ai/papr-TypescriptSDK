// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

/**
 * Response model for a single memory item in add_memory response
 */
export interface AddMemoryItem {
  createdAt: string;

  memoryId: string;

  objectId: string;

  memoryChunkIds?: Array<string>;
}
