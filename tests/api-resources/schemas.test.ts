// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from '@papr/memory';

const client = new Papr({
  xAPIKey: 'My X API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource schemas', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.schemas.create({ name: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.schemas.create({
      name: 'x',
      id: 'id',
      created_at: '2019-12-27T18:11:19.117Z',
      description: 'description',
      last_used_at: '2019-12-27T18:11:19.117Z',
      node_types: {
        foo: {
          label: 'label',
          name: 'name',
          color: 'color',
          description: 'description',
          icon: 'icon',
          properties: {
            foo: {
              type: 'string',
              default: {},
              description: 'description',
              enum_values: ['string'],
              max_length: 0,
              max_value: 0,
              min_length: 0,
              min_value: 0,
              pattern: 'pattern',
              required: true,
            },
          },
          required_properties: ['string'],
          unique_identifiers: ['string'],
        },
      },
      organization_id: 'organization_id',
      read_access: ['string'],
      relationship_types: {
        foo: {
          allowed_source_types: ['string'],
          allowed_target_types: ['string'],
          label: 'label',
          name: 'N96',
          cardinality: 'one-to-one',
          color: 'color',
          description: 'description',
          properties: {
            foo: {
              type: 'string',
              default: {},
              description: 'description',
              enum_values: ['string'],
              max_length: 0,
              max_value: 0,
              min_length: 0,
              min_value: 0,
              pattern: 'pattern',
              required: true,
            },
          },
        },
      },
      scope: 'personal',
      status: 'draft',
      updated_at: '2019-12-27T18:11:19.117Z',
      usage_count: 0,
      user_id: 'string',
      version: '321669910225.155771193.090',
      workspace_id: 'string',
      write_access: ['string'],
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.schemas.retrieve('schema_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.schemas.update('schema_id', { body: { foo: 'bar' } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.schemas.update('schema_id', { body: { foo: 'bar' } });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.schemas.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.schemas.list(
        { status_filter: 'status_filter', workspace_id: 'workspace_id' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Papr.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.schemas.delete('schema_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
