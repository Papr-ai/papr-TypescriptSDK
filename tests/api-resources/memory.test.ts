// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from '@papr/memory';

const client = new Papr({
  xAPIKey: 'My X API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource memory', () => {
  // Prism tests are disabled
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

  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('delete: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.memory.delete('memory_id', { skip_parse: true }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Papr.NotFoundError);
  });

  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('add: required and optional params', async () => {
    const response = await client.memory.add({
      content: 'Meeting with John Smith from Acme Corp about the Q4 project timeline',
      skip_background_processing: true,
      context: [
        { content: "Let's discuss the Q4 project timeline with John", role: 'user' },
        {
          content: "I'll help you prepare for the timeline discussion. What are your key milestones?",
          role: 'assistant',
        },
      ],
      graph_generation: {
        auto: {
          property_overrides: [
            { nodeLabel: 'User', set: { id: 'bar', role: 'bar' }, match: { name: 'bar' } },
          ],
          schema_id: 'schema_id',
          simple_schema_mode: true,
        },
        manual: {
          nodes: [{ id: 'x', label: 'x', properties: { foo: 'bar' } }],
          relationships: [
            { relationship_type: 'x', source_node_id: 'x', target_node_id: 'x', properties: { foo: 'bar' } },
          ],
        },
        mode: 'auto',
      },
      metadata: {
        assistantMessage: 'assistantMessage',
        category: 'preference',
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
        organization_id: 'organization_id',
        pageId: 'pageId',
        post: 'post',
        relatedGoals: ['string'],
        relatedSteps: ['string'],
        relatedUseCases: ['string'],
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
    });
  });

  // Prism tests are disabled
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

  // Prism tests are disabled
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
          graph_generation: {
            auto: {
              property_overrides: [
                { nodeLabel: 'User', set: { id: 'bar', role: 'bar' }, match: { name: 'bar' } },
              ],
              schema_id: 'schema_id',
              simple_schema_mode: true,
            },
            manual: {
              nodes: [{ id: 'x', label: 'x', properties: { foo: 'bar' } }],
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
          metadata: {
            assistantMessage: 'assistantMessage',
            category: 'preference',
            conversationId: 'conversationId',
            createdAt: '2024-03-21T10:00:00Z',
            customMetadata: { foo: 'string' },
            'emoji tags': ['string'],
            'emotion tags': ['string'],
            external_user_id: 'external_user_id',
            external_user_read_access: ['string'],
            external_user_write_access: ['string'],
            goalClassificationScores: [0],
            hierarchical_structures: 'hierarchical_structures',
            location: 'location',
            namespace_id: 'namespace_id',
            organization_id: 'organization_id',
            pageId: 'pageId',
            post: 'post',
            relatedGoals: ['string'],
            relatedSteps: ['string'],
            relatedUseCases: ['string'],
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
          graph_generation: {
            auto: {
              property_overrides: [
                { nodeLabel: 'User', set: { id: 'bar', role: 'bar' }, match: { name: 'bar' } },
              ],
              schema_id: 'schema_id',
              simple_schema_mode: true,
            },
            manual: {
              nodes: [{ id: 'x', label: 'x', properties: { foo: 'bar' } }],
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
          metadata: {
            assistantMessage: 'assistantMessage',
            category: 'preference',
            conversationId: 'conversationId',
            createdAt: '2024-03-21T11:00:00Z',
            customMetadata: { foo: 'string' },
            'emoji tags': ['string'],
            'emotion tags': ['string'],
            external_user_id: 'external_user_id',
            external_user_read_access: ['string'],
            external_user_write_access: ['string'],
            goalClassificationScores: [0],
            hierarchical_structures: 'hierarchical_structures',
            location: 'location',
            namespace_id: 'namespace_id',
            organization_id: 'organization_id',
            pageId: 'pageId',
            post: 'post',
            relatedGoals: ['string'],
            relatedSteps: ['string'],
            relatedUseCases: ['string'],
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
        },
      ],
      skip_background_processing: true,
      batch_size: 10,
      external_user_id: 'external_user_abcde',
      graph_generation: {
        auto: {
          property_overrides: [
            { nodeLabel: 'User', set: { id: 'bar', role: 'bar' }, match: { name: 'bar' } },
          ],
          schema_id: 'schema_id',
          simple_schema_mode: true,
        },
        manual: {
          nodes: [{ id: 'x', label: 'x', properties: { foo: 'bar' } }],
          relationships: [
            { relationship_type: 'x', source_node_id: 'x', target_node_id: 'x', properties: { foo: 'bar' } },
          ],
        },
        mode: 'auto',
      },
      namespace_id: 'namespace_id',
      organization_id: 'organization_id',
      user_id: 'internal_user_id_12345',
      webhook_secret: 'webhook_secret',
      webhook_url: 'webhook_url',
    });
  });

  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('deleteAll: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.memory.deleteAll(
        { external_user_id: 'external_user_id', skip_parse: true, user_id: 'user_id' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Papr.NotFoundError);
  });

  // Prism tests are disabled
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

  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('search: required and optional params', async () => {
    const response = await client.memory.search({
      query:
        "Find recurring customer complaints about API performance from the last month. Focus on issues that multiple customers have mentioned and any specific feature requests or workflow improvements they've suggested.",
      max_memories: 10,
      max_nodes: 10,
      enable_agentic_graph: false,
      external_user_id: 'external_user_123',
      metadata: {
        assistantMessage: 'assistantMessage',
        category: 'preference',
        conversationId: 'conversationId',
        createdAt: 'createdAt',
        customMetadata: { foo: 'string' },
        'emoji tags': ['string'],
        'emotion tags': ['string'],
        external_user_id: 'external_user_id',
        external_user_read_access: ['string'],
        external_user_write_access: ['string'],
        goalClassificationScores: [0],
        hierarchical_structures: 'hierarchical_structures',
        location: 'location',
        namespace_id: 'namespace_id',
        organization_id: 'organization_id',
        pageId: 'pageId',
        post: 'post',
        relatedGoals: ['string'],
        relatedSteps: ['string'],
        relatedUseCases: ['string'],
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
      rank_results: true,
      schema_id: 'schema_id',
      search_override: {
        pattern: {
          relationship_type: 'ASSOCIATED_WITH',
          source_label: 'Memory',
          target_label: 'Person',
          direction: '->',
        },
        filters: [
          { node_type: 'Person', operator: 'CONTAINS', property_name: 'name', value: 'John' },
          { node_type: 'Memory', operator: 'IN', property_name: 'topics', value: ['project', 'meeting'] },
        ],
        return_properties: ['name', 'content', 'createdAt'],
      },
      simple_schema_mode: true,
      user_id: 'user_id',
      'Accept-Encoding': 'Accept-Encoding',
    });
  });
});
