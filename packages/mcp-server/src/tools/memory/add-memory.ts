// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@papr/memory-mcp/filtering';
import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'memory',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/memory',
  operationId: 'add_memory',
};

export const tool: Tool = {
  name: 'add_memory',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nAdd a new memory item to the system with size validation and background processing.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    The API validates content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/add_memory_response',\n  $defs: {\n    add_memory_response: {\n      type: 'object',\n      title: 'AddMemoryResponse',\n      description: 'Unified response model for add_memory API endpoint (success or error).',\n      properties: {\n        code: {\n          type: 'integer',\n          title: 'Code',\n          description: 'HTTP status code'\n        },\n        data: {\n          type: 'array',\n          title: 'Data',\n          description: 'List of memory items if successful',\n          items: {\n            type: 'object',\n            title: 'AddMemoryItem',\n            description: 'Response model for a single memory item in add_memory response',\n            properties: {\n              createdAt: {\n                type: 'string',\n                title: 'Createdat',\n                format: 'date-time'\n              },\n              memoryId: {\n                type: 'string',\n                title: 'Memoryid'\n              },\n              objectId: {\n                type: 'string',\n                title: 'Objectid'\n              },\n              memoryChunkIds: {\n                type: 'array',\n                title: 'Memorychunkids',\n                items: {\n                  type: 'string'\n                }\n              }\n            },\n            required: [              'createdAt',\n              'memoryId',\n              'objectId'\n            ]\n          }\n        },\n        details: {\n          type: 'object',\n          title: 'Details',\n          description: 'Additional error details or context',\n          additionalProperties: true\n        },\n        error: {\n          type: 'string',\n          title: 'Error',\n          description: 'Error message if failed'\n        },\n        status: {\n          type: 'string',\n          title: 'Status',\n          description: '\\'success\\' or \\'error\\''\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        title: 'Content',
        description: 'The content of the memory item you want to add to memory',
      },
      type: {
        $ref: '#/$defs/memory_type',
      },
      skip_background_processing: {
        type: 'boolean',
        title: 'Skip Background Processing',
        description: 'If True, skips adding background tasks for processing',
      },
      context: {
        type: 'array',
        title: 'Context',
        description: 'Context can be conversation history or any relevant context for a memory item',
        items: {
          $ref: '#/$defs/context_item',
        },
      },
      metadata: {
        $ref: '#/$defs/memory_metadata',
      },
      relationships_json: {
        type: 'array',
        title: 'Relationships Json',
        description: 'Array of relationships that we can use in Graph DB (neo4J)',
        items: {
          $ref: '#/$defs/relationship_item',
        },
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['content', 'type'],
    $defs: {
      memory_type: {
        type: 'string',
        title: 'MemoryType',
        description: 'Valid memory types',
        enum: ['text', 'code_snippet', 'document'],
      },
      context_item: {
        type: 'object',
        title: 'ContextItem',
        description: 'Context item for memory request',
        properties: {
          content: {
            type: 'string',
            title: 'Content',
          },
          role: {
            type: 'string',
            title: 'Role',
            enum: ['user', 'assistant'],
          },
        },
        required: ['content', 'role'],
      },
      memory_metadata: {
        type: 'object',
        title: 'MemoryMetadata',
        description: 'Metadata for memory request',
        properties: {
          assistantMessage: {
            type: 'string',
            title: 'Assistantmessage',
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
      relationship_item: {
        type: 'object',
        title: 'RelationshipItem',
        description: 'Relationship item for memory request',
        properties: {
          relation_type: {
            type: 'string',
            title: 'Relation Type',
          },
          metadata: {
            type: 'object',
            title: 'Metadata',
            additionalProperties: true,
          },
          related_item_id: {
            type: 'string',
            title: 'Related Item Id',
          },
          related_item_type: {
            type: 'string',
            title: 'Related Item Type',
            description: 'Legacy field - not used in processing',
          },
          relationship_type: {
            type: 'string',
            title: 'RelationshipType',
            description: 'Enum for relationship types',
            enum: ['previous_memory_item_id', 'all_previous_memory_items', 'link_to_id'],
          },
        },
        required: ['relation_type'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.memory.add(body)));
};

export default { metadata, tool, handler };
