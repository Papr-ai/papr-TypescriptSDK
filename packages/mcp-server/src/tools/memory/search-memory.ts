// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'memory',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/memory/search',
  operationId: 'search_memory',
};

export const tool: Tool = {
  name: 'search_memory',
  description:
    'Search through memories with authentication required.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Custom Schema Support**:\n    This endpoint supports both system-defined and custom user-defined node types:\n    - **System nodes**: Memory, Person, Company, Project, Task, Insight, Meeting, Opportunity, Code\n    - **Custom nodes**: Defined by developers via UserGraphSchema (e.g., Developer, Product, Customer, Function)\n    \n    When custom schema nodes are returned:\n    - Each custom node includes a `schema_id` field referencing the UserGraphSchema\n    - The response includes a `schemas_used` array listing all schema IDs used\n    - Use `GET /v1/schemas/{schema_id}` to retrieve full schema definitions including:\n      - Node type definitions and properties\n      - Relationship type definitions and constraints\n      - Validation rules and requirements\n    \n    **Recommended Headers**:\n    ```\n    Accept-Encoding: gzip\n    ```\n    \n    The API supports response compression for improved performance. Responses larger than 1KB will be automatically compressed when this header is present.\n    \n    **HIGHLY RECOMMENDED SETTINGS FOR BEST RESULTS:**\n    - Set `enable_agentic_graph: true` for intelligent, context-aware search that can understand ambiguous references\n    - Use `max_memories: 15-20` for comprehensive memory coverage\n    - Use `max_nodes: 10-15` for comprehensive graph entity relationships\n    \n    **Agentic Graph Benefits:**\n    When enabled, the system can understand vague references by first identifying specific entities from your memory graph, then performing targeted searches. For example:\n    - "customer feedback" → identifies your customers first, then finds their specific feedback\n    - "project issues" → identifies your projects first, then finds related issues\n    - "team meeting notes" → identifies your team members first, then finds meeting notes\n    - "code functions" → identifies your functions first, then finds related code\n    \n    **Role-Based Memory Filtering:**\n    Filter memories by role and category using metadata fields:\n    - `metadata.role`: Filter by "user" or "assistant" \n    - `metadata.category`: Filter by category (user: preference, task, goal, facts, context | assistant: skills, learning)\n    \n    **User Resolution Precedence:**\n    - If both user_id and external_user_id are provided, user_id takes precedence.\n    - If only external_user_id is provided, it will be resolved to the internal user.\n    - If neither is provided, the authenticated user is used.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        title: 'Query',
        description:
          "Detailed search query describing what you're looking for. For best results, write 2-3 sentences that include specific details, context, and time frame. Examples: 'Find recurring customer complaints about API performance from the last month. Focus on issues where customers specifically mentioned timeout errors or slow response times in their conversations.' 'What are the main issues and blockers in my current projects? Focus on technical challenges and timeline impacts.' 'Find insights about team collaboration and communication patterns from recent meetings and discussions.'",
      },
      query_enable_agentic_graph: {
        type: 'boolean',
        title: 'Enable Agentic Graph',
        description:
          'HIGHLY RECOMMENDED: Enable agentic graph search for intelligent, context-aware results. Can be set via URL parameter or JSON body. URL parameter takes precedence if both are provided.',
      },
      max_memories: {
        type: 'integer',
        title: 'Max Memories',
        description:
          'HIGHLY RECOMMENDED: Maximum number of memories to return. Use at least 15-20 for comprehensive results. Lower values (5-10) may miss relevant information. Default is 20 for optimal coverage.',
      },
      max_nodes: {
        type: 'integer',
        title: 'Max Nodes',
        description:
          'HIGHLY RECOMMENDED: Maximum number of neo nodes to return. Use at least 10-15 for comprehensive graph results. Lower values may miss important entity relationships. Default is 15 for optimal coverage.',
      },
      body_enable_agentic_graph: {
        type: 'boolean',
        title: 'Enable Agentic Graph',
        description:
          "HIGHLY RECOMMENDED: Enable agentic graph search for intelligent, context-aware results. When enabled, the system can understand ambiguous references by first identifying specific entities from your memory graph, then performing targeted searches. Examples: 'customer feedback' → identifies your customers first, then finds their specific feedback; 'project issues' → identifies your projects first, then finds related issues; 'team meeting notes' → identifies team members first, then finds meeting notes. This provides much more relevant and comprehensive results. Set to false only if you need faster, simpler keyword-based search.",
      },
      external_user_id: {
        type: 'string',
        title: 'External User Id',
        description:
          'Optional external user ID to filter search results by a specific external user. If both user_id and external_user_id are provided, user_id takes precedence.',
      },
      metadata: {
        $ref: '#/$defs/memory_metadata',
      },
      namespace_id: {
        type: 'string',
        title: 'Namespace Id',
        description:
          'Optional namespace ID for multi-tenant search scoping. When provided, search is scoped to memories within this namespace.',
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
        description:
          'Optional organization ID for multi-tenant search scoping. When provided, search is scoped to memories within this organization.',
      },
      rank_results: {
        type: 'boolean',
        title: 'Rank Results',
        description:
          "Whether to enable additional ranking of search results. Default is false because results are already ranked when using an LLM for search (recommended approach). Only enable this if you're not using an LLM in your search pipeline and need additional result ranking.",
      },
      schema_id: {
        type: 'string',
        title: 'Schema Id',
        description:
          'Optional user-defined schema ID to use for this search. If provided, this schema (plus system schema) will be used for query generation. If not provided, system will automatically select relevant schema based on query content.',
      },
      search_override: {
        type: 'object',
        title: 'SearchOverrideSpecification',
        description: 'Complete search override specification provided by developer',
        properties: {
          pattern: {
            type: 'object',
            title: 'SearchOverridePattern',
            description: 'Graph pattern to search for (source)-[relationship]->(target)',
            properties: {
              relationship_type: {
                type: 'string',
                title: 'Relationship Type',
                description:
                  "Relationship type (e.g., 'ASSOCIATED_WITH', 'WORKS_FOR'). Must match schema relationship types.",
              },
              source_label: {
                type: 'string',
                title: 'Source Label',
                description:
                  "Source node label (e.g., 'Memory', 'Person', 'Company'). Must match schema node types.",
              },
              target_label: {
                type: 'string',
                title: 'Target Label',
                description:
                  "Target node label (e.g., 'Person', 'Company', 'Project'). Must match schema node types.",
              },
              direction: {
                type: 'string',
                title: 'Direction',
                description:
                  "Relationship direction: '->' (outgoing), '<-' (incoming), or '-' (bidirectional)",
              },
            },
            required: ['relationship_type', 'source_label', 'target_label'],
          },
          filters: {
            type: 'array',
            title: 'Filters',
            description: 'Property filters to apply to the search pattern',
            items: {
              type: 'object',
              title: 'SearchOverrideFilter',
              description: 'Property filters for search override',
              properties: {
                node_type: {
                  type: 'string',
                  title: 'Node Type',
                  description: "Node type to filter (e.g., 'Person', 'Memory', 'Company')",
                },
                operator: {
                  type: 'string',
                  title: 'Operator',
                  description: "Filter operator: 'CONTAINS', 'EQUALS', 'STARTS_WITH', 'IN'",
                },
                property_name: {
                  type: 'string',
                  title: 'Property Name',
                  description: "Property name to filter on (e.g., 'name', 'content', 'role')",
                },
                value: {
                  anyOf: [
                    {
                      type: 'string',
                    },
                    {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                    {
                      type: 'number',
                    },
                    {
                      type: 'boolean',
                    },
                  ],
                  title: 'Value',
                  description: "Filter value(s). Use list for 'IN' operator.",
                },
              },
              required: ['node_type', 'operator', 'property_name', 'value'],
            },
          },
          return_properties: {
            type: 'array',
            title: 'Return Properties',
            description: 'Specific properties to return. If not specified, returns all properties.',
            items: {
              type: 'string',
            },
          },
        },
        required: ['pattern'],
      },
      simple_schema_mode: {
        type: 'boolean',
        title: 'Simple Schema Mode',
        description:
          'If true, uses simple schema mode: system schema + ONE most relevant user schema. This ensures better consistency between add/search operations and reduces query complexity. Recommended for production use.',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
        description:
          'Optional internal user ID to filter search results by a specific user. If not provided, results are not filtered by user. If both user_id and external_user_id are provided, user_id takes precedence.',
      },
      'Accept-Encoding': {
        type: 'string',
      },
    },
    required: ['query'],
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
  const body = args as any;
  return asTextContentResult(await client.memory.search(body));
};

export default { metadata, tool, handler };
