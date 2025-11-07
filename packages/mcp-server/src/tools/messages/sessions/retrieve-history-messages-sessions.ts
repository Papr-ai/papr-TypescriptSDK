// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@papr/memory-mcp/filtering';
import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'messages.sessions',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/messages/sessions/{session_id}',
  operationId: 'get_session_history_v1_messages_sessions__session_id__get',
};

export const tool: Tool = {
  name: 'retrieve_history_messages_sessions',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve message history for a specific conversation session.\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    **Pagination**:\n    - Use `limit` and `skip` parameters for pagination\n    - Messages are returned in chronological order (oldest first)\n    - `total_count` indicates total messages in the session\n    \n    **Access Control**:\n    - Only returns messages for the authenticated user\n    - Workspace scoping is applied if available\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/session_retrieve_history_response',\n  $defs: {\n    session_retrieve_history_response: {\n      type: 'object',\n      title: 'MessageHistoryResponse',\n      description: 'Response model for retrieving message history',\n      properties: {\n        messages: {\n          type: 'array',\n          title: 'Messages',\n          description: 'List of messages in chronological order',\n          items: {\n            type: 'object',\n            title: 'MessageResponse',\n            description: 'Response model for message storage',\n            properties: {\n              content: {\n                anyOf: [                  {\n                    type: 'string'\n                  },\n                  {\n                    type: 'array',\n                    items: {\n                      type: 'object',\n                      additionalProperties: true\n                    }\n                  }\n                ],\n                title: 'Content',\n                description: 'Content of the message - can be a simple string or structured content objects'\n              },\n              createdAt: {\n                type: 'string',\n                title: 'Createdat',\n                description: 'When the message was created',\n                format: 'date-time'\n              },\n              objectId: {\n                type: 'string',\n                title: 'Objectid',\n                description: 'Parse Server objectId of the stored message'\n              },\n              role: {\n                type: 'string',\n                title: 'MessageRole',\n                description: 'Role of the message sender',\n                enum: [                  'user',\n                  'assistant'\n                ]\n              },\n              sessionId: {\n                type: 'string',\n                title: 'Sessionid',\n                description: 'Session ID of the conversation'\n              },\n              processing_status: {\n                type: 'string',\n                title: 'Processing Status',\n                description: 'Status of background processing (queued, analyzing, completed, failed)'\n              }\n            },\n            required: [              'content',\n              'createdAt',\n              'objectId',\n              'role',\n              'sessionId'\n            ]\n          }\n        },\n        sessionId: {\n          type: 'string',\n          title: 'Sessionid',\n          description: 'Session ID of the conversation'\n        },\n        total_count: {\n          type: 'integer',\n          title: 'Total Count',\n          description: 'Total number of messages in the session'\n        }\n      },\n      required: [        'messages',\n        'sessionId',\n        'total_count'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      session_id: {
        type: 'string',
        title: 'Session Id',
      },
      limit: {
        type: 'integer',
        title: 'Limit',
        description: 'Maximum number of messages to return',
      },
      skip: {
        type: 'integer',
        title: 'Skip',
        description: 'Number of messages to skip for pagination',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['session_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { session_id, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.messages.sessions.retrieveHistory(session_id, body)),
  );
};

export default { metadata, tool, handler };
