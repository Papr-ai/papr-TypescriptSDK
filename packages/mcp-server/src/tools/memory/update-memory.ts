// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'memory',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/v1/memory/{memory_id}',
  operationId: 'update_memory',
};

export const tool: Tool = {
  name: 'update_memory',
  description:
    "Update an existing memory item by ID.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    The API validates content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).",
  inputSchema: {
    type: 'object',
    properties: {
      memory_id: {
        type: 'string',
        title: 'Memory Id',
      },
      content: {
        type: 'string',
        title: 'Content',
        description: 'The new content of the memory item',
      },
      context: {
        type: 'array',
        title: 'Context',
        description: 'Updated context for the memory item',
        items: {
          $ref: '#/$defs/context_item',
        },
      },
      metadata: {
        $ref: '#/$defs/memory_metadata',
      },
      namespace_id: {
        type: 'string',
        title: 'Namespace Id',
        description:
          'Optional namespace ID for multi-tenant memory scoping. When provided, update is scoped to memories within this namespace.',
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
        description:
          'Optional organization ID for multi-tenant memory scoping. When provided, update is scoped to memories within this organization.',
      },
      relationships_json: {
        type: 'array',
        title: 'Relationships Json',
        description: 'Updated relationships for Graph DB (neo4J)',
        items: {
          $ref: '#/$defs/relationship_item',
        },
      },
      type: {
        $ref: '#/$defs/memory_type',
      },
    },
    required: ['memory_id'],
    $defs: {
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
      memory_type: {
        type: 'string',
        title: 'MemoryType',
        description: 'Valid memory types',
        enum: ['text', 'code_snippet', 'document'],
      },
    },
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { memory_id, ...body } = args as any;
  return asTextContentResult(await client.memory.update(memory_id, body));
};

export default { metadata, tool, handler };
