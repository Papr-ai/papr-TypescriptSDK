// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@papr/memory-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'document',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/document/{upload_id}',
  operationId: 'cancel_document_processing_v1_document__upload_id__delete',
};

export const tool: Tool = {
  name: 'cancel_processing_document',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCancel document processing\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/document_cancel_processing_response',\n  $defs: {\n    document_cancel_processing_response: {\n      type: 'object',\n      title: 'Response Cancel Document Processing V1 Document  Upload Id  Delete',\n      additionalProperties: true\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      upload_id: {
        type: 'string',
        title: 'Upload Id',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['upload_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { upload_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.document.cancelProcessing(upload_id)),
    );
  } catch (error) {
    if (error instanceof Papr.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
