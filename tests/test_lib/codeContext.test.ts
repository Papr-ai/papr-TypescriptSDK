import { execSync } from 'child_process';
import { CodeContext, gitBlobSha, type PostClient } from '../../src/lib/codeContext';

function fakeClient(responses: Record<string, any> = {}) {
  const calls: Array<{ path: string; body: any }> = [];
  const client: PostClient = {
    post: async (path: string, opts: { body: unknown }) => {
      calls.push({ path, body: opts.body });
      const r = responses[path];
      return typeof r === 'function' ? r(opts.body) : r;
    },
  };
  return { client, calls };
}

describe('gitBlobSha', () => {
  test('matches git hash-object', () => {
    const text = 'export const beta = 2\n';
    let git: string | null = null;
    try {
      git = execSync('git hash-object --stdin', { input: text }).toString().trim();
    } catch {}
    expect(gitBlobSha(text)).toMatch(/^[0-9a-f]{40}$/);
    if (git) expect(gitBlobSha(text)).toBe(git);
  });
  test('empty blob is git’s well-known id', () => {
    expect(gitBlobSha('')).toBe('e69de29bb2d1d6434b8b29ae775ad8c2e48c5391');
  });
});

describe('CodeContext', () => {
  test('add sends code_context items with defaults and maps ids/errors', async () => {
    const { client, calls } = fakeClient({
      '/v1/memory/batch': {
        successful: [{ data: [{ memoryId: 'p1' }] }],
        errors: [{ index: 1, error: 'dimensions' }],
      },
    });
    const cc = new CodeContext(client, 'papr-embed-code-1-0.6b');
    const out = await cc.add([
      { content: 'a', blobSha: 'a'.repeat(40), embedding: [1, 0], pathHint: 'src/a.ts' },
      { content: 'b', blobSha: 'b'.repeat(40) },
    ]);
    expect(out).toEqual({ ids: ['p1'], errors: [{ index: 1, error: 'dimensions' }] });
    const item = calls[0]!.body.memories[0].code_context;
    expect(item).toMatchObject({
      embed_model: 'papr-embed-code-1-0.6b',
      blob_sha: 'a'.repeat(40),
      chunk: 0,
      line_start: 1,
      path_hint: 'src/a.ts',
      store_content: false,
    });
  });

  test('add splits into batches of 256 and offsets error indexes', async () => {
    let n = 0;
    const { client, calls } = fakeClient({
      '/v1/memory/batch': () => (n++ === 1 ? { errors: [{ index: 3, error: 'x' }] } : { successful: [] }),
    });
    const chunks = Array.from({ length: 300 }, (_, i) => ({ content: String(i), blobSha: 'c'.repeat(40), chunk: i }));
    const out = await new CodeContext(client, 'm').add(chunks);
    expect(calls).toHaveLength(2);
    expect(calls[1]!.body.memories).toHaveLength(44);
    expect(out.errors[0]!.index).toBe(259);
  });

  test('search maps hits and passes options', async () => {
    const { client, calls } = fakeClient({
      '/v1/memory/search': {
        data: {
          memories: [
            {
              id: 'p1',
              content: '',
              customMetadata: { score: 0.9, blob_sha: 'a'.repeat(40), chunk: 2, line_start: 10, line_end: 40, path_hint: 'x.ts' },
            },
          ],
        },
      },
    });
    const hits = await new CodeContext(client, 'm').search('q', { queryEmbedding: [1], repoIds: ['r'], limit: 5 });
    expect(hits[0]).toMatchObject({ id: 'p1', score: 0.9, chunk: 2, lineStart: 10, lineEnd: 40, pathHint: 'x.ts' });
    expect(hits[0]!.content).toBeUndefined();
    expect(calls[0]!.body.code_search).toMatchObject({ embed_model: 'm', query_embedding: [1], repo_ids: ['r'], limit: 5 });
  });

  test('missing dedupes, lowercases and chunks by 5000', async () => {
    const { client, calls } = fakeClient({ '/v1/memory/code/missing': (b: any) => ({ missing: b.blob_shas.slice(0, 1) }) });
    const shas = Array.from({ length: 6000 }, (_, i) => i.toString(16).padStart(40, '0'));
    const out = await new CodeContext(client, 'm').missing([...shas, shas[0]!.toUpperCase()]);
    expect(calls).toHaveLength(2);
    expect(out.missing).toHaveLength(2);
  });
});
