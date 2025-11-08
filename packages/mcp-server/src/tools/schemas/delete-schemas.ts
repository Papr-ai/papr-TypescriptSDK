// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'schemas',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/schemas/{schema_id}',
  operationId: 'delete_user_schema_v1',
};

export const tool: Tool = {
  name: 'delete_schemas',
  description:
    'Delete a schema.\n    \n    Soft deletes the schema by marking it as archived. The schema data and\n    associated graph nodes/relationships are preserved for data integrity.\n    User must have write access to the schema.',
  inputSchema: {
    type: 'object',
    properties: {
      schema_id: {
        type: 'string',
        title: 'Schema Id',
      },
    },
    required: ['schema_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { schema_id, ...body } = args as any;
  return asTextContentResult((await client.schemas.delete(schema_id)) as object);
};

export default { metadata, tool, handler };
