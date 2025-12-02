// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@papr/memory-mcp/tools/types';

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
      graph_generation: {
        $ref: '#/$defs/graph_generation',
      },
      namespace_id: {
        type: 'string',
        title: 'Namespace Id',
        description:
          'Optional namespace ID for multi-tenant batch memory scoping. When provided, all memories in the batch are associated with this namespace.',
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
        description:
          'Optional organization ID for multi-tenant batch memory scoping. When provided, all memories in the batch are associated with this organization.',
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
          context: {
            type: 'array',
            title: 'Context',
            description: 'Context can be conversation history or any relevant context for a memory item',
            items: {
              $ref: '#/$defs/context_item',
            },
          },
          graph_generation: {
            $ref: '#/$defs/graph_generation',
          },
          metadata: {
            $ref: '#/$defs/memory_metadata',
          },
          namespace_id: {
            type: 'string',
            title: 'Namespace Id',
            description:
              'Optional namespace ID for multi-tenant memory scoping. When provided, memory is associated with this namespace.',
          },
          organization_id: {
            type: 'string',
            title: 'Organization Id',
            description:
              'Optional organization ID for multi-tenant memory scoping. When provided, memory is associated with this organization.',
          },
          relationships_json: {
            type: 'array',
            title: 'Relationships Json',
            description: 'Array of relationships that we can use in Graph DB (neo4J)',
            items: {
              $ref: '#/$defs/relationship_item',
            },
          },
          type: {
            $ref: '#/$defs/memory_type',
          },
        },
        required: ['content'],
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
      graph_generation: {
        type: 'object',
        title: 'GraphGeneration',
        description: 'Graph generation configuration',
        properties: {
          auto: {
            $ref: '#/$defs/auto_graph_generation',
          },
          manual: {
            $ref: '#/$defs/manual_graph_generation',
          },
          mode: {
            type: 'string',
            title: 'GraphGenerationMode',
            description: "Graph generation mode: 'auto' (AI-powered) or 'manual' (exact specification)",
            enum: ['auto', 'manual'],
          },
        },
      },
      auto_graph_generation: {
        type: 'object',
        title: 'AutoGraphGeneration',
        description: 'AI-powered graph generation with optional guidance',
        properties: {
          property_overrides: {
            type: 'array',
            title: 'Property Overrides',
            description: 'Override specific property values in AI-generated nodes with match conditions',
            items: {
              type: 'object',
              title: 'PropertyOverrideRule',
              description: 'Property override rule with optional match conditions',
              properties: {
                nodeLabel: {
                  type: 'string',
                  title: 'Nodelabel',
                  description: "Node type to apply overrides to (e.g., 'User', 'SecurityBehavior')",
                },
                set: {
                  type: 'object',
                  title: 'Set',
                  description: 'Properties to set/override on matching nodes',
                  additionalProperties: true,
                },
                match: {
                  type: 'object',
                  title: 'Match',
                  description:
                    'Optional conditions that must be met for override to apply. If not provided, applies to all nodes of this type',
                  additionalProperties: true,
                },
              },
              required: ['nodeLabel', 'set'],
            },
          },
          schema_id: {
            type: 'string',
            title: 'Schema Id',
            description: 'Force AI to use this specific schema instead of auto-selecting',
          },
          simple_schema_mode: {
            type: 'boolean',
            title: 'Simple Schema Mode',
            description: 'Limit AI to system + one user schema for consistency',
          },
        },
      },
      manual_graph_generation: {
        type: 'object',
        title: 'ManualGraphGeneration',
        description: 'Complete manual control over graph structure',
        properties: {
          nodes: {
            type: 'array',
            title: 'Nodes',
            description: 'Exact nodes to create',
            items: {
              type: 'object',
              title: 'GraphOverrideNode',
              description:
                "Developer-specified node for graph override.\n\nIMPORTANT:\n- 'id' is REQUIRED (relationships reference nodes by these IDs)\n- 'label' must match a node type from your registered UserGraphSchema\n- 'properties' must include ALL required fields from your schema definition\n\n📋 Schema Management:\n- Register schemas: POST /v1/schemas\n- View your schemas: GET /v1/schemas",
              properties: {
                id: {
                  type: 'string',
                  title: 'Id',
                  description:
                    "**REQUIRED**: Unique identifier for this node. Must be unique within this request. Relationships reference this via source_node_id/target_node_id. Example: 'person_john_123', 'finding_cve_2024_1234'",
                },
                label: {
                  type: 'string',
                  title: 'Label',
                  description:
                    '**REQUIRED**: Node type from your UserGraphSchema. View available types at GET /v1/schemas. System types: Memory, Person, Company, Project, Task, Insight, Meeting, Opportunity, Code',
                },
                properties: {
                  type: 'object',
                  title: 'Properties',
                  description:
                    "**REQUIRED**: Node properties matching your UserGraphSchema definition. Must include: (1) All required properties from your schema, (2) unique_identifiers if defined (e.g., 'email' for Person) to enable MERGE deduplication. View schema requirements at GET /v1/schemas",
                  additionalProperties: true,
                },
              },
              required: ['id', 'label', 'properties'],
            },
          },
          relationships: {
            type: 'array',
            title: 'Relationships',
            description: 'Exact relationships to create',
            items: {
              type: 'object',
              title: 'GraphOverrideRelationship',
              description:
                "Developer-specified relationship for graph override.\n\nIMPORTANT:\n- source_node_id MUST exactly match a node 'id' from the 'nodes' array\n- target_node_id MUST exactly match a node 'id' from the 'nodes' array\n- relationship_type MUST exist in your registered UserGraphSchema",
              properties: {
                relationship_type: {
                  type: 'string',
                  title: 'Relationship Type',
                  description:
                    '**REQUIRED**: Relationship type from your UserGraphSchema. View available types at GET /v1/schemas. System types: WORKS_FOR, WORKS_ON, HAS_PARTICIPANT, DISCUSSES, MENTIONS, RELATES_TO, CREATED_BY',
                },
                source_node_id: {
                  type: 'string',
                  title: 'Source Node Id',
                  description:
                    "**REQUIRED**: Must exactly match the 'id' field of a node defined in the 'nodes' array of this request",
                },
                target_node_id: {
                  type: 'string',
                  title: 'Target Node Id',
                  description:
                    "**REQUIRED**: Must exactly match the 'id' field of a node defined in the 'nodes' array of this request",
                },
                properties: {
                  type: 'object',
                  title: 'Properties',
                  description:
                    "Optional relationship properties (e.g., {'since': '2024-01-01', 'role': 'manager'})",
                  additionalProperties: true,
                },
              },
              required: ['relationship_type', 'source_node_id', 'target_node_id'],
            },
          },
        },
        required: ['nodes'],
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
          namespace_read_access: {
            type: 'array',
            title: 'Namespace Read Access',
            items: {
              type: 'string',
            },
          },
          namespace_write_access: {
            type: 'array',
            title: 'Namespace Write Access',
            items: {
              type: 'string',
            },
          },
          organization_id: {
            type: 'string',
            title: 'Organization Id',
          },
          organization_read_access: {
            type: 'array',
            title: 'Organization Read Access',
            items: {
              type: 'string',
            },
          },
          organization_write_access: {
            type: 'array',
            title: 'Organization Write Access',
            items: {
              type: 'string',
            },
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
  annotations: {},
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  try {
    return asTextContentResult(await client.memory.addBatch(body));
  } catch (error) {
    if (error instanceof Papr.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
