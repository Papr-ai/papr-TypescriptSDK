# Papr TypeScript API Library

[![NPM version](<https://img.shields.io/npm/v/@papr/memory.svg?label=npm%20(stable)>)](https://npmjs.org/package/@papr/memory) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@papr/memory)

This library provides convenient access to the Papr REST API from server-side TypeScript or JavaScript.

The REST API documentation can be found on [platform.papr.ai](https://platform.papr.ai). The full API of this library can be found in [api.md](api.md).

It is generated with [Stainless](https://www.stainless.com/).

## MCP Server

Use the Papr MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40papr%2Fmemory-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBwYXByL21lbW9yeS1tY3AiXSwiZW52Ijp7IlBBUFJfTUVNT1JZX0FQSV9LRVkiOiJNeSBYIEFQSSBLZXkiLCJQQVBSX01FTU9SWV9TZXNzaW9uX1Rva2VuIjoiTXkgWCBTZXNzaW9uIFRva2VuIiwiUEFQUl9NRU1PUllfQkVBUkVSX1RPS0VOIjoiTXkgQmVhcmVyIFRva2VuIn19)
[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40papr%2Fmemory-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40papr%2Fmemory-mcp%22%5D%2C%22env%22%3A%7B%22PAPR_MEMORY_API_KEY%22%3A%22My%20X%20API%20Key%22%2C%22PAPR_MEMORY_Session_Token%22%3A%22My%20X%20Session%20Token%22%2C%22PAPR_MEMORY_BEARER_TOKEN%22%3A%22My%20Bearer%20Token%22%7D%7D)

> Note: You may need to set environment variables in your MCP client.

## Installation

```sh
npm install @papr/memory
```

## Usage

The full API of this library can be found in [api.md](api.md).

<!-- prettier-ignore -->
```js
import Papr from '@papr/memory';

const client = new Papr({
  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted
});

const userResponse = await client.user.create({
  external_id: 'demo_user_123',
  email: 'user@example.com',
});

console.log(userResponse.external_id);
```

### Request & Response types

This library includes TypeScript definitions for all request params and response fields. You may import and use them like so:

<!-- prettier-ignore -->
```ts
import Papr from '@papr/memory';

const client = new Papr({
  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted
});

const params: Papr.UserCreateParams = { external_id: 'demo_user_123', email: 'user@example.com' };
const userResponse: Papr.UserResponse = await client.user.create(params);
```

Documentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.

## Graph Schemas & Memory Policies

Schemas define the structure of your knowledge graph. When you add memories, the engine uses the schema to extract entities from the content, match them to existing nodes, and build relationships automatically.

### 1. Define a Schema

<!-- prettier-ignore -->
```ts
import {
  schema, node, lookup, upsert, constraint,
  prop, edge, exact, semantic, Auto,
  buildSchemaParams,
} from '@papr/memory/lib';

const Person = node("Person", {
  name: prop({ required: true, search: semantic(0.90) }),
  email: prop({ search: exact() }),
}, lookup()); // Only match existing people, never create new ones

const Task = node("Task", {
  title: prop({ required: true, search: semantic(0.85) }),
  status: prop({ enum_values: ["open", "in_progress", "done"] }),
}, upsert(), constraint({ // Create or update tasks as they're mentioned
  set: { status: new Auto() }, // LLM infers status from memory content
}));

const ProjectSchema = schema("project_tracker", {
  nodes: [Person, Task],
  edges: [edge(Person, Task, { name: "works_on", create: "upsert" })],
});

// Register the schema once
const params = buildSchemaParams(ProjectSchema);
await client.schemas.create(params);
```

### 2. Just Add Memories

Once the schema is registered, just pass your content. The engine auto-detects the matching schema and applies the policies you defined:

<!-- prettier-ignore -->
```ts
// Meeting transcript - just pass the content
await client.memory.add({
  content: "John (john@papr.ai) mentioned he fixed the authentication bug. It's now resolved.",
});
```

That's it. Here's what happens automatically:

1. **Schema matching** - The engine detects that this content matches the `project_tracker` schema (it contains a person and a task)
2. **Entity extraction** - Identifies "John" / "john@papr.ai" as a Person and "authentication bug" as a Task
3. **Node matching** - Finds the existing Task whose `title` semantically matches "authentication bug" (0.85 threshold) and the Person whose `email` exactly matches "john@papr.ai"
4. **Resolution policies** - Task is `upsert()` so it gets updated. Person is `lookup()` so it only matches existing people, never creates new ones
5. **Constraints** - `constraint({ set: { status: new Auto() } })` tells the LLM to infer status from context. Since the content says "fixed" and "resolved", it sets `status: "done"`. Use `new Auto("prompt")` to provide per-field extraction guidance (e.g. `new Auto("Summarize in 1-2 sentences")`)
6. **Edge creation** - A `WORKS_ON` edge is created between John and the task

> **Tip:** Include identifiers like emails or IDs in your content (e.g. `"John (john@papr.ai)"`) to help the engine match the right nodes via `exact()` search properties.

### 3. More Control with `link_to`

For cases where you want to explicitly direct which nodes to match, use `buildLinkTo`:

<!-- prettier-ignore -->
```ts
import { buildLinkTo } from '@papr/memory/lib';

// Tell the engine exactly which properties to search
await client.memory.add({
  content: "The authentication bug is now resolved.",
  link_to: buildLinkTo(
    Task.title,  // -> "Task:title" (semantic match from schema)
  ),
});

// Pin to a specific value when you know it
await client.memory.add({
  content: "Sprint update: auth module is done.",
  link_to: buildLinkTo(
    Task.title.exact("Fix authentication bug"),
    Person.email.exact("john@papr.ai"),
  ),
});
// -> link_to: ["Task:title=Fix authentication bug", "Person:email=john@papr.ai"]
```

### 4. Memory-Level Policy Overrides

Schema defines the default behavior. For specific memories that need different handling, override per-memory with `memory_policy`:

<!-- prettier-ignore -->
```ts
import { buildMemoryPolicy, serializeSetValues, Auto } from '@papr/memory/lib';

// Override: force exact match and set priority for this specific memory
await client.memory.add({
  content: "TASK-456 is now critical priority",
  memory_policy: buildMemoryPolicy({
    schemaId: "project_tracker",
    nodeConstraints: [{
      node_type: "Task",
      create: "upsert",
      search: { properties: [{ name: "title", mode: "exact" }] },
      set: serializeSetValues({ priority: new Auto() }),
    }],
  }),
});
```

### Resolution Policies

| Policy | Behavior | Use Case |
|--------|----------|----------|
| `upsert()` | Create if not found, update if exists | Dynamic entities (tasks, conversations, events) |
| `lookup()` | Only match existing nodes, never create | Controlled data (people from directory, product catalog) |
| `resolve({ onMiss: "error" })` | Fail if not found | Strict validation (required references) |

### Search Modes

<!-- prettier-ignore -->
```ts
const Ref = node("Ref", {
  id:    prop({ search: exact() }),           // Exact string match
  title: prop({ search: semantic(0.85) }),    // Embedding similarity (threshold 0.85)
  name:  prop({ search: fuzzy(0.80) }),       // Levenshtein distance (threshold 0.80)
});
```

### Conditional Constraints

<!-- prettier-ignore -->
```ts
import { And, Or, Not, Auto } from '@papr/memory/lib';

const Alert = node("Alert", {
  alert_id: prop({ search: exact() }),
  title: prop({ required: true, search: semantic(0.85) }),
  severity: prop(),
  status: prop(),
  flagged: prop(),
  summary: prop(),
}, upsert(), constraint({
  when: new And(
    new Or({ severity: "high" }, { severity: "critical" }),
    new Not({ status: "resolved" }),
  ),
  set: {
    flagged: true,
    summary: new Auto("Summarize the security incident in 1-2 sentences"),
  }, // Auto("prompt") guides LLM extraction; Auto() with no args also works
}));
```

### Complete Example: Security Monitoring

<!-- prettier-ignore -->
```ts
import {
  schema, node, lookup, upsert, resolve, constraint,
  prop, edge, exact, semantic, Auto,
  buildSchemaParams, buildLinkTo,
} from '@papr/memory/lib';

const TacticDef = node("TacticDef", {
  id: prop({ search: exact() }),
  name: prop({ required: true, search: semantic(0.90) }),
}, lookup()); // MITRE ATT&CK tactic (pre-loaded reference data)

const SecurityBehavior = node("SecurityBehavior", {
  description: prop({ required: true, search: semantic(0.85) }),
  severity: prop({ enum_values: ["low", "medium", "high", "critical"] }),
}, upsert());

const Alert = node("Alert", {
  alert_id: prop({ search: exact() }),
  title: prop({ required: true, search: semantic(0.85) }),
  severity: prop(),
  flagged: prop(),
  reviewed_by: prop(),
}, upsert(), constraint({
  when: { severity: "critical" },
  set: { flagged: true, reviewed_by: new Auto() },
}));

const SecuritySchema = schema("security_monitoring", {
  nodes: [TacticDef, SecurityBehavior, Alert],
  edges: [
    edge(SecurityBehavior, TacticDef, {
      name: "mitigates",
      search: [TacticDef.id.exact(), TacticDef.name.semantic(0.90)],
      create: "lookup",
    }),
    edge(SecurityBehavior, Alert, { name: "triggers", create: "upsert" }),
  ],
});

// Register schema
const params = buildSchemaParams(SecuritySchema);
await client.schemas.create(params);

// Add memory - graph is built automatically
await client.memory.add({
  content: "Detected credential stuffing attack targeting admin accounts",
  link_to: buildLinkTo(
    TacticDef.name.semantic(0.90, "credential access"),
    Alert.title,
  ),
});
```

## File uploads

Request parameters that correspond to file uploads can be passed in many different forms:

- `File` (or an object with the same structure)
- a `fetch` `Response` (or an object with the same structure)
- an `fs.ReadStream`
- the return value of our `toFile` helper

```ts
import fs from 'fs';
import Papr, { toFile } from '@papr/memory';

const client = new Papr();

// If you have access to Node `fs` we recommend using `fs.createReadStream()`:
await client.document.upload({ file: fs.createReadStream('/path/to/file') });

// Or if you have the web `File` API you can pass a `File` instance:
await client.document.upload({ file: new File(['my bytes'], 'file') });

// You can also pass a `fetch` `Response`:
await client.document.upload({ file: await fetch('https://somesite/file') });

// Finally, if none of the above are convenient, you can use our `toFile` helper:
await client.document.upload({ file: await toFile(Buffer.from('my bytes'), 'file') });
await client.document.upload({ file: await toFile(new Uint8Array([0, 1, 2]), 'file') });
```

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

<!-- prettier-ignore -->
```ts
const userResponse = await client.user
  .create({ external_id: 'demo_user_123', email: 'user@example.com' })
  .catch(async (err) => {
    if (err instanceof Papr.APIError) {
      console.log(err.status); // 400
      console.log(err.name); // BadRequestError
      console.log(err.headers); // {server: 'nginx', ...}
    } else {
      throw err;
    }
  });
```

Error codes are as follows:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- prettier-ignore -->
```js
// Configure the default for all requests:
const client = new Papr({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await client.user.create({ external_id: 'demo_user_123', email: 'user@example.com' }, {
  maxRetries: 5,
});
```

### Timeouts

Requests time out after 1 minute by default. You can configure this with a `timeout` option:

<!-- prettier-ignore -->
```ts
// Configure the default for all requests:
const client = new Papr({
  timeout: 20 * 1000, // 20 seconds (default is 1 minute)
});

// Override per-request:
await client.user.create({ external_id: 'demo_user_123', email: 'user@example.com' }, {
  timeout: 5 * 1000,
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

## Advanced Usage

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.
This method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.
Unlike `.asResponse()` this method consumes the body, returning once it is parsed.

<!-- prettier-ignore -->
```ts
const client = new Papr();

const response = await client.user
  .create({ external_id: 'demo_user_123', email: 'user@example.com' })
  .asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: userResponse, response: raw } = await client.user
  .create({ external_id: 'demo_user_123', email: 'user@example.com' })
  .withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(userResponse.external_id);
```

### Logging

> [!IMPORTANT]
> All log messages are intended for debugging only. The format and content of log messages
> may change between releases.

#### Log levels

The log level can be configured in two ways:

1. Via the `PAPR_LOG` environment variable
2. Using the `logLevel` client option (overrides the environment variable if set)

```ts
import Papr from '@papr/memory';

const client = new Papr({
  logLevel: 'debug', // Show all log messages
});
```

Available log levels, from most to least verbose:

- `'debug'` - Show debug messages, info, warnings, and errors
- `'info'` - Show info messages, warnings, and errors
- `'warn'` - Show warnings and errors (default)
- `'error'` - Show only errors
- `'off'` - Disable all logging

At the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.
Some authentication-related headers are redacted, but sensitive data in request and response bodies
may still be visible.

#### Custom logger

By default, this library logs to `globalThis.console`. You can also provide a custom logger.
Most logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.

When providing a custom logger, the `logLevel` option still controls which messages are emitted, messages
below the configured level will not be sent to your logger.

```ts
import Papr from '@papr/memory';
import pino from 'pino';

const logger = pino();

const client = new Papr({
  logger: logger.child({ name: 'Papr' }),
  logLevel: 'debug', // Send all messages to pino, allowing it to filter
});
```

### Making custom/undocumented requests

This library is typed for convenient access to the documented API. If you need to access undocumented
endpoints, params, or response properties, the library can still be used.

#### Undocumented endpoints

To make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.
Options on the client, such as retries, will be respected when making these requests.

```ts
await client.post('/some/path', {
  body: { some_prop: 'foo' },
  query: { some_query_arg: 'bar' },
});
```

#### Undocumented request params

To make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented
parameter. This library doesn't validate at runtime that the request matches the type, so any extra values you
send will be sent as-is.

```ts
client.user.create({
  // ...
  // @ts-expect-error baz is not yet public
  baz: 'undocumented option',
});
```

For requests with the `GET` verb, any extra params will be in the query, all other requests will send the
extra param in the body.

If you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request
options.

#### Undocumented response properties

To access undocumented response properties, you may access the response object with `// @ts-expect-error` on
the response object, or cast the response object to the requisite type. Like the request params, we do not
validate or strip extra properties from the response from the API.

### Customizing the fetch client

By default, this library expects a global `fetch` function is defined.

If you want to use a different `fetch` function, you can either polyfill the global:

```ts
import fetch from 'my-fetch';

globalThis.fetch = fetch;
```

Or pass it to the client:

```ts
import Papr from '@papr/memory';
import fetch from 'my-fetch';

const client = new Papr({ fetch });
```

### Fetch options

If you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)

```ts
import Papr from '@papr/memory';

const client = new Papr({
  fetchOptions: {
    // `RequestInit` options
  },
});
```

#### Configuring proxies

To modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy
options to requests:

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg" align="top" width="18" height="21"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>

```ts
import Papr from '@papr/memory';
import * as undici from 'undici';

const proxyAgent = new undici.ProxyAgent('http://localhost:8888');
const client = new Papr({
  fetchOptions: {
    dispatcher: proxyAgent,
  },
});
```

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg" align="top" width="18" height="21"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>

```ts
import Papr from '@papr/memory';

const client = new Papr({
  fetchOptions: {
    proxy: 'http://localhost:8888',
  },
});
```

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg" align="top" width="18" height="21"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>

```ts
import Papr from 'npm:@papr/memory';

const httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });
const client = new Papr({
  fetchOptions: {
    client: httpClient,
  },
});
```

## Frequently Asked Questions

## Semantic versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are keen for your feedback; please open an [issue](https://www.github.com/Papr-ai/papr-TypescriptSDK/issues) with questions, bugs, or suggestions.

## Requirements

TypeScript >= 4.9 is supported.

The following runtimes are supported:

- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)
- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.

## Contributing

See [the contributing documentation](./CONTRIBUTING.md).
