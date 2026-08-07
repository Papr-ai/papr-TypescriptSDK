// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from '@papr/memory';

const client = new Papr({
  xAPIKey: 'My X API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource omo', () => {
  // Mock server tests are disabled
  test.skip('exportMemories: only required params', async () => {
    const responsePromise = client.omo.exportMemories({ memory_ids: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('exportMemories: required and optional params', async () => {
    const response = await client.omo.exportMemories({ memory_ids: ['string'] });
  });

  // Mock server tests are disabled
  test.skip('exportMemoriesAsJson: only required params', async () => {
    const responsePromise = client.omo.exportMemoriesAsJson({ memory_ids: 'memory_ids' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('exportMemoriesAsJson: required and optional params', async () => {
    const response = await client.omo.exportMemoriesAsJson({ memory_ids: 'memory_ids' });
  });

  // Mock server tests are disabled
  test.skip('importMemories: only required params', async () => {
    const responsePromise = client.omo.importMemories({ memories: [{ foo: 'bar' }] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('importMemories: required and optional params', async () => {
    const response = await client.omo.importMemories({ memories: [{ foo: 'bar' }], skip_duplicates: true });
  });
});
