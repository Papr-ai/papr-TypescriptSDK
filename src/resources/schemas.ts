// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Schemas extends APIResource {
  /**
   * Create a new user-defined graph schema.
   *
   *     This endpoint allows users to define custom node types and relationships for their knowledge graph.
   *     The schema will be validated and stored for use in future memory extractions.
   *
   *     **Features:**
   *     - Define custom node types with properties and validation rules
   *     - Define custom relationship types with constraints
   *     - Automatic validation against system schemas
   *     - Support for different scopes (personal, workspace, organization)
   *     - **Enum support**: Use `enum_values` to restrict property values to a predefined list (max 10 values)
   *     - **Auto-indexing**: Required properties are automatically indexed in Neo4j for optimal query performance
   *
   *     **Property Types & Validation:**
   *     - `string`: Text values with optional `enum_values`, `min_length`, `max_length`, `pattern`
   *     - `integer`: Whole numbers with optional `min_value`, `max_value`
   *     - `float`: Decimal numbers with optional `min_value`, `max_value`
   *     - `boolean`: True/false values
   *     - `datetime`: ISO 8601 timestamp strings
   *     - `array`: Lists of values
   *     - `object`: Complex nested objects
   *
   *     **Enum Values:**
   *     - Add `enum_values` to any string property to restrict values to a predefined list
   *     - Maximum 10 enum values allowed per property
   *     - Use with `default` to set a default enum value
   *     - Example: `"enum_values": ["small", "medium", "large"]`
   *
   *     **When to Use Enums:**
   *     - Limited, well-defined options (≤10 values): sizes, statuses, categories, priorities
   *     - Controlled vocabularies: "active/inactive", "high/medium/low", "bronze/silver/gold"
   *     - When you want exact matching and no variations
   *
   *     **When to Avoid Enums:**
   *     - Open-ended text fields: names, titles, descriptions, addresses
   *     - Large sets of options (>10): countries, cities, product models
   *     - When you want semantic similarity matching for entity resolution
   *     - Dynamic or frequently changing value sets
   *
   *     **Unique Identifiers & Entity Resolution:**
   *     - Properties marked as `unique_identifiers` are used for entity deduplication and merging
   *     - **With enum_values**: Exact matching is used - entities with the same enum value are considered identical
   *     - **Without enum_values**: Semantic similarity matching is used - entities with similar meanings are automatically merged
   *     - Example: A "name" unique_identifier without enums will merge "Apple Inc" and "Apple Inc." as the same entity
   *     - Example: A "sku" unique_identifier with enums will only merge entities with exactly matching SKU codes
   *     - Use enums for unique_identifiers when you have a limited, predefined set of values (≤10 options)
   *     - Avoid enums for unique_identifiers when you have broad, open-ended values or >10 possible options
   *     - **Best practices**: Use enums for controlled vocabularies (status codes, categories), avoid for open text (company names, product titles)
   *     - **In the example above**: "name" uses semantic similarity (open-ended), "sku" uses exact matching (controlled set)
   *
   *     **LLM-Friendly Descriptions:**
   *     - Write detailed property descriptions that guide the LLM on expected formats and usage
   *     - Include examples of typical values (e.g., "Product name, typically 2-4 words like 'iPhone 15 Pro'")
   *     - Specify data formats and constraints clearly (e.g., "Price in USD as decimal number")
   *     - For enums, explain when to use each option (e.g., "use 'new' for brand new items")
   *
   *     **Authentication Required**:
   *     One of the following authentication methods must be used:
   *     - Bearer token in `Authorization` header
   *     - API Key in `X-API-Key` header
   *     - Session token in `X-Session-Token` header
   *
   *     **Required Headers**:
   *     - Content-Type: application/json
   *     - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
   */
  create(body: SchemaCreateParams, options?: RequestOptions): APIPromise<SchemaCreateResponse> {
    return this._client.post('/v1/schemas', { body, ...options });
  }

  /**
   * Get a specific schema by ID.
   *
   *     Returns the complete schema definition including node types, relationship types,
   *     and metadata. User must have read access to the schema.
   */
  retrieve(schemaID: string, options?: RequestOptions): APIPromise<SchemaRetrieveResponse> {
    return this._client.get(path`/v1/schemas/${schemaID}`, options);
  }

  /**
   * Update an existing schema.
   *
   *     Allows modification of schema properties, node types, and relationship types.
   *     User must have write access to the schema. Updates create a new version
   *     while preserving the existing data.
   */
  update(
    schemaID: string,
    params: SchemaUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SchemaUpdateResponse> {
    const { body } = params;
    return this._client.put(path`/v1/schemas/${schemaID}`, { body: body, ...options });
  }

  /**
   * List all schemas accessible to the authenticated user.
   *
   *     Returns schemas that the user owns or has read access to, including:
   *     - Personal schemas created by the user
   *     - Workspace schemas shared within the user's workspace
   *     - Organization schemas available to the user's organization
   *
   *     **Authentication Required**:
   *     One of the following authentication methods must be used:
   *     - Bearer token in `Authorization` header
   *     - API Key in `X-API-Key` header
   *     - Session token in `X-Session-Token` header
   */
  list(
    query: SchemaListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SchemaListResponse> {
    return this._client.get('/v1/schemas', { query, ...options });
  }

  /**
   * Delete a schema.
   *
   *     Soft deletes the schema by marking it as archived. The schema data and
   *     associated graph nodes/relationships are preserved for data integrity.
   *     User must have write access to the schema.
   */
  delete(schemaID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/v1/schemas/${schemaID}`, options);
  }

  /**
   * Activate or deactivate a schema.
   *
   *     Active schemas are used for memory extraction and graph generation.
   *     Multiple schemas can be active simultaneously and will be merged during
   *     the extraction process.
   */
  activate(
    schemaID: string,
    params: SchemaActivateParams | null | undefined = undefined,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { body } = params ?? {};
    return this._client.post(path`/v1/schemas/${schemaID}/activate`, { body: body, ...options });
  }
}

/**
 * Complete user-defined graph schema
 */
export interface UserGraphSchemaOutput {
  name: string;

  id?: string;

  created_at?: string;

  description?: string | null;

  last_used_at?: string | null;

  /**
   * Custom node types (max 15 per schema)
   */
  node_types?: { [key: string]: UserGraphSchemaOutput.NodeTypes };

  organization_id?: string | null;

  read_access?: Array<string>;

  /**
   * Custom relationship types (max 20 per schema)
   */
  relationship_types?: { [key: string]: UserGraphSchemaOutput.RelationshipTypes };

  scope?: 'personal' | 'workspace' | 'organization';

  status?: 'draft' | 'active' | 'deprecated' | 'archived';

  updated_at?: string | null;

  usage_count?: number;

  user_id?: string | { [key: string]: unknown } | null;

  version?: string;

  workspace_id?: string | { [key: string]: unknown } | null;

  write_access?: Array<string>;
}

export namespace UserGraphSchemaOutput {
  /**
   * User-defined node type
   */
  export interface NodeTypes {
    label: string;

    name: string;

    color?: string | null;

    description?: string | null;

    icon?: string | null;

    /**
     * Node properties (max 15 per node type)
     */
    properties?: { [key: string]: NodeTypes.Properties };

    required_properties?: Array<string>;

    /**
     * Properties that uniquely identify this node type. Used for MERGE operations to
     * avoid duplicates. Example: ['name', 'email'] for Customer nodes.
     */
    unique_identifiers?: Array<string>;
  }

  export namespace NodeTypes {
    /**
     * Property definition for nodes/relationships
     */
    export interface Properties {
      type: 'string' | 'integer' | 'float' | 'boolean' | 'array' | 'datetime' | 'object';

      default?: unknown;

      description?: string | null;

      /**
       * List of allowed enum values (max 10)
       */
      enum_values?: Array<string> | null;

      max_length?: number | null;

      max_value?: number | null;

      min_length?: number | null;

      min_value?: number | null;

      pattern?: string | null;

      required?: boolean;
    }
  }

  /**
   * User-defined relationship type
   */
  export interface RelationshipTypes {
    allowed_source_types: Array<string>;

    allowed_target_types: Array<string>;

    label: string;

    name: string;

    cardinality?: 'one-to-one' | 'one-to-many' | 'many-to-many';

    color?: string | null;

    description?: string | null;

    properties?: { [key: string]: RelationshipTypes.Properties };
  }

  export namespace RelationshipTypes {
    /**
     * Property definition for nodes/relationships
     */
    export interface Properties {
      type: 'string' | 'integer' | 'float' | 'boolean' | 'array' | 'datetime' | 'object';

      default?: unknown;

      description?: string | null;

      /**
       * List of allowed enum values (max 10)
       */
      enum_values?: Array<string> | null;

      max_length?: number | null;

      max_value?: number | null;

      min_length?: number | null;

      min_value?: number | null;

      pattern?: string | null;

      required?: boolean;
    }
  }
}

/**
 * Response model for schema operations
 */
export interface SchemaCreateResponse {
  success: boolean;

  code?: number;

  /**
   * Complete user-defined graph schema
   */
  data?: UserGraphSchemaOutput | null;

  error?: string | null;
}

/**
 * Response model for schema operations
 */
export interface SchemaRetrieveResponse {
  success: boolean;

  code?: number;

  /**
   * Complete user-defined graph schema
   */
  data?: UserGraphSchemaOutput | null;

  error?: string | null;
}

/**
 * Response model for schema operations
 */
export interface SchemaUpdateResponse {
  success: boolean;

  code?: number;

  /**
   * Complete user-defined graph schema
   */
  data?: UserGraphSchemaOutput | null;

  error?: string | null;
}

/**
 * Response model for listing schemas
 */
export interface SchemaListResponse {
  success: boolean;

  code?: number;

  data?: Array<UserGraphSchemaOutput> | null;

  error?: string | null;

  total?: number;
}

export type SchemaDeleteResponse = unknown;

export type SchemaActivateResponse = unknown;

export interface SchemaCreateParams {
  name: string;

  id?: string;

  created_at?: string;

  description?: string | null;

  last_used_at?: string | null;

  /**
   * Custom node types (max 15 per schema)
   */
  node_types?: { [key: string]: SchemaCreateParams.NodeTypes };

  organization_id?: string | null;

  read_access?: Array<string>;

  /**
   * Custom relationship types (max 20 per schema)
   */
  relationship_types?: { [key: string]: SchemaCreateParams.RelationshipTypes };

  scope?: 'personal' | 'workspace' | 'organization';

  status?: 'draft' | 'active' | 'deprecated' | 'archived';

  updated_at?: string | null;

  usage_count?: number;

  user_id?: string | { [key: string]: unknown } | null;

  version?: string;

  workspace_id?: string | { [key: string]: unknown } | null;

  write_access?: Array<string>;
}

export namespace SchemaCreateParams {
  /**
   * User-defined node type
   */
  export interface NodeTypes {
    label: string;

    name: string;

    color?: string | null;

    description?: string | null;

    icon?: string | null;

    /**
     * Node properties (max 15 per node type)
     */
    properties?: { [key: string]: NodeTypes.Properties };

    required_properties?: Array<string>;

    /**
     * Properties that uniquely identify this node type. Used for MERGE operations to
     * avoid duplicates. Example: ['name', 'email'] for Customer nodes.
     */
    unique_identifiers?: Array<string>;
  }

  export namespace NodeTypes {
    /**
     * Property definition for nodes/relationships
     */
    export interface Properties {
      type: 'string' | 'integer' | 'float' | 'boolean' | 'array' | 'datetime' | 'object';

      default?: unknown;

      description?: string | null;

      /**
       * List of allowed enum values (max 10)
       */
      enum_values?: Array<string> | null;

      max_length?: number | null;

      max_value?: number | null;

      min_length?: number | null;

      min_value?: number | null;

      pattern?: string | null;

      required?: boolean;
    }
  }

  /**
   * User-defined relationship type
   */
  export interface RelationshipTypes {
    allowed_source_types: Array<string>;

    allowed_target_types: Array<string>;

    label: string;

    name: string;

    cardinality?: 'one-to-one' | 'one-to-many' | 'many-to-many';

    color?: string | null;

    description?: string | null;

    properties?: { [key: string]: RelationshipTypes.Properties };
  }

  export namespace RelationshipTypes {
    /**
     * Property definition for nodes/relationships
     */
    export interface Properties {
      type: 'string' | 'integer' | 'float' | 'boolean' | 'array' | 'datetime' | 'object';

      default?: unknown;

      description?: string | null;

      /**
       * List of allowed enum values (max 10)
       */
      enum_values?: Array<string> | null;

      max_length?: number | null;

      max_value?: number | null;

      min_length?: number | null;

      min_value?: number | null;

      pattern?: string | null;

      required?: boolean;
    }
  }
}

export interface SchemaUpdateParams {
  body: { [key: string]: unknown };
}

export interface SchemaListParams {
  /**
   * Filter by status (draft, active, deprecated, archived)
   */
  status_filter?: string | null;

  /**
   * Filter by workspace ID
   */
  workspace_id?: string | null;
}

export interface SchemaActivateParams {
  /**
   * True to activate, False to deactivate
   */
  body?: boolean;
}

export declare namespace Schemas {
  export {
    type UserGraphSchemaOutput as UserGraphSchemaOutput,
    type SchemaCreateResponse as SchemaCreateResponse,
    type SchemaRetrieveResponse as SchemaRetrieveResponse,
    type SchemaUpdateResponse as SchemaUpdateResponse,
    type SchemaListResponse as SchemaListResponse,
    type SchemaDeleteResponse as SchemaDeleteResponse,
    type SchemaActivateResponse as SchemaActivateResponse,
    type SchemaCreateParams as SchemaCreateParams,
    type SchemaUpdateParams as SchemaUpdateParams,
    type SchemaListParams as SchemaListParams,
    type SchemaActivateParams as SchemaActivateParams,
  };
}
