// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr, { toFile } from '@papr/memory';

const client = new Papr({
  xAPIKey: 'My X API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource document', () => {
  // Prism tests are disabled
  test.skip('cancelProcessing', async () => {
    const responsePromise = client.document.cancelProcessing('upload_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getStatus', async () => {
    const responsePromise = client.document.getStatus('upload_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('upload: only required params', async () => {
    const responsePromise = client.document.upload({
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
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
  test.skip('upload: required and optional params', async () => {
    const response = await client.document.upload({
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
      end_user_id: 'end_user_id',
      graph_override: 'graph_override',
      hierarchical_enabled: true,
      metadata: 'metadata',
      namespace: 'namespace',
      preferred_provider: 'gemini',
      property_overrides: 'property_overrides',
      schema_id: 'schema_id',
      simple_schema_mode: true,
      user_id: 'user_id',
      webhook_secret: 'webhook_secret',
      webhook_url: 'webhook_url',
    });
  });
});
