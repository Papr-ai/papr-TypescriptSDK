// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from '@papr/memory';

const client = new Papr({
  xAPIKey: 'My X API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource graph', () => {
  // Mock server tests are disabled
  test.skip('rerank: only required params', async () => {
    const responsePromise = client.graph.rerank({ documents: ['string'], query: 'string' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('rerank: required and optional params', async () => {
    const response = await client.graph.rerank({
      documents: ['string'],
      query: 'string',
      domain_id: 'domain_id',
      method: 'fast',
      return_debug: true,
      return_documents: true,
      return_signal_scores: true,
      routing_config: {
        caesar4_source: 'caesar4_source',
        ce_gate_min_phi: 0,
        disabled_rules: ['string'],
        egr_lambda_ce: 0,
        enabled_rule_packs: ['string'],
        enhanced_initial_source: 'enhanced_initial_source',
        holographic_floor: true,
        threshold_overrides: { foo: 0 },
      },
      signal_embedder: 'sbert',
      signal_filters: { foo: 0 },
      signal_multipliers: { foo: 'bar' },
      top_k: 1,
    });
  });

  // Mock server tests are disabled
  test.skip('transform: only required params', async () => {
    const responsePromise = client.graph.transform({ text: 'text' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('transform: required and optional params', async () => {
    const response = await client.graph.transform({
      text: 'text',
      domain_id: 'domain_id',
      embedding: [0],
      metadata: { foo: 'bar' },
      return_concat: true,
      return_rot_v3: true,
      signal_embedder: 'sbert',
    });
  });
});
