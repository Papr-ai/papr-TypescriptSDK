// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import create_user from './user/create-user';
import update_user from './user/update-user';
import list_user from './user/list-user';
import delete_user from './user/delete-user';
import create_batch_user from './user/create-batch-user';
import get_user from './user/get-user';
import update_memory from './memory/update-memory';
import delete_memory from './memory/delete-memory';
import add_memory from './memory/add-memory';
import add_batch_memory from './memory/add-batch-memory';
import delete_all_memory from './memory/delete-all-memory';
import get_memory from './memory/get-memory';
import search_memory from './memory/search-memory';
import get_by_id_feedback from './feedback/get-by-id-feedback';
import submit_feedback from './feedback/submit-feedback';
import submit_batch_feedback from './feedback/submit-batch-feedback';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(create_user);
addEndpoint(update_user);
addEndpoint(list_user);
addEndpoint(delete_user);
addEndpoint(create_batch_user);
addEndpoint(get_user);
addEndpoint(update_memory);
addEndpoint(delete_memory);
addEndpoint(add_memory);
addEndpoint(add_batch_memory);
addEndpoint(delete_all_memory);
addEndpoint(get_memory);
addEndpoint(search_memory);
addEndpoint(get_by_id_feedback);
addEndpoint(submit_feedback);
addEndpoint(submit_batch_feedback);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
