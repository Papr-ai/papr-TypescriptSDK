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
      "args": ["-y", "@papr/memory-mcp", "--client=claude", "--tools=dynamic"],
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

## Exposing endpoints to your MCP Client

There are three ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API
3. Exposing a docs search tool and a code execution tool, allowing the client to write code to be executed against the TypeScript client

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Code execution

If you specify `--tools=code` to the MCP server, it will expose just two tools:

- `search_docs` - Searches the API documentation and returns a list of markdown results
- `execute` - Runs code against the TypeScript client

This allows the LLM to implement more complex logic by chaining together many API calls without loading
intermediary results into its context window.

The code execution itself happens in a Deno sandbox that has network access only to the base URL for the API.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

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

The command-line arguments for filtering tools and specifying clients can also be used as query parameters in the URL.
For example, to exclude specific tools while including others, use the URL:

```
http://localhost:3000?resource=cards&resource=accounts&no_tool=create_cards
```

Or, to configure for the Cursor client, with a custom max tool name length, use the URL:

```
http://localhost:3000?client=cursor&capability=tool-name-length%3D40
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "@papr/memory-mcp/server";

// import a specific tool
import createUser from "@papr/memory-mcp/tools/user/create-user";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [createUser, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `user`:

- `create_user` (`write`): Create a new user or link existing user to developer
- `list_user` (`read`): List users for a developer
- `delete_user` (`write`): Delete user association with developer and the user itself by , assume external user_id is provided, and resolve to internal user_id (\_User.objectId)
- `create_batch_user` (`write`): Create multiple users or link existing users to developer, and add each to the developer's workspace (if one exists).
- `get_user` (`read`): Get user details by user_id (\_User.objectId) and developer association

### Resource `memory`:

- `update_memory` (`write`): Update an existing memory item by ID.
      **Authentication Required**:
      One of the following authentication methods must be used:
      - Bearer token in `Authorization` header
      - API Key in `X-API-Key` header
      - Session token in `X-Session-Token` header

      **Required Headers**:
      - Content-Type: application/json
      - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')

      The API validates content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).
- `delete_memory` (`write`): Delete a memory item by ID.
      **Authentication Required**:
      One of the following authentication methods must be used:
      - Bearer token in `Authorization` header
      - API Key in `X-API-Key` header
      - Session token in `X-Session-Token` header

      **Required Headers**:
      - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
- `add_memory` (`write`): Add a new memory item to the system with size validation and background processing.
      **Authentication Required**:
      One of the following authentication methods must be used:
      - Bearer token in `Authorization` header
      - API Key in `X-API-Key` header
      - Session token in `X-Session-Token` header

      **Required Headers**:
      - Content-Type: application/json
      - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')

      **Role-Based Memory Categories**:
      - **User memories**: preference, task, goal, facts, context
      - **Assistant memories**: skills, learning

      **New Metadata Fields**:
      - `metadata.role`: Optional field to specify who generated the memory (user or assistant)
      - `metadata.category`: Optional field for memory categorization based on role
      - Both fields are stored within metadata at the same level as topics, location, etc.

      The API validates content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).
- `add_batch_memory` (`write`): Add multiple memory items in a batch with size validation and background processing.
      **Authentication Required**:
      One of the following authentication methods must be used:
      - Bearer token in `Authorization` header
      - API Key in `X-API-Key` header
      - Session token in `X-Session-Token` header

      **Required Headers**:
      - Content-Type: application/json
      - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')

      The API validates individual memory content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).
- `delete_all_memory` (`write`): Delete all memory items for a user.
      **Authentication Required**:
      One of the following authentication methods must be used:
      - Bearer token in `Authorization` header
      - API Key in `X-API-Key` header
      - Session token in `X-Session-Token` header

      **User Resolution**:
      - If only API key is provided: deletes memories for the developer
      - If user_id or external_user_id is provided: resolves and deletes memories for that user
      - Uses the same user resolution logic as other endpoints

      **Required Headers**:
      - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')

      **WARNING**: This operation cannot be undone. All memories for the resolved user will be permanently deleted.
- `get_memory` (`read`): Retrieve a memory item by ID.
      **Authentication Required**:
      One of the following authentication methods must be used:
      - Bearer token in `Authorization` header
      - API Key in `X-API-Key` header
      - Session token in `X-Session-Token` header

      **Required Headers**:
      - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
- `search_memory` (`write`): Search through memories with authentication required.
      **Authentication Required**:
      One of the following authentication methods must be used:
      - Bearer token in `Authorization` header
      - API Key in `X-API-Key` header
      - Session token in `X-Session-Token` header

      **Custom Schema Support**:
      This endpoint supports both system-defined and custom user-defined node types:
      - **System nodes**: Memory, Person, Company, Project, Task, Insight, Meeting, Opportunity, Code
      - **Custom nodes**: Defined by developers via UserGraphSchema (e.g., Developer, Product, Customer, Function)

      When custom schema nodes are returned:
      - Each custom node includes a `schema_id` field referencing the UserGraphSchema
      - The response includes a `schemas_used` array listing all schema IDs used
      - Use `GET /v1/schemas/{schema_id}` to retrieve full schema definitions including:
        - Node type definitions and properties
        - Relationship type definitions and constraints
        - Validation rules and requirements

      **Recommended Headers**:
      ```
      Accept-Encoding: gzip
      ```

      The API supports response compression for improved performance. Responses larger than 1KB will be automatically compressed when this header is present.

      **HIGHLY RECOMMENDED SETTINGS FOR BEST RESULTS:**
      - Set `enable_agentic_graph: true` for intelligent, context-aware search that can understand ambiguous references
      - Use `max_memories: 15-20` for comprehensive memory coverage
      - Use `max_nodes: 10-15` for comprehensive graph entity relationships

      **Agentic Graph Benefits:**
      When enabled, the system can understand vague references by first identifying specific entities from your memory graph, then performing targeted searches. For example:
      - "customer feedback" → identifies your customers first, then finds their specific feedback
      - "project issues" → identifies your projects first, then finds related issues
      - "team meeting notes" → identifies your team members first, then finds meeting notes
      - "code functions" → identifies your functions first, then finds related code

      **Role-Based Memory Filtering:**
      Filter memories by role and category using metadata fields:
      - `metadata.role`: Filter by "user" or "assistant"
      - `metadata.category`: Filter by category (user: preference, task, goal, facts, context | assistant: skills, learning)

      **User Resolution Precedence:**
      - If both user_id and external_user_id are provided, user_id takes precedence.
      - If only external_user_id is provided, it will be resolved to the internal user.
      - If neither is provided, the authenticated user is used.

### Resource `feedback`:

- `get_by_id_feedback` (`read`): Retrieve feedback by ID.
      This endpoint allows developers to fetch feedback details by feedback ID.
      Only the user who created the feedback or users with appropriate permissions can access it.

      **Authentication Required**:
      One of the following authentication methods must be used:
      - Bearer token in `Authorization` header
      - API Key in `X-API-Key` header
      - Session token in `X-Session-Token` header

      **Required Headers**:
      - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
- `submit_feedback` (`write`): Submit feedback on search results to help improve model performance.
      This endpoint allows developers to provide feedback on:
      - Overall answer quality (thumbs up/down, ratings)
      - Specific memory relevance and accuracy
      - User engagement signals (copy, save, create document actions)
      - Corrections and improvements

      The feedback is used to train and improve:
      - Router model tier predictions
      - Memory retrieval ranking
      - Answer generation quality
      - Agentic graph search performance

      **Authentication Required**:
      One of the following authentication methods must be used:
      - Bearer token in `Authorization` header
      - API Key in `X-API-Key` header
      - Session token in `X-Session-Token` header

      **Required Headers**:
      - Content-Type: application/json
      - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
- `submit_batch_feedback` (`write`): Submit multiple feedback items in a single request.
      Useful for submitting session-end feedback or bulk feedback collection.
      Each feedback item is processed independently, so partial success is possible.

      **Authentication Required**:
      One of the following authentication methods must be used:
      - Bearer token in `Authorization` header
      - API Key in `X-API-Key` header
      - Session token in `X-Session-Token` header

      **Required Headers**:
      - Content-Type: application/json
      - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')

### Resource `document`:

- `cancel_processing_document` (`write`): Cancel document processing
- `get_status_document` (`read`): Get processing status for an uploaded document
- `upload_document` (`write`): Upload and process documents using the pluggable architecture.

      **Authentication Required**: Bearer token or API key

      **Supported Providers**: TensorLake.ai, Reducto AI, Gemini Vision (fallback)

      **Features**:
      - Multi-tenant organization/namespace scoping
      - Temporal workflow for durable execution
      - Real-time WebSocket status updates
      - Integration with Parse Server (Post/PostSocial/PageVersion)
      - Automatic fallback between providers

### Resource `schemas`:

- `create_schemas` (`write`): Create a new user-defined graph schema.
      This endpoint allows users to define custom node types and relationships for their knowledge graph.
      The schema will be validated and stored for use in future memory extractions.

      **Features:**
      - Define custom node types with properties and validation rules
      - Define custom relationship types with constraints
      - Automatic validation against system schemas
      - Support for different scopes (personal, workspace, organization)
      - **Enum support**: Use `enum_values` to restrict property values to a predefined list (max 10 values)
      - **Auto-indexing**: Required properties are automatically indexed in Neo4j for optimal query performance

      **Property Types & Validation:**
      - `string`: Text values with optional `enum_values`, `min_length`, `max_length`, `pattern`
      - `integer`: Whole numbers with optional `min_value`, `max_value`
      - `float`: Decimal numbers with optional `min_value`, `max_value`
      - `boolean`: True/false values
      - `datetime`: ISO 8601 timestamp strings
      - `array`: Lists of values
      - `object`: Complex nested objects

      **Enum Values:**
      - Add `enum_values` to any string property to restrict values to a predefined list
      - Maximum 10 enum values allowed per property
      - Use with `default` to set a default enum value
      - Example: `"enum_values": ["small", "medium", "large"]`

      **When to Use Enums:**
      - Limited, well-defined options (≤10 values): sizes, statuses, categories, priorities
      - Controlled vocabularies: "active/inactive", "high/medium/low", "bronze/silver/gold"
      - When you want exact matching and no variations

      **When to Avoid Enums:**
      - Open-ended text fields: names, titles, descriptions, addresses
      - Large sets of options (>10): countries, cities, product models
      - When you want semantic similarity matching for entity resolution
      - Dynamic or frequently changing value sets

      **Unique Identifiers & Entity Resolution:**
      - Properties marked as `unique_identifiers` are used for entity deduplication and merging
      - **With enum_values**: Exact matching is used - entities with the same enum value are considered identical
      - **Without enum_values**: Semantic similarity matching is used - entities with similar meanings are automatically merged
      - Example: A "name" unique_identifier without enums will merge "Apple Inc" and "Apple Inc." as the same entity
      - Example: A "sku" unique_identifier with enums will only merge entities with exactly matching SKU codes
      - Use enums for unique_identifiers when you have a limited, predefined set of values (≤10 options)
      - Avoid enums for unique_identifiers when you have broad, open-ended values or >10 possible options
      - **Best practices**: Use enums for controlled vocabularies (status codes, categories), avoid for open text (company names, product titles)
      - **In the example above**: "name" uses semantic similarity (open-ended), "sku" uses exact matching (controlled set)

      **LLM-Friendly Descriptions:**
      - Write detailed property descriptions that guide the LLM on expected formats and usage
      - Include examples of typical values (e.g., "Product name, typically 2-4 words like 'iPhone 15 Pro'")
      - Specify data formats and constraints clearly (e.g., "Price in USD as decimal number")
      - For enums, explain when to use each option (e.g., "use 'new' for brand new items")

      **Authentication Required**:
      One of the following authentication methods must be used:
      - Bearer token in `Authorization` header
      - API Key in `X-API-Key` header
      - Session token in `X-Session-Token` header

      **Required Headers**:
      - Content-Type: application/json
      - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
- `retrieve_schemas` (`read`): Get a specific schema by ID.
      Returns the complete schema definition including node types, relationship types,
      and metadata. User must have read access to the schema.
- `update_schemas` (`write`): Update an existing schema.
      Allows modification of schema properties, node types, and relationship types.
      User must have write access to the schema. Updates create a new version
      while preserving the existing data.
- `list_schemas` (`read`): List all schemas accessible to the authenticated user.
      Returns schemas that the user owns or has read access to, including:
      - Personal schemas created by the user
      - Workspace schemas shared within the user's workspace
      - Organization schemas available to the user's organization

      **Authentication Required**:
      One of the following authentication methods must be used:
      - Bearer token in `Authorization` header
      - API Key in `X-API-Key` header
      - Session token in `X-Session-Token` header
- `activate_schemas` (`write`): Activate or deactivate a schema.
      Active schemas are used for memory extraction and graph generation.
      Multiple schemas can be active simultaneously and will be merged during
      the extraction process.

### Resource `graphql`:

- `playground_graphql` (`read`): GraphQL Playground (development only)
- `query_graphql` (`write`): GraphQL endpoint for querying PAPR Memory using GraphQL.

      This endpoint proxies GraphQL queries to Neo4j's hosted GraphQL endpoint,
      automatically applying multi-tenant authorization filters based on user_id and workspace_id.

      **Authentication Required**:
      One of the following authentication methods must be used:
      - Bearer token in `Authorization` header
      - API Key in `X-API-Key` header
      - Session token in `X-Session-Token` header

      **Request Body**:
      ```json
      {
        "query": "query { project(id: \"proj_123\") { name tasks { title } } }",
        "variables": {},
        "operationName": "GetProject"
      }
      ```

      **Example Query**:
      ```graphql
      query GetProjectTasks($projectId: ID!) {
        project(id: $projectId) {
          name
          tasks {
            title
            status
          }
        }
      }
      ```

      All queries are automatically filtered by user_id and workspace_id for security.
