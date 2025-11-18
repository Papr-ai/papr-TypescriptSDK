// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@papr/memory-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'feedback',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/feedback/{feedback_id}',
  operationId: 'get_feedback_by_id',
};

export const tool: Tool = {
  name: 'get_by_id_feedback',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve feedback by ID.\n    \n    This endpoint allows developers to fetch feedback details by feedback ID.\n    Only the user who created the feedback or users with appropriate permissions can access it.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/feedback_response',\n  $defs: {\n    feedback_response: {\n      type: 'object',\n      title: 'FeedbackResponse',\n      description: 'Response model for feedback submission',\n      properties: {\n        code: {\n          type: 'integer',\n          title: 'Code',\n          description: 'HTTP status code'\n        },\n        message: {\n          type: 'string',\n          title: 'Message',\n          description: 'Human-readable message'\n        },\n        status: {\n          type: 'string',\n          title: 'Status',\n          description: '\\'success\\' or \\'error\\''\n        },\n        details: {\n          type: 'object',\n          title: 'Details',\n          description: 'Additional error details',\n          additionalProperties: true\n        },\n        error: {\n          type: 'string',\n          title: 'Error',\n          description: 'Error message if status is \\'error\\''\n        },\n        feedback_id: {\n          type: 'string',\n          title: 'Feedback Id',\n          description: 'Unique feedback ID'\n        }\n      },\n      required: [        'code',\n        'message',\n        'status'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      feedback_id: {
        type: 'string',
        title: 'Feedback Id',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['feedback_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { feedback_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.feedback.getByID(feedback_id)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
