// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@papr/memory-mcp/filtering';
import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'user',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/user',
  operationId: 'create_user',
};

export const tool: Tool = {
  name: 'create_user',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate a new user or link existing user to developer\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/user_response',\n  $defs: {\n    user_response: {\n      type: 'object',\n      title: 'UserResponse',\n      description: 'Response model for user operations',\n      properties: {\n        code: {\n          type: 'integer',\n          title: 'Code',\n          description: 'HTTP status code'\n        },\n        status: {\n          type: 'string',\n          title: 'Status',\n          description: '\\'success\\' or \\'error\\''\n        },\n        created_at: {\n          type: 'string',\n          title: 'Created At'\n        },\n        details: {\n          type: 'object',\n          title: 'Details',\n          additionalProperties: true\n        },\n        email: {\n          type: 'string',\n          title: 'Email'\n        },\n        error: {\n          type: 'string',\n          title: 'Error'\n        },\n        external_id: {\n          type: 'string',\n          title: 'External Id'\n        },\n        metadata: {\n          type: 'object',\n          title: 'Metadata',\n          additionalProperties: true\n        },\n        updated_at: {\n          type: 'string',\n          title: 'Updated At'\n        },\n        user_id: {\n          type: 'string',\n          title: 'User Id'\n        }\n      },\n      required: [        'code',\n        'status'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      external_id: {
        type: 'string',
        title: 'External Id',
      },
      email: {
        type: 'string',
        title: 'Email',
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
        additionalProperties: true,
      },
      type: {
        $ref: '#/$defs/user_type',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['external_id'],
    $defs: {
      user_type: {
        type: 'string',
        title: 'UserType',
        enum: ['developerUser', 'user', 'agent'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.user.create(body)));
};

export default { metadata, tool, handler };
