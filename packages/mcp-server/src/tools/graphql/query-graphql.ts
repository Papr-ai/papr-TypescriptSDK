// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'graphql',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/graphql',
  operationId: 'graphql_query_v1',
};

export const tool: Tool = {
  name: 'query_graphql',
  description:
    'GraphQL endpoint for querying PAPR Memory using GraphQL.\n\n    This endpoint proxies GraphQL queries to Neo4j\'s hosted GraphQL endpoint,\n    automatically applying multi-tenant authorization filters based on user_id and workspace_id.\n\n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n\n    **Request Body**:\n    ```json\n    {\n      "query": "query { project(id: \\"proj_123\\") { name tasks { title } } }",\n      "variables": {},\n      "operationName": "GetProject"\n    }\n    ```\n\n    **Example Query**:\n    ```graphql\n    query GetProjectTasks($projectId: ID!) {\n      project(id: $projectId) {\n        name\n        tasks {\n          title\n          status\n        }\n      }\n    }\n    ```\n\n    All queries are automatically filtered by user_id and workspace_id for security.',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {},
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.graphql.query()) as object);
};

export default { metadata, tool, handler };
