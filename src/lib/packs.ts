/**
 * Schema packs: versioned, published schemas + policies that apps bind to.
 *
 * Hand-written (lives in src/lib, so codegen does not overwrite it). Uses the
 * client's raw get/post so it works before the endpoints are in the OpenAPI spec.
 *
 * @example
 * ```ts
 * import Papr from '@papr/memory';
 * import { schemaPacks, buildMemoryPolicy } from '@papr/memory/lib';
 *
 * const client = new Papr({ xAPIKey });
 * const packs = schemaPacks(client);
 * const { data } = await packs.install('papr/fundraising@^1');
 * await client.memory.add({
 *   content: 'Met Scott Beechuk (Norwest) about the seed round',
 *   memory_policy: buildMemoryPolicy({ schemaId: data.schema_id, floors: { risk: 'sensitive' } }),
 * });
 * ```
 */

export type ChangeKindLabel = 'none' | 'additive' | 'policy' | 'tightening' | 'breaking';

export interface SchemaChange {
  kind: ChangeKindLabel;
  bump: 'minor' | 'major' | null;
  needs_approval: boolean;
  changes: Array<{ kind: ChangeKindLabel; path: string; detail: string }>;
}

export interface PackSummary {
  name: string;
  version: string;
  ref: string;
  description: string;
  extends: string | null;
  node_types: string[];
  relationship_types: string[];
  floors: Record<string, unknown>;
}

export interface PackDetail extends PackSummary {
  versions: string[];
  schema: Record<string, unknown>;
}

export interface InstallResult {
  action: 'create' | 'created' | 'unchanged' | 'upgrade' | 'upgraded' | 'needs_approval';
  pack: string;
  schema_id: string | null;
  from_version?: string;
  change?: SchemaChange;
}

export interface SchemaVersion {
  version: string;
  change: SchemaChange | null;
  replaced_at: string;
  snapshot: Record<string, unknown>;
}

interface Envelope<T> {
  success: boolean;
  data: T;
  error?: string;
}

/** Minimal client surface we need, so tests can pass a fake. */
export interface RawClient {
  get<T>(path: string, opts?: unknown): PromiseLike<T>;
  post<T>(path: string, opts?: unknown): PromiseLike<T>;
}

const PACK_REF = /^[a-z0-9_-]+\/[a-z0-9_-]+(@([\^~]?\d+(\.\d+){0,2}|latest))?$/;

export function parsePackRef(ref: string): { name: string; range: string | null } {
  const trimmed = (ref ?? '').trim();
  if (!PACK_REF.test(trimmed)) {
    throw new Error(`Invalid pack reference '${ref}' (expected scope/name@range, e.g. papr/fundraising@^1)`);
  }
  const [name, range] = trimmed.split('@') as [string, string | undefined];
  return { name, range: !range || range === 'latest' ? null : range };
}

function unwrap<T>(res: Envelope<T>): T {
  if (!res || res.success === false) {
    throw new Error(res?.error || 'Schema pack request failed');
  }
  return res.data;
}

export function schemaPacks(client: RawClient) {
  return {
    /** Latest version of every published pack. */
    async list(): Promise<PackSummary[]> {
      return unwrap(await client.get<Envelope<PackSummary[]>>('/v1/schemas/packs'));
    },

    /** One pack, resolved by exact version or range. Includes the expanded schema. */
    async get(ref: string): Promise<PackDetail> {
      const { name, range } = parsePackRef(ref);
      const query = range ? { version: range } : undefined;
      return unwrap(await client.get<Envelope<PackDetail>>(`/v1/schemas/packs/${name}`, query ? { query } : undefined));
    },

    /**
     * Install a pack into the API key's namespace, or upgrade it.
     * Major upgrades return `action: 'needs_approval'` unless `allowMajor` is set.
     */
    async install(ref: string, options: { allowMajor?: boolean; dryRun?: boolean } = {}): Promise<InstallResult> {
      parsePackRef(ref);
      const res = await client.post<Envelope<InstallResult>>('/v1/schemas/packs/install', {
        body: { pack: ref, allow_major: options.allowMajor ?? false, dry_run: options.dryRun ?? false },
      });
      if (res && res.success === false && res.data?.action === 'needs_approval') {
        return res.data;
      }
      return unwrap(res);
    },

    /** Classify a change between two schemas without writing anything. */
    async diff(oldSchema: Record<string, unknown>, newSchema: Record<string, unknown>): Promise<SchemaChange> {
      return unwrap(await client.post<Envelope<SchemaChange>>('/v1/schemas/diff', { body: { old: oldSchema, new: newSchema } }));
    },

    /** Previous versions of an installed schema, newest first. */
    async versions(schemaId: string): Promise<SchemaVersion[]> {
      return unwrap(await client.get<Envelope<SchemaVersion[]>>(`/v1/schemas/${encodeURIComponent(schemaId)}/versions`));
    },
  };
}

export type SchemaPacks = ReturnType<typeof schemaPacks>;
