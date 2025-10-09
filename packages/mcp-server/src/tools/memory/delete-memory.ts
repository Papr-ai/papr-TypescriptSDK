// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@papr/memory-mcp/filtering';
import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'memory',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/memory/{memory_id}',
  operationId: 'delete_memory',
};

export const tool: Tool = {
  name: 'delete_memory',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDelete a memory item by ID.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/memory_delete_response',\n  $defs: {\n    memory_delete_response: {\n      type: 'object',\n      title: 'DeleteMemoryResponse',\n      properties: {\n        code: {\n          type: 'integer',\n          title: 'Code',\n          description: 'HTTP status code'\n        },\n        deletion_status: {\n          type: 'object',\n          title: 'DeletionStatus',\n          properties: {\n            neo4j: {\n              type: 'boolean',\n              title: 'Neo4J'\n            },\n            parse: {\n              type: 'boolean',\n              title: 'Parse'\n            },\n            pinecone: {\n              type: 'boolean',\n              title: 'Pinecone'\n            },\n            qdrant: {\n              type: 'boolean',\n              title: 'Qdrant'\n            }\n          }\n        },\n        details: {\n          type: 'object',\n          title: 'Details',\n          additionalProperties: true\n        },\n        error: {\n          type: 'string',\n          title: 'Error'\n        },\n        memoryId: {\n          type: 'string',\n          title: 'Memoryid'\n        },\n        message: {\n          type: 'string',\n          title: 'Message'\n        },\n        objectId: {\n          type: 'string',\n          title: 'Objectid'\n        },\n        status: {\n          type: 'string',\n          title: 'Status',\n          description: '\\'success\\' or \\'error\\''\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      memory_id: {
        type: 'string',
        title: 'Memory Id',
      },
      skip_parse: {
        type: 'boolean',
        title: 'Skip Parse',
        description: 'Skip Parse Server deletion',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['memory_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { memory_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.memory.delete(memory_id, body)));
};

export default { metadata, tool, handler };
