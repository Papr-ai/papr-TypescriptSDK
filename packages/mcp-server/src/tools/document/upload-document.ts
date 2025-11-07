// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from '@papr/memory-mcp/filtering';
import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'document',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/document',
  operationId: 'upload_document_v1_document_post',
};

export const tool: Tool = {
  name: 'upload_document',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpload and process documents using the pluggable architecture.\n\n    **Authentication Required**: Bearer token or API key\n\n    **Supported Providers**: TensorLake.ai, Reducto AI, Gemini Vision (fallback)\n\n    **Features**:\n    - Multi-tenant organization/namespace scoping\n    - Temporal workflow for durable execution\n    - Real-time WebSocket status updates\n    - Integration with Parse Server (Post/PostSocial/PageVersion)\n    - Automatic fallback between providers\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/document_upload_response',\n  $defs: {\n    document_upload_response: {\n      type: 'object',\n      title: 'DocumentUploadResponse',\n      properties: {\n        document_status: {\n          type: 'object',\n          title: 'DocumentUploadStatus',\n          description: 'Status and progress of the document upload',\n          properties: {\n            progress: {\n              type: 'number',\n              title: 'Progress',\n              description: '0.0 to 1.0 for percentage'\n            },\n            current_filename: {\n              type: 'string',\n              title: 'Current Filename'\n            },\n            current_page: {\n              type: 'integer',\n              title: 'Current Page'\n            },\n            error: {\n              type: 'string',\n              title: 'Error',\n              description: 'Error message if failed'\n            },\n            page_id: {\n              type: 'string',\n              title: 'Page Id',\n              description: 'Post ID in Parse Server (user-facing page ID)'\n            },\n            status_type: {\n              type: 'string',\n              title: 'DocumentUploadStatusType',\n              description: 'Processing status type',\n              enum: [                'processing',\n                'completed',\n                'failed',\n                'not_found',\n                'queued',\n                'cancelled'\n              ]\n            },\n            total_pages: {\n              type: 'integer',\n              title: 'Total Pages'\n            },\n            upload_id: {\n              type: 'string',\n              title: 'Upload Id'\n            }\n          },\n          required: [            'progress'\n          ]\n        },\n        code: {\n          type: 'integer',\n          title: 'Code',\n          description: 'HTTP status code'\n        },\n        details: {\n          type: 'object',\n          title: 'Details',\n          description: 'Additional error details or context',\n          additionalProperties: true\n        },\n        error: {\n          type: 'string',\n          title: 'Error',\n          description: 'Error message if failed'\n        },\n        memories: {\n          type: 'array',\n          title: 'Memories',\n          description: 'For backward compatibility',\n          items: {\n            $ref: '#/$defs/add_memory_item'\n          }\n        },\n        memory_items: {\n          type: 'array',\n          title: 'Memory Items',\n          description: 'List of memory items created from the document',\n          items: {\n            $ref: '#/$defs/add_memory_item'\n          }\n        },\n        message: {\n          type: 'string',\n          title: 'Message',\n          description: 'Human-readable status message'\n        },\n        status: {\n          type: 'string',\n          title: 'Status',\n          description: '\\'success\\', \\'processing\\', \\'error\\', etc.'\n        }\n      },\n      required: [        'document_status'\n      ]\n    },\n    add_memory_item: {\n      type: 'object',\n      title: 'AddMemoryItem',\n      description: 'Response model for a single memory item in add_memory response',\n      properties: {\n        createdAt: {\n          type: 'string',\n          title: 'Createdat',\n          format: 'date-time'\n        },\n        memoryId: {\n          type: 'string',\n          title: 'Memoryid'\n        },\n        objectId: {\n          type: 'string',\n          title: 'Objectid'\n        },\n        memoryChunkIds: {\n          type: 'array',\n          title: 'Memorychunkids',\n          items: {\n            type: 'string'\n          }\n        }\n      },\n      required: [        'createdAt',\n        'memoryId',\n        'objectId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        title: 'File',
      },
      end_user_id: {
        type: 'string',
        title: 'End User Id',
      },
      graph_override: {
        type: 'string',
        title: 'Graph Override',
      },
      hierarchical_enabled: {
        type: 'boolean',
        title: 'Hierarchical Enabled',
      },
      metadata: {
        type: 'string',
        title: 'Metadata',
      },
      namespace: {
        type: 'string',
        title: 'Namespace',
      },
      preferred_provider: {
        type: 'string',
        title: 'PreferredProvider',
        description: 'Preferred provider for document processing.',
        enum: ['gemini', 'tensorlake', 'reducto', 'auto'],
      },
      property_overrides: {
        type: 'string',
        title: 'Property Overrides',
      },
      schema_id: {
        type: 'string',
        title: 'Schema Id',
      },
      simple_schema_mode: {
        type: 'boolean',
        title: 'Simple Schema Mode',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      webhook_secret: {
        type: 'string',
        title: 'Webhook Secret',
      },
      webhook_url: {
        type: 'string',
        title: 'Webhook Url',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['file'],
  },
  annotations: {},
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.document.upload(body)));
};

export default { metadata, tool, handler };
