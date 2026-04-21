// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from '@papr/memory';

const client = new Papr({
  xAPIKey: 'My X API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource holographic', () => {
  // Mock server tests are disabled
  test.skip('extractMetadata: only required params', async () => {
    const responsePromise = client.holographic.extractMetadata({ content: 'content' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('extractMetadata: required and optional params', async () => {
    const response = await client.holographic.extractMetadata({
      content: 'content',
      context_metadata: { foo: 'bar' },
      domain: 'domain',
      frequency_schema_id: 'frequency_schema_id',
    });
  });

  // Mock server tests are disabled
  test.skip('rerank: only required params', async () => {
    const responsePromise = client.holographic.rerank({
      candidates: [{ id: 'doc_1' }, { id: 'doc_2' }],
      query: 'How does troponin relate to myocardial infarction?',
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
  test.skip('rerank: required and optional params', async () => {
    const response = await client.holographic.rerank({
      candidates: [
        {
          id: 'doc_1',
          content: 'Troponin is a cardiac biomarker released during myocardial injury...',
          context_metadata: { foo: 'bar' },
          embedding: [0],
          metadata_embeddings: { foo: [0] },
          phases: [0],
          score: 0,
        },
        {
          id: 'doc_2',
          content: 'Aspirin reduces platelet aggregation...',
          context_metadata: { foo: 'bar' },
          embedding: [0],
          metadata_embeddings: { foo: [0] },
          phases: [0],
          score: 0,
        },
      ],
      query: 'How does troponin relate to myocardial infarction?',
      domain: 'biomedical',
      frequency_schema_id: 'frequency_schema_id',
      options: {
        cross_encoder_model: 'cross_encoder_model',
        cross_encoder_weight: 0,
        ensemble: 'auto',
        frequency_filters: { foo: 0 },
        include_frequency_scores: true,
        return_scores: true,
        scoring_method: 'scoring_method',
        use_cross_encoder: true,
      },
      query_embedding: [0],
      query_metadata_embeddings: { foo: [0] },
      query_phases: [0],
      top_k: 10,
    });
  });
});
