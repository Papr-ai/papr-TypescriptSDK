// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'schemas',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/schemas',
  operationId: 'create_user_schema_v1',
};

export const tool: Tool = {
  name: 'create_schemas',
  description:
    'Create a new user-defined graph schema.\n    \n    This endpoint allows users to define custom node types and relationships for their knowledge graph.\n    The schema will be validated and stored for use in future memory extractions.\n    \n    **Features:**\n    - Define custom node types with properties and validation rules\n    - Define custom relationship types with constraints\n    - Automatic validation against system schemas\n    - Support for different scopes (personal, workspace, organization)\n    - **Status control**: Set `status` to "active" to immediately activate the schema, or "draft" to save as draft (default)\n    - **Enum support**: Use `enum_values` to restrict property values to a predefined list (max 10 values)\n    - **Auto-indexing**: Required properties are automatically indexed in Neo4j when schema becomes active\n    \n    **Schema Limits (optimized for LLM performance):**\n    - **Maximum 10 node types** per schema\n    - **Maximum 20 relationship types** per schema\n    - **Maximum 10 properties** per node type\n    - **Maximum 10 enum values** per property\n    \n    **Property Types & Validation:**\n    - `string`: Text values with optional `enum_values`, `min_length`, `max_length`, `pattern`\n    - `integer`: Whole numbers with optional `min_value`, `max_value`\n    - `float`: Decimal numbers with optional `min_value`, `max_value`\n    - `boolean`: True/false values\n    - `datetime`: ISO 8601 timestamp strings\n    - `array`: Lists of values\n    - `object`: Complex nested objects\n    \n    **Enum Values:**\n    - Add `enum_values` to any string property to restrict values to a predefined list\n    - Maximum 10 enum values allowed per property\n    - Use with `default` to set a default enum value\n    - Example: `"enum_values": ["small", "medium", "large"]`\n    \n    **When to Use Enums:**\n    - Limited, well-defined options (≤10 values): sizes, statuses, categories, priorities\n    - Controlled vocabularies: "active/inactive", "high/medium/low", "bronze/silver/gold"\n    - When you want exact matching and no variations\n    \n    **When to Avoid Enums:**\n    - Open-ended text fields: names, titles, descriptions, addresses\n    - Large sets of options (>10): countries, cities, product models\n    - When you want semantic similarity matching for entity resolution\n    - Dynamic or frequently changing value sets\n    \n    **Unique Identifiers & Entity Resolution:**\n    - Properties marked as `unique_identifiers` are used for entity deduplication and merging\n    - **With enum_values**: Exact matching is used - entities with the same enum value are considered identical\n    - **Without enum_values**: Semantic similarity matching is used - entities with similar meanings are automatically merged\n    - Example: A "name" unique_identifier without enums will merge "Apple Inc" and "Apple Inc." as the same entity\n    - Example: A "sku" unique_identifier with enums will only merge entities with exactly matching SKU codes\n    - Use enums for unique_identifiers when you have a limited, predefined set of values (≤10 options)\n    - Avoid enums for unique_identifiers when you have broad, open-ended values or >10 possible options\n    - **Best practices**: Use enums for controlled vocabularies (status codes, categories), avoid for open text (company names, product titles)\n    - **In the example above**: "name" uses semantic similarity (open-ended), "sku" uses exact matching (controlled set)\n    \n    **LLM-Friendly Descriptions:**\n    - Write detailed property descriptions that guide the LLM on expected formats and usage\n    - Include examples of typical values (e.g., "Product name, typically 2-4 words like \'iPhone 15 Pro\'")\n    - Specify data formats and constraints clearly (e.g., "Price in USD as decimal number")\n    - For enums, explain when to use each option (e.g., "use \'new\' for brand new items")\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., \'papr_plugin\', \'browser_extension\')',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: 'Name',
      },
      id: {
        type: 'string',
        title: 'Id',
      },
      created_at: {
        type: 'string',
        title: 'Created At',
        format: 'date-time',
      },
      description: {
        type: 'string',
        title: 'Description',
      },
      last_used_at: {
        type: 'string',
        title: 'Last Used At',
        format: 'date-time',
      },
      namespace: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'object',
            additionalProperties: true,
          },
        ],
        title: 'Namespace',
      },
      node_types: {
        type: 'object',
        title: 'Node Types',
        description: 'Custom node types (max 10 per schema)',
        additionalProperties: true,
      },
      organization: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'object',
            additionalProperties: true,
          },
        ],
        title: 'Organization',
      },
      read_access: {
        type: 'array',
        title: 'Read Access',
        items: {
          type: 'string',
        },
      },
      relationship_types: {
        type: 'object',
        title: 'Relationship Types',
        description: 'Custom relationship types (max 20 per schema)',
        additionalProperties: true,
      },
      scope: {
        type: 'string',
        title: 'SchemaScope',
        description: 'Schema scopes available through the API',
        enum: ['personal', 'workspace', 'namespace', 'organization'],
      },
      status: {
        type: 'string',
        title: 'SchemaStatus',
        enum: ['draft', 'active', 'deprecated', 'archived'],
      },
      updated_at: {
        type: 'string',
        title: 'Updated At',
        format: 'date-time',
      },
      usage_count: {
        type: 'integer',
        title: 'Usage Count',
      },
      user_id: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'object',
            additionalProperties: true,
          },
        ],
        title: 'User Id',
      },
      version: {
        type: 'string',
        title: 'Version',
      },
      workspace_id: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'object',
            additionalProperties: true,
          },
        ],
        title: 'Workspace Id',
      },
      write_access: {
        type: 'array',
        title: 'Write Access',
        items: {
          type: 'string',
        },
      },
    },
    required: ['name'],
  },
  annotations: {},
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.schemas.create(body));
};

export default { metadata, tool, handler };
