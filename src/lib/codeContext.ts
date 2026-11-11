/**
 * Code context — sync a local code index with Papr Memory.
 *
 * Code chunks are content-addressed: (your tenant, embedModel, blobSha, chunk). The client embeds on device when it
 * can and sends the vector; the server embeds otherwise. Paths are hints only — keep your own path -> blobSha
 * manifest and resolve hits through it, so renames never re-embed and a stale path never points at the wrong file.
 *
 * @example
 * ```ts
 * import Papr from '@papr/memory';
 * import { CodeContext, gitBlobSha } from '@papr/memory/lib';
 *
 * const code = new CodeContext(new Papr({ xAPIKey }), 'papr-embed-code-1-0.6b');
 * const sha = gitBlobSha(source);
 * const { missing } = await code.missing([sha]);
 * if (missing.length) await code.add([{ content: source, blobSha: sha, embedding: vec, pathHint: 'src/a.ts' }]);
 * const hits = await code.search('where do we retry cloud sync', { queryEmbedding: qvec, limit: 10 });
 * ```
 */
import { createHash } from 'crypto';

export type CodeEmbedModel = 'papr-embed-code-1-0.6b' | 'papr-embed-code-1-4b' | (string & {});

export interface CodeChunk {
  content: string;
  blobSha: string;
  chunk?: number;
  lineStart?: number;
  lineEnd?: number;
  language?: string;
  symbols?: string[];
  repoId?: string;
  pathHint?: string;
  /** Client-computed vector. Omit to let the server embed (costs server tokens). */
  embedding?: number[];
  /** Keep the chunk text in the cloud (needed for cloud agents to read it). Off by default. */
  storeContent?: boolean;
}

export interface CodeHit {
  id: string;
  score: number;
  blobSha: string;
  chunk: number;
  lineStart: number;
  lineEnd: number;
  language?: string | null;
  symbols: string[];
  repoId?: string | null;
  pathHint?: string | null;
  content?: string;
}

export interface CodeSearchOptions {
  queryEmbedding?: number[];
  repoIds?: string[];
  /** Restrict to these blobs (e.g. the client's current tree). */
  blobShas?: string[];
  limit?: number;
  minScore?: number;
}

/** Anything with the Papr client's `post(path, { body })` shape. */
export interface PostClient {
  post<T = any>(path: string, opts: { body: unknown }): PromiseLike<T>;
}

/** git's blob id for some content: sha1("blob <len>\0<content>"). Matches `git hash-object`. */
export function gitBlobSha(content: string | Uint8Array): string {
  const buf = typeof content === 'string' ? Buffer.from(content, 'utf8') : Buffer.from(content);
  return createHash('sha1').update(`blob ${buf.length}\0`).update(buf).digest('hex');
}

const MAX_BATCH = 256;

export class CodeContext {
  constructor(
    private readonly client: PostClient,
    readonly embedModel: CodeEmbedModel,
  ) {}

  private item(c: CodeChunk) {
    return {
      content: c.content,
      code_context: {
        embed_model: this.embedModel,
        blob_sha: c.blobSha,
        chunk: c.chunk ?? 0,
        line_start: c.lineStart ?? 1,
        line_end: c.lineEnd ?? Math.max(1, c.lineStart ?? 1),
        language: c.language,
        symbols: c.symbols ?? [],
        repo_id: c.repoId,
        path_hint: c.pathHint,
        embedding: c.embedding,
        store_content: c.storeContent ?? false,
      },
    };
  }

  /** Upsert chunks (idempotent). Batches of 256. Returns stored ids and per-item errors. */
  async add(chunks: CodeChunk[]): Promise<{ ids: string[]; errors: Array<{ index: number; error: string }> }> {
    const ids: string[] = [];
    const errors: Array<{ index: number; error: string }> = [];
    for (let i = 0; i < chunks.length; i += MAX_BATCH) {
      const part = chunks.slice(i, i + MAX_BATCH);
      const res: any = await this.client.post('/v1/memory/batch', { body: { memories: part.map((c) => this.item(c)) } });
      for (const ok of res?.successful ?? []) for (const d of ok?.data ?? []) ids.push(d.memoryId);
      for (const e of res?.errors ?? []) errors.push({ index: e.index < 0 ? -1 : e.index + i, error: e.error });
    }
    return { ids, errors };
  }

  async search(query: string, opts: CodeSearchOptions = {}): Promise<CodeHit[]> {
    const res: any = await this.client.post('/v1/memory/search', {
      body: {
        query,
        code_search: {
          embed_model: this.embedModel,
          query_embedding: opts.queryEmbedding,
          repo_ids: opts.repoIds,
          blob_shas: opts.blobShas,
          limit: opts.limit ?? 20,
          min_score: opts.minScore,
        },
      },
    });
    return (res?.data?.memories ?? []).map((m: any) => {
      const md = m.customMetadata ?? {};
      return {
        id: m.id,
        score: md.score,
        blobSha: md.blob_sha,
        chunk: md.chunk ?? 0,
        lineStart: md.line_start ?? 1,
        lineEnd: md.line_end ?? 1,
        language: md.language,
        symbols: md.symbols ?? [],
        repoId: md.repo_id,
        pathHint: md.path_hint,
        content: m.content || undefined,
      } as CodeHit;
    });
  }

  /** Which of these blobs the cloud has no vector for. Chunks of 5,000. */
  async missing(blobShas: string[]): Promise<{ missing: string[] }> {
    const missing: string[] = [];
    const uniq = [...new Set(blobShas.map((s) => s.toLowerCase()))];
    for (let i = 0; i < uniq.length; i += 5000) {
      const res: any = await this.client.post('/v1/memory/code/missing', {
        body: { embed_model: this.embedModel, blob_shas: uniq.slice(i, i + 5000) },
      });
      missing.push(...(res?.missing ?? []));
    }
    return { missing };
  }

  async delete(blobShas: string[]): Promise<void> {
    for (let i = 0; i < blobShas.length; i += 5000) {
      await this.client.post('/v1/memory/code/delete', {
        body: { embed_model: this.embedModel, blob_shas: blobShas.slice(i, i + 5000) },
      });
    }
  }
}
