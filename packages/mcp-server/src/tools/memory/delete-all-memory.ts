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
  httpPath: '/v1/memory/all',
  operationId: 'delete_all_memories',
};

export const tool: Tool = {
  name: 'delete_all_memory',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDelete all memory items for a user.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **User Resolution**:\n    - If only API key is provided: deletes memories for the developer\n    - If user_id or external_user_id is provided: resolves and deletes memories for that user\n    - Uses the same user resolution logic as other endpoints\n    \n    **Required Headers**:\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    **WARNING**: This operation cannot be undone. All memories for the resolved user will be permanently deleted.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/batch_memory_response',\n  $defs: {\n    batch_memory_response: {\n      type: 'object',\n      title: 'BatchMemoryResponse',\n      properties: {\n        code: {\n          type: 'integer',\n          title: 'Code',\n          description: 'HTTP status code for the batch operation'\n        },\n        details: {\n          type: 'object',\n          title: 'Details',\n          description: 'Additional error details or context',\n          additionalProperties: true\n        },\n        error: {\n          type: 'string',\n          title: 'Error',\n          description: 'Batch-level error message, if any'\n        },\n        errors: {\n          type: 'array',\n          title: 'Errors',\n          description: 'List of errors for failed items',\n          items: {\n            type: 'object',\n            title: 'BatchMemoryError',\n            properties: {\n              error: {\n                type: 'string',\n                title: 'Error'\n              },\n              index: {\n                type: 'integer',\n                title: 'Index'\n              },\n              code: {\n                type: 'integer',\n                title: 'Code'\n              },\n              details: {\n                type: 'object',\n                title: 'Details',\n                additionalProperties: true\n              },\n              status: {\n                type: 'string',\n                title: 'Status'\n              }\n            },\n            required: [              'error',\n              'index'\n            ]\n          }\n        },\n        message: {\n          type: 'string',\n          title: 'Message',\n          description: 'Human-readable status message'\n        },\n        status: {\n          type: 'string',\n          title: 'Status',\n          description: '\\'success\\', \\'partial\\', or \\'error\\''\n        },\n        successful: {\n          type: 'array',\n          title: 'Successful',\n          description: 'List of successful add responses',\n          items: {\n            $ref: '#/$defs/add_memory_response'\n          }\n        },\n        total_content_size: {\n          type: 'integer',\n          title: 'Total Content Size'\n        },\n        total_failed: {\n          type: 'integer',\n          title: 'Total Failed'\n        },\n        total_processed: {\n          type: 'integer',\n          title: 'Total Processed'\n        },\n        total_storage_size: {\n          type: 'integer',\n          title: 'Total Storage Size'\n        },\n        total_successful: {\n          type: 'integer',\n          title: 'Total Successful'\n        }\n      }\n    },\n    add_memory_response: {\n      type: 'object',\n      title: 'AddMemoryResponse',\n      description: 'Unified response model for add_memory API endpoint (success or error).',\n      properties: {\n        code: {\n          type: 'integer',\n          title: 'Code',\n          description: 'HTTP status code'\n        },\n        data: {\n          type: 'array',\n          title: 'Data',\n          description: 'List of memory items if successful',\n          items: {\n            $ref: '#/$defs/add_memory_item'\n          }\n        },\n        details: {\n          type: 'object',\n          title: 'Details',\n          description: 'Additional error details or context',\n          additionalProperties: true\n        },\n        error: {\n          type: 'string',\n          title: 'Error',\n          description: 'Error message if failed'\n        },\n        status: {\n          type: 'string',\n          title: 'Status',\n          description: '\\'success\\' or \\'error\\''\n        }\n      }\n    },\n    add_memory_item: {\n      type: 'object',\n      title: 'AddMemoryItem',\n      description: 'Response model for a single memory item in add_memory response',\n      properties: {\n        createdAt: {\n          type: 'string',\n          title: 'Createdat',\n          format: 'date-time'\n        },\n        memoryId: {\n          type: 'string',\n          title: 'Memoryid'\n        },\n        objectId: {\n          type: 'string',\n          title: 'Objectid'\n        },\n        memoryChunkIds: {\n          type: 'array',\n          title: 'Memorychunkids',\n          items: {\n            type: 'string'\n          }\n        }\n      },\n      required: [        'createdAt',\n        'memoryId',\n        'objectId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      external_user_id: {
        type: 'string',
        title: 'External User Id',
        description: 'Optional external user ID to resolve and delete memories for',
      },
      skip_parse: {
        type: 'boolean',
        title: 'Skip Parse',
        description: 'Skip Parse Server deletion',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
        description: 'Optional user ID to delete memories for (if not provided, uses authenticated user)',
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
    idempotentHint: true,
  },
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.memory.deleteAll(body)));
};

export default { metadata, tool, handler };
