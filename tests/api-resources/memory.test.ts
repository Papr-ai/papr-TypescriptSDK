// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from '@papr/memory';

const client = new Papr({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource memory', () => {
  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
  test.skip('delete: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.memory.delete('memory_id', { skip_parse: true }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Papr.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('add: only required params', async () => {
    const responsePromise = client.memory.add({
      content: 'Meeting notes from the product planning session',
      type: 'text',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('add: required and optional params', async () => {
    const response = await client.memory.add({
      content: 'Meeting notes from the product planning session',
      type: 'text',
      skip_background_processing: true,
      context: [
        { content: "Let's discuss the Q2 product roadmap", role: 'user' },
        { content: "I'll help you plan the roadmap. What are your key objectives?", role: 'assistant' },
      ],
      metadata: {
        assistantMessage: 'assistantMessage',
        conversationId: 'conv-123',
        createdAt: '2024-03-21T10:00:00Z',
        customMetadata: { foo: 'string' },
        'emoji tags': ['string'],
        'emotion tags': ['string'],
        external_user_id: 'external_user_123',
        external_user_read_access: ['external_user_123', 'external_user_789'],
        external_user_write_access: ['external_user_123'],
        goalClassificationScores: [0],
        hierarchical_structures: 'Business/Planning/Product',
        location: 'Conference Room A',
        pageId: 'pageId',
        post: 'post',
        relatedGoals: ['string'],
        relatedSteps: ['string'],
        relatedUseCases: ['string'],
        role_read_access: ['string'],
        role_write_access: ['string'],
        sessionId: 'sessionId',
        sourceType: 'sourceType',
        sourceUrl: 'https://meeting-notes.example.com/123',
        stepClassificationScores: [0],
        topics: ['string'],
        useCaseClassificationScores: [0],
        user_id: 'user_id',
        user_read_access: ['string'],
        user_write_access: ['string'],
        userMessage: 'userMessage',
        workspace_id: 'workspace_id',
        workspace_read_access: ['string'],
        workspace_write_access: ['string'],
      },
      relationships_json: [
        {
          relation_type: 'follows',
          metadata: { relevance: 'bar' },
          related_item_id: 'previous_memory_item_id',
          related_item_type: 'TextMemoryItem',
          relationship_type: 'previous_memory_item_id',
        },
      ],
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('addBatch: only required params', async () => {
    const responsePromise = client.memory.addBatch({
      memories: [
        { content: 'Meeting notes from the product planning session', type: 'text' },
        { content: 'Follow-up tasks from the planning meeting', type: 'text' },
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

  // skipped: tests are disabled for the time being
  test.skip('addBatch: required and optional params', async () => {
    const response = await client.memory.addBatch({
      memories: [
        {
          content: 'Meeting notes from the product planning session',
          type: 'text',
          context: [{ content: 'content', role: 'user' }],
          metadata: {
            assistantMessage: 'assistantMessage',
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
            pageId: 'pageId',
            post: 'post',
            relatedGoals: ['string'],
            relatedSteps: ['string'],
            relatedUseCases: ['string'],
            role_read_access: ['string'],
            role_write_access: ['string'],
            sessionId: 'sessionId',
            sourceType: 'sourceType',
            sourceUrl: 'sourceUrl',
            stepClassificationScores: [0],
            topics: ['string'],
            useCaseClassificationScores: [0],
            user_id: 'user_id',
            user_read_access: ['string'],
            user_write_access: ['string'],
            userMessage: 'userMessage',
            workspace_id: 'workspace_id',
            workspace_read_access: ['string'],
            workspace_write_access: ['string'],
          },
          relationships_json: [
            {
              relation_type: 'relation_type',
              metadata: { foo: 'bar' },
              related_item_id: 'related_item_id',
              related_item_type: 'related_item_type',
              relationship_type: 'previous_memory_item_id',
            },
          ],
        },
        {
          content: 'Follow-up tasks from the planning meeting',
          type: 'text',
          context: [{ content: 'content', role: 'user' }],
          metadata: {
            assistantMessage: 'assistantMessage',
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
            pageId: 'pageId',
            post: 'post',
            relatedGoals: ['string'],
            relatedSteps: ['string'],
            relatedUseCases: ['string'],
            role_read_access: ['string'],
            role_write_access: ['string'],
            sessionId: 'sessionId',
            sourceType: 'sourceType',
            sourceUrl: 'sourceUrl',
            stepClassificationScores: [0],
            topics: ['string'],
            useCaseClassificationScores: [0],
            user_id: 'user_id',
            user_read_access: ['string'],
            user_write_access: ['string'],
            userMessage: 'userMessage',
            workspace_id: 'workspace_id',
            workspace_read_access: ['string'],
            workspace_write_access: ['string'],
          },
          relationships_json: [
            {
              relation_type: 'relation_type',
              metadata: { foo: 'bar' },
              related_item_id: 'related_item_id',
              related_item_type: 'related_item_type',
              relationship_type: 'previous_memory_item_id',
            },
          ],
        },
      ],
      skip_background_processing: true,
      batch_size: 10,
      external_user_id: 'external_user_abcde',
      user_id: 'internal_user_id_12345',
    });
  });

  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
  test.skip('search: required and optional params', async () => {
    const response = await client.memory.search({
      query:
        "Find recurring customer complaints about API performance from the last month. Focus on issues that multiple customers have mentioned and any specific feature requests or workflow improvements they've suggested.",
      max_memories: 10,
      max_nodes: 10,
      enable_agentic_graph: true,
      external_user_id: 'external_abc',
      metadata: {
        assistantMessage: 'assistantMessage',
        conversationId: 'conversationId',
        createdAt: 'createdAt',
        customMetadata: { priority: 'high' },
        'emoji tags': ['string'],
        'emotion tags': ['string'],
        external_user_id: 'external_user_id',
        external_user_read_access: ['string'],
        external_user_write_access: ['string'],
        goalClassificationScores: [0],
        hierarchical_structures: 'hierarchical_structures',
        location: 'US',
        pageId: 'pageId',
        post: 'post',
        relatedGoals: ['string'],
        relatedSteps: ['string'],
        relatedUseCases: ['string'],
        role_read_access: ['string'],
        role_write_access: ['string'],
        sessionId: 'sessionId',
        sourceType: 'sourceType',
        sourceUrl: 'sourceUrl',
        stepClassificationScores: [0],
        topics: ['string'],
        useCaseClassificationScores: [0],
        user_id: 'user_id',
        user_read_access: ['string'],
        user_write_access: ['string'],
        userMessage: 'userMessage',
        workspace_id: 'workspace_id',
        workspace_read_access: ['string'],
        workspace_write_access: ['string'],
      },
      rank_results: false,
      user_id: 'user123',
      'Accept-Encoding': 'Accept-Encoding',
    });
  });
});
