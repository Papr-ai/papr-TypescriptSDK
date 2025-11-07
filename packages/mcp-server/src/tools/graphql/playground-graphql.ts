// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'graphql',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/graphql',
  operationId: 'graphql_playground_v1_graphql_get',
};

export const tool: Tool = {
  name: 'playground_graphql',
  description: 'GraphQL Playground (development only)',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.graphql.playground()) as object);
};

export default { metadata, tool, handler };
