// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@papr/memory-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'schemas',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/schemas',
  operationId: 'list_user_schemas_v1',
};

export const tool: Tool = {
  name: 'list_schemas',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nList all schemas accessible to the authenticated user.\n    \n    Returns schemas that the user owns or has read access to, including:\n    - Personal schemas created by the user\n    - Workspace schemas shared within the user's workspace\n    - Organization schemas available to the user's organization\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/schema_list_response',\n  $defs: {\n    schema_list_response: {\n      type: 'object',\n      title: 'SchemaListResponse',\n      description: 'Response model for listing schemas',\n      properties: {\n        success: {\n          type: 'boolean',\n          title: 'Success'\n        },\n        code: {\n          type: 'integer',\n          title: 'Code'\n        },\n        data: {\n          type: 'array',\n          title: 'Data',\n          items: {\n            $ref: '#/$defs/user_graph_schema_output'\n          }\n        },\n        error: {\n          type: 'string',\n          title: 'Error'\n        },\n        total: {\n          type: 'integer',\n          title: 'Total'\n        }\n      },\n      required: [        'success'\n      ]\n    },\n    user_graph_schema_output: {\n      type: 'object',\n      title: 'UserGraphSchema',\n      description: 'Complete user-defined graph schema',\n      properties: {\n        name: {\n          type: 'string',\n          title: 'Name'\n        },\n        id: {\n          type: 'string',\n          title: 'Id'\n        },\n        created_at: {\n          type: 'string',\n          title: 'Created At',\n          format: 'date-time'\n        },\n        description: {\n          type: 'string',\n          title: 'Description'\n        },\n        last_used_at: {\n          type: 'string',\n          title: 'Last Used At',\n          format: 'date-time'\n        },\n        node_types: {\n          type: 'object',\n          title: 'Node Types',\n          description: 'Custom node types (max 15 per schema)',\n          additionalProperties: true\n        },\n        organization_id: {\n          type: 'string',\n          title: 'Organization Id'\n        },\n        read_access: {\n          type: 'array',\n          title: 'Read Access',\n          items: {\n            type: 'string'\n          }\n        },\n        relationship_types: {\n          type: 'object',\n          title: 'Relationship Types',\n          description: 'Custom relationship types (max 20 per schema)',\n          additionalProperties: true\n        },\n        scope: {\n          type: 'string',\n          title: 'SchemaScope',\n          enum: [            'personal',\n            'workspace',\n            'organization'\n          ]\n        },\n        status: {\n          type: 'string',\n          title: 'SchemaStatus',\n          enum: [            'draft',\n            'active',\n            'deprecated',\n            'archived'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          title: 'Updated At',\n          format: 'date-time'\n        },\n        usage_count: {\n          type: 'integer',\n          title: 'Usage Count'\n        },\n        user_id: {\n          anyOf: [            {\n              type: 'string'\n            },\n            {\n              type: 'object',\n              additionalProperties: true\n            }\n          ],\n          title: 'User Id'\n        },\n        version: {\n          type: 'string',\n          title: 'Version'\n        },\n        workspace_id: {\n          anyOf: [            {\n              type: 'string'\n            },\n            {\n              type: 'object',\n              additionalProperties: true\n            }\n          ],\n          title: 'Workspace Id'\n        },\n        write_access: {\n          type: 'array',\n          title: 'Write Access',\n          items: {\n            type: 'string'\n          }\n        }\n      },\n      required: [        'name'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      status_filter: {
        type: 'string',
        title: 'Status Filter',
        description: 'Filter by status (draft, active, deprecated, archived)',
      },
      workspace_id: {
        type: 'string',
        title: 'Workspace Id',
        description: 'Filter by workspace ID',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.schemas.list(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
