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
      process_messages: true,
    });
  });
});
