// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@papr/memory-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'feedback',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/feedback/batch',
  operationId: 'submit_batch_feedback',
};

export const tool: Tool = {
  name: 'submit_batch_feedback',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSubmit multiple feedback items in a single request.\n    \n    Useful for submitting session-end feedback or bulk feedback collection.\n    Each feedback item is processed independently, so partial success is possible.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/batch_response',\n  $defs: {\n    batch_response: {\n      type: 'object',\n      title: 'BatchFeedbackResponse',\n      description: 'Response model for batch feedback submission',\n      properties: {\n        code: {\n          type: 'integer',\n          title: 'Code',\n          description: 'HTTP status code'\n        },\n        message: {\n          type: 'string',\n          title: 'Message',\n          description: 'Human-readable message'\n        },\n        status: {\n          type: 'string',\n          title: 'Status',\n          description: '\\'success\\' or \\'error\\''\n        },\n        error: {\n          type: 'string',\n          title: 'Error',\n          description: 'Error message if status is \\'error\\''\n        },\n        errors: {\n          type: 'array',\n          title: 'Errors',\n          description: 'List of error details',\n          items: {\n            type: 'object',\n            additionalProperties: true\n          }\n        },\n        failed_count: {\n          type: 'integer',\n          title: 'Failed Count',\n          description: 'Number of failed feedback items'\n        },\n        feedback_ids: {\n          type: 'array',\n          title: 'Feedback Ids',\n          description: 'List of feedback IDs',\n          items: {\n            type: 'string'\n          }\n        },\n        successful_count: {\n          type: 'integer',\n          title: 'Successful Count',\n          description: 'Number of successfully processed feedback items'\n        }\n      },\n      required: [        'code',\n        'message',\n        'status'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      feedback_items: {
        type: 'array',
        title: 'Feedback Items',
        description: 'List of feedback items to submit',
        items: {
          $ref: '#/$defs/feedback_request',
        },
      },
      session_context: {
        type: 'object',
        title: 'Session Context',
        description: 'Session-level context for batch feedback',
        additionalProperties: true,
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['feedback_items'],
    $defs: {
      feedback_request: {
        type: 'object',
        title: 'FeedbackRequest',
        description: 'Request model for submitting feedback on search results',
        properties: {
          feedbackData: {
            type: 'object',
            title: 'FeedbackData',
            description: 'The feedback data containing all feedback information',
            properties: {
              feedbackSource: {
                type: 'string',
                title: 'FeedbackSource',
                description: 'Where the feedback was provided from',
                enum: ['inline', 'post_query', 'session_end', 'memory_citation', 'answer_panel'],
              },
              feedbackType: {
                type: 'string',
                title: 'FeedbackType',
                description: 'Types of feedback that can be provided',
                enum: [
                  'thumbs_up',
                  'thumbs_down',
                  'rating',
                  'correction',
                  'report',
                  'copy_action',
                  'save_action',
                  'create_document',
                  'memory_relevance',
                  'answer_quality',
                ],
              },
              assistantMessage: {
                $ref: '#/$defs/parse_pointer',
              },
              citedMemoryIds: {
                type: 'array',
                title: 'Citedmemoryids',
                items: {
                  type: 'string',
                },
              },
              citedNodeIds: {
                type: 'array',
                title: 'Citednodeids',
                items: {
                  type: 'string',
                },
              },
              feedbackImpact: {
                type: 'string',
                title: 'Feedbackimpact',
              },
              feedbackProcessed: {
                type: 'boolean',
                title: 'Feedbackprocessed',
              },
              feedbackScore: {
                type: 'number',
                title: 'Feedbackscore',
              },
              feedbackText: {
                type: 'string',
                title: 'Feedbacktext',
              },
              feedbackValue: {
                type: 'string',
                title: 'Feedbackvalue',
              },
              userMessage: {
                $ref: '#/$defs/parse_pointer',
              },
            },
            required: ['feedbackSource', 'feedbackType'],
          },
          search_id: {
            type: 'string',
            title: 'Search Id',
            description: 'The search_id from SearchResponse that this feedback relates to',
          },
          external_user_id: {
            type: 'string',
            title: 'External User Id',
            description: 'External user ID for developer API keys acting on behalf of end users',
          },
          namespace_id: {
            type: 'string',
            title: 'Namespace Id',
            description:
              'Optional namespace ID for multi-tenant feedback scoping. When provided, feedback is scoped to this namespace.',
          },
          organization_id: {
            type: 'string',
            title: 'Organization Id',
            description:
              'Optional organization ID for multi-tenant feedback scoping. When provided, feedback is scoped to this organization.',
          },
          user_id: {
            type: 'string',
            title: 'User Id',
            description: 'Internal user ID (if not provided, will be resolved from authentication)',
          },
        },
        required: ['feedbackData', 'search_id'],
      },
      parse_pointer: {
        type: 'object',
        title: 'ParsePointer',
        description: 'A pointer to a Parse object',
        properties: {
          className: {
            type: 'string',
            title: 'Classname',
          },
          objectId: {
            type: 'string',
            title: 'Objectid',
          },
          __type: {
            type: 'string',
            title: 'Type',
          },
        },
        required: ['className', 'objectId'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.feedback.submitBatch(body)));
  } catch (error) {
    if (error instanceof Papr.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
