// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@papr/memory-mcp/filtering';
import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'messages',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/messages',
  operationId: 'store_message_v1_messages_post',
};

export const tool: Tool = {
  name: 'store_messages',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nStore a chat message and queue it for AI analysis and memory creation.\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    **Processing Control**:\n    - Set `process_messages: true` (default) to enable full AI analysis and memory creation\n    - Set `process_messages: false` to store messages only without processing into memories\n    \n    **Processing Flow** (when process_messages=true):\n    1. Message is immediately stored in PostMessage class\n    2. Background processing analyzes the message for memory-worthiness\n    3. If worthy, creates a memory with appropriate role-based categorization\n    4. Links the message to the created memory\n    \n    **Role-Based Categories**:\n    - **User messages**: preference, task, goal, facts, context\n    - **Assistant messages**: skills, learning\n    \n    **Session Management**:\n    - `sessionId` is required to group related messages\n    - Use the same `sessionId` for an entire conversation\n    - Retrieve conversation history using GET /messages/sessions/{sessionId}\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/message_store_response',\n  $defs: {\n    message_store_response: {\n      type: 'object',\n      title: 'MessageResponse',\n      description: 'Response model for message storage',\n      properties: {\n        content: {\n          anyOf: [            {\n              type: 'string'\n            },\n            {\n              type: 'array',\n              items: {\n                type: 'object',\n                additionalProperties: true\n              }\n            }\n          ],\n          title: 'Content',\n          description: 'Content of the message - can be a simple string or structured content objects'\n        },\n        createdAt: {\n          type: 'string',\n          title: 'Createdat',\n          description: 'When the message was created',\n          format: 'date-time'\n        },\n        objectId: {\n          type: 'string',\n          title: 'Objectid',\n          description: 'Parse Server objectId of the stored message'\n        },\n        role: {\n          type: 'string',\n          title: 'MessageRole',\n          description: 'Role of the message sender',\n          enum: [            'user',\n            'assistant'\n          ]\n        },\n        sessionId: {\n          type: 'string',\n          title: 'Sessionid',\n          description: 'Session ID of the conversation'\n        },\n        processing_status: {\n          type: 'string',\n          title: 'Processing Status',\n          description: 'Status of background processing (queued, analyzing, completed, failed)'\n        }\n      },\n      required: [        'content',\n        'createdAt',\n        'objectId',\n        'role',\n        'sessionId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      content: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: true,
            },
          },
        ],
        title: 'Content',
        description: 'The content of the chat message - can be a simple string or structured content objects',
      },
      role: {
        type: 'string',
        title: 'MessageRole',
        description: 'Role of the message sender (user or assistant)',
        enum: ['user', 'assistant'],
      },
      sessionId: {
        type: 'string',
        title: 'Sessionid',
        description: 'Session ID to group related messages in a conversation',
      },
      metadata: {
        $ref: '#/$defs/memory_metadata',
      },
      namespace_id: {
        type: 'string',
        title: 'Namespace Id',
        description: 'Optional namespace ID for multi-tenant message scoping',
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
        description: 'Optional organization ID for multi-tenant message scoping',
      },
      process_messages: {
        type: 'boolean',
        title: 'Process Messages',
        description:
          'Whether to process messages into memories (true) or just store them (false). Default is true.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['content', 'role', 'sessionId'],
    $defs: {
      memory_metadata: {
        type: 'object',
        title: 'MemoryMetadata',
        description: 'Metadata for memory request',
        properties: {
          assistantMessage: {
            type: 'string',
            title: 'Assistantmessage',
          },
          category: {
            type: 'string',
            title: 'Category',
            description:
              'Memory category based on role. For users: preference, task, goal, fact, context. For assistants: skills, learning, task, goal, fact, context.',
            enum: ['preference', 'task', 'goal', 'fact', 'context', 'skills', 'learning'],
          },
          conversationId: {
            type: 'string',
            title: 'Conversationid',
          },
          createdAt: {
            type: 'string',
            title: 'Createdat',
            description: 'ISO datetime when the memory was created',
          },
          customMetadata: {
            type: 'object',
            title: 'Custommetadata',
            description:
              'Optional object for arbitrary custom metadata fields. Only string, number, boolean, or list of strings allowed. Nested dicts are not allowed.',
            additionalProperties: true,
          },
          'emoji tags': {
            type: 'array',
            title: 'Emoji Tags',
            items: {
              type: 'string',
            },
          },
          'emotion tags': {
            type: 'array',
            title: 'Emotion Tags',
            items: {
              type: 'string',
            },
          },
          external_user_id: {
            type: 'string',
            title: 'External User Id',
          },
          external_user_read_access: {
            type: 'array',
            title: 'External User Read Access',
            items: {
              type: 'string',
            },
          },
          external_user_write_access: {
            type: 'array',
            title: 'External User Write Access',
            items: {
              type: 'string',
            },
          },
          goalClassificationScores: {
            type: 'array',
            title: 'Goalclassificationscores',
            items: {
              type: 'number',
            },
          },
          hierarchical_structures: {
            type: 'string',
            title: 'Hierarchical Structures',
            description: 'Hierarchical structures to enable navigation from broad topics to specific ones',
          },
          location: {
            type: 'string',
            title: 'Location',
          },
          namespace_id: {
            type: 'string',
            title: 'Namespace Id',
          },
          organization_id: {
            type: 'string',
            title: 'Organization Id',
          },
          pageId: {
            type: 'string',
            title: 'Pageid',
          },
          post: {
            type: 'string',
            title: 'Post',
          },
          relatedGoals: {
            type: 'array',
            title: 'Relatedgoals',
            items: {
              type: 'string',
            },
          },
          relatedSteps: {
            type: 'array',
            title: 'Relatedsteps',
            items: {
              type: 'string',
            },
          },
          relatedUseCases: {
            type: 'array',
            title: 'Relatedusecases',
            items: {
              type: 'string',
            },
          },
          role: {
            type: 'string',
            title: 'MessageRole',
            description: 'Role of the message sender',
            enum: ['user', 'assistant'],
          },
          role_read_access: {
            type: 'array',
            title: 'Role Read Access',
            items: {
              type: 'string',
            },
          },
          role_write_access: {
            type: 'array',
            title: 'Role Write Access',
            items: {
              type: 'string',
            },
          },
          sessionId: {
            type: 'string',
            title: 'Sessionid',
          },
          sourceType: {
            type: 'string',
            title: 'Sourcetype',
          },
          sourceUrl: {
            type: 'string',
            title: 'Sourceurl',
          },
          stepClassificationScores: {
            type: 'array',
            title: 'Stepclassificationscores',
            items: {
              type: 'number',
            },
          },
          topics: {
            type: 'array',
            title: 'Topics',
            items: {
              type: 'string',
            },
          },
          upload_id: {
            type: 'string',
            title: 'Upload Id',
            description: 'Upload ID for document processing workflows',
          },
          useCaseClassificationScores: {
            type: 'array',
            title: 'Usecaseclassificationscores',
            items: {
              type: 'number',
            },
          },
          user_id: {
            type: 'string',
            title: 'User Id',
          },
          user_read_access: {
            type: 'array',
            title: 'User Read Access',
            items: {
              type: 'string',
            },
          },
          user_write_access: {
            type: 'array',
            title: 'User Write Access',
            items: {
              type: 'string',
            },
          },
          userMessage: {
            type: 'string',
            title: 'Usermessage',
          },
          workspace_id: {
            type: 'string',
            title: 'Workspace Id',
          },
          workspace_read_access: {
            type: 'array',
            title: 'Workspace Read Access',
            items: {
              type: 'string',
            },
          },
          workspace_write_access: {
            type: 'array',
            title: 'Workspace Write Access',
            items: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.messages.store(body)));
};

export default { metadata, tool, handler };
