// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from '@papr/memory';

const client = new Papr({
  xAPIKey: 'My X API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource messages', () => {
  // Prism tests are disabled
  test.skip('store: only required params', async () => {
    const responsePromise = client.messages.store({
      content: 'string',
      role: 'user',
      sessionId: 'sessionId',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('store: required and optional params', async () => {
    const response = await client.messages.store({
      content: 'string',
      role: 'user',
      sessionId: 'sessionId',
      context: [{ foo: 'bar' }],
      graph_generation: {
        auto: {
          property_overrides: [
            {
              nodeLabel: 'User',
              set: { id: 'bar', role: 'bar' },
              match: { name: 'bar' },
            },
          ],
          schema_id: 'schema_id',
        },
        manual: {
          nodes: [
            {
              id: 'x',
              label: 'x',
              properties: { foo: 'bar' },
            },
          ],
          relationships: [
            {
              relationship_type: 'x',
              source_node_id: 'x',
              target_node_id: 'x',
              properties: { foo: 'bar' },
            },
          ],
        },
        mode: 'auto',
      },
      memory_policy: {
        acl: {
          read: ['external_user:alice_123', 'organization:org_acme'],
          write: ['external_user:alice_123'],
        },
        consent: 'explicit',
        edge_constraints: [
          {
            create: 'upsert',
            direction: 'outgoing',
            edge_type: 'x',
            link_only: true,
            on_miss: 'create',
            search: {
              mode: 'semantic',
              properties: [
                {
                  name: 'Exact ID match',
                  mode: 'semantic',
                  threshold: 0,
                  value: { mode: 'exact', name: 'id' },
                },
              ],
              threshold: 0,
              via_relationship: [
                {
                  name: 'Find via ASSIGNED_TO',
                  summary: 'Find nodes assigned to a specific person',
                  value: {
                    edge_type: 'ASSIGNED_TO',
                    target_search: {
                      properties: [
                        {
                          name: 'email',
                          mode: 'exact',
                          value: 'alice@example.com',
                        },
                      ],
                    },
                    target_type: 'Person',
                  },
                },
              ],
            },
            set: { foo: 'string' },
            source_type: 'source_type',
            target_type: 'target_type',
            when: { foo: 'bar' },
          },
        ],
        mode: 'auto',
        node_constraints: [
          {
            create: 'upsert',
            link_only: true,
            node_type: 'x',
            on_miss: 'create',
            search: {
              mode: 'semantic',
              properties: [
                {
                  name: 'Exact ID match',
                  mode: 'semantic',
                  threshold: 0,
                  value: { mode: 'exact', name: 'id' },
                },
              ],
              threshold: 0,
              via_relationship: [
                {
                  name: 'Find via ASSIGNED_TO',
                  summary: 'Find nodes assigned to a specific person',
                  value: {
                    edge_type: 'ASSIGNED_TO',
                    target_search: {
                      properties: [
                        {
                          name: 'email',
                          mode: 'exact',
                          value: 'alice@example.com',
                        },
                      ],
                    },
                    target_type: 'Person',
                  },
                },
              ],
            },
            set: { foo: 'string' },
            when: { foo: 'bar' },
          },
        ],
        nodes: [
          {
            id: 'txn_12345',
            type: 'Transaction',
            properties: {
              amount: 'bar',
              product: 'bar',
              timestamp: 'bar',
            },
          },
        ],
        relationships: [
          {
            source: 'txn_12345',
            target: 'product_latte',
            type: 'PURCHASED',
            properties: { foo: 'bar' },
          },
        ],
        risk: 'none',
        schema_id: 'schema_id',
      },
      metadata: {
        acl: { foo: ['string'] },
        assistantMessage: 'assistantMessage',
        category: 'preference',
        consent: 'consent',
        conversationId: 'conversationId',
        createdAt: 'createdAt',
        customMetadata: { foo: 'string' },
        'emoji tags': ['string'],
        'emotion tags': ['string'],
        external_user_id: 'external_user_id',
        external_user_read_access: ['string'],
        external_user_write_access: ['string'],
        goalClassificationScores: [0],
        hierarchical_structures: 'string',
        location: 'location',
        namespace_id: 'namespace_id',
        namespace_read_access: ['string'],
        namespace_write_access: ['string'],
        organization_id: 'organization_id',
        organization_read_access: ['string'],
        organization_write_access: ['string'],
        pageId: 'pageId',
        post: 'post',
        relatedGoals: ['string'],
        relatedSteps: ['string'],
        relatedUseCases: ['string'],
        risk: 'risk',
        role: 'user',
        role_read_access: ['string'],
        role_write_access: ['string'],
        sessionId: 'sessionId',
        sourceType: 'sourceType',
        sourceUrl: 'sourceUrl',
        stepClassificationScores: [0],
        topics: ['string'],
        upload_id: 'upload_id',
        useCaseClassificationScores: [0],
        user_id: 'user_id',
        user_read_access: ['string'],
        user_write_access: ['string'],
        userMessage: 'userMessage',
        workspace_id: 'workspace_id',
        workspace_read_access: ['string'],
        workspace_write_access: ['string'],
      },
      namespace_id: 'namespace_id',
      organization_id: 'organization_id',
      process_messages: true,
      relationships_json: [{ foo: 'bar' }],
      title: 'title',
    });
  });
});
