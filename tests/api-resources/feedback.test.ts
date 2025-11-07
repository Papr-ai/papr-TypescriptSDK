// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from '@papr/memory';

const client = new Papr({
  xAPIKey: 'My X API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource feedback', () => {
  // Prism tests are disabled
  test.skip('getByID', async () => {
    const responsePromise = client.feedback.getByID('feedback_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('submit: only required params', async () => {
    const responsePromise = client.feedback.submit({
      feedbackData: { feedbackSource: 'inline', feedbackType: 'thumbs_up' },
      search_id: 'abc123def456',
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
  test.skip('submit: required and optional params', async () => {
    const response = await client.feedback.submit({
      feedbackData: {
        feedbackSource: 'inline',
        feedbackType: 'thumbs_up',
        assistantMessage: { className: 'PostMessage', objectId: 'abc123def456', __type: 'Pointer' },
        citedMemoryIds: ['mem_123', 'mem_456'],
        citedNodeIds: ['node_123', 'node_456'],
        feedbackImpact: 'positive',
        feedbackProcessed: true,
        feedbackScore: 1,
        feedbackText: 'This answer was very helpful and accurate',
        feedbackValue: 'helpful',
        userMessage: { className: 'PostMessage', objectId: 'abc123def456', __type: 'Pointer' },
      },
      search_id: 'abc123def456',
      external_user_id: 'dev_api_key_123',
      namespace_id: 'namespace_id',
      organization_id: 'organization_id',
      user_id: 'abc123def456',
    });
  });

  // Prism tests are disabled
  test.skip('submitBatch: only required params', async () => {
    const responsePromise = client.feedback.submitBatch({
      feedback_items: [
        { feedbackData: { feedbackSource: 'inline', feedbackType: 'thumbs_up' }, search_id: 'abc123def456' },
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
  test.skip('submitBatch: required and optional params', async () => {
    const response = await client.feedback.submitBatch({
      feedback_items: [
        {
          feedbackData: {
            feedbackSource: 'inline',
            feedbackType: 'thumbs_up',
            assistantMessage: { className: 'PostMessage', objectId: 'abc123def456', __type: 'Pointer' },
            citedMemoryIds: ['mem_123', 'mem_456'],
            citedNodeIds: ['node_123', 'node_456'],
            feedbackImpact: 'positive',
            feedbackProcessed: true,
            feedbackScore: 1,
            feedbackText: 'This answer was very helpful and accurate',
            feedbackValue: 'helpful',
            userMessage: { className: 'PostMessage', objectId: 'abc123def456', __type: 'Pointer' },
          },
          search_id: 'abc123def456',
          external_user_id: 'dev_api_key_123',
          namespace_id: 'namespace_id',
          organization_id: 'organization_id',
          user_id: 'abc123def456',
        },
      ],
      session_context: { foo: 'bar' },
    });
  });
});
