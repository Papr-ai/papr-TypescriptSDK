import { schemaPacks, parsePackRef, buildMemoryPolicy, type RawClient } from '@papr/memory/lib';

function fakeClient(responses: Record<string, unknown>) {
  const calls: Array<{ method: string; path: string; opts?: any }> = [];
  const client: RawClient = {
    get: (path: string, opts?: unknown) => {
      calls.push({ method: 'GET', path, opts });
      return Promise.resolve(responses[`GET ${path}`] as any);
    },
    post: (path: string, opts?: unknown) => {
      calls.push({ method: 'POST', path, opts });
      return Promise.resolve(responses[`POST ${path}`] as any);
    },
  };
  return { client, calls };
}

describe('parsePackRef()', () => {
  test('name with and without range', () => {
    expect(parsePackRef('papr/fundraising@^1')).toEqual({ name: 'papr/fundraising', range: '^1' });
    expect(parsePackRef('papr/fundraising')).toEqual({ name: 'papr/fundraising', range: null });
    expect(parsePackRef('papr/fundraising@latest')).toEqual({ name: 'papr/fundraising', range: null });
  });

  test.each(['fundraising', 'Papr/Fund', 'papr/fundraising@>=1', ''])('rejects %p', (bad) => {
    expect(() => parsePackRef(bad)).toThrow(/Invalid pack reference/);
  });
});

describe('schemaPacks()', () => {
  test('list hits /v1/schemas/packs and unwraps data', async () => {
    const { client, calls } = fakeClient({
      'GET /v1/schemas/packs': { success: true, data: [{ name: 'papr/fundraising', version: '1.0.0' }] },
    });
    const out = await schemaPacks(client).list();
    expect(out[0]!.name).toBe('papr/fundraising');
    expect(calls[0]).toMatchObject({ method: 'GET', path: '/v1/schemas/packs' });
  });

  test('get passes the range as ?version', async () => {
    const { client, calls } = fakeClient({
      'GET /v1/schemas/packs/papr/fundraising': { success: true, data: { name: 'papr/fundraising', versions: ['1.0.0'] } },
    });
    await schemaPacks(client).get('papr/fundraising@^1');
    expect(calls[0]!.opts).toEqual({ query: { version: '^1' } });
  });

  test('install sends snake_case body', async () => {
    const { client, calls } = fakeClient({
      'POST /v1/schemas/packs/install': { success: true, data: { action: 'created', pack: 'papr/fundraising@1.0.0', schema_id: 's1' } },
    });
    const out = await schemaPacks(client).install('papr/fundraising@^1', { dryRun: true });
    expect(out.schema_id).toBe('s1');
    expect(calls[0]!.opts).toEqual({ body: { pack: 'papr/fundraising@^1', allow_major: false, dry_run: true } });
  });

  test('install returns needs_approval instead of throwing', async () => {
    const { client } = fakeClient({
      'POST /v1/schemas/packs/install': {
        success: false,
        data: { action: 'needs_approval', pack: 'papr/fundraising@2.0.0', schema_id: 's1', change: { kind: 'breaking' } },
      },
    });
    const out = await schemaPacks(client).install('papr/fundraising@^2');
    expect(out.action).toBe('needs_approval');
  });

  test('install validates the ref before calling the server', async () => {
    const { client, calls } = fakeClient({});
    await expect(schemaPacks(client).install('not a ref')).rejects.toThrow(/Invalid pack reference/);
    expect(calls).toHaveLength(0);
  });

  test('errors surface the server message', async () => {
    const { client } = fakeClient({ 'GET /v1/schemas/packs': { success: false, error: 'boom' } });
    await expect(schemaPacks(client).list()).rejects.toThrow('boom');
  });

  test('diff and versions', async () => {
    const { client, calls } = fakeClient({
      'POST /v1/schemas/diff': { success: true, data: { kind: 'additive', bump: 'minor', needs_approval: false, changes: [] } },
      'GET /v1/schemas/a%2Fb/versions': { success: true, data: [] },
    });
    const packs = schemaPacks(client);
    expect((await packs.diff({}, {})).kind).toBe('additive');
    expect(await packs.versions('a/b')).toEqual([]);
    expect(calls[1]!.path).toBe('/v1/schemas/a%2Fb/versions');
  });
});

describe('buildMemoryPolicy() floors / risk / consent', () => {
  test('passes OMO fields through', () => {
    expect(
      buildMemoryPolicy({ schemaId: 's1', risk: 'sensitive', consent: 'explicit', acl: { read: ['namespace:n'] } }),
    ).toEqual({ schema_id: 's1', risk: 'sensitive', consent: 'explicit', acl: { read: ['namespace:n'] } });
  });

  test('omits unset fields (backwards compatible)', () => {
    expect(buildMemoryPolicy({ mode: 'auto' })).toEqual({ mode: 'auto' });
  });
});
