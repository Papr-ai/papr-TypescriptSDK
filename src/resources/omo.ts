// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Omo extends APIResource {
  /**
   * Export memories in Open Memory Object (OMO) standard format.
   *
   *     This enables memory portability to other OMO-compliant platforms.
   *     The exported format follows the OMO v1 schema.
   *
   *     **OMO Standard:** https://github.com/papr-ai/open-memory-object
   */
  exportMemories(
    body: OmoExportMemoriesParams,
    options?: RequestOptions,
  ): APIPromise<OmoExportMemoriesResponse> {
    return this._client.post('/v1/omo/export', { body, ...options });
  }

  /**
   * Export memories in OMO JSON file format for download.
   */
  exportMemoriesAsJson(query: OmoExportMemoriesAsJsonParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/v1/omo/export.json', { query, ...options });
  }

  /**
   * Import memories from Open Memory Object (OMO) standard format.
   *
   *     This enables importing memories from other OMO-compliant platforms.
   *
   *     **OMO Standard:** https://github.com/papr-ai/open-memory-object
   */
  importMemories(
    body: OmoImportMemoriesParams,
    options?: RequestOptions,
  ): APIPromise<OmoImportMemoriesResponse> {
    return this._client.post('/v1/omo/import', { body, ...options });
  }
}

/**
 * Response model for OMO export.
 */
export interface OmoExportMemoriesResponse {
  /**
   * Number of memories exported
   */
  count: number;

  /**
   * Memories in OMO v1 format
   */
  memories: Array<{ [key: string]: unknown }>;

  code?: number;

  error?: string | null;

  status?: string;
}

export type OmoExportMemoriesAsJsonResponse = unknown;

/**
 * Response model for OMO import.
 */
export interface OmoImportMemoriesResponse {
  /**
   * Number of memories successfully imported
   */
  imported: number;

  code?: number;

  /**
   * Import errors
   */
  errors?: Array<{ [key: string]: unknown }>;

  /**
   * IDs of imported memories
   */
  memory_ids?: Array<string>;

  /**
   * Number of memories skipped (duplicates)
   */
  skipped?: number;

  status?: string;
}

export interface OmoExportMemoriesParams {
  /**
   * List of memory IDs to export
   */
  memory_ids: Array<string>;
}

export interface OmoExportMemoriesAsJsonParams {
  /**
   * Comma-separated list of memory IDs
   */
  memory_ids: string;
}

export interface OmoImportMemoriesParams {
  /**
   * List of memories in OMO v1 format
   */
  memories: Array<{ [key: string]: unknown }>;

  /**
   * Skip memories with IDs that already exist
   */
  skip_duplicates?: boolean;
}

export declare namespace Omo {
  export {
    type OmoExportMemoriesResponse as OmoExportMemoriesResponse,
    type OmoExportMemoriesAsJsonResponse as OmoExportMemoriesAsJsonResponse,
    type OmoImportMemoriesResponse as OmoImportMemoriesResponse,
    type OmoExportMemoriesParams as OmoExportMemoriesParams,
    type OmoExportMemoriesAsJsonParams as OmoExportMemoriesAsJsonParams,
    type OmoImportMemoriesParams as OmoImportMemoriesParams,
  };
}
