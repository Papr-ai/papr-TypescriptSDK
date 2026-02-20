// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from '@papr/memory';

const client = new Papr({
  xAPIKey: 'My X API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource memory', () => {
  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.memory.update('memory_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.memory.delete('memory_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.memory.delete('memory_id', { skip_parse: true }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Papr.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('add: only required params', async () => {
    const responsePromise = client.memory.add({
      content: 'Meeting with John Smith from Acme Corp about the Q4 project timeline',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('add: required and optional params', async () => {
    const response = await client.memory.add({
      content: 'Meeting with John Smith from Acme Corp about the Q4 project timeline',
      enable_holographic: true,
      format: 'format',
      skip_background_processing: true,
      context: [
        { content: "Let's discuss the Q4 project timeline with John", role: 'user' },
        {
          content: "I'll help you prepare for the timeline discussion. What are your key milestones?",
          role: 'assistant',
        },
      ],
      external_user_id: 'external_user_id',
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
      link_to: 'string',
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
        conversationId: 'conv-123',
        createdAt: '2024-10-04T10:00:00Z',
        customMetadata: { foo: 'string' },
        'emoji tags': ['string'],
        'emotion tags': ['string'],
        external_user_id: 'external_user_123',
        external_user_read_access: ['external_user_123', 'external_user_789'],
        external_user_write_access: ['external_user_123'],
        goalClassificationScores: [0],
        hierarchical_structures: 'Business/Meetings/Project Planning',
        location: 'Conference Room A',
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
        sourceUrl: 'https://calendar.example.com/meeting/123',
        stepClassificationScores: [0],
        topics: ['product', 'planning'],
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
      relationships_json: [
        {
          relation_type: 'relation_type',
          metadata: { foo: 'bar' },
          related_item_id: 'related_item_id',
          related_item_type: 'related_item_type',
          relationship_type: 'previous_memory_item_id',
        },
      ],
      type: 'text',
      user_id: 'user_id',
    });
  });

  // Mock server tests are disabled
  test.skip('addBatch: only required params', async () => {
    const responsePromise = client.memory.addBatch({
      memories: [
        { content: 'Meeting notes from the product planning session' },
        { content: 'Follow-up tasks from the planning meeting' },
      ],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('addBatch: required and optional params', async () => {
    const response = await client.memory.addBatch({
      memories: [
        {
          content: 'Meeting notes from the product planning session',
          context: [
            { content: "Let's discuss the Q4 project timeline with John", role: 'user' },
            {
              content: "I'll help you prepare for the timeline discussion. What are your key milestones?",
              role: 'assistant',
            },
          ],
          external_user_id: 'external_user_id',
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
          link_to: 'string',
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
            createdAt: '2024-03-21T10:00:00Z',
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
          relationships_json: [
            {
              relation_type: 'relation_type',
              metadata: { foo: 'bar' },
              related_item_id: 'related_item_id',
              related_item_type: 'related_item_type',
              relationship_type: 'previous_memory_item_id',
            },
          ],
          type: 'text',
          user_id: 'user_id',
        },
        {
          content: 'Follow-up tasks from the planning meeting',
          context: [
            { content: "Let's discuss the Q4 project timeline with John", role: 'user' },
            {
              content: "I'll help you prepare for the timeline discussion. What are your key milestones?",
              role: 'assistant',
            },
          ],
          external_user_id: 'external_user_id',
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
          link_to: 'string',
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
            createdAt: '2024-03-21T11:00:00Z',
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
          relationships_json: [
            {
              relation_type: 'relation_type',
              metadata: { foo: 'bar' },
              related_item_id: 'related_item_id',
              related_item_type: 'related_item_type',
              relationship_type: 'previous_memory_item_id',
            },
          ],
          type: 'text',
          user_id: 'user_id',
        },
      ],
      skip_background_processing: true,
      batch_size: 10,
      external_user_id: 'external_user_abcde',
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
      link_to: 'string',
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
      namespace_id: 'namespace_id',
      organization_id: 'organization_id',
      user_id: 'internal_user_id_12345',
      webhook_secret: 'webhook_secret',
      webhook_url: 'webhook_url',
    });
  });

  // Mock server tests are disabled
  test.skip('deleteAll', async () => {
    const responsePromise = client.memory.deleteAll();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('deleteAll: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.memory.deleteAll(
        {
          external_user_id: 'external_user_id',
          skip_parse: true,
          user_id: 'user_id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Papr.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.memory.get('memory_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('get: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.memory.get(
        'memory_id',
        {
          exclude_flagged: true,
          max_risk: 'max_risk',
          require_consent: true,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Papr.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('search: only required params', async () => {
    const responsePromise = client.memory.search({
      query:
        "Find recurring customer complaints about API performance from the last month. Focus on issues that multiple customers have mentioned and any specific feature requests or workflow improvements they've suggested.",
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('search: required and optional params', async () => {
    const response = await client.memory.search({
      query:
        "Find recurring customer complaints about API performance from the last month. Focus on issues that multiple customers have mentioned and any specific feature requests or workflow improvements they've suggested.",
      max_memories: 10,
      max_nodes: 10,
      response_format: 'json',
      enable_agentic_graph: false,
      external_user_id: 'external_user_123',
      holographic_config: {
        enabled: true,
        hcond_boost_factor: 0.12,
        hcond_boost_threshold: 0.35,
        hcond_penalty_factor: 0.06,
        search_mode: 'post_search',
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
      omo_filter: {
        exclude_consent: ['none'],
        exclude_flagged: true,
        exclude_risk: ['flagged'],
        max_risk: 'sensitive',
        min_consent: 'implicit',
        require_consent: true,
      },
      organization_id: 'organization_id',
      rank_results: true,
      reranking_config: {
        reranking_enabled: true,
        reranking_model: 'gpt-5-nano',
        reranking_provider: 'openai',
      },
      schema_id: 'schema_id',
      search_override: {
        pattern: {
          relationship_type: 'ASSOCIATED_WITH',
          source_label: 'Memory',
          target_label: 'Person',
          direction: '->',
        },
        filters: [
          {
            node_type: 'Person',
            operator: 'CONTAINS',
            property_name: 'name',
            value: 'John',
          },
          {
            node_type: 'Memory',
            operator: 'IN',
            property_name: 'topics',
            value: ['project', 'meeting'],
          },
        ],
        return_properties: ['name', 'content', 'createdAt'],
      },
      user_id: 'user_id',
      'Accept-Encoding': 'Accept-Encoding',
    });
  });
});
