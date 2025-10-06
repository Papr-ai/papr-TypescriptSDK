// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@papr/memory-mcp/filtering';
import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'user',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/user/{user_id}',
  operationId: 'delete_user',
};

export const tool: Tool = {
  name: 'delete_user',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDelete user association with developer and the user itself by , assume external user_id is provided, and resolve to internal user_id (_User.objectId)\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'DeleteUserResponse',\n  properties: {\n    code: {\n      type: 'integer',\n      title: 'Code',\n      description: 'HTTP status code'\n    },\n    status: {\n      type: 'string',\n      title: 'Status',\n      description: '\\'success\\' or \\'error\\''\n    },\n    details: {\n      type: 'object',\n      title: 'Details',\n      description: 'Additional error details or context',\n      additionalProperties: true\n    },\n    error: {\n      type: 'string',\n      title: 'Error',\n      description: 'Error message if failed'\n    },\n    message: {\n      type: 'string',\n      title: 'Message',\n      description: 'Success or error message'\n    },\n    user_id: {\n      type: 'string',\n      title: 'User Id',\n      description: 'ID of the user attempted to delete'\n    }\n  },\n  required: [    'code',\n    'status'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      is_external: {
        type: 'boolean',
        title: 'Is External',
        description: 'Is this an external user ID?',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['user_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { user_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.user.delete(user_id, body)));
};

export default { metadata, tool, handler };
