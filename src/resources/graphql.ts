// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Graphql extends APIResource {
  /**
   * GraphQL Playground (development only)
   */
  playground(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/v1/graphql', options);
  }

  /**
   * GraphQL endpoint for querying PAPR Memory using GraphQL.
   *
   *     This endpoint proxies GraphQL queries to Neo4j's hosted GraphQL endpoint,
   *     automatically applying multi-tenant authorization filters based on user_id and workspace_id.
   *
   *     **Authentication Required**:
   *     One of the following authentication methods must be used:
   *     - Bearer token in `Authorization` header
   *     - API Key in `X-API-Key` header
   *     - Session token in `X-Session-Token` header
   *
   *     **Request Body**:
   *     ```json
   *     {
   *       "query": "query { project(id: \"proj_123\") { name tasks { title } } }",
   *       "variables": {},
   *       "operationName": "GetProject"
   *     }
   *     ```
   *
   *     **Example Query**:
   *     ```graphql
   *     query GetProjectTasks($projectId: ID!) {
   *       project(id: $projectId) {
   *         name
   *         tasks {
   *           title
   *           status
   *         }
   *       }
   *     }
   *     ```
   *
   *     All queries are automatically filtered by user_id and workspace_id for security.
   */
  query(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/graphql', options);
  }
}

export type GraphqlPlaygroundResponse = unknown;

export type GraphqlQueryResponse = unknown;

export declare namespace Graphql {
  export {
    type GraphqlPlaygroundResponse as GraphqlPlaygroundResponse,
    type GraphqlQueryResponse as GraphqlQueryResponse,
  };
}
