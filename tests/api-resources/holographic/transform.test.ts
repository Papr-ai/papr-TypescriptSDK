// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from '@papr/memory';

const client = new Papr({
  xAPIKey: 'My X API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource transform', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.holographic.transform.create({
      content: 'The patient presents with elevated troponin levels indicating myocardial damage',
      embedding: [0.1, -0.2, 0.3],
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
    const response = await client.holographic.transform.create({
      content: 'The patient presents with elevated troponin levels indicating myocardial damage',
      embedding: [0.1, -0.2, 0.3],
      domain: 'biomedical',
      frequency_schema_id: 'frequency_schema_id',
      output: ['rotation_v3', 'phases', 'metadata'],
    });
  });

  // Mock server tests are disabled
  test.skip('createBatch: only required params', async () => {
    const responsePromise = client.holographic.transform.createBatch({
      items: [
        {
          id: 'id',
          content: 'content',
          embedding: [0],
        },
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
  test.skip('createBatch: required and optional params', async () => {
    const response = await client.holographic.transform.createBatch({
      items: [
        {
          id: 'id',
          content: 'content',
          embedding: [0],
        },
      ],
      domain: 'domain',
      frequency_schema_id: 'frequency_schema_id',
      output: ['base'],
    });
  });
});
