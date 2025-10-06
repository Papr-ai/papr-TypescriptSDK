// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'memory',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/memory/batch',
  operationId: 'add_memory_batch',
};

export const tool: Tool = {
  name: 'add_batch_memory',
  description:
    "Add multiple memory items in a batch with size validation and background processing.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    The API validates individual memory content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).",
  inputSchema: {
    type: 'object',
    properties: {
      memories: {
        type: 'array',
        title: 'Memories',
        description: 'List of memory items to add in batch',
        items: {
          $ref: '#/$defs/add_memory',
        },
      },
      skip_background_processing: {
        type: 'boolean',
        title: 'Skip Background Processing',
        description: 'If True, skips adding background tasks for processing',
      },
      batch_size: {
        type: 'integer',
        title: 'Batch Size',
        description: 'Number of items to process in parallel',
      },
      external_user_id: {
        type: 'string',
        title: 'External User Id',
        description:
          'External user ID for all memories in the batch. If provided and user_id is not, will be resolved to internal user ID.',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
        description:
          "Internal user ID for all memories in the batch. If not provided, developer's user ID will be used.",
      },
      webhook_secret: {
        type: 'string',
        title: 'Webhook Secret',
        description:
          "Optional secret key for webhook authentication. If provided, will be included in the webhook request headers as 'X-Webhook-Secret'.",
      },
      webhook_url: {
        type: 'string',
        title: 'Webhook Url',
        description:
          'Optional webhook URL to notify when batch processing is complete. The webhook will receive a POST request with batch completion details.',
      },
    },
    required: ['memories'],
    $defs: {
      add_memory: {
        type: 'object',
        title: 'AddMemoryRequest',
        description: 'Request model for adding a new memory',
        properties: {
          content: {
            type: 'string',
            title: 'Content',
            description: 'The content of the memory item you want to add to memory',
          },
          type: {
            $ref: '#/$defs/memory_type',
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
        },
        required: ['content', 'type'],
      },
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
  const body = args as any;
  return asTextContentResult(await client.memory.addBatch(body));
};

export default { metadata, tool, handler };
