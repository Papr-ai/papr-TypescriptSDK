// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from '@papr/memory';

const client = new Papr({
  xAPIKey: 'My X API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource telemetry', () => {
  // Mock server tests are disabled
  test.skip('trackEvent: only required params', async () => {
    const responsePromise = client.telemetry.trackEvent({ events: [{ event_name: 'event_name' }] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('trackEvent: required and optional params', async () => {
    const response = await client.telemetry.trackEvent({
      events: [
        {
          event_name: 'event_name',
          properties: { foo: 'bar' },
          timestamp: 0,
          user_id: 'user_id',
        },
      ],
      anonymous_id: 'anonymous_id',
    });
  });
});
