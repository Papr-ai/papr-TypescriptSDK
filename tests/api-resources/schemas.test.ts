// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Papr from '@papr/memory';

const client = new Papr({
  xAPIKey: 'My X API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource schemas', () => {
  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.schemas.create({
      name: 'x',
      id: 'id',
      created_at: '2019-12-27T18:11:19.117Z',
      description: 'description',
      last_used_at: '2019-12-27T18:11:19.117Z',
      memory_policy: { foo: 'bar' },
      namespace: 'string',
      namespace_id: 'namespace_id',
      node_types: {
        foo: {
          label: 'label',
          name: 'name',
          color: 'color',
          constraint: {
            create: 'upsert',
            link_only: true,
            node_type: 'x',
            on_miss: 'create',
            search: {
              mode: 'semantic',
              properties: [
                {
                  name: 'Exact ID match',
                  mode: 'semantic',
                  threshold: 0,
                  value: { mode: 'exact', name: 'id' },
                },
              ],
              threshold: 0,
              via_relationship: [
                {
                  name: 'Find via ASSIGNED_TO',
                  summary: 'Find nodes assigned to a specific person',
                  value: {
                    edge_type: 'ASSIGNED_TO',
                    target_search: {
                      properties: [
                        {
                          name: 'email',
                          mode: 'exact',
                          value: 'alice@example.com',
                        },
                      ],
                    },
                    target_type: 'Person',
                  },
                },
              ],
            },
            set: { foo: 'string' },
            when: { foo: 'bar' },
          },
          description: 'description',
          icon: 'icon',
          link_only: true,
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
          resolution_policy: 'upsert',
          unique_identifiers: ['string'],
        },
      },
      organization: 'string',
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
          constraint: {
            create: 'upsert',
            direction: 'outgoing',
            edge_type: 'x',
            link_only: true,
            on_miss: 'create',
            search: {
              mode: 'semantic',
              properties: [
                {
                  name: 'Exact ID match',
                  mode: 'semantic',
                  threshold: 0,
                  value: { mode: 'exact', name: 'id' },
                },
              ],
              threshold: 0,
              via_relationship: [
                {
                  name: 'Find via ASSIGNED_TO',
                  summary: 'Find nodes assigned to a specific person',
                  value: {
                    edge_type: 'ASSIGNED_TO',
                    target_search: {
                      properties: [
                        {
                          name: 'email',
                          mode: 'exact',
                          value: 'alice@example.com',
                        },
                      ],
                    },
                    target_type: 'Person',
                  },
                },
              ],
            },
            set: { foo: 'string' },
            source_type: 'source_type',
            target_type: 'target_type',
            when: { foo: 'bar' },
          },
          description: 'description',
          link_only: true,
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
          resolution_policy: 'upsert',
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

  // Mock server tests are disabled
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

  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.schemas.update('schema_id', { body: { foo: 'bar' } });
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.schemas.list(
        { status_filter: 'status_filter', workspace_id: 'workspace_id' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Papr.NotFoundError);
  });

  // Mock server tests are disabled
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
