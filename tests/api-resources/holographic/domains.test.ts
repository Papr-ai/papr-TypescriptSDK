// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from '@papr/memory';

const client = new Papr({
  xAPIKey: 'My X API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource domains', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.holographic.domains.create({
      fields: [
        {
          frequency: 4,
          name: 'priority',
          type: 'enum',
        },
        {
          frequency: 6,
          name: 'component',
          type: 'free_text',
        },
        {
          frequency: 12,
          name: 'resolution_type',
          type: 'enum',
        },
      ],
      name: 'acme:support_tickets:1.0.0',
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
  test.skip('create: required and optional params', async () => {
    const response = await client.holographic.domains.create({
      fields: [
        {
          frequency: 4,
          name: 'priority',
          type: 'enum',
          description: 'description',
          values: ['P0', 'P1', 'P2', 'P3'],
          weight: 0.9,
        },
        {
          frequency: 6,
          name: 'component',
          type: 'free_text',
          description: 'description',
          values: ['string'],
          weight: 0.7,
        },
        {
          frequency: 12,
          name: 'resolution_type',
          type: 'enum',
          description: 'description',
          values: ['bug_fix', 'config', 'wontfix'],
          weight: 0.8,
        },
      ],
      name: 'acme:support_tickets:1.0.0',
      description: 'Support ticket classification schema',
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.holographic.domains.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
