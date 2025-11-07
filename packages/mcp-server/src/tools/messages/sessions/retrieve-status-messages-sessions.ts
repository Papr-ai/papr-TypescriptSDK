// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@papr/memory-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Papr from '@papr/memory';

export const metadata: Metadata = {
  resource: 'messages.sessions',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/messages/sessions/{session_id}/status',
  operationId: 'get_session_status_v1_messages_sessions__session_id__status_get',
};

export const tool: Tool = {
  name: 'retrieve_status_messages_sessions',
  description:
    'Get processing status for messages in a session.\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    **Status Information**:\n    - Total messages in session\n    - Processing status breakdown (queued, analyzing, completed, failed)\n    - Any messages with processing errors',
  inputSchema: {
    type: 'object',
    properties: {
      session_id: {
        type: 'string',
        title: 'Session Id',
      },
    },
    required: ['session_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Papr, args: Record<string, unknown> | undefined) => {
  const { session_id, ...body } = args as any;
  return asTextContentResult((await client.messages.sessions.retrieveStatus(session_id)) as object);
};

export default { metadata, tool, handler };
