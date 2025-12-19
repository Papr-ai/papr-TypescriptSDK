# Papr TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export PAPR_MEMORY_API_KEY="My X API Key"
export PAPR_MEMORY_Session_Token="My X Session Token"
export PAPR_MEMORY_BEARER_TOKEN="My Bearer Token"
npx -y @papr/memory-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "papr_memory_api": {
      "command": "npx",
      "args": ["-y", "@papr/memory-mcp"],
      "env": {
        "PAPR_MEMORY_API_KEY": "My X API Key",
        "PAPR_MEMORY_Session_Token": "My X Session Token",
        "PAPR_MEMORY_BEARER_TOKEN": "My Bearer Token"
      }
    }
  }
}
```

### Cursor

If you use Cursor, you can install the MCP server by using the button below. You will need to set your environment variables
in Cursor's `mcp.json`, which can be found in Cursor Settings > Tools & MCP > New MCP Server.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=@papr/memory-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBwYXByL21lbW9yeS1tY3AiXSwiZW52Ijp7IlBBUFJfTUVNT1JZX0FQSV9LRVkiOiJTZXQgeW91ciBQQVBSX01FTU9SWV9BUElfS0VZIGhlcmUuIiwiUEFQUl9NRU1PUllfU2Vzc2lvbl9Ub2tlbiI6IlNldCB5b3VyIFBBUFJfTUVNT1JZX1Nlc3Npb25fVG9rZW4gaGVyZS4iLCJQQVBSX01FTU9SWV9CRUFSRVJfVE9LRU4iOiJTZXQgeW91ciBQQVBSX01FTU9SWV9CRUFSRVJfVE9LRU4gaGVyZS4ifX0)

### VS Code

If you use MCP, you can install the MCP server by clicking the link below. You will need to set your environment variables
in VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration.

[Open VS Code](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40papr%2Fmemory-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40papr%2Fmemory-mcp%22%5D%2C%22env%22%3A%7B%22PAPR_MEMORY_API_KEY%22%3A%22Set%20your%20PAPR_MEMORY_API_KEY%20here.%22%2C%22PAPR_MEMORY_Session_Token%22%3A%22Set%20your%20PAPR_MEMORY_Session_Token%20here.%22%2C%22PAPR_MEMORY_BEARER_TOKEN%22%3A%22Set%20your%20PAPR_MEMORY_BEARER_TOKEN%20here.%22%7D%7D)

### Claude Code

If you use Claude Code, you can install the MCP server by running the command below in your terminal. You will need to set your
environment variables in Claude Code's `.claude.json`, which can be found in your home directory.

```
claude mcp add --transport stdio papr_memory_api --env PAPR_MEMORY_API_KEY="Your PAPR_MEMORY_API_KEY here." PAPR_MEMORY_Session_Token="Your PAPR_MEMORY_Session_Token here." PAPR_MEMORY_BEARER_TOKEN="Your PAPR_MEMORY_BEARER_TOKEN here." -- npx -y @papr/memory-mcp
```

## Code Mode

This MCP server is built on the "Code Mode" tool scheme. In this MCP Server,
your agent will write code against the TypeScript SDK, which will then be executed in an
isolated sandbox. To accomplish this, the server will expose two tools to your agent:

- The first tool is a docs search tool, which can be used to generically query for
  documentation about your API/SDK.

- The second tool is a code tool, where the agent can write code against the TypeScript SDK.
  The code will be executed in a sandbox environment without web or filesystem access. Then,
  anything the code returns or prints will be returned to the agent as the result of the
  tool call.

Using this scheme, agents are capable of performing very complex tasks deterministically
and repeatably.

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ---------------------------- | ------------------------ | --------------- |
| `x-papr-memory-bearer-token` | `bearerToken` | Bearer |
| `X-Session-Token` | `xSessionToken` | X-Session-Token |
| `X-API-Key` | `xAPIKey` | X-API-Key |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "papr_memory_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Bearer <auth value>"
      }
    }
  }
}
```
