// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from '@papr/memory';

export const parseAuthHeaders = (req: IncomingMessage): Partial<ClientOptions> => {
  if (req.headers.authorization) {
    const scheme = req.headers.authorization.split(' ')[0]!;
    const value = req.headers.authorization.slice(scheme.length + 1);
    switch (scheme) {
      case 'Bearer':
        return { bearerToken: req.headers.authorization.slice('Bearer '.length) };
      default:
        throw new Error(`Unsupported authorization scheme`);
    }
  }

  const bearerToken =
    Array.isArray(req.headers['x-papr-memory-bearer-token']) ?
      req.headers['x-papr-memory-bearer-token'][0]
    : req.headers['x-papr-memory-bearer-token'];
  const xSessionToken =
    Array.isArray(req.headers['x-session-token']) ?
      req.headers['x-session-token'][0]
    : req.headers['x-session-token'];
  const xAPIKey =
    Array.isArray(req.headers['x-api-key']) ? req.headers['x-api-key'][0] : req.headers['x-api-key'];
  return { bearerToken, xSessionToken, xAPIKey };
};
