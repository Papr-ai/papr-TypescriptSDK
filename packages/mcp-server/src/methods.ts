import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.user.create',
    fullyQualifiedName: 'user.create',
    httpMethod: 'post',
    httpPath: '/v1/user',
  },
  {
    clientCallName: 'client.user.update',
    fullyQualifiedName: 'user.update',
    httpMethod: 'put',
    httpPath: '/v1/user/{user_id}',
  },
  {
    clientCallName: 'client.user.list',
    fullyQualifiedName: 'user.list',
    httpMethod: 'get',
    httpPath: '/v1/user',
  },
  {
    clientCallName: 'client.user.delete',
    fullyQualifiedName: 'user.delete',
    httpMethod: 'delete',
    httpPath: '/v1/user/{user_id}',
  },
  {
    clientCallName: 'client.user.createBatch',
    fullyQualifiedName: 'user.createBatch',
    httpMethod: 'post',
    httpPath: '/v1/user/batch',
  },
  {
    clientCallName: 'client.user.get',
    fullyQualifiedName: 'user.get',
    httpMethod: 'get',
    httpPath: '/v1/user/{user_id}',
  },
  {
    clientCallName: 'client.memory.update',
    fullyQualifiedName: 'memory.update',
    httpMethod: 'put',
    httpPath: '/v1/memory/{memory_id}',
  },
  {
    clientCallName: 'client.memory.delete',
    fullyQualifiedName: 'memory.delete',
    httpMethod: 'delete',
    httpPath: '/v1/memory/{memory_id}',
  },
  {
    clientCallName: 'client.memory.add',
    fullyQualifiedName: 'memory.add',
    httpMethod: 'post',
    httpPath: '/v1/memory',
  },
  {
    clientCallName: 'client.memory.addBatch',
    fullyQualifiedName: 'memory.addBatch',
    httpMethod: 'post',
    httpPath: '/v1/memory/batch',
  },
  {
    clientCallName: 'client.memory.deleteAll',
    fullyQualifiedName: 'memory.deleteAll',
    httpMethod: 'delete',
    httpPath: '/v1/memory/all',
  },
  {
    clientCallName: 'client.memory.get',
    fullyQualifiedName: 'memory.get',
    httpMethod: 'get',
    httpPath: '/v1/memory/{memory_id}',
  },
  {
    clientCallName: 'client.memory.search',
    fullyQualifiedName: 'memory.search',
    httpMethod: 'post',
    httpPath: '/v1/memory/search',
  },
  {
    clientCallName: 'client.feedback.getByID',
    fullyQualifiedName: 'feedback.getByID',
    httpMethod: 'get',
    httpPath: '/v1/feedback/{feedback_id}',
  },
  {
    clientCallName: 'client.feedback.submit',
    fullyQualifiedName: 'feedback.submit',
    httpMethod: 'post',
    httpPath: '/v1/feedback',
  },
  {
    clientCallName: 'client.feedback.submitBatch',
    fullyQualifiedName: 'feedback.submitBatch',
    httpMethod: 'post',
    httpPath: '/v1/feedback/batch',
  },
  {
    clientCallName: 'client.document.cancelProcessing',
    fullyQualifiedName: 'document.cancelProcessing',
    httpMethod: 'delete',
    httpPath: '/v1/document/{upload_id}',
  },
  {
    clientCallName: 'client.document.getStatus',
    fullyQualifiedName: 'document.getStatus',
    httpMethod: 'get',
    httpPath: '/v1/document/status/{upload_id}',
  },
  {
    clientCallName: 'client.document.upload',
    fullyQualifiedName: 'document.upload',
    httpMethod: 'post',
    httpPath: '/v1/document',
  },
  {
    clientCallName: 'client.schemas.create',
    fullyQualifiedName: 'schemas.create',
    httpMethod: 'post',
    httpPath: '/v1/schemas',
  },
  {
    clientCallName: 'client.schemas.retrieve',
    fullyQualifiedName: 'schemas.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/schemas/{schema_id}',
  },
  {
    clientCallName: 'client.schemas.update',
    fullyQualifiedName: 'schemas.update',
    httpMethod: 'put',
    httpPath: '/v1/schemas/{schema_id}',
  },
  {
    clientCallName: 'client.schemas.list',
    fullyQualifiedName: 'schemas.list',
    httpMethod: 'get',
    httpPath: '/v1/schemas',
  },
  {
    clientCallName: 'client.schemas.delete',
    fullyQualifiedName: 'schemas.delete',
    httpMethod: 'delete',
    httpPath: '/v1/schemas/{schema_id}',
  },
  {
    clientCallName: 'client.graphql.playground',
    fullyQualifiedName: 'graphql.playground',
    httpMethod: 'get',
    httpPath: '/v1/graphql',
  },
  {
    clientCallName: 'client.graphql.query',
    fullyQualifiedName: 'graphql.query',
    httpMethod: 'post',
    httpPath: '/v1/graphql',
  },
  {
    clientCallName: 'client.messages.store',
    fullyQualifiedName: 'messages.store',
    httpMethod: 'post',
    httpPath: '/v1/messages',
  },
  {
    clientCallName: 'client.messages.sessions.compress',
    fullyQualifiedName: 'messages.sessions.compress',
    httpMethod: 'get',
    httpPath: '/v1/messages/sessions/{session_id}/compress',
  },
  {
    clientCallName: 'client.messages.sessions.process',
    fullyQualifiedName: 'messages.sessions.process',
    httpMethod: 'post',
    httpPath: '/v1/messages/sessions/{session_id}/process',
  },
  {
    clientCallName: 'client.messages.sessions.retrieveHistory',
    fullyQualifiedName: 'messages.sessions.retrieveHistory',
    httpMethod: 'get',
    httpPath: '/v1/messages/sessions/{session_id}',
  },
  {
    clientCallName: 'client.messages.sessions.retrieveStatus',
    fullyQualifiedName: 'messages.sessions.retrieveStatus',
    httpMethod: 'get',
    httpPath: '/v1/messages/sessions/{session_id}/status',
  },
  {
    clientCallName: 'client.omo.exportMemories',
    fullyQualifiedName: 'omo.exportMemories',
    httpMethod: 'post',
    httpPath: '/v1/omo/export',
  },
  {
    clientCallName: 'client.omo.exportMemoriesAsJson',
    fullyQualifiedName: 'omo.exportMemoriesAsJson',
    httpMethod: 'get',
    httpPath: '/v1/omo/export.json',
  },
  {
    clientCallName: 'client.omo.importMemories',
    fullyQualifiedName: 'omo.importMemories',
    httpMethod: 'post',
    httpPath: '/v1/omo/import',
  },
  {
    clientCallName: 'client.sync.getDelta',
    fullyQualifiedName: 'sync.getDelta',
    httpMethod: 'get',
    httpPath: '/v1/sync/delta',
  },
  {
    clientCallName: 'client.sync.getTiers',
    fullyQualifiedName: 'sync.getTiers',
    httpMethod: 'post',
    httpPath: '/v1/sync/tiers',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
