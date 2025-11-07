// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'schemas',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/schemas/{schema_id}/activate',
  operationId: 'activate_user_schema_v1',
};

export const tool: Tool = {
  name: 'activate_schemas',
  description:
    'Activate or deactivate a schema.\n    \n    Active schemas are used for memory extraction and graph generation.\n    Multiple schemas can be active simultaneously and will be merged during\n    the extraction process.',
  inputSchema: {
    type: 'object',
    properties: {
      schema_id: {
        type: 'string',
        title: 'Schema Id',
      },
      body: {
        type: 'boolean',
        title: 'Activate',
        description: 'True to activate, False to deactivate',
      },
    },
    required: ['schema_id'],
  },
  annotations: {},
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { schema_id, ...body } = args as any;
  return asTextContentResult((await client.schemas.activate(schema_id, body)) as object);
};

export default { metadata, tool, handler };
