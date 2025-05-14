// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from '@papr/memory';

const client = new Papr({
  apiKey: 'My API Key',
  bearerToken: 'My Bearer Token',
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
    const responsePromise = client.memory.add({ content: 'Meeting notes from the product planning session' });
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
      skip_background_processing: true,
      context: [
        { content: "Let's discuss the Q2 product roadmap", role: 'user' },
        { content: "I'll help you plan the roadmap. What are your key objectives?", role: 'assistant' },
      ],
      metadata: {
        conversationId: 'conv-123',
        createdAt: '2024-03-21T10:00:00Z',
        'emoji tags': '📊,💡,📝',
        'emotion tags': 'focused, productive',
        hierarchical_structures: 'hierarchical_structures',
        location: 'Conference Room A',
        role_read_access: ['string'],
        role_write_access: ['string'],
        sourceUrl: 'https://meeting-notes.example.com/123',
        topics: 'product, planning',
        user_id: 'user_id',
        user_read_access: ['string'],
        user_write_access: ['string'],
        workspace_read_access: ['string'],
        workspace_write_access: ['string'],
      },
      relationships_json: [
        {
          related_item_id: 'previous_memory_item_id',
          related_item_type: 'TextMemoryItem',
          relation_type: 'follows',
          metadata: { relevance: 'high' },
        },
      ],
      type: 'text',
    });
  });

  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
  test.skip('addBatch: required and optional params', async () => {
    const response = await client.memory.addBatch({
      memories: [
        {
          content: 'Meeting notes from the product planning session',
          context: [{ content: 'content', role: 'user' }],
          metadata: {
            conversationId: 'conversationId',
            createdAt: '2024-03-21T10:00:00Z',
            'emoji tags': '📊,💡,📝',
            'emotion tags': 'focused, productive',
            hierarchical_structures: 'hierarchical_structures',
            location: 'location',
            role_read_access: ['string'],
            role_write_access: ['string'],
            sourceUrl: 'sourceUrl',
            topics: 'product, planning',
            user_id: 'user_id',
            user_read_access: ['string'],
            user_write_access: ['string'],
            workspace_read_access: ['string'],
            workspace_write_access: ['string'],
          },
          relationships_json: [
            {
              related_item_id: 'TextMemoryItem',
              related_item_type: 'TextMemoryItem',
              relation_type: 'relation_type',
              metadata: {},
            },
          ],
          type: 'text',
        },
        {
          content: 'Follow-up tasks from the planning meeting',
          context: [{ content: 'content', role: 'user' }],
          metadata: {
            conversationId: 'conversationId',
            createdAt: '2024-03-21T11:00:00Z',
            'emoji tags': '✅,📋',
            'emotion tags': 'organized',
            hierarchical_structures: 'hierarchical_structures',
            location: 'location',
            role_read_access: ['string'],
            role_write_access: ['string'],
            sourceUrl: 'sourceUrl',
            topics: 'tasks, planning',
            user_id: 'user_id',
            user_read_access: ['string'],
            user_write_access: ['string'],
            workspace_read_access: ['string'],
            workspace_write_access: ['string'],
          },
          relationships_json: [
            {
              related_item_id: 'TextMemoryItem',
              related_item_type: 'TextMemoryItem',
              relation_type: 'relation_type',
              metadata: {},
            },
          ],
          type: 'text',
        },
      ],
      skip_background_processing: true,
      batch_size: 10,
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
        'Find recurring customer complaints about API performance from the last month. Focus on issues where customers specifically mentioned timeout errors or slow response times in their conversations.',
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
        'Find recurring customer complaints about API performance from the last month. Focus on issues where customers specifically mentioned timeout errors or slow response times in their conversations.',
      max_memories: 1,
      max_nodes: 1,
      rank_results: true,
      user_id: 'user123',
      'Accept-Encoding': 'Accept-Encoding',
    });
  });
});
