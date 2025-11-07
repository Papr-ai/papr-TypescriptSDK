// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'messages.sessions',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/messages/sessions/{sessionId}/process',
  operationId: 'process_session_messages_v1_messages_sessions__sessionId__process_post',
};

export const tool: Tool = {
  name: 'process_messages_messages_sessions',
  description:
    "Process all stored messages in a session that were previously stored with process_messages=false.\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    This endpoint allows you to retroactively process messages that were initially stored \n    without processing. Useful for:\n    - Processing messages after deciding you want them as memories\n    - Batch processing large conversation sessions\n    - Re-processing sessions with updated AI models\n    \n    **Processing Behavior**:\n    - Only processes messages with status 'stored_only' or 'pending'\n    - Uses the same smart batch analysis (every 15 messages)\n    - Respects existing memory creation pipeline",
  inputSchema: {
    type: 'object',
    properties: {
      sessionId: {
        type: 'string',
        title: 'Sessionid',
      },
    },
    required: ['sessionId'],
  },
  annotations: {},
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { sessionId, ...body } = args as any;
  return asTextContentResult((await client.messages.sessions.processMessages(sessionId)) as object);
};

export default { metadata, tool, handler };
