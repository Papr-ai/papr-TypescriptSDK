// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@papr/memory-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'schemas',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/v1/schemas/{schema_id}',
  operationId: 'update_user_schema_v1',
};

export const tool: Tool = {
  name: 'update_schemas',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdate an existing schema.\n    \n    Allows modification of schema properties, node types, relationship types, and status.\n    User must have write access to the schema. Updates create a new version\n    while preserving the existing data.\n    \n    **Status Management:**\n    - Set `status` to \"active\" to activate the schema and trigger Neo4j index creation\n    - Set `status` to \"draft\" to deactivate the schema\n    - Set `status` to \"archived\" to soft-delete the schema\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/schema_update_response',\n  $defs: {\n    schema_update_response: {\n      type: 'object',\n      title: 'SchemaResponse',\n      description: 'Response model for schema operations',\n      properties: {\n        success: {\n          type: 'boolean',\n          title: 'Success'\n        },\n        code: {\n          type: 'integer',\n          title: 'Code'\n        },\n        data: {\n          $ref: '#/$defs/user_graph_schema_output'\n        },\n        error: {\n          type: 'string',\n          title: 'Error'\n        }\n      },\n      required: [        'success'\n      ]\n    },\n    user_graph_schema_output: {\n      type: 'object',\n      title: 'UserGraphSchema',\n      description: 'Complete user-defined graph schema',\n      properties: {\n        name: {\n          type: 'string',\n          title: 'Name'\n        },\n        id: {\n          type: 'string',\n          title: 'Id'\n        },\n        created_at: {\n          type: 'string',\n          title: 'Created At',\n          format: 'date-time'\n        },\n        description: {\n          type: 'string',\n          title: 'Description'\n        },\n        last_used_at: {\n          type: 'string',\n          title: 'Last Used At',\n          format: 'date-time'\n        },\n        namespace: {\n          anyOf: [            {\n              type: 'string'\n            },\n            {\n              type: 'object',\n              additionalProperties: true\n            }\n          ],\n          title: 'Namespace'\n        },\n        node_types: {\n          type: 'object',\n          title: 'Node Types',\n          description: 'Custom node types (max 10 per schema)',\n          additionalProperties: true\n        },\n        organization: {\n          anyOf: [            {\n              type: 'string'\n            },\n            {\n              type: 'object',\n              additionalProperties: true\n            }\n          ],\n          title: 'Organization'\n        },\n        read_access: {\n          type: 'array',\n          title: 'Read Access',\n          items: {\n            type: 'string'\n          }\n        },\n        relationship_types: {\n          type: 'object',\n          title: 'Relationship Types',\n          description: 'Custom relationship types (max 20 per schema)',\n          additionalProperties: true\n        },\n        scope: {\n          type: 'string',\n          title: 'SchemaScope',\n          description: 'Schema scopes available through the API',\n          enum: [            'personal',\n            'workspace',\n            'namespace',\n            'organization'\n          ]\n        },\n        status: {\n          type: 'string',\n          title: 'SchemaStatus',\n          enum: [            'draft',\n            'active',\n            'deprecated',\n            'archived'\n          ]\n        },\n        updated_at: {\n          type: 'string',\n          title: 'Updated At',\n          format: 'date-time'\n        },\n        usage_count: {\n          type: 'integer',\n          title: 'Usage Count'\n        },\n        user_id: {\n          anyOf: [            {\n              type: 'string'\n            },\n            {\n              type: 'object',\n              additionalProperties: true\n            }\n          ],\n          title: 'User Id'\n        },\n        version: {\n          type: 'string',\n          title: 'Version'\n        },\n        workspace_id: {\n          anyOf: [            {\n              type: 'string'\n            },\n            {\n              type: 'object',\n              additionalProperties: true\n            }\n          ],\n          title: 'Workspace Id'\n        },\n        write_access: {\n          type: 'array',\n          title: 'Write Access',\n          items: {\n            type: 'string'\n          }\n        }\n      },\n      required: [        'name'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      schema_id: {
        type: 'string',
        title: 'Schema Id',
      },
      body: {
        type: 'object',
        title: 'Updates',
        additionalProperties: true,
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['schema_id', 'body'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { schema_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.schemas.update(schema_id, body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
