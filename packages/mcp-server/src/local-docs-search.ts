// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'create',
    endpoint: '/v1/user',
    httpMethod: 'post',
    summary: 'Create User',
    description: 'Create a new user or link existing user to developer',
    stainlessPath: '(resource) user > (method) create',
    qualified: 'client.user.create',
    params: [
      'external_id: string;',
      'email?: string;',
      'metadata?: object;',
      "type?: 'developerUser' | 'user' | 'agent';",
    ],
    response:
      '{ code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }',
    markdown:
      "## create\n\n`client.user.create(external_id: string, email?: string, metadata?: object, type?: 'developerUser' | 'user' | 'agent'): { code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }`\n\n**post** `/v1/user`\n\nCreate a new user or link existing user to developer\n\n### Parameters\n\n- `external_id: string`\n\n- `email?: string`\n\n- `metadata?: object`\n\n- `type?: 'developerUser' | 'user' | 'agent'`\n\n### Returns\n\n- `{ code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }`\n  Response model for user operations\n\n  - `code: number`\n  - `status: string`\n  - `created_at?: string`\n  - `details?: object`\n  - `email?: string`\n  - `error?: string`\n  - `external_id?: string`\n  - `metadata?: object`\n  - `updated_at?: string`\n  - `user_id?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst userResponse = await client.user.create({ external_id: 'user123' });\n\nconsole.log(userResponse);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/user \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "external_id": "user123"\n        }\'',
      },
      python: {
        method: 'user.create',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nuser_response = client.user.create(\n    external_id="user123",\n)\nprint(user_response.external_id)',
      },
      typescript: {
        method: 'client.user.create',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst userResponse = await client.user.create({ external_id: 'user123' });\n\nconsole.log(userResponse.external_id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/user',
    httpMethod: 'get',
    summary: 'List Users',
    description: 'List users for a developer',
    stainlessPath: '(resource) user > (method) list',
    qualified: 'client.user.list',
    params: ['email?: string;', 'external_id?: string;', 'page?: number;', 'page_size?: number;'],
    response:
      '{ code: number; status: string; data?: { code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }[]; details?: object; error?: string; page?: number; page_size?: number; total?: number; }',
    markdown:
      "## list\n\n`client.user.list(email?: string, external_id?: string, page?: number, page_size?: number): { code: number; status: string; data?: user_response[]; details?: object; error?: string; page?: number; page_size?: number; total?: number; }`\n\n**get** `/v1/user`\n\nList users for a developer\n\n### Parameters\n\n- `email?: string`\n\n- `external_id?: string`\n\n- `page?: number`\n\n- `page_size?: number`\n\n### Returns\n\n- `{ code: number; status: string; data?: { code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }[]; details?: object; error?: string; page?: number; page_size?: number; total?: number; }`\n\n  - `code: number`\n  - `status: string`\n  - `data?: { code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }[]`\n  - `details?: object`\n  - `error?: string`\n  - `page?: number`\n  - `page_size?: number`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst users = await client.user.list();\n\nconsole.log(users);\n```",
    perLanguage: {
      http: {
        example: 'curl https://memory.papr.ai/v1/user \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'user.list',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nusers = client.user.list()\nprint(users.code)',
      },
      typescript: {
        method: 'client.user.list',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst users = await client.user.list();\n\nconsole.log(users.code);",
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v1/user/{user_id}',
    httpMethod: 'get',
    summary: 'Get User',
    description: 'Get user details by user_id (_User.objectId) and developer association',
    stainlessPath: '(resource) user > (method) get',
    qualified: 'client.user.get',
    params: ['user_id: string;'],
    response:
      '{ code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }',
    markdown:
      "## get\n\n`client.user.get(user_id: string): { code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }`\n\n**get** `/v1/user/{user_id}`\n\nGet user details by user_id (_User.objectId) and developer association\n\n### Parameters\n\n- `user_id: string`\n\n### Returns\n\n- `{ code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }`\n  Response model for user operations\n\n  - `code: number`\n  - `status: string`\n  - `created_at?: string`\n  - `details?: object`\n  - `email?: string`\n  - `error?: string`\n  - `external_id?: string`\n  - `metadata?: object`\n  - `updated_at?: string`\n  - `user_id?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst userResponse = await client.user.get('user_id');\n\nconsole.log(userResponse);\n```",
    perLanguage: {
      http: {
        example: 'curl https://memory.papr.ai/v1/user/$USER_ID \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'user.get',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nuser_response = client.user.get(\n    "user_id",\n)\nprint(user_response.external_id)',
      },
      typescript: {
        method: 'client.user.get',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst userResponse = await client.user.get('user_id');\n\nconsole.log(userResponse.external_id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/user/{user_id}',
    httpMethod: 'delete',
    summary: 'Delete User',
    description:
      'Delete user association with developer and the user itself by , assume external user_id is provided, and resolve to internal user_id (_User.objectId)',
    stainlessPath: '(resource) user > (method) delete',
    qualified: 'client.user.delete',
    params: ['user_id: string;', 'is_external?: boolean;'],
    response:
      '{ code: number; status: string; details?: object; error?: string; message?: string; user_id?: string; }',
    markdown:
      "## delete\n\n`client.user.delete(user_id: string, is_external?: boolean): { code: number; status: string; details?: object; error?: string; message?: string; user_id?: string; }`\n\n**delete** `/v1/user/{user_id}`\n\nDelete user association with developer and the user itself by , assume external user_id is provided, and resolve to internal user_id (_User.objectId)\n\n### Parameters\n\n- `user_id: string`\n\n- `is_external?: boolean`\n  Is this an external user ID?\n\n### Returns\n\n- `{ code: number; status: string; details?: object; error?: string; message?: string; user_id?: string; }`\n\n  - `code: number`\n  - `status: string`\n  - `details?: object`\n  - `error?: string`\n  - `message?: string`\n  - `user_id?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst user = await client.user.delete('user_id');\n\nconsole.log(user);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/user/$USER_ID \\\n    -X DELETE \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'user.delete',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nuser = client.user.delete(\n    user_id="user_id",\n)\nprint(user.user_id)',
      },
      typescript: {
        method: 'client.user.delete',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst user = await client.user.delete('user_id');\n\nconsole.log(user.user_id);",
      },
    },
  },
  {
    name: 'create_batch',
    endpoint: '/v1/user/batch',
    httpMethod: 'post',
    summary: 'Create User Batch',
    description:
      "Create multiple users or link existing users to developer, and add each to the developer's workspace (if one exists).",
    stainlessPath: '(resource) user > (method) create_batch',
    qualified: 'client.user.createBatch',
    params: [
      "users: { external_id: string; email?: string; metadata?: object; type?: 'developerUser' | 'user' | 'agent'; }[];",
    ],
    response:
      '{ code: number; status: string; data?: { code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }[]; details?: object; error?: string; page?: number; page_size?: number; total?: number; }',
    markdown:
      "## create_batch\n\n`client.user.createBatch(users: { external_id: string; email?: string; metadata?: object; type?: 'developerUser' | 'user' | 'agent'; }[]): { code: number; status: string; data?: user_response[]; details?: object; error?: string; page?: number; page_size?: number; total?: number; }`\n\n**post** `/v1/user/batch`\n\nCreate multiple users or link existing users to developer, and add each to the developer's workspace (if one exists).\n\n### Parameters\n\n- `users: { external_id: string; email?: string; metadata?: object; type?: 'developerUser' | 'user' | 'agent'; }[]`\n\n### Returns\n\n- `{ code: number; status: string; data?: { code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }[]; details?: object; error?: string; page?: number; page_size?: number; total?: number; }`\n\n  - `code: number`\n  - `status: string`\n  - `data?: { code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }[]`\n  - `details?: object`\n  - `error?: string`\n  - `page?: number`\n  - `page_size?: number`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.user.createBatch({ users: [{ external_id: 'user123' }] });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/user/batch \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "users": [\n            {\n              "external_id": "user123",\n              "email": "user@example.com",\n              "metadata": {\n                "name": "bar",\n                "preferences": "bar"\n              },\n              "type": "developerUser"\n            }\n          ]\n        }\'',
      },
      python: {
        method: 'user.create_batch',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.user.create_batch(\n    users=[{\n        "external_id": "user123"\n    }],\n)\nprint(response.code)',
      },
      typescript: {
        method: 'client.user.createBatch',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.user.createBatch({ users: [{ external_id: 'user123' }] });\n\nconsole.log(response.code);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/user/{user_id}',
    httpMethod: 'put',
    summary: 'Update User',
    description: 'Update user details by user_id (_User.objectId) and developer association',
    stainlessPath: '(resource) user > (method) update',
    qualified: 'client.user.update',
    params: [
      'user_id: string;',
      'email?: string;',
      'external_id?: string;',
      'metadata?: object;',
      "type?: 'developerUser' | 'user' | 'agent';",
    ],
    response:
      '{ code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }',
    markdown:
      "## update\n\n`client.user.update(user_id: string, email?: string, external_id?: string, metadata?: object, type?: 'developerUser' | 'user' | 'agent'): { code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }`\n\n**put** `/v1/user/{user_id}`\n\nUpdate user details by user_id (_User.objectId) and developer association\n\n### Parameters\n\n- `user_id: string`\n\n- `email?: string`\n\n- `external_id?: string`\n\n- `metadata?: object`\n\n- `type?: 'developerUser' | 'user' | 'agent'`\n\n### Returns\n\n- `{ code: number; status: string; created_at?: string; details?: object; email?: string; error?: string; external_id?: string; metadata?: object; updated_at?: string; user_id?: string; }`\n  Response model for user operations\n\n  - `code: number`\n  - `status: string`\n  - `created_at?: string`\n  - `details?: object`\n  - `email?: string`\n  - `error?: string`\n  - `external_id?: string`\n  - `metadata?: object`\n  - `updated_at?: string`\n  - `user_id?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst userResponse = await client.user.update('user_id');\n\nconsole.log(userResponse);\n```",
    perLanguage: {
      http: {
        example:
          "curl https://memory.papr.ai/v1/user/$USER_ID \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"X-API-Key: $PAPR_MEMORY_API_KEY\" \\\n    -d '{}'",
      },
      python: {
        method: 'user.update',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nuser_response = client.user.update(\n    user_id="user_id",\n)\nprint(user_response.external_id)',
      },
      typescript: {
        method: 'client.user.update',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst userResponse = await client.user.update('user_id');\n\nconsole.log(userResponse.external_id);",
      },
    },
  },
  {
    name: 'add',
    endpoint: '/v1/memory',
    httpMethod: 'post',
    summary: 'Add Memory V1',
    description:
      "Add a new memory item to the system with size validation and background processing.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    **Role-Based Memory Categories**:\n    - **User memories**: preference, task, goal, facts, context\n    - **Assistant memories**: skills, learning\n    \n    **New Metadata Fields**:\n    - `metadata.role`: Optional field to specify who generated the memory (user or assistant)\n    - `metadata.category`: Optional field for memory categorization based on role\n    - Both fields are stored within metadata at the same level as topics, location, etc.\n    \n    The API validates content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).",
    stainlessPath: '(resource) memory > (method) add',
    qualified: 'client.memory.add',
    params: [
      'content: string;',
      'enable_holographic?: boolean;',
      'format?: string;',
      'frequency_schema_id?: string;',
      'skip_background_processing?: boolean;',
      'webhook_secret?: string;',
      'webhook_url?: string;',
      "context?: { content: string; role: 'user' | 'assistant'; }[];",
      'external_user_id?: string;',
      "graph_generation?: { auto?: { property_overrides?: object[]; schema_id?: string; }; manual?: { nodes: object[]; relationships?: object[]; }; mode?: 'auto' | 'manual'; };",
      'link_to?: string | string[] | object;',
      "memory_policy?: { acl?: { read?: string[]; write?: string[]; }; consent?: 'explicit' | 'implicit' | 'terms' | 'none'; edge_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; direction?: 'outgoing' | 'incoming' | 'both'; edge_type?: string; link_only?: boolean; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; source_type?: string; target_type?: string; when?: object; }[]; mode?: 'auto' | 'manual'; node_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; link_only?: boolean; node_type?: string; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; when?: object; }[]; nodes?: { id: string; type: string; properties?: object; }[]; relationships?: { source: string; target: string; type: string; properties?: object; }[]; risk?: 'none' | 'sensitive' | 'flagged'; schema_id?: string; };",
      "metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; };",
      'namespace_id?: string;',
      'organization_id?: string;',
      "relationships_json?: { relation_type: string; metadata?: object; related_item_id?: string; related_item_type?: string; relationship_type?: 'previous_memory_item_id' | 'all_previous_memory_items' | 'link_to_id'; }[];",
      "type?: 'text' | 'code_snippet' | 'document';",
      'user_id?: string;',
    ],
    response:
      '{ code?: number; data?: { createdAt: string; memoryId: string; objectId: string; memoryChunkIds?: string[]; }[]; details?: object; error?: string; status?: string; }',
    markdown:
      "## add\n\n`client.memory.add(content: string, enable_holographic?: boolean, format?: string, frequency_schema_id?: string, skip_background_processing?: boolean, webhook_secret?: string, webhook_url?: string, context?: { content: string; role: 'user' | 'assistant'; }[], external_user_id?: string, graph_generation?: { auto?: auto_graph_generation; manual?: manual_graph_generation; mode?: 'auto' | 'manual'; }, link_to?: string | string[] | object, memory_policy?: { acl?: acl_config; consent?: 'explicit' | 'implicit' | 'terms' | 'none'; edge_constraints?: edge_constraint_input[]; mode?: 'auto' | 'manual'; node_constraints?: node_constraint_input[]; nodes?: node_spec[]; relationships?: relationship_spec[]; risk?: 'none' | 'sensitive' | 'flagged'; schema_id?: string; }, metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }, namespace_id?: string, organization_id?: string, relationships_json?: { relation_type: string; metadata?: object; related_item_id?: string; related_item_type?: string; relationship_type?: 'previous_memory_item_id' | 'all_previous_memory_items' | 'link_to_id'; }[], type?: 'text' | 'code_snippet' | 'document', user_id?: string): { code?: number; data?: add_memory_item[]; details?: object; error?: string; status?: string; }`\n\n**post** `/v1/memory`\n\nAdd a new memory item to the system with size validation and background processing.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    **Role-Based Memory Categories**:\n    - **User memories**: preference, task, goal, facts, context\n    - **Assistant memories**: skills, learning\n    \n    **New Metadata Fields**:\n    - `metadata.role`: Optional field to specify who generated the memory (user or assistant)\n    - `metadata.category`: Optional field for memory categorization based on role\n    - Both fields are stored within metadata at the same level as topics, location, etc.\n    \n    The API validates content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).\n\n### Parameters\n\n- `content: string`\n  The content of the memory item you want to add to memory\n\n- `enable_holographic?: boolean`\n  If True, applies holographic neural transforms and stores in holographic collection\n\n- `format?: string`\n  Response format. Use 'omo' for Open Memory Object standard format (portable across platforms).\n\n- `frequency_schema_id?: string`\n  Frequency schema for holographic embedding (e.g. 'cosqa', 'scifact'). Required when enable_holographic=True. Call GET /v1/frequencies to see available schemas.\n\n- `skip_background_processing?: boolean`\n  If True, skips adding background tasks for processing\n\n- `webhook_secret?: string`\n  Secret for webhook HMAC authentication. Sent as X-Webhook-Secret header and used to generate X-Webhook-Signature.\n\n- `webhook_url?: string`\n  Webhook URL to notify when background processing completes. Receives POST with {event, memory_id, status, completed_at}.\n\n- `context?: { content: string; role: 'user' | 'assistant'; }[]`\n  Conversation history context for this memory. Use for providing message history when adding a memory. Format: [{role: 'user'|'assistant', content: '...'}]\n\n- `external_user_id?: string`\n  Your application's user identifier. This is the primary way to identify users. Use this for your app's user IDs (e.g., 'user_alice_123', UUID, email). Papr will automatically resolve or create internal users as needed.\n\n- `graph_generation?: { auto?: { property_overrides?: object[]; schema_id?: string; }; manual?: { nodes: object[]; relationships?: object[]; }; mode?: 'auto' | 'manual'; }`\n  Graph generation configuration\n  - `auto?: { property_overrides?: { nodeLabel: string; set: object; match?: object; }[]; schema_id?: string; }`\n    AI-powered graph generation with optional guidance\n  - `manual?: { nodes: { id: string; label: string; properties: object; }[]; relationships?: { relationship_type: string; source_node_id: string; target_node_id: string; properties?: object; }[]; }`\n    Complete manual control over graph structure\n  - `mode?: 'auto' | 'manual'`\n    Graph generation mode: 'auto' (AI-powered) or 'manual' (exact specification)\n\n- `link_to?: string | string[] | object`\n  Shorthand DSL for node/edge constraints. Expands to memory_policy.node_constraints and edge_constraints. Formats: - String: 'Task:title' (semantic match on Task.title) - List: ['Task:title', 'Person:email'] (multiple constraints) - Dict: {'Task:title': {'set': {...}}} (with options) Syntax: - Node: 'Type:property', 'Type:prop=value' (exact), 'Type:prop~value' (semantic) - Edge: 'Source->EDGE->Target:property' (arrow syntax) - Via: 'Type.via(EDGE->Target:prop)' (relationship traversal) - Special: '$this', '$previous', '$context:N' Example: 'SecurityBehavior->MITIGATES->TacticDef:name' with {'create': 'never'}\n\n- `memory_policy?: { acl?: { read?: string[]; write?: string[]; }; consent?: 'explicit' | 'implicit' | 'terms' | 'none'; edge_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; direction?: 'outgoing' | 'incoming' | 'both'; edge_type?: string; link_only?: boolean; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; source_type?: string; target_type?: string; when?: object; }[]; mode?: 'auto' | 'manual'; node_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; link_only?: boolean; node_type?: string; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; when?: object; }[]; nodes?: { id: string; type: string; properties?: object; }[]; relationships?: { source: string; target: string; type: string; properties?: object; }[]; risk?: 'none' | 'sensitive' | 'flagged'; schema_id?: string; }`\n  Unified memory processing policy.\n\nThis is the SINGLE source of truth for how a memory should be processed,\ncombining graph generation control AND OMO (Open Memory Object) safety standards.\n\n**Graph Generation Modes:**\n- auto: LLM extracts entities freely (default)\n- manual: Developer provides exact nodes (no LLM extraction)\n\n**OMO Safety Standards:**\n- consent: How data owner allowed storage (explicit, implicit, terms, none)\n- risk: Safety assessment (none, sensitive, flagged)\n- acl: Access control list for read/write permissions\n\n**Schema Integration:**\n- schema_id: Reference a schema that may have its own default memory_policy\n- Schema-level policies are merged with request-level (request takes precedence)\n  - `acl?: { read?: string[]; write?: string[]; }`\n    Simplified Access Control List configuration.\n\nAligned with Open Memory Object (OMO) standard.\nSee: https://github.com/anthropics/open-memory-object\n\n**Supported Entity Prefixes:**\n\n| Prefix | Description | Validation |\n|--------|-------------|------------|\n| `user:` | Internal Papr user ID | Validated against Parse users |\n| `external_user:` | Your app's user ID | Not validated (your responsibility) |\n| `organization:` | Organization ID | Validated against your organizations |\n| `namespace:` | Namespace ID | Validated against your namespaces |\n| `workspace:` | Workspace ID | Validated against your workspaces |\n| `role:` | Parse role ID | Validated against your roles |\n\n**Examples:**\n```python\nacl = ACLConfig(\n    read=[\"external_user:alice_123\", \"organization:org_acme\"],\n    write=[\"external_user:alice_123\"]\n)\n```\n\n**Validation Rules:**\n- Internal entities (user, organization, namespace, workspace, role) are validated\n- External entities (external_user) are NOT validated - your app is responsible\n- Invalid internal entities will return an error\n- Unprefixed values default to `external_user:` for backwards compatibility\n  - `consent?: 'explicit' | 'implicit' | 'terms' | 'none'`\n    How the data owner allowed this memory to be stored/used. 'explicit': User explicitly agreed. 'implicit': Inferred from context (default). 'terms': Covered by Terms of Service. 'none': No consent - graph extraction will be SKIPPED.\n  - `edge_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; direction?: 'outgoing' | 'incoming' | 'both'; edge_type?: string; link_only?: boolean; on_miss?: 'create' | 'ignore' | 'error'; search?: { mode?: 'semantic' | 'exact' | 'fuzzy'; properties?: object[]; threshold?: number; via_relationship?: object[]; }; set?: object; source_type?: string; target_type?: string; when?: object; }[]`\n    Rules for how LLM-extracted edges/relationships should be created/handled. Used in 'auto' mode when present. Controls: - create: 'auto' (create target if not found) or 'never' (controlled vocabulary) - search: How to find existing target nodes - set: Edge property values (exact or auto-extracted) - source_type/target_type: Filter by connected node types Example: {edge_type: 'MITIGATES', create: 'never', search: {properties: ['name']}}\n  - `mode?: 'auto' | 'manual'`\n    How to generate graph from this memory. 'auto': LLM extracts entities freely. 'manual': You provide exact nodes (no LLM). Note: 'structured' is accepted as deprecated alias for 'manual'.\n  - `node_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; link_only?: boolean; node_type?: string; on_miss?: 'create' | 'ignore' | 'error'; search?: { mode?: 'semantic' | 'exact' | 'fuzzy'; properties?: object[]; threshold?: number; via_relationship?: object[]; }; set?: object; when?: object; }[]`\n    Rules for how LLM-extracted nodes should be created/updated. Used in 'auto' mode when present. Controls creation policy, property forcing, and merge behavior.\n  - `nodes?: { id: string; type: string; properties?: object; }[]`\n    For manual mode: Exact nodes to create (no LLM extraction). Required when mode='manual'. Each node needs id, type, and properties.\n  - `relationships?: { source: string; target: string; type: string; properties?: object; }[]`\n    Relationships between nodes. Supports special placeholders: '$this' = the Memory node being created, '$previous' = the user's most recent memory. Examples: {source: '$this', target: '$previous', type: 'FOLLOWS'} links to previous memory. {source: '$this', target: 'mem_abc', type: 'REFERENCES'} links to specific memory.\n  - `risk?: 'none' | 'sensitive' | 'flagged'`\n    Safety assessment for this memory. 'none': Safe content (default). 'sensitive': Contains PII or sensitive info. 'flagged': Requires review - ACL will be restricted to owner only.\n  - `schema_id?: string`\n    Reference a UserGraphSchema by ID. The schema's memory_policy (if defined) will be used as defaults, with this request's settings taking precedence.\n\n- `metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }`\n  Metadata for memory request\n  - `acl?: object`\n    DEPRECATED: Use 'memory_policy.acl' at request level instead. Format: {'read': [...], 'write': [...]}.\n  - `assistantMessage?: string`\n  - `category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'`\n    Memory category based on role. For users: preference, task, goal, fact, context. For assistants: skills, learning, task, goal, fact, context.\n  - `consent?: string`\n    DEPRECATED: Use 'memory_policy.consent' at request level instead. Values: 'explicit', 'implicit' (default), 'terms', 'none'.\n  - `conversationId?: string`\n  - `createdAt?: string`\n    ISO datetime when the memory was created\n  - `customMetadata?: object`\n    Optional object for arbitrary custom metadata fields. Only string, number, boolean, or list of strings allowed. Nested dicts are not allowed.\n  - `emoji tags?: string[]`\n  - `emotion tags?: string[]`\n  - `external_user_id?: string`\n    DEPRECATED: Use 'external_user_id' at request level instead. This field will be removed in v2.\n  - `external_user_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `external_user_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `goalClassificationScores?: number[]`\n  - `hierarchical_structures?: string | object[]`\n    Hierarchical structures to enable navigation from broad topics to specific ones\n  - `location?: string`\n  - `namespace_id?: string`\n    DEPRECATED: Use 'namespace_id' at request level instead. This field will be removed in v2.\n  - `namespace_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `namespace_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `organization_id?: string`\n    DEPRECATED: Use 'organization_id' at request level instead. This field will be removed in v2.\n  - `organization_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `organization_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `pageId?: string`\n  - `post?: string`\n  - `relatedGoals?: string[]`\n  - `relatedSteps?: string[]`\n  - `relatedUseCases?: string[]`\n  - `risk?: string`\n    DEPRECATED: Use 'memory_policy.risk' at request level instead. Values: 'none' (default), 'sensitive', 'flagged'.\n  - `role?: 'user' | 'assistant'`\n    Role of the message sender\n  - `role_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `role_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `sessionId?: string`\n  - `sourceType?: string`\n  - `sourceUrl?: string`\n  - `stepClassificationScores?: number[]`\n  - `topics?: string[]`\n  - `upload_id?: string`\n    Upload ID for document processing workflows\n  - `useCaseClassificationScores?: number[]`\n  - `user_id?: string`\n    DEPRECATED: Use 'external_user_id' at request level instead. This field will be removed in v2.\n  - `user_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `user_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `userMessage?: string`\n  - `workspace_id?: string`\n  - `workspace_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `workspace_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n\n- `namespace_id?: string`\n  Optional namespace ID for multi-tenant memory scoping. When provided, memory is associated with this namespace.\n\n- `organization_id?: string`\n  DEPRECATED - Internal only. Auto-populated from API key scope. Do not set manually. The organization is resolved automatically from the API key's associated organization.\n\n- `relationships_json?: { relation_type: string; metadata?: object; related_item_id?: string; related_item_type?: string; relationship_type?: 'previous_memory_item_id' | 'all_previous_memory_items' | 'link_to_id'; }[]`\n  DEPRECATED: Use 'memory_policy' instead. Migration options: 1. Specific memory: relationships=[{source: '$this', target: 'mem_123', type: 'FOLLOWS'}] 2. Previous memory: link_to_previous_memory=True 3. Related memories: link_to_related_memories=3\n\n- `type?: 'text' | 'code_snippet' | 'document'`\n  Memory item type; defaults to 'text' if omitted\n\n- `user_id?: string`\n  DEPRECATED: Use 'external_user_id' instead. Internal Papr Parse user ID. Most developers should not use this field directly.\n\n### Returns\n\n- `{ code?: number; data?: { createdAt: string; memoryId: string; objectId: string; memoryChunkIds?: string[]; }[]; details?: object; error?: string; status?: string; }`\n  Unified response model for add_memory API endpoint (success or error).\n\n  - `code?: number`\n  - `data?: { createdAt: string; memoryId: string; objectId: string; memoryChunkIds?: string[]; }[]`\n  - `details?: object`\n  - `error?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst addMemoryResponse = await client.memory.add({ content: 'Meeting with John Smith from Acme Corp about the Q4 project timeline' });\n\nconsole.log(addMemoryResponse);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/memory \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "content": "Meeting with John Smith from Acme Corp about the Q4 project timeline"\n        }\'',
      },
      python: {
        method: 'memory.add',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nadd_memory_response = client.memory.add(\n    content="Meeting with John Smith from Acme Corp about the Q4 project timeline",\n)\nprint(add_memory_response.code)',
      },
      typescript: {
        method: 'client.memory.add',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst addMemoryResponse = await client.memory.add({\n  content: 'Meeting with John Smith from Acme Corp about the Q4 project timeline',\n});\n\nconsole.log(addMemoryResponse.code);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/memory/{memory_id}',
    httpMethod: 'put',
    summary: 'Update Memory V1',
    description:
      "Update an existing memory item by ID.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    The API validates content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).",
    stainlessPath: '(resource) memory > (method) update',
    qualified: 'client.memory.update',
    params: [
      'memory_id: string;',
      'enable_holographic?: boolean;',
      'frequency_schema_id?: string;',
      'content?: string;',
      "context?: { content: string; role: 'user' | 'assistant'; }[];",
      "graph_generation?: { auto?: { property_overrides?: object[]; schema_id?: string; }; manual?: { nodes: object[]; relationships?: object[]; }; mode?: 'auto' | 'manual'; };",
      'link_to?: string | string[] | object;',
      "memory_policy?: { acl?: { read?: string[]; write?: string[]; }; consent?: 'explicit' | 'implicit' | 'terms' | 'none'; edge_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; direction?: 'outgoing' | 'incoming' | 'both'; edge_type?: string; link_only?: boolean; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; source_type?: string; target_type?: string; when?: object; }[]; mode?: 'auto' | 'manual'; node_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; link_only?: boolean; node_type?: string; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; when?: object; }[]; nodes?: { id: string; type: string; properties?: object; }[]; relationships?: { source: string; target: string; type: string; properties?: object; }[]; risk?: 'none' | 'sensitive' | 'flagged'; schema_id?: string; };",
      "metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; };",
      'namespace_id?: string;',
      'organization_id?: string;',
      "relationships_json?: { relation_type: string; metadata?: object; related_item_id?: string; related_item_type?: string; relationship_type?: 'previous_memory_item_id' | 'all_previous_memory_items' | 'link_to_id'; }[];",
      "type?: 'text' | 'code_snippet' | 'document';",
    ],
    response:
      '{ code?: number; details?: object; error?: string; memory_items?: { memoryId: string; objectId: string; updatedAt: string; content?: string; memoryChunkIds?: string[]; metadata?: object; }[]; message?: string; status?: string; status_obj?: { neo4j?: boolean; parse?: boolean; pinecone?: boolean; }; }',
    markdown:
      "## update\n\n`client.memory.update(memory_id: string, enable_holographic?: boolean, frequency_schema_id?: string, content?: string, context?: { content: string; role: 'user' | 'assistant'; }[], graph_generation?: { auto?: auto_graph_generation; manual?: manual_graph_generation; mode?: 'auto' | 'manual'; }, link_to?: string | string[] | object, memory_policy?: { acl?: acl_config; consent?: 'explicit' | 'implicit' | 'terms' | 'none'; edge_constraints?: edge_constraint_input[]; mode?: 'auto' | 'manual'; node_constraints?: node_constraint_input[]; nodes?: node_spec[]; relationships?: relationship_spec[]; risk?: 'none' | 'sensitive' | 'flagged'; schema_id?: string; }, metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }, namespace_id?: string, organization_id?: string, relationships_json?: { relation_type: string; metadata?: object; related_item_id?: string; related_item_type?: string; relationship_type?: 'previous_memory_item_id' | 'all_previous_memory_items' | 'link_to_id'; }[], type?: 'text' | 'code_snippet' | 'document'): { code?: number; details?: object; error?: string; memory_items?: object[]; message?: string; status?: string; status_obj?: object; }`\n\n**put** `/v1/memory/{memory_id}`\n\nUpdate an existing memory item by ID.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    The API validates content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).\n\n### Parameters\n\n- `memory_id: string`\n\n- `enable_holographic?: boolean`\n  If True, re-processes holographic neural transforms after content update\n\n- `frequency_schema_id?: string`\n  Frequency schema for holographic embedding (e.g. 'cosqa', 'scifact').\n\n- `content?: string`\n  The new content of the memory item\n\n- `context?: { content: string; role: 'user' | 'assistant'; }[]`\n  Updated context for the memory item\n\n- `graph_generation?: { auto?: { property_overrides?: object[]; schema_id?: string; }; manual?: { nodes: object[]; relationships?: object[]; }; mode?: 'auto' | 'manual'; }`\n  Graph generation configuration\n  - `auto?: { property_overrides?: { nodeLabel: string; set: object; match?: object; }[]; schema_id?: string; }`\n    AI-powered graph generation with optional guidance\n  - `manual?: { nodes: { id: string; label: string; properties: object; }[]; relationships?: { relationship_type: string; source_node_id: string; target_node_id: string; properties?: object; }[]; }`\n    Complete manual control over graph structure\n  - `mode?: 'auto' | 'manual'`\n    Graph generation mode: 'auto' (AI-powered) or 'manual' (exact specification)\n\n- `link_to?: string | string[] | object`\n  Shorthand DSL for node/edge constraints. Expands to memory_policy.node_constraints and edge_constraints. Formats: - String: 'Task:title' (semantic match on Task.title) - List: ['Task:title', 'Person:email'] (multiple constraints) - Dict: {'Task:title': {'set': {...}}} (with options) Syntax: - Node: 'Type:property', 'Type:prop=value' (exact), 'Type:prop~value' (semantic) - Edge: 'Source->EDGE->Target:property' (arrow syntax) - Via: 'Type.via(EDGE->Target:prop)' (relationship traversal) - Special: '$this', '$previous', '$context:N' Example: 'SecurityBehavior->MITIGATES->TacticDef:name' with {'create': 'never'}\n\n- `memory_policy?: { acl?: { read?: string[]; write?: string[]; }; consent?: 'explicit' | 'implicit' | 'terms' | 'none'; edge_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; direction?: 'outgoing' | 'incoming' | 'both'; edge_type?: string; link_only?: boolean; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; source_type?: string; target_type?: string; when?: object; }[]; mode?: 'auto' | 'manual'; node_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; link_only?: boolean; node_type?: string; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; when?: object; }[]; nodes?: { id: string; type: string; properties?: object; }[]; relationships?: { source: string; target: string; type: string; properties?: object; }[]; risk?: 'none' | 'sensitive' | 'flagged'; schema_id?: string; }`\n  Unified memory processing policy.\n\nThis is the SINGLE source of truth for how a memory should be processed,\ncombining graph generation control AND OMO (Open Memory Object) safety standards.\n\n**Graph Generation Modes:**\n- auto: LLM extracts entities freely (default)\n- manual: Developer provides exact nodes (no LLM extraction)\n\n**OMO Safety Standards:**\n- consent: How data owner allowed storage (explicit, implicit, terms, none)\n- risk: Safety assessment (none, sensitive, flagged)\n- acl: Access control list for read/write permissions\n\n**Schema Integration:**\n- schema_id: Reference a schema that may have its own default memory_policy\n- Schema-level policies are merged with request-level (request takes precedence)\n  - `acl?: { read?: string[]; write?: string[]; }`\n    Simplified Access Control List configuration.\n\nAligned with Open Memory Object (OMO) standard.\nSee: https://github.com/anthropics/open-memory-object\n\n**Supported Entity Prefixes:**\n\n| Prefix | Description | Validation |\n|--------|-------------|------------|\n| `user:` | Internal Papr user ID | Validated against Parse users |\n| `external_user:` | Your app's user ID | Not validated (your responsibility) |\n| `organization:` | Organization ID | Validated against your organizations |\n| `namespace:` | Namespace ID | Validated against your namespaces |\n| `workspace:` | Workspace ID | Validated against your workspaces |\n| `role:` | Parse role ID | Validated against your roles |\n\n**Examples:**\n```python\nacl = ACLConfig(\n    read=[\"external_user:alice_123\", \"organization:org_acme\"],\n    write=[\"external_user:alice_123\"]\n)\n```\n\n**Validation Rules:**\n- Internal entities (user, organization, namespace, workspace, role) are validated\n- External entities (external_user) are NOT validated - your app is responsible\n- Invalid internal entities will return an error\n- Unprefixed values default to `external_user:` for backwards compatibility\n  - `consent?: 'explicit' | 'implicit' | 'terms' | 'none'`\n    How the data owner allowed this memory to be stored/used. 'explicit': User explicitly agreed. 'implicit': Inferred from context (default). 'terms': Covered by Terms of Service. 'none': No consent - graph extraction will be SKIPPED.\n  - `edge_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; direction?: 'outgoing' | 'incoming' | 'both'; edge_type?: string; link_only?: boolean; on_miss?: 'create' | 'ignore' | 'error'; search?: { mode?: 'semantic' | 'exact' | 'fuzzy'; properties?: object[]; threshold?: number; via_relationship?: object[]; }; set?: object; source_type?: string; target_type?: string; when?: object; }[]`\n    Rules for how LLM-extracted edges/relationships should be created/handled. Used in 'auto' mode when present. Controls: - create: 'auto' (create target if not found) or 'never' (controlled vocabulary) - search: How to find existing target nodes - set: Edge property values (exact or auto-extracted) - source_type/target_type: Filter by connected node types Example: {edge_type: 'MITIGATES', create: 'never', search: {properties: ['name']}}\n  - `mode?: 'auto' | 'manual'`\n    How to generate graph from this memory. 'auto': LLM extracts entities freely. 'manual': You provide exact nodes (no LLM). Note: 'structured' is accepted as deprecated alias for 'manual'.\n  - `node_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; link_only?: boolean; node_type?: string; on_miss?: 'create' | 'ignore' | 'error'; search?: { mode?: 'semantic' | 'exact' | 'fuzzy'; properties?: object[]; threshold?: number; via_relationship?: object[]; }; set?: object; when?: object; }[]`\n    Rules for how LLM-extracted nodes should be created/updated. Used in 'auto' mode when present. Controls creation policy, property forcing, and merge behavior.\n  - `nodes?: { id: string; type: string; properties?: object; }[]`\n    For manual mode: Exact nodes to create (no LLM extraction). Required when mode='manual'. Each node needs id, type, and properties.\n  - `relationships?: { source: string; target: string; type: string; properties?: object; }[]`\n    Relationships between nodes. Supports special placeholders: '$this' = the Memory node being created, '$previous' = the user's most recent memory. Examples: {source: '$this', target: '$previous', type: 'FOLLOWS'} links to previous memory. {source: '$this', target: 'mem_abc', type: 'REFERENCES'} links to specific memory.\n  - `risk?: 'none' | 'sensitive' | 'flagged'`\n    Safety assessment for this memory. 'none': Safe content (default). 'sensitive': Contains PII or sensitive info. 'flagged': Requires review - ACL will be restricted to owner only.\n  - `schema_id?: string`\n    Reference a UserGraphSchema by ID. The schema's memory_policy (if defined) will be used as defaults, with this request's settings taking precedence.\n\n- `metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }`\n  Metadata for memory request\n  - `acl?: object`\n    DEPRECATED: Use 'memory_policy.acl' at request level instead. Format: {'read': [...], 'write': [...]}.\n  - `assistantMessage?: string`\n  - `category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'`\n    Memory category based on role. For users: preference, task, goal, fact, context. For assistants: skills, learning, task, goal, fact, context.\n  - `consent?: string`\n    DEPRECATED: Use 'memory_policy.consent' at request level instead. Values: 'explicit', 'implicit' (default), 'terms', 'none'.\n  - `conversationId?: string`\n  - `createdAt?: string`\n    ISO datetime when the memory was created\n  - `customMetadata?: object`\n    Optional object for arbitrary custom metadata fields. Only string, number, boolean, or list of strings allowed. Nested dicts are not allowed.\n  - `emoji tags?: string[]`\n  - `emotion tags?: string[]`\n  - `external_user_id?: string`\n    DEPRECATED: Use 'external_user_id' at request level instead. This field will be removed in v2.\n  - `external_user_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `external_user_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `goalClassificationScores?: number[]`\n  - `hierarchical_structures?: string | object[]`\n    Hierarchical structures to enable navigation from broad topics to specific ones\n  - `location?: string`\n  - `namespace_id?: string`\n    DEPRECATED: Use 'namespace_id' at request level instead. This field will be removed in v2.\n  - `namespace_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `namespace_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `organization_id?: string`\n    DEPRECATED: Use 'organization_id' at request level instead. This field will be removed in v2.\n  - `organization_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `organization_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `pageId?: string`\n  - `post?: string`\n  - `relatedGoals?: string[]`\n  - `relatedSteps?: string[]`\n  - `relatedUseCases?: string[]`\n  - `risk?: string`\n    DEPRECATED: Use 'memory_policy.risk' at request level instead. Values: 'none' (default), 'sensitive', 'flagged'.\n  - `role?: 'user' | 'assistant'`\n    Role of the message sender\n  - `role_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `role_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `sessionId?: string`\n  - `sourceType?: string`\n  - `sourceUrl?: string`\n  - `stepClassificationScores?: number[]`\n  - `topics?: string[]`\n  - `upload_id?: string`\n    Upload ID for document processing workflows\n  - `useCaseClassificationScores?: number[]`\n  - `user_id?: string`\n    DEPRECATED: Use 'external_user_id' at request level instead. This field will be removed in v2.\n  - `user_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `user_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `userMessage?: string`\n  - `workspace_id?: string`\n  - `workspace_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `workspace_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n\n- `namespace_id?: string`\n  Optional namespace ID for multi-tenant memory scoping. When provided, update is scoped to memories within this namespace.\n\n- `organization_id?: string`\n  Optional organization ID for multi-tenant memory scoping. When provided, update is scoped to memories within this organization.\n\n- `relationships_json?: { relation_type: string; metadata?: object; related_item_id?: string; related_item_type?: string; relationship_type?: 'previous_memory_item_id' | 'all_previous_memory_items' | 'link_to_id'; }[]`\n  Updated relationships for Graph DB (neo4J)\n\n- `type?: 'text' | 'code_snippet' | 'document'`\n  Valid memory types\n\n### Returns\n\n- `{ code?: number; details?: object; error?: string; memory_items?: { memoryId: string; objectId: string; updatedAt: string; content?: string; memoryChunkIds?: string[]; metadata?: object; }[]; message?: string; status?: string; status_obj?: { neo4j?: boolean; parse?: boolean; pinecone?: boolean; }; }`\n  Unified response model for update_memory API endpoint (success or error).\n\n  - `code?: number`\n  - `details?: object`\n  - `error?: string`\n  - `memory_items?: { memoryId: string; objectId: string; updatedAt: string; content?: string; memoryChunkIds?: string[]; metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }; }[]`\n  - `message?: string`\n  - `status?: string`\n  - `status_obj?: { neo4j?: boolean; parse?: boolean; pinecone?: boolean; }`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst memory = await client.memory.update('memory_id');\n\nconsole.log(memory);\n```",
    perLanguage: {
      http: {
        example:
          "curl https://memory.papr.ai/v1/memory/$MEMORY_ID \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"X-API-Key: $PAPR_MEMORY_API_KEY\" \\\n    -d '{}'",
      },
      python: {
        method: 'memory.update',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nmemory = client.memory.update(\n    memory_id="memory_id",\n)\nprint(memory.code)',
      },
      typescript: {
        method: 'client.memory.update',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst memory = await client.memory.update('memory_id');\n\nconsole.log(memory.code);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/memory/{memory_id}',
    httpMethod: 'delete',
    summary: 'Delete Memory V1',
    description:
      "Delete a memory item by ID.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')",
    stainlessPath: '(resource) memory > (method) delete',
    qualified: 'client.memory.delete',
    params: ['memory_id: string;', 'skip_parse?: boolean;'],
    response:
      '{ code?: number; deletion_status?: { holographic?: boolean; neo4j?: boolean; parse?: boolean; pinecone?: boolean; qdrant?: boolean; }; details?: object; error?: string; memoryId?: string; message?: string; objectId?: string; status?: string; }',
    markdown:
      "## delete\n\n`client.memory.delete(memory_id: string, skip_parse?: boolean): { code?: number; deletion_status?: object; details?: object; error?: string; memoryId?: string; message?: string; objectId?: string; status?: string; }`\n\n**delete** `/v1/memory/{memory_id}`\n\nDelete a memory item by ID.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n\n### Parameters\n\n- `memory_id: string`\n\n- `skip_parse?: boolean`\n  Skip Parse Server deletion\n\n### Returns\n\n- `{ code?: number; deletion_status?: { holographic?: boolean; neo4j?: boolean; parse?: boolean; pinecone?: boolean; qdrant?: boolean; }; details?: object; error?: string; memoryId?: string; message?: string; objectId?: string; status?: string; }`\n\n  - `code?: number`\n  - `deletion_status?: { holographic?: boolean; neo4j?: boolean; parse?: boolean; pinecone?: boolean; qdrant?: boolean; }`\n  - `details?: object`\n  - `error?: string`\n  - `memoryId?: string`\n  - `message?: string`\n  - `objectId?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst memory = await client.memory.delete('memory_id');\n\nconsole.log(memory);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/memory/$MEMORY_ID \\\n    -X DELETE \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'memory.delete',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nmemory = client.memory.delete(\n    memory_id="memory_id",\n)\nprint(memory.code)',
      },
      typescript: {
        method: 'client.memory.delete',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst memory = await client.memory.delete('memory_id');\n\nconsole.log(memory.code);",
      },
    },
  },
  {
    name: 'delete_all',
    endpoint: '/v1/memory/all',
    httpMethod: 'delete',
    summary: 'Delete All Memories V1',
    description:
      "Delete all memory items for a user.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **User Resolution**:\n    - If only API key is provided: deletes memories for the developer\n    - If user_id or external_user_id is provided: resolves and deletes memories for that user\n    - Uses the same user resolution logic as other endpoints\n    \n    **Required Headers**:\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    **WARNING**: This operation cannot be undone. All memories for the resolved user will be permanently deleted.",
    stainlessPath: '(resource) memory > (method) delete_all',
    qualified: 'client.memory.deleteAll',
    params: ['external_user_id?: string;', 'skip_parse?: boolean;', 'user_id?: string;'],
    response:
      '{ batch_id?: string; code?: number; details?: object; error?: string; errors?: { error: string; index: number; code?: number; details?: object; status?: string; }[]; message?: string; status?: string; successful?: { code?: number; data?: add_memory_item[]; details?: object; error?: string; status?: string; }[]; total_content_size?: number; total_failed?: number; total_processed?: number; total_storage_size?: number; total_successful?: number; }',
    markdown:
      "## delete_all\n\n`client.memory.deleteAll(external_user_id?: string, skip_parse?: boolean, user_id?: string): { batch_id?: string; code?: number; details?: object; error?: string; errors?: batch_memory_error[]; message?: string; status?: string; successful?: add_memory_response[]; total_content_size?: number; total_failed?: number; total_processed?: number; total_storage_size?: number; total_successful?: number; }`\n\n**delete** `/v1/memory/all`\n\nDelete all memory items for a user.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **User Resolution**:\n    - If only API key is provided: deletes memories for the developer\n    - If user_id or external_user_id is provided: resolves and deletes memories for that user\n    - Uses the same user resolution logic as other endpoints\n    \n    **Required Headers**:\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    **WARNING**: This operation cannot be undone. All memories for the resolved user will be permanently deleted.\n\n### Parameters\n\n- `external_user_id?: string`\n  Optional external user ID to resolve and delete memories for\n\n- `skip_parse?: boolean`\n  Skip Parse Server deletion\n\n- `user_id?: string`\n  Optional user ID to delete memories for (if not provided, uses authenticated user)\n\n### Returns\n\n- `{ batch_id?: string; code?: number; details?: object; error?: string; errors?: { error: string; index: number; code?: number; details?: object; status?: string; }[]; message?: string; status?: string; successful?: { code?: number; data?: add_memory_item[]; details?: object; error?: string; status?: string; }[]; total_content_size?: number; total_failed?: number; total_processed?: number; total_storage_size?: number; total_successful?: number; }`\n\n  - `batch_id?: string`\n  - `code?: number`\n  - `details?: object`\n  - `error?: string`\n  - `errors?: { error: string; index: number; code?: number; details?: object; status?: string; }[]`\n  - `message?: string`\n  - `status?: string`\n  - `successful?: { code?: number; data?: { createdAt: string; memoryId: string; objectId: string; memoryChunkIds?: string[]; }[]; details?: object; error?: string; status?: string; }[]`\n  - `total_content_size?: number`\n  - `total_failed?: number`\n  - `total_processed?: number`\n  - `total_storage_size?: number`\n  - `total_successful?: number`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst batchMemoryResponse = await client.memory.deleteAll();\n\nconsole.log(batchMemoryResponse);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/memory/all \\\n    -X DELETE \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'memory.delete_all',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nbatch_memory_response = client.memory.delete_all()\nprint(batch_memory_response.batch_id)',
      },
      typescript: {
        method: 'client.memory.deleteAll',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst batchMemoryResponse = await client.memory.deleteAll();\n\nconsole.log(batchMemoryResponse.batch_id);",
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v1/memory/{memory_id}',
    httpMethod: 'get',
    summary: 'Get Memory V1',
    description:
      "Retrieve a memory item by ID.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')",
    stainlessPath: '(resource) memory > (method) get',
    qualified: 'client.memory.get',
    params: [
      'memory_id: string;',
      'exclude_flagged?: boolean;',
      'max_risk?: string;',
      'require_consent?: boolean;',
    ],
    response:
      '{ code?: number; data?: { memories: memory[]; nodes: object[]; schemas_used?: string[]; }; details?: object; error?: string; search_id?: string; status?: string; }',
    markdown:
      "## get\n\n`client.memory.get(memory_id: string, exclude_flagged?: boolean, max_risk?: string, require_consent?: boolean): { code?: number; data?: search_result; details?: object; error?: string; search_id?: string; status?: string; }`\n\n**get** `/v1/memory/{memory_id}`\n\nRetrieve a memory item by ID.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n\n### Parameters\n\n- `memory_id: string`\n\n- `exclude_flagged?: boolean`\n  If true, return 404 if the memory has risk='flagged'. Filters out flagged content.\n\n- `max_risk?: string`\n  Maximum risk level allowed. Values: 'none', 'sensitive', 'flagged'. If memory exceeds this, return 404.\n\n- `require_consent?: boolean`\n  If true, return 404 if the memory has consent='none'. Ensures only consented memories are returned.\n\n### Returns\n\n- `{ code?: number; data?: { memories: memory[]; nodes: object[]; schemas_used?: string[]; }; details?: object; error?: string; search_id?: string; status?: string; }`\n\n  - `code?: number`\n  - `data?: { memories: { id: string; acl: object; content: string; type: string; user_id: string; category?: string; context?: context_item[]; conversation_id?: string; createdAt?: string; current_step?: string; customMetadata?: object; embedding?: number[]; embedding_int8?: number[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; file_url?: string; filename?: string; hierarchical_structures?: string; location?: string; metadata?: string | object; metrics?: object; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; page?: string; page_number?: number; popularity_score?: number; recency_score?: number; relevance_score?: number; reranker_confidence?: number; reranker_score?: number; reranker_type?: string; role?: string; role_read_access?: string[]; role_write_access?: string[]; similarity_score?: number; source_document_id?: string; source_message_id?: string; source_type?: string; source_url?: string; steps?: string[]; tags?: string[]; title?: string; topics?: string[]; total_pages?: number; totalProcessingCost?: number; updatedAt?: string; user_read_access?: string[]; user_write_access?: string[]; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }[]; nodes: { label: string; properties: object; schema_id?: string; }[]; schemas_used?: string[]; }`\n  - `details?: object`\n  - `error?: string`\n  - `search_id?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst searchResponse = await client.memory.get('memory_id');\n\nconsole.log(searchResponse);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/memory/$MEMORY_ID \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'memory.get',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nsearch_response = client.memory.get(\n    memory_id="memory_id",\n)\nprint(search_response.search_id)',
      },
      typescript: {
        method: 'client.memory.get',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst searchResponse = await client.memory.get('memory_id');\n\nconsole.log(searchResponse.search_id);",
      },
    },
  },
  {
    name: 'add_batch',
    endpoint: '/v1/memory/batch',
    httpMethod: 'post',
    summary: 'Add Memory Batch V1',
    description:
      "Add multiple memory items in a batch with size validation and background processing.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    The API validates individual memory content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).",
    stainlessPath: '(resource) memory > (method) add_batch',
    qualified: 'client.memory.addBatch',
    params: [
      "memories: { content: string; context?: { content: string; role: 'user' | 'assistant'; }[]; external_user_id?: string; graph_generation?: { auto?: auto_graph_generation; manual?: manual_graph_generation; mode?: 'auto' | 'manual'; }; link_to?: string | string[] | object; memory_policy?: { acl?: acl_config; consent?: 'explicit' | 'implicit' | 'terms' | 'none'; edge_constraints?: edge_constraint_input[]; mode?: 'auto' | 'manual'; node_constraints?: node_constraint_input[]; nodes?: node_spec[]; relationships?: relationship_spec[]; risk?: 'none' | 'sensitive' | 'flagged'; schema_id?: string; }; metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }; namespace_id?: string; organization_id?: string; relationships_json?: { relation_type: string; metadata?: object; related_item_id?: string; related_item_type?: string; relationship_type?: 'previous_memory_item_id' | 'all_previous_memory_items' | 'link_to_id'; }[]; type?: 'text' | 'code_snippet' | 'document'; user_id?: string; }[];",
      'enable_holographic?: boolean;',
      'frequency_schema_id?: string;',
      'skip_background_processing?: boolean;',
      'batch_size?: number;',
      'external_user_id?: string;',
      "graph_generation?: { auto?: { property_overrides?: object[]; schema_id?: string; }; manual?: { nodes: object[]; relationships?: object[]; }; mode?: 'auto' | 'manual'; };",
      'link_to?: string | string[] | object;',
      "memory_policy?: { acl?: { read?: string[]; write?: string[]; }; consent?: 'explicit' | 'implicit' | 'terms' | 'none'; edge_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; direction?: 'outgoing' | 'incoming' | 'both'; edge_type?: string; link_only?: boolean; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; source_type?: string; target_type?: string; when?: object; }[]; mode?: 'auto' | 'manual'; node_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; link_only?: boolean; node_type?: string; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; when?: object; }[]; nodes?: { id: string; type: string; properties?: object; }[]; relationships?: { source: string; target: string; type: string; properties?: object; }[]; risk?: 'none' | 'sensitive' | 'flagged'; schema_id?: string; };",
      'namespace_id?: string;',
      'organization_id?: string;',
      'user_id?: string;',
      'webhook_secret?: string;',
      'webhook_url?: string;',
    ],
    response:
      '{ batch_id?: string; code?: number; details?: object; error?: string; errors?: { error: string; index: number; code?: number; details?: object; status?: string; }[]; message?: string; status?: string; successful?: { code?: number; data?: add_memory_item[]; details?: object; error?: string; status?: string; }[]; total_content_size?: number; total_failed?: number; total_processed?: number; total_storage_size?: number; total_successful?: number; }',
    markdown:
      "## add_batch\n\n`client.memory.addBatch(memories: { content: string; context?: context_item[]; external_user_id?: string; graph_generation?: graph_generation; link_to?: string | string[] | object; memory_policy?: memory_policy; metadata?: memory_metadata; namespace_id?: string; organization_id?: string; relationships_json?: relationship_item[]; type?: memory_type; user_id?: string; }[], enable_holographic?: boolean, frequency_schema_id?: string, skip_background_processing?: boolean, batch_size?: number, external_user_id?: string, graph_generation?: { auto?: auto_graph_generation; manual?: manual_graph_generation; mode?: 'auto' | 'manual'; }, link_to?: string | string[] | object, memory_policy?: { acl?: acl_config; consent?: 'explicit' | 'implicit' | 'terms' | 'none'; edge_constraints?: edge_constraint_input[]; mode?: 'auto' | 'manual'; node_constraints?: node_constraint_input[]; nodes?: node_spec[]; relationships?: relationship_spec[]; risk?: 'none' | 'sensitive' | 'flagged'; schema_id?: string; }, namespace_id?: string, organization_id?: string, user_id?: string, webhook_secret?: string, webhook_url?: string): { batch_id?: string; code?: number; details?: object; error?: string; errors?: batch_memory_error[]; message?: string; status?: string; successful?: add_memory_response[]; total_content_size?: number; total_failed?: number; total_processed?: number; total_storage_size?: number; total_successful?: number; }`\n\n**post** `/v1/memory/batch`\n\nAdd multiple memory items in a batch with size validation and background processing.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n    \n    The API validates individual memory content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).\n\n### Parameters\n\n- `memories: { content: string; context?: { content: string; role: 'user' | 'assistant'; }[]; external_user_id?: string; graph_generation?: { auto?: auto_graph_generation; manual?: manual_graph_generation; mode?: 'auto' | 'manual'; }; link_to?: string | string[] | object; memory_policy?: { acl?: acl_config; consent?: 'explicit' | 'implicit' | 'terms' | 'none'; edge_constraints?: edge_constraint_input[]; mode?: 'auto' | 'manual'; node_constraints?: node_constraint_input[]; nodes?: node_spec[]; relationships?: relationship_spec[]; risk?: 'none' | 'sensitive' | 'flagged'; schema_id?: string; }; metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }; namespace_id?: string; organization_id?: string; relationships_json?: { relation_type: string; metadata?: object; related_item_id?: string; related_item_type?: string; relationship_type?: 'previous_memory_item_id' | 'all_previous_memory_items' | 'link_to_id'; }[]; type?: 'text' | 'code_snippet' | 'document'; user_id?: string; }[]`\n  List of memory items to add in batch\n\n- `enable_holographic?: boolean`\n  If True, applies holographic neural transforms and stores in holographic collection\n\n- `frequency_schema_id?: string`\n  Frequency schema for holographic embedding (e.g. 'cosqa', 'scifact'). Required when enable_holographic=True. Call GET /v1/frequencies to see available schemas.\n\n- `skip_background_processing?: boolean`\n  If True, skips adding background tasks for processing\n\n- `batch_size?: number`\n  Number of items to process in parallel\n\n- `external_user_id?: string`\n  Your application's user identifier for all memories in the batch. This is the primary way to identify users. Papr will automatically resolve or create internal users as needed.\n\n- `graph_generation?: { auto?: { property_overrides?: object[]; schema_id?: string; }; manual?: { nodes: object[]; relationships?: object[]; }; mode?: 'auto' | 'manual'; }`\n  Graph generation configuration\n  - `auto?: { property_overrides?: { nodeLabel: string; set: object; match?: object; }[]; schema_id?: string; }`\n    AI-powered graph generation with optional guidance\n  - `manual?: { nodes: { id: string; label: string; properties: object; }[]; relationships?: { relationship_type: string; source_node_id: string; target_node_id: string; properties?: object; }[]; }`\n    Complete manual control over graph structure\n  - `mode?: 'auto' | 'manual'`\n    Graph generation mode: 'auto' (AI-powered) or 'manual' (exact specification)\n\n- `link_to?: string | string[] | object`\n  Shorthand DSL for node/edge constraints. Expands to memory_policy.node_constraints and edge_constraints. Formats: - String: 'Task:title' (semantic match on Task.title) - List: ['Task:title', 'Person:email'] (multiple constraints) - Dict: {'Task:title': {'set': {...}}} (with options) Syntax: - Node: 'Type:property', 'Type:prop=value' (exact), 'Type:prop~value' (semantic) - Edge: 'Source->EDGE->Target:property' (arrow syntax) - Via: 'Type.via(EDGE->Target:prop)' (relationship traversal) - Special: '$this', '$previous', '$context:N' Example: 'SecurityBehavior->MITIGATES->TacticDef:name' with {'create': 'never'}\n\n- `memory_policy?: { acl?: { read?: string[]; write?: string[]; }; consent?: 'explicit' | 'implicit' | 'terms' | 'none'; edge_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; direction?: 'outgoing' | 'incoming' | 'both'; edge_type?: string; link_only?: boolean; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; source_type?: string; target_type?: string; when?: object; }[]; mode?: 'auto' | 'manual'; node_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; link_only?: boolean; node_type?: string; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; when?: object; }[]; nodes?: { id: string; type: string; properties?: object; }[]; relationships?: { source: string; target: string; type: string; properties?: object; }[]; risk?: 'none' | 'sensitive' | 'flagged'; schema_id?: string; }`\n  Unified memory processing policy.\n\nThis is the SINGLE source of truth for how a memory should be processed,\ncombining graph generation control AND OMO (Open Memory Object) safety standards.\n\n**Graph Generation Modes:**\n- auto: LLM extracts entities freely (default)\n- manual: Developer provides exact nodes (no LLM extraction)\n\n**OMO Safety Standards:**\n- consent: How data owner allowed storage (explicit, implicit, terms, none)\n- risk: Safety assessment (none, sensitive, flagged)\n- acl: Access control list for read/write permissions\n\n**Schema Integration:**\n- schema_id: Reference a schema that may have its own default memory_policy\n- Schema-level policies are merged with request-level (request takes precedence)\n  - `acl?: { read?: string[]; write?: string[]; }`\n    Simplified Access Control List configuration.\n\nAligned with Open Memory Object (OMO) standard.\nSee: https://github.com/anthropics/open-memory-object\n\n**Supported Entity Prefixes:**\n\n| Prefix | Description | Validation |\n|--------|-------------|------------|\n| `user:` | Internal Papr user ID | Validated against Parse users |\n| `external_user:` | Your app's user ID | Not validated (your responsibility) |\n| `organization:` | Organization ID | Validated against your organizations |\n| `namespace:` | Namespace ID | Validated against your namespaces |\n| `workspace:` | Workspace ID | Validated against your workspaces |\n| `role:` | Parse role ID | Validated against your roles |\n\n**Examples:**\n```python\nacl = ACLConfig(\n    read=[\"external_user:alice_123\", \"organization:org_acme\"],\n    write=[\"external_user:alice_123\"]\n)\n```\n\n**Validation Rules:**\n- Internal entities (user, organization, namespace, workspace, role) are validated\n- External entities (external_user) are NOT validated - your app is responsible\n- Invalid internal entities will return an error\n- Unprefixed values default to `external_user:` for backwards compatibility\n  - `consent?: 'explicit' | 'implicit' | 'terms' | 'none'`\n    How the data owner allowed this memory to be stored/used. 'explicit': User explicitly agreed. 'implicit': Inferred from context (default). 'terms': Covered by Terms of Service. 'none': No consent - graph extraction will be SKIPPED.\n  - `edge_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; direction?: 'outgoing' | 'incoming' | 'both'; edge_type?: string; link_only?: boolean; on_miss?: 'create' | 'ignore' | 'error'; search?: { mode?: 'semantic' | 'exact' | 'fuzzy'; properties?: object[]; threshold?: number; via_relationship?: object[]; }; set?: object; source_type?: string; target_type?: string; when?: object; }[]`\n    Rules for how LLM-extracted edges/relationships should be created/handled. Used in 'auto' mode when present. Controls: - create: 'auto' (create target if not found) or 'never' (controlled vocabulary) - search: How to find existing target nodes - set: Edge property values (exact or auto-extracted) - source_type/target_type: Filter by connected node types Example: {edge_type: 'MITIGATES', create: 'never', search: {properties: ['name']}}\n  - `mode?: 'auto' | 'manual'`\n    How to generate graph from this memory. 'auto': LLM extracts entities freely. 'manual': You provide exact nodes (no LLM). Note: 'structured' is accepted as deprecated alias for 'manual'.\n  - `node_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; link_only?: boolean; node_type?: string; on_miss?: 'create' | 'ignore' | 'error'; search?: { mode?: 'semantic' | 'exact' | 'fuzzy'; properties?: object[]; threshold?: number; via_relationship?: object[]; }; set?: object; when?: object; }[]`\n    Rules for how LLM-extracted nodes should be created/updated. Used in 'auto' mode when present. Controls creation policy, property forcing, and merge behavior.\n  - `nodes?: { id: string; type: string; properties?: object; }[]`\n    For manual mode: Exact nodes to create (no LLM extraction). Required when mode='manual'. Each node needs id, type, and properties.\n  - `relationships?: { source: string; target: string; type: string; properties?: object; }[]`\n    Relationships between nodes. Supports special placeholders: '$this' = the Memory node being created, '$previous' = the user's most recent memory. Examples: {source: '$this', target: '$previous', type: 'FOLLOWS'} links to previous memory. {source: '$this', target: 'mem_abc', type: 'REFERENCES'} links to specific memory.\n  - `risk?: 'none' | 'sensitive' | 'flagged'`\n    Safety assessment for this memory. 'none': Safe content (default). 'sensitive': Contains PII or sensitive info. 'flagged': Requires review - ACL will be restricted to owner only.\n  - `schema_id?: string`\n    Reference a UserGraphSchema by ID. The schema's memory_policy (if defined) will be used as defaults, with this request's settings taking precedence.\n\n- `namespace_id?: string`\n  Optional namespace ID for multi-tenant batch memory scoping. When provided, all memories in the batch are associated with this namespace.\n\n- `organization_id?: string`\n  DEPRECATED - Internal only. Auto-populated from API key scope. Do not set manually. The organization is resolved automatically from the API key's associated organization.\n\n- `user_id?: string`\n  DEPRECATED: Use 'external_user_id' instead. Internal Papr Parse user ID.\n\n- `webhook_secret?: string`\n  Optional secret key for webhook authentication. If provided, will be included in the webhook request headers as 'X-Webhook-Secret'.\n\n- `webhook_url?: string`\n  Optional webhook URL to notify when batch processing is complete. The webhook will receive a POST request with batch completion details.\n\n### Returns\n\n- `{ batch_id?: string; code?: number; details?: object; error?: string; errors?: { error: string; index: number; code?: number; details?: object; status?: string; }[]; message?: string; status?: string; successful?: { code?: number; data?: add_memory_item[]; details?: object; error?: string; status?: string; }[]; total_content_size?: number; total_failed?: number; total_processed?: number; total_storage_size?: number; total_successful?: number; }`\n\n  - `batch_id?: string`\n  - `code?: number`\n  - `details?: object`\n  - `error?: string`\n  - `errors?: { error: string; index: number; code?: number; details?: object; status?: string; }[]`\n  - `message?: string`\n  - `status?: string`\n  - `successful?: { code?: number; data?: { createdAt: string; memoryId: string; objectId: string; memoryChunkIds?: string[]; }[]; details?: object; error?: string; status?: string; }[]`\n  - `total_content_size?: number`\n  - `total_failed?: number`\n  - `total_processed?: number`\n  - `total_storage_size?: number`\n  - `total_successful?: number`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst batchMemoryResponse = await client.memory.addBatch({ memories: [{ content: 'Meeting notes from the product planning session' }, { content: 'Follow-up tasks from the planning meeting' }] });\n\nconsole.log(batchMemoryResponse);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/memory/batch \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "memories": [\n            {\n              "content": "Meeting notes from the product planning session",\n              "metadata": {\n                "createdAt": "2024-03-21T10:00:00Z",\n                "emoji tags": [\n                  "string"\n                ],\n                "emotion tags": [\n                  "string"\n                ],\n                "topics": [\n                  "string"\n                ]\n              },\n              "type": "text"\n            },\n            {\n              "content": "Follow-up tasks from the planning meeting",\n              "metadata": {\n                "createdAt": "2024-03-21T11:00:00Z",\n                "emoji tags": [\n                  "string"\n                ],\n                "emotion tags": [\n                  "string"\n                ],\n                "topics": [\n                  "string"\n                ]\n              },\n              "type": "text"\n            }\n          ]\n        }\'',
      },
      python: {
        method: 'memory.add_batch',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nbatch_memory_response = client.memory.add_batch(\n    memories=[{\n        "content": "Meeting notes from the product planning session"\n    }, {\n        "content": "Follow-up tasks from the planning meeting"\n    }],\n)\nprint(batch_memory_response.batch_id)',
      },
      typescript: {
        method: 'client.memory.addBatch',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst batchMemoryResponse = await client.memory.addBatch({\n  memories: [\n    { content: 'Meeting notes from the product planning session' },\n    { content: 'Follow-up tasks from the planning meeting' },\n  ],\n});\n\nconsole.log(batchMemoryResponse.batch_id);",
      },
    },
  },
  {
    name: 'search',
    endpoint: '/v1/memory/search',
    httpMethod: 'post',
    summary: 'Search V1',
    description:
      'Search through memories with authentication required.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Response Format Options**:\n    Choose between standard JSON or TOON (Token-Oriented Object Notation) format:\n    - **JSON (default)**: Standard JSON response format\n    - **TOON**: Optimized format achieving 30-60% token reduction for LLM contexts\n      - Use `response_format=toon` query parameter\n      - Returns `text/plain` with TOON-formatted content\n      - Ideal for LLM integrations to reduce API costs and latency\n      - Maintains semantic clarity while minimizing token usage\n      - Example: `/v1/memory/search?response_format=toon`\n    \n    **Custom Schema Support**:\n    This endpoint supports both system-defined and custom user-defined node types:\n    - **System nodes**: Memory, Person, Company, Project, Task, Insight, Meeting, Opportunity, Code\n    - **Custom nodes**: Defined by developers via UserGraphSchema (e.g., Developer, Product, Customer, Function)\n    \n    When custom schema nodes are returned:\n    - Each custom node includes a `schema_id` field referencing the UserGraphSchema\n    - The response includes a `schemas_used` array listing all schema IDs used\n    - Use `GET /v1/schemas/{schema_id}` to retrieve full schema definitions including:\n      - Node type definitions and properties\n      - Relationship type definitions and constraints\n      - Validation rules and requirements\n    \n    **Recommended Headers**:\n    ```\n    Accept-Encoding: gzip\n    ```\n    \n    The API supports response compression for improved performance. Responses larger than 1KB will be automatically compressed when this header is present.\n    \n    **HIGHLY RECOMMENDED SETTINGS FOR BEST RESULTS:**\n    - Set `enable_agentic_graph: true` for intelligent, context-aware search that can understand ambiguous references\n    - Use `max_memories: 15-20` for comprehensive memory coverage\n    - Use `max_nodes: 10-15` for comprehensive graph entity relationships\n    - Use `response_format: toon` when integrating with LLMs to reduce token costs by 30-60%\n    \n    **Agentic Graph Benefits:**\n    When enabled, the system can understand vague references by first identifying specific entities from your memory graph, then performing targeted searches. For example:\n    - "customer feedback" → identifies your customers first, then finds their specific feedback\n    - "project issues" → identifies your projects first, then finds related issues\n    - "team meeting notes" → identifies your team members first, then finds meeting notes\n    - "code functions" → identifies your functions first, then finds related code\n    \n    **Role-Based Memory Filtering:**\n    Filter memories by role and category using metadata fields:\n    - `metadata.role`: Filter by "user" or "assistant" \n    - `metadata.category`: Filter by category (user: preference, task, goal, facts, context | assistant: skills, learning)\n    \n    **User Resolution Precedence:**\n    - If both user_id and external_user_id are provided, user_id takes precedence.\n    - If only external_user_id is provided, it will be resolved to the internal user.\n    - If neither is provided, the authenticated user is used.',
    stainlessPath: '(resource) memory > (method) search',
    qualified: 'client.memory.search',
    params: [
      'query: string;',
      'max_memories?: number;',
      'max_nodes?: number;',
      "response_format?: 'json' | 'toon';",
      'enable_agentic_graph?: boolean;',
      'external_user_id?: string;',
      "holographic_config?: { enabled?: boolean; frequency_schema_id?: string; hcond_boost_factor?: number; hcond_boost_threshold?: number; hcond_penalty_factor?: number; scoring_method?: string; search_mode?: 'disabled' | 'integrated' | 'post_search'; };",
      "metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; };",
      'namespace_id?: string;',
      "omo_filter?: { exclude_consent?: 'explicit' | 'implicit' | 'terms' | 'none'[]; exclude_flagged?: boolean; exclude_risk?: 'none' | 'sensitive' | 'flagged'[]; max_risk?: 'none' | 'sensitive' | 'flagged'; min_consent?: 'explicit' | 'implicit' | 'terms' | 'none'; require_consent?: boolean; };",
      'organization_id?: string;',
      'rank_results?: boolean;',
      "reranking_config?: { reranking_enabled?: boolean; reranking_model?: string; reranking_provider?: 'openai' | 'cohere'; };",
      'schema_id?: string;',
      'search_acl?: { read?: string[]; write?: string[]; };',
      'search_override?: { pattern: { relationship_type: string; source_label: string; target_label: string; direction?: string; }; filters?: { node_type: string; operator: string; property_name: string; value: string | string[] | number | boolean; }[]; return_properties?: string[]; };',
      'user_id?: string;',
      'Accept-Encoding?: string;',
    ],
    response:
      '{ code?: number; data?: { memories: memory[]; nodes: object[]; schemas_used?: string[]; }; details?: object; error?: string; search_id?: string; status?: string; }',
    markdown:
      "## search\n\n`client.memory.search(query: string, max_memories?: number, max_nodes?: number, response_format?: 'json' | 'toon', enable_agentic_graph?: boolean, external_user_id?: string, holographic_config?: { enabled?: boolean; frequency_schema_id?: string; hcond_boost_factor?: number; hcond_boost_threshold?: number; hcond_penalty_factor?: number; scoring_method?: string; search_mode?: 'disabled' | 'integrated' | 'post_search'; }, metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }, namespace_id?: string, omo_filter?: { exclude_consent?: 'explicit' | 'implicit' | 'terms' | 'none'[]; exclude_flagged?: boolean; exclude_risk?: 'none' | 'sensitive' | 'flagged'[]; max_risk?: 'none' | 'sensitive' | 'flagged'; min_consent?: 'explicit' | 'implicit' | 'terms' | 'none'; require_consent?: boolean; }, organization_id?: string, rank_results?: boolean, reranking_config?: { reranking_enabled?: boolean; reranking_model?: string; reranking_provider?: 'openai' | 'cohere'; }, schema_id?: string, search_acl?: { read?: string[]; write?: string[]; }, search_override?: { pattern: { relationship_type: string; source_label: string; target_label: string; direction?: string; }; filters?: { node_type: string; operator: string; property_name: string; value: string | string[] | number | boolean; }[]; return_properties?: string[]; }, user_id?: string, Accept-Encoding?: string): { code?: number; data?: search_result; details?: object; error?: string; search_id?: string; status?: string; }`\n\n**post** `/v1/memory/search`\n\nSearch through memories with authentication required.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Response Format Options**:\n    Choose between standard JSON or TOON (Token-Oriented Object Notation) format:\n    - **JSON (default)**: Standard JSON response format\n    - **TOON**: Optimized format achieving 30-60% token reduction for LLM contexts\n      - Use `response_format=toon` query parameter\n      - Returns `text/plain` with TOON-formatted content\n      - Ideal for LLM integrations to reduce API costs and latency\n      - Maintains semantic clarity while minimizing token usage\n      - Example: `/v1/memory/search?response_format=toon`\n    \n    **Custom Schema Support**:\n    This endpoint supports both system-defined and custom user-defined node types:\n    - **System nodes**: Memory, Person, Company, Project, Task, Insight, Meeting, Opportunity, Code\n    - **Custom nodes**: Defined by developers via UserGraphSchema (e.g., Developer, Product, Customer, Function)\n    \n    When custom schema nodes are returned:\n    - Each custom node includes a `schema_id` field referencing the UserGraphSchema\n    - The response includes a `schemas_used` array listing all schema IDs used\n    - Use `GET /v1/schemas/{schema_id}` to retrieve full schema definitions including:\n      - Node type definitions and properties\n      - Relationship type definitions and constraints\n      - Validation rules and requirements\n    \n    **Recommended Headers**:\n    ```\n    Accept-Encoding: gzip\n    ```\n    \n    The API supports response compression for improved performance. Responses larger than 1KB will be automatically compressed when this header is present.\n    \n    **HIGHLY RECOMMENDED SETTINGS FOR BEST RESULTS:**\n    - Set `enable_agentic_graph: true` for intelligent, context-aware search that can understand ambiguous references\n    - Use `max_memories: 15-20` for comprehensive memory coverage\n    - Use `max_nodes: 10-15` for comprehensive graph entity relationships\n    - Use `response_format: toon` when integrating with LLMs to reduce token costs by 30-60%\n    \n    **Agentic Graph Benefits:**\n    When enabled, the system can understand vague references by first identifying specific entities from your memory graph, then performing targeted searches. For example:\n    - \"customer feedback\" → identifies your customers first, then finds their specific feedback\n    - \"project issues\" → identifies your projects first, then finds related issues\n    - \"team meeting notes\" → identifies your team members first, then finds meeting notes\n    - \"code functions\" → identifies your functions first, then finds related code\n    \n    **Role-Based Memory Filtering:**\n    Filter memories by role and category using metadata fields:\n    - `metadata.role`: Filter by \"user\" or \"assistant\" \n    - `metadata.category`: Filter by category (user: preference, task, goal, facts, context | assistant: skills, learning)\n    \n    **User Resolution Precedence:**\n    - If both user_id and external_user_id are provided, user_id takes precedence.\n    - If only external_user_id is provided, it will be resolved to the internal user.\n    - If neither is provided, the authenticated user is used.\n\n### Parameters\n\n- `query: string`\n  Detailed search query describing what you're looking for. For best results, write 2-3 sentences that include specific details, context, and time frame. Examples: 'Find recurring customer complaints about API performance from the last month. Focus on issues where customers specifically mentioned timeout errors or slow response times in their conversations.' 'What are the main issues and blockers in my current projects? Focus on technical challenges and timeline impacts.' 'Find insights about team collaboration and communication patterns from recent meetings and discussions.'\n\n- `max_memories?: number`\n  HIGHLY RECOMMENDED: Maximum number of memories to return. Use at least 15-20 for comprehensive results. Lower values (5-10) may miss relevant information. Default is 20 for optimal coverage.\n\n- `max_nodes?: number`\n  HIGHLY RECOMMENDED: Maximum number of neo nodes to return. Use at least 10-15 for comprehensive graph results. Lower values may miss important entity relationships. Default is 15 for optimal coverage.\n\n- `response_format?: 'json' | 'toon'`\n  Response format: 'json' (default) or 'toon' (Token-Oriented Object Notation for 30-60% token reduction in LLM contexts)\n\n- `enable_agentic_graph?: boolean`\n  HIGHLY RECOMMENDED: Enable agentic graph search for intelligent, context-aware results. When enabled, the system can understand ambiguous references by first identifying specific entities from your memory graph, then performing targeted searches. Examples: 'customer feedback' → identifies your customers first, then finds their specific feedback; 'project issues' → identifies your projects first, then finds related issues; 'team meeting notes' → identifies team members first, then finds meeting notes. This provides much more relevant and comprehensive results. Set to false only if you need faster, simpler keyword-based search.\n\n- `external_user_id?: string`\n  Your application's user identifier to filter search results. This is the primary way to identify users. Use this for your app's user IDs (e.g., 'user_alice_123', UUID, email).\n\n- `holographic_config?: { enabled?: boolean; frequency_schema_id?: string; hcond_boost_factor?: number; hcond_boost_threshold?: number; hcond_penalty_factor?: number; scoring_method?: string; search_mode?: 'disabled' | 'integrated' | 'post_search'; }`\n  Configuration for holographic neural embedding transforms and H-COND scoring.\n\nNeural holographic embeddings use 13 brain-inspired frequency bands to encode\nhierarchical semantic metadata alongside the base embedding. H-COND (Holographic\nCONDitional) scoring uses phase alignment for improved relevance ranking.\n  - `enabled?: boolean`\n    Whether to enable holographic embedding transforms\n  - `frequency_schema_id?: string`\n    Frequency schema for holographic scoring. Use full ID (e.g. 'code_search:cosqa:2.0.0') or shorthand (e.g. 'cosqa'). Call GET /v1/frequencies to see available schemas and shortcuts.\n  - `hcond_boost_factor?: number`\n    Maximum boost to add for high alignment (0.0-0.5)\n  - `hcond_boost_threshold?: number`\n    Phase alignment threshold above which to apply boost (0.0-1.0)\n  - `hcond_penalty_factor?: number`\n    Maximum penalty for low alignment (0.0-0.5)\n  - `scoring_method?: string`\n    Scoring method for holographic search results. Default: 'egr_rerank' (highest accuracy, requires GPU). Options include: baseline, caesar8, egr_rerank, and 160+ others. If null, uses the schema's default_scoring_method.\n  - `search_mode?: 'disabled' | 'integrated' | 'post_search'`\n    Search mode: 'disabled' (off), 'integrated' (search transformed embeddings), 'post_search' (fetch then rerank with H-COND)\n\n- `metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }`\n  Metadata for memory request\n  - `acl?: object`\n    DEPRECATED: Use 'memory_policy.acl' at request level instead. Format: {'read': [...], 'write': [...]}.\n  - `assistantMessage?: string`\n  - `category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'`\n    Memory category based on role. For users: preference, task, goal, fact, context. For assistants: skills, learning, task, goal, fact, context.\n  - `consent?: string`\n    DEPRECATED: Use 'memory_policy.consent' at request level instead. Values: 'explicit', 'implicit' (default), 'terms', 'none'.\n  - `conversationId?: string`\n  - `createdAt?: string`\n    ISO datetime when the memory was created\n  - `customMetadata?: object`\n    Optional object for arbitrary custom metadata fields. Only string, number, boolean, or list of strings allowed. Nested dicts are not allowed.\n  - `emoji tags?: string[]`\n  - `emotion tags?: string[]`\n  - `external_user_id?: string`\n    DEPRECATED: Use 'external_user_id' at request level instead. This field will be removed in v2.\n  - `external_user_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `external_user_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `goalClassificationScores?: number[]`\n  - `hierarchical_structures?: string | object[]`\n    Hierarchical structures to enable navigation from broad topics to specific ones\n  - `location?: string`\n  - `namespace_id?: string`\n    DEPRECATED: Use 'namespace_id' at request level instead. This field will be removed in v2.\n  - `namespace_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `namespace_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `organization_id?: string`\n    DEPRECATED: Use 'organization_id' at request level instead. This field will be removed in v2.\n  - `organization_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `organization_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `pageId?: string`\n  - `post?: string`\n  - `relatedGoals?: string[]`\n  - `relatedSteps?: string[]`\n  - `relatedUseCases?: string[]`\n  - `risk?: string`\n    DEPRECATED: Use 'memory_policy.risk' at request level instead. Values: 'none' (default), 'sensitive', 'flagged'.\n  - `role?: 'user' | 'assistant'`\n    Role of the message sender\n  - `role_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `role_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `sessionId?: string`\n  - `sourceType?: string`\n  - `sourceUrl?: string`\n  - `stepClassificationScores?: number[]`\n  - `topics?: string[]`\n  - `upload_id?: string`\n    Upload ID for document processing workflows\n  - `useCaseClassificationScores?: number[]`\n  - `user_id?: string`\n    DEPRECATED: Use 'external_user_id' at request level instead. This field will be removed in v2.\n  - `user_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `user_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `userMessage?: string`\n  - `workspace_id?: string`\n  - `workspace_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `workspace_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n\n- `namespace_id?: string`\n  Optional namespace ID for multi-tenant search scoping. When provided, search is scoped to memories within this namespace.\n\n- `omo_filter?: { exclude_consent?: 'explicit' | 'implicit' | 'terms' | 'none'[]; exclude_flagged?: boolean; exclude_risk?: 'none' | 'sensitive' | 'flagged'[]; max_risk?: 'none' | 'sensitive' | 'flagged'; min_consent?: 'explicit' | 'implicit' | 'terms' | 'none'; require_consent?: boolean; }`\n  Filter for Open Memory Object (OMO) safety standards in search/retrieval.\n\nUse this to filter search results by consent level and/or risk level.\n  - `exclude_consent?: 'explicit' | 'implicit' | 'terms' | 'none'[]`\n    Explicitly exclude memories with these consent levels. Example: exclude_consent=['none'] filters out all memories without consent.\n  - `exclude_flagged?: boolean`\n    If true, exclude all flagged content (risk == 'flagged'). Shorthand for exclude_risk=['flagged'].\n  - `exclude_risk?: 'none' | 'sensitive' | 'flagged'[]`\n    Explicitly exclude memories with these risk levels. Example: exclude_risk=['flagged'] filters out all flagged content.\n  - `max_risk?: 'none' | 'sensitive' | 'flagged'`\n    Post-ingest safety assessment of memory content.\n\nAligned with Open Memory Object (OMO) standard.\n  - `min_consent?: 'explicit' | 'implicit' | 'terms' | 'none'`\n    How the data owner allowed this memory to be stored/used.\n\nAligned with Open Memory Object (OMO) standard.\n  - `require_consent?: boolean`\n    If true, only return memories with explicit consent (consent != 'none'). Shorthand for exclude_consent=['none'].\n\n- `organization_id?: string`\n  Optional organization ID for multi-tenant search scoping. When provided, search is scoped to memories within this organization.\n\n- `rank_results?: boolean`\n  DEPRECATED: Use 'reranking_config' instead. Whether to enable additional ranking of search results. Default is false because results are already ranked when using an LLM for search (recommended approach). Only enable this if you're not using an LLM in your search pipeline and need additional result ranking. Migration: Replace 'rank_results: true' with 'reranking_config: {reranking_enabled: true, reranking_provider: \"cohere\", reranking_model: \"rerank-v3.5\"}'\n\n- `reranking_config?: { reranking_enabled?: boolean; reranking_model?: string; reranking_provider?: 'openai' | 'cohere'; }`\n  Configuration for reranking memory search results\n  - `reranking_enabled?: boolean`\n    Whether to enable reranking of search results\n  - `reranking_model?: string`\n    Model to use for reranking. OpenAI (LLM): 'gpt-5-nano' (fast reasoning, default), 'gpt-5-mini' (better quality reasoning). Cohere (cross-encoder): 'rerank-v3.5' (latest), 'rerank-english-v3.0', 'rerank-multilingual-v3.0'\n  - `reranking_provider?: 'openai' | 'cohere'`\n    Reranking provider: 'openai' (better quality, slower) or 'cohere' (faster, optimized for reranking)\n\n- `schema_id?: string`\n  Optional user-defined schema ID to use for this search. If provided, this schema (plus system schema) will be used for query generation. If not provided, system will automatically select relevant schema based on query content.\n\n- `search_acl?: { read?: string[]; write?: string[]; }`\n  Simplified Access Control List configuration.\n\nAligned with Open Memory Object (OMO) standard.\nSee: https://github.com/anthropics/open-memory-object\n\n**Supported Entity Prefixes:**\n\n| Prefix | Description | Validation |\n|--------|-------------|------------|\n| `user:` | Internal Papr user ID | Validated against Parse users |\n| `external_user:` | Your app's user ID | Not validated (your responsibility) |\n| `organization:` | Organization ID | Validated against your organizations |\n| `namespace:` | Namespace ID | Validated against your namespaces |\n| `workspace:` | Workspace ID | Validated against your workspaces |\n| `role:` | Parse role ID | Validated against your roles |\n\n**Examples:**\n```python\nacl = ACLConfig(\n    read=[\"external_user:alice_123\", \"organization:org_acme\"],\n    write=[\"external_user:alice_123\"]\n)\n```\n\n**Validation Rules:**\n- Internal entities (user, organization, namespace, workspace, role) are validated\n- External entities (external_user) are NOT validated - your app is responsible\n- Invalid internal entities will return an error\n- Unprefixed values default to `external_user:` for backwards compatibility\n  - `read?: string[]`\n    Entity IDs that can read this memory. Format: 'prefix:id' (e.g., 'external_user:alice', 'organization:org_123'). Supported prefixes: user, external_user, organization, namespace, workspace, role. Unprefixed values treated as external_user for backwards compatibility.\n  - `write?: string[]`\n    Entity IDs that can write/modify this memory. Format: 'prefix:id' (e.g., 'external_user:alice'). Supported prefixes: user, external_user, organization, namespace, workspace, role.\n\n- `search_override?: { pattern: { relationship_type: string; source_label: string; target_label: string; direction?: string; }; filters?: { node_type: string; operator: string; property_name: string; value: string | string[] | number | boolean; }[]; return_properties?: string[]; }`\n  Complete search override specification provided by developer\n  - `pattern: { relationship_type: string; source_label: string; target_label: string; direction?: string; }`\n    Graph pattern to search for (source)-[relationship]->(target)\n  - `filters?: { node_type: string; operator: string; property_name: string; value: string | string[] | number | boolean; }[]`\n    Property filters to apply to the search pattern\n  - `return_properties?: string[]`\n    Specific properties to return. If not specified, returns all properties.\n\n- `user_id?: string`\n  DEPRECATED: Use 'external_user_id' instead. Internal Papr Parse user ID. Most developers should not use this field directly.\n\n- `Accept-Encoding?: string`\n\n### Returns\n\n- `{ code?: number; data?: { memories: memory[]; nodes: object[]; schemas_used?: string[]; }; details?: object; error?: string; search_id?: string; status?: string; }`\n\n  - `code?: number`\n  - `data?: { memories: { id: string; acl: object; content: string; type: string; user_id: string; category?: string; context?: context_item[]; conversation_id?: string; createdAt?: string; current_step?: string; customMetadata?: object; embedding?: number[]; embedding_int8?: number[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; file_url?: string; filename?: string; hierarchical_structures?: string; location?: string; metadata?: string | object; metrics?: object; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; page?: string; page_number?: number; popularity_score?: number; recency_score?: number; relevance_score?: number; reranker_confidence?: number; reranker_score?: number; reranker_type?: string; role?: string; role_read_access?: string[]; role_write_access?: string[]; similarity_score?: number; source_document_id?: string; source_message_id?: string; source_type?: string; source_url?: string; steps?: string[]; tags?: string[]; title?: string; topics?: string[]; total_pages?: number; totalProcessingCost?: number; updatedAt?: string; user_read_access?: string[]; user_write_access?: string[]; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }[]; nodes: { label: string; properties: object; schema_id?: string; }[]; schemas_used?: string[]; }`\n  - `details?: object`\n  - `error?: string`\n  - `search_id?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst searchResponse = await client.memory.search({ query: 'Find recurring customer complaints about API performance from the last month. Focus on issues that multiple customers have mentioned and any specific feature requests or workflow improvements they\\'ve suggested.' });\n\nconsole.log(searchResponse);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/memory/search \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d "{\n          \\"query\\": \\"Find recurring customer complaints about API performance from the last month. Focus on issues that multiple customers have mentioned and any specific feature requests or workflow improvements they\'ve suggested.\\",\n          \\"holographic_config\\": {\n            \\"enabled\\": true,\n            \\"frequency_schema_id\\": \\"cosqa\\",\n            \\"hcond_boost_factor\\": 0.12,\n            \\"hcond_boost_threshold\\": 0.35,\n            \\"hcond_penalty_factor\\": 0.06,\n            \\"scoring_method\\": \\"egr_rerank\\",\n            \\"search_mode\\": \\"post_search\\"\n          },\n          \\"search_override\\": {\n            \\"pattern\\": {\n              \\"relationship_type\\": \\"ASSOCIATED_WITH\\",\n              \\"source_label\\": \\"Memory\\",\n              \\"target_label\\": \\"Person\\",\n              \\"direction\\": \\"->\\"\n            },\n            \\"filters\\": [\n              {\n                \\"node_type\\": \\"Person\\",\n                \\"operator\\": \\"CONTAINS\\",\n                \\"property_name\\": \\"name\\",\n                \\"value\\": \\"John\\"\n              },\n              {\n                \\"node_type\\": \\"Memory\\",\n                \\"operator\\": \\"IN\\",\n                \\"property_name\\": \\"topics\\",\n                \\"value\\": [\n                  \\"project\\",\n                  \\"meeting\\"\n                ]\n              }\n            ],\n            \\"return_properties\\": [\n              \\"name\\",\n              \\"content\\",\n              \\"createdAt\\"\n            ]\n          }\n        }"',
      },
      python: {
        method: 'memory.search',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nsearch_response = client.memory.search(\n    query="Find recurring customer complaints about API performance from the last month. Focus on issues that multiple customers have mentioned and any specific feature requests or workflow improvements they\'ve suggested.",\n)\nprint(search_response.search_id)',
      },
      typescript: {
        method: 'client.memory.search',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst searchResponse = await client.memory.search({\n  query:\n    \"Find recurring customer complaints about API performance from the last month. Focus on issues that multiple customers have mentioned and any specific feature requests or workflow improvements they've suggested.\",\n});\n\nconsole.log(searchResponse.search_id);",
      },
    },
  },
  {
    name: 'retrieve_status',
    endpoint: '/v1/memory/status/{memory_id}',
    httpMethod: 'get',
    summary: 'Get Memory Status',
    description:
      'Get processing status for a memory item.\n\n    Returns the current processing lifecycle stage:\n    - `queued` — Accepted, waiting to be processed\n    - `quick_saved` — Quick add complete (stored in DB + vector store), background processing pending\n    - `processing` — Background processing in progress (graph indexing, Neo4j nodes, enrichment)\n    - `completed` — All processing finished\n    - `failed` — Processing failed\n\n    Use this endpoint to poll for completion after adding a memory.\n    For real-time updates, connect to WebSocket at `/ws/memory-status/{memory_id}`.',
    stainlessPath: '(resource) memory > (method) retrieve_status',
    qualified: 'client.memory.retrieveStatus',
    params: ['memory_id: string;'],
    response: 'object',
    markdown:
      "## retrieve_status\n\n`client.memory.retrieveStatus(memory_id: string): object`\n\n**get** `/v1/memory/status/{memory_id}`\n\nGet processing status for a memory item.\n\n    Returns the current processing lifecycle stage:\n    - `queued` — Accepted, waiting to be processed\n    - `quick_saved` — Quick add complete (stored in DB + vector store), background processing pending\n    - `processing` — Background processing in progress (graph indexing, Neo4j nodes, enrichment)\n    - `completed` — All processing finished\n    - `failed` — Processing failed\n\n    Use this endpoint to poll for completion after adding a memory.\n    For real-time updates, connect to WebSocket at `/ws/memory-status/{memory_id}`.\n\n### Parameters\n\n- `memory_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.memory.retrieveStatus('memory_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/memory/status/$MEMORY_ID \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'memory.retrieve_status',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.memory.retrieve_status(\n    "memory_id",\n)\nprint(response)',
      },
      typescript: {
        method: 'client.memory.retrieveStatus',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.memory.retrieveStatus('memory_id');\n\nconsole.log(response);",
      },
    },
  },
  {
    name: 'retrieve_batch_status',
    endpoint: '/v1/memory/batch/status/{batch_id}',
    httpMethod: 'get',
    summary: 'Get Batch Memory Status',
    description:
      'Get processing status for a batch of memories.\n\n    Returns overall batch progress and per-memory status breakdown.\n    The `batch_id` is returned in the POST /v1/memory/batch response.\n\n    For real-time updates, connect to WebSocket at `/ws/memory-status`.',
    stainlessPath: '(resource) memory > (method) retrieve_batch_status',
    qualified: 'client.memory.retrieveBatchStatus',
    params: ['batch_id: string;'],
    response: 'object',
    markdown:
      "## retrieve_batch_status\n\n`client.memory.retrieveBatchStatus(batch_id: string): object`\n\n**get** `/v1/memory/batch/status/{batch_id}`\n\nGet processing status for a batch of memories.\n\n    Returns overall batch progress and per-memory status breakdown.\n    The `batch_id` is returned in the POST /v1/memory/batch response.\n\n    For real-time updates, connect to WebSocket at `/ws/memory-status`.\n\n### Parameters\n\n- `batch_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.memory.retrieveBatchStatus('batch_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/memory/batch/status/$BATCH_ID \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'memory.retrieve_batch_status',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.memory.retrieve_batch_status(\n    "batch_id",\n)\nprint(response)',
      },
      typescript: {
        method: 'client.memory.retrieveBatchStatus',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.memory.retrieveBatchStatus('batch_id');\n\nconsole.log(response);",
      },
    },
  },
  {
    name: 'submit',
    endpoint: '/v1/feedback',
    httpMethod: 'post',
    summary: 'Submit Feedback V1',
    description:
      "Submit feedback on search results to help improve model performance.\n    \n    This endpoint allows developers to provide feedback on:\n    - Overall answer quality (thumbs up/down, ratings)\n    - Specific memory relevance and accuracy\n    - User engagement signals (copy, save, create document actions)\n    - Corrections and improvements\n    \n    The feedback is used to train and improve:\n    - Router model tier predictions\n    - Memory retrieval ranking\n    - Answer generation quality\n    - Agentic graph search performance\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')",
    stainlessPath: '(resource) feedback > (method) submit',
    qualified: 'client.feedback.submit',
    params: [
      "feedbackData: { feedbackSource: 'inline' | 'post_query' | 'session_end' | 'memory_citation' | 'answer_panel'; feedbackType: string; assistantMessage?: { className: string; objectId: string; __type?: string; }; citedMemoryIds?: string[]; citedNodeIds?: string[]; feedbackImpact?: string; feedbackProcessed?: boolean; feedbackScore?: number; feedbackText?: string; feedbackValue?: string; userMessage?: { className: string; objectId: string; __type?: string; }; };",
      'search_id: string;',
      'external_user_id?: string;',
      'namespace_id?: string;',
      'organization_id?: string;',
      'user_id?: string;',
    ],
    response:
      '{ code: number; message: string; status: string; details?: object; error?: string; feedback_id?: string; }',
    markdown:
      "## submit\n\n`client.feedback.submit(feedbackData: { feedbackSource: 'inline' | 'post_query' | 'session_end' | 'memory_citation' | 'answer_panel'; feedbackType: string; assistantMessage?: object; citedMemoryIds?: string[]; citedNodeIds?: string[]; feedbackImpact?: string; feedbackProcessed?: boolean; feedbackScore?: number; feedbackText?: string; feedbackValue?: string; userMessage?: object; }, search_id: string, external_user_id?: string, namespace_id?: string, organization_id?: string, user_id?: string): { code: number; message: string; status: string; details?: object; error?: string; feedback_id?: string; }`\n\n**post** `/v1/feedback`\n\nSubmit feedback on search results to help improve model performance.\n    \n    This endpoint allows developers to provide feedback on:\n    - Overall answer quality (thumbs up/down, ratings)\n    - Specific memory relevance and accuracy\n    - User engagement signals (copy, save, create document actions)\n    - Corrections and improvements\n    \n    The feedback is used to train and improve:\n    - Router model tier predictions\n    - Memory retrieval ranking\n    - Answer generation quality\n    - Agentic graph search performance\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n\n### Parameters\n\n- `feedbackData: { feedbackSource: 'inline' | 'post_query' | 'session_end' | 'memory_citation' | 'answer_panel'; feedbackType: string; assistantMessage?: { className: string; objectId: string; __type?: string; }; citedMemoryIds?: string[]; citedNodeIds?: string[]; feedbackImpact?: string; feedbackProcessed?: boolean; feedbackScore?: number; feedbackText?: string; feedbackValue?: string; userMessage?: { className: string; objectId: string; __type?: string; }; }`\n  The feedback data containing all feedback information\n  - `feedbackSource: 'inline' | 'post_query' | 'session_end' | 'memory_citation' | 'answer_panel'`\n    Where the feedback was provided from\n  - `feedbackType: string`\n    Types of feedback that can be provided\n  - `assistantMessage?: { className: string; objectId: string; __type?: string; }`\n    A pointer to a Parse object\n  - `citedMemoryIds?: string[]`\n  - `citedNodeIds?: string[]`\n  - `feedbackImpact?: string`\n  - `feedbackProcessed?: boolean`\n  - `feedbackScore?: number`\n  - `feedbackText?: string`\n  - `feedbackValue?: string`\n  - `userMessage?: { className: string; objectId: string; __type?: string; }`\n    A pointer to a Parse object\n\n- `search_id: string`\n  The search_id from SearchResponse that this feedback relates to\n\n- `external_user_id?: string`\n  External user ID for developer API keys acting on behalf of end users\n\n- `namespace_id?: string`\n  Optional namespace ID for multi-tenant feedback scoping. When provided, feedback is scoped to this namespace.\n\n- `organization_id?: string`\n  Optional organization ID for multi-tenant feedback scoping. When provided, feedback is scoped to this organization.\n\n- `user_id?: string`\n  Internal user ID (if not provided, will be resolved from authentication)\n\n### Returns\n\n- `{ code: number; message: string; status: string; details?: object; error?: string; feedback_id?: string; }`\n  Response model for feedback submission\n\n  - `code: number`\n  - `message: string`\n  - `status: string`\n  - `details?: object`\n  - `error?: string`\n  - `feedback_id?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst feedbackResponse = await client.feedback.submit({\n  feedbackData: { feedbackSource: 'inline', feedbackType: 'thumbs_up' },\n  search_id: 'abc123def456',\n});\n\nconsole.log(feedbackResponse);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/feedback \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "feedbackData": {\n            "feedbackSource": "inline",\n            "feedbackType": "thumbs_up",\n            "assistantMessage": {\n              "className": "PostMessage",\n              "objectId": "abc123def456",\n              "__type": "Pointer"\n            },\n            "citedMemoryIds": [\n              "mem_123",\n              "mem_456"\n            ],\n            "citedNodeIds": [\n              "node_123",\n              "node_456"\n            ],\n            "feedbackImpact": "positive",\n            "feedbackProcessed": true,\n            "feedbackScore": 1,\n            "feedbackText": "This answer was very helpful and accurate",\n            "feedbackValue": "helpful",\n            "userMessage": {\n              "className": "PostMessage",\n              "objectId": "abc123def456",\n              "__type": "Pointer"\n            }\n          },\n          "search_id": "abc123def456"\n        }\'',
      },
      python: {
        method: 'feedback.submit',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nfeedback_response = client.feedback.submit(\n    feedback_data={\n        "feedback_source": "inline",\n        "feedback_type": "thumbs_up",\n    },\n    search_id="abc123def456",\n)\nprint(feedback_response.feedback_id)',
      },
      typescript: {
        method: 'client.feedback.submit',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst feedbackResponse = await client.feedback.submit({\n  feedbackData: { feedbackSource: 'inline', feedbackType: 'thumbs_up' },\n  search_id: 'abc123def456',\n});\n\nconsole.log(feedbackResponse.feedback_id);",
      },
    },
  },
  {
    name: 'submit_batch',
    endpoint: '/v1/feedback/batch',
    httpMethod: 'post',
    summary: 'Submit Batch Feedback V1',
    description:
      "Submit multiple feedback items in a single request.\n    \n    Useful for submitting session-end feedback or bulk feedback collection.\n    Each feedback item is processed independently, so partial success is possible.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')",
    stainlessPath: '(resource) feedback > (method) submit_batch',
    qualified: 'client.feedback.submitBatch',
    params: [
      "feedback_items: { feedbackData: { feedbackSource: 'inline' | 'post_query' | 'session_end' | 'memory_citation' | 'answer_panel'; feedbackType: string; assistantMessage?: object; citedMemoryIds?: string[]; citedNodeIds?: string[]; feedbackImpact?: string; feedbackProcessed?: boolean; feedbackScore?: number; feedbackText?: string; feedbackValue?: string; userMessage?: object; }; search_id: string; external_user_id?: string; namespace_id?: string; organization_id?: string; user_id?: string; }[];",
      'session_context?: object;',
    ],
    response:
      '{ code: number; message: string; status: string; error?: string; errors?: object[]; failed_count?: number; feedback_ids?: string[]; successful_count?: number; }',
    markdown:
      "## submit_batch\n\n`client.feedback.submitBatch(feedback_items: { feedbackData: object; search_id: string; external_user_id?: string; namespace_id?: string; organization_id?: string; user_id?: string; }[], session_context?: object): { code: number; message: string; status: string; error?: string; errors?: object[]; failed_count?: number; feedback_ids?: string[]; successful_count?: number; }`\n\n**post** `/v1/feedback/batch`\n\nSubmit multiple feedback items in a single request.\n    \n    Useful for submitting session-end feedback or bulk feedback collection.\n    Each feedback item is processed independently, so partial success is possible.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n\n### Parameters\n\n- `feedback_items: { feedbackData: { feedbackSource: 'inline' | 'post_query' | 'session_end' | 'memory_citation' | 'answer_panel'; feedbackType: string; assistantMessage?: object; citedMemoryIds?: string[]; citedNodeIds?: string[]; feedbackImpact?: string; feedbackProcessed?: boolean; feedbackScore?: number; feedbackText?: string; feedbackValue?: string; userMessage?: object; }; search_id: string; external_user_id?: string; namespace_id?: string; organization_id?: string; user_id?: string; }[]`\n  List of feedback items to submit\n\n- `session_context?: object`\n  Session-level context for batch feedback\n\n### Returns\n\n- `{ code: number; message: string; status: string; error?: string; errors?: object[]; failed_count?: number; feedback_ids?: string[]; successful_count?: number; }`\n  Response model for batch feedback submission\n\n  - `code: number`\n  - `message: string`\n  - `status: string`\n  - `error?: string`\n  - `errors?: object[]`\n  - `failed_count?: number`\n  - `feedback_ids?: string[]`\n  - `successful_count?: number`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst batchResponse = await client.feedback.submitBatch({ feedback_items: [{\n  feedbackData: { feedbackSource: 'inline', feedbackType: 'thumbs_up' },\n  search_id: 'abc123def456',\n}] });\n\nconsole.log(batchResponse);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/feedback/batch \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "feedback_items": [\n            {\n              "feedbackData": {\n                "feedbackSource": "inline",\n                "feedbackType": "thumbs_up",\n                "assistantMessage": {\n                  "className": "PostMessage",\n                  "objectId": "abc123def456",\n                  "__type": "Pointer"\n                },\n                "citedMemoryIds": [\n                  "mem_123",\n                  "mem_456"\n                ],\n                "citedNodeIds": [\n                  "node_123",\n                  "node_456"\n                ],\n                "feedbackImpact": "positive",\n                "feedbackProcessed": true,\n                "feedbackScore": 1,\n                "feedbackText": "This answer was very helpful and accurate",\n                "feedbackValue": "helpful",\n                "userMessage": {\n                  "className": "PostMessage",\n                  "objectId": "abc123def456",\n                  "__type": "Pointer"\n                }\n              },\n              "search_id": "abc123def456",\n              "external_user_id": "dev_api_key_123",\n              "user_id": "abc123def456"\n            }\n          ]\n        }\'',
      },
      python: {
        method: 'feedback.submit_batch',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nbatch_response = client.feedback.submit_batch(\n    feedback_items=[{\n        "feedback_data": {\n            "feedback_source": "inline",\n            "feedback_type": "thumbs_up",\n        },\n        "search_id": "abc123def456",\n    }],\n)\nprint(batch_response.feedback_ids)',
      },
      typescript: {
        method: 'client.feedback.submitBatch',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst batchResponse = await client.feedback.submitBatch({\n  feedback_items: [\n    {\n      feedbackData: { feedbackSource: 'inline', feedbackType: 'thumbs_up' },\n      search_id: 'abc123def456',\n    },\n  ],\n});\n\nconsole.log(batchResponse.feedback_ids);",
      },
    },
  },
  {
    name: 'get_by_id',
    endpoint: '/v1/feedback/{feedback_id}',
    httpMethod: 'get',
    summary: 'Get Feedback By Id V1',
    description:
      "Retrieve feedback by ID.\n    \n    This endpoint allows developers to fetch feedback details by feedback ID.\n    Only the user who created the feedback or users with appropriate permissions can access it.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')",
    stainlessPath: '(resource) feedback > (method) get_by_id',
    qualified: 'client.feedback.getByID',
    params: ['feedback_id: string;'],
    response:
      '{ code: number; message: string; status: string; details?: object; error?: string; feedback_id?: string; }',
    markdown:
      "## get_by_id\n\n`client.feedback.getByID(feedback_id: string): { code: number; message: string; status: string; details?: object; error?: string; feedback_id?: string; }`\n\n**get** `/v1/feedback/{feedback_id}`\n\nRetrieve feedback by ID.\n    \n    This endpoint allows developers to fetch feedback details by feedback ID.\n    Only the user who created the feedback or users with appropriate permissions can access it.\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n\n### Parameters\n\n- `feedback_id: string`\n\n### Returns\n\n- `{ code: number; message: string; status: string; details?: object; error?: string; feedback_id?: string; }`\n  Response model for feedback submission\n\n  - `code: number`\n  - `message: string`\n  - `status: string`\n  - `details?: object`\n  - `error?: string`\n  - `feedback_id?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst feedbackResponse = await client.feedback.getByID('feedback_id');\n\nconsole.log(feedbackResponse);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/feedback/$FEEDBACK_ID \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'feedback.get_by_id',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nfeedback_response = client.feedback.get_by_id(\n    "feedback_id",\n)\nprint(feedback_response.feedback_id)',
      },
      typescript: {
        method: 'client.feedback.getByID',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst feedbackResponse = await client.feedback.getByID('feedback_id');\n\nconsole.log(feedbackResponse.feedback_id);",
      },
    },
  },
  {
    name: 'upload',
    endpoint: '/v1/document',
    httpMethod: 'post',
    summary: 'Upload Document',
    description:
      'Upload and process documents using the pluggable architecture.\n\n    **Authentication Required**: Bearer token or API key\n\n    **Supported Providers**: TensorLake.ai, Reducto AI, Gemini Vision (fallback)\n\n    **Features**:\n    - Multi-tenant organization/namespace scoping\n    - Temporal workflow for durable execution\n    - Real-time WebSocket status updates\n    - Integration with Parse Server (Post/PostSocial/PageVersion)\n    - Automatic fallback between providers',
    stainlessPath: '(resource) document > (method) upload',
    qualified: 'client.document.upload',
    params: [
      'file: string;',
      'enable_holographic?: boolean;',
      'external_user_id?: string;',
      'frequency_schema_id?: string;',
      'graph_override?: string;',
      'hierarchical_enabled?: boolean;',
      'memory_policy?: string;',
      'metadata?: string;',
      'namespace_id?: string;',
      "preferred_provider?: 'gemini' | 'tensorlake' | 'reducto' | 'auto';",
      'property_overrides?: string;',
      'schema_id?: string;',
      'user_id?: string;',
      'webhook_secret?: string;',
      'webhook_url?: string;',
    ],
    response:
      "{ document_status: { progress: number; current_filename?: string; current_page?: number; error?: string; page_id?: string; status_type?: 'processing' | 'completed' | 'failed' | 'not_found' | 'queued' | 'cancelled'; total_pages?: number; upload_id?: string; }; code?: number; details?: object; error?: string; memories?: { createdAt: string; memoryId: string; objectId: string; memoryChunkIds?: string[]; }[]; memory_items?: { createdAt: string; memoryId: string; objectId: string; memoryChunkIds?: string[]; }[]; message?: string; status?: string; }",
    markdown:
      "## upload\n\n`client.document.upload(file: string, enable_holographic?: boolean, external_user_id?: string, frequency_schema_id?: string, graph_override?: string, hierarchical_enabled?: boolean, memory_policy?: string, metadata?: string, namespace_id?: string, preferred_provider?: 'gemini' | 'tensorlake' | 'reducto' | 'auto', property_overrides?: string, schema_id?: string, user_id?: string, webhook_secret?: string, webhook_url?: string): { document_status: object; code?: number; details?: object; error?: string; memories?: add_memory_item[]; memory_items?: add_memory_item[]; message?: string; status?: string; }`\n\n**post** `/v1/document`\n\nUpload and process documents using the pluggable architecture.\n\n    **Authentication Required**: Bearer token or API key\n\n    **Supported Providers**: TensorLake.ai, Reducto AI, Gemini Vision (fallback)\n\n    **Features**:\n    - Multi-tenant organization/namespace scoping\n    - Temporal workflow for durable execution\n    - Real-time WebSocket status updates\n    - Integration with Parse Server (Post/PostSocial/PageVersion)\n    - Automatic fallback between providers\n\n### Parameters\n\n- `file: string`\n\n- `enable_holographic?: boolean`\n  If True, applies holographic neural transforms and stores in holographic collection\n\n- `external_user_id?: string`\n  Your application's user identifier. This is the primary way to identify users. Also accepts legacy 'end_user_id'.\n\n- `frequency_schema_id?: string`\n  Frequency schema for holographic embedding (e.g. 'cosqa', 'scifact'). Required when enable_holographic=True. Call GET /v1/frequencies to see available schemas.\n\n- `graph_override?: string`\n\n- `hierarchical_enabled?: boolean`\n\n- `memory_policy?: string`\n  JSON-encoded memory policy. Includes mode ('auto'/'manual'), schema_id, node_constraints (applied in auto mode when present), and OMO fields (consent, risk, acl). This is the recommended way to configure memory processing.\n\n- `metadata?: string`\n\n- `namespace_id?: string`\n\n- `preferred_provider?: 'gemini' | 'tensorlake' | 'reducto' | 'auto'`\n  Preferred provider for document processing.\n\n- `property_overrides?: string`\n\n- `schema_id?: string`\n\n- `user_id?: string`\n  DEPRECATED: Internal Papr Parse user ID. Most developers should use external_user_id.\n\n- `webhook_secret?: string`\n\n- `webhook_url?: string`\n\n### Returns\n\n- `{ document_status: { progress: number; current_filename?: string; current_page?: number; error?: string; page_id?: string; status_type?: 'processing' | 'completed' | 'failed' | 'not_found' | 'queued' | 'cancelled'; total_pages?: number; upload_id?: string; }; code?: number; details?: object; error?: string; memories?: { createdAt: string; memoryId: string; objectId: string; memoryChunkIds?: string[]; }[]; memory_items?: { createdAt: string; memoryId: string; objectId: string; memoryChunkIds?: string[]; }[]; message?: string; status?: string; }`\n\n  - `document_status: { progress: number; current_filename?: string; current_page?: number; error?: string; page_id?: string; status_type?: 'processing' | 'completed' | 'failed' | 'not_found' | 'queued' | 'cancelled'; total_pages?: number; upload_id?: string; }`\n  - `code?: number`\n  - `details?: object`\n  - `error?: string`\n  - `memories?: { createdAt: string; memoryId: string; objectId: string; memoryChunkIds?: string[]; }[]`\n  - `memory_items?: { createdAt: string; memoryId: string; objectId: string; memoryChunkIds?: string[]; }[]`\n  - `message?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.document.upload({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          "curl https://memory.papr.ai/v1/document \\\n    -H 'Content-Type: multipart/form-data' \\\n    -H \"Authorization: Bearer $PAPR_MEMORY_BEARER_TOKEN\" \\\n    -F 'file=@/path/to/file'",
      },
      python: {
        method: 'document.upload',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    bearer_token=os.environ.get("PAPR_MEMORY_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.document.upload(\n    file=b"Example data",\n)\nprint(response.document_status)',
      },
      typescript: {
        method: 'client.document.upload',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  bearerToken: process.env['PAPR_MEMORY_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.document.upload({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(response.document_status);",
      },
    },
  },
  {
    name: 'get_status',
    endpoint: '/v1/document/status/{upload_id}',
    httpMethod: 'get',
    summary: 'Get Document Status',
    description: 'Get processing status for an uploaded document',
    stainlessPath: '(resource) document > (method) get_status',
    qualified: 'client.document.getStatus',
    params: ['upload_id: string;'],
    response: 'object',
    markdown:
      "## get_status\n\n`client.document.getStatus(upload_id: string): object`\n\n**get** `/v1/document/status/{upload_id}`\n\nGet processing status for an uploaded document\n\n### Parameters\n\n- `upload_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.document.getStatus('upload_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/document/status/$UPLOAD_ID \\\n    -H "Authorization: Bearer $PAPR_MEMORY_BEARER_TOKEN"',
      },
      python: {
        method: 'document.get_status',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    bearer_token=os.environ.get("PAPR_MEMORY_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.document.get_status(\n    "upload_id",\n)\nprint(response)',
      },
      typescript: {
        method: 'client.document.getStatus',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  bearerToken: process.env['PAPR_MEMORY_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.document.getStatus('upload_id');\n\nconsole.log(response);",
      },
    },
  },
  {
    name: 'cancel_processing',
    endpoint: '/v1/document/{upload_id}',
    httpMethod: 'delete',
    summary: 'Cancel Document Processing',
    description: 'Cancel document processing',
    stainlessPath: '(resource) document > (method) cancel_processing',
    qualified: 'client.document.cancelProcessing',
    params: ['upload_id: string;'],
    response: 'object',
    markdown:
      "## cancel_processing\n\n`client.document.cancelProcessing(upload_id: string): object`\n\n**delete** `/v1/document/{upload_id}`\n\nCancel document processing\n\n### Parameters\n\n- `upload_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.document.cancelProcessing('upload_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/document/$UPLOAD_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $PAPR_MEMORY_BEARER_TOKEN"',
      },
      python: {
        method: 'document.cancel_processing',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    bearer_token=os.environ.get("PAPR_MEMORY_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.document.cancel_processing(\n    "upload_id",\n)\nprint(response)',
      },
      typescript: {
        method: 'client.document.cancelProcessing',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  bearerToken: process.env['PAPR_MEMORY_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.document.cancelProcessing('upload_id');\n\nconsole.log(response);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/schemas',
    httpMethod: 'post',
    summary: 'Create User Schema V1',
    description:
      'Create a new user-defined graph schema.\n    \n    This endpoint allows users to define custom node types and relationships for their knowledge graph.\n    The schema will be validated and stored for use in future memory extractions.\n    \n    **Features:**\n    - Define custom node types with properties and validation rules\n    - Define custom relationship types with constraints\n    - Automatic validation against system schemas\n    - Support for different scopes (personal, workspace, namespace, organization)\n    - **Status control**: Set `status` to "active" to immediately activate the schema, or "draft" to save as draft (default)\n    - **Enum support**: Use `enum_values` to restrict property values to a predefined list (max 15 values)\n    - **Auto-indexing**: Required properties are automatically indexed in Neo4j when schema becomes active\n    \n    **Schema Limits (optimized for LLM performance):**\n    - **Maximum 10 node types** per schema\n    - **Maximum 20 relationship types** per schema\n    - **Maximum 10 properties** per node type\n    - **Maximum 15 enum values** per property\n    \n    **Property Types & Validation:**\n    - `string`: Text values with optional `enum_values`, `min_length`, `max_length`, `pattern`\n    - `integer`: Whole numbers with optional `min_value`, `max_value`\n    - `float`: Decimal numbers with optional `min_value`, `max_value`\n    - `boolean`: True/false values\n    - `datetime`: ISO 8601 timestamp strings\n    - `array`: Lists of values\n    - `object`: Complex nested objects\n    \n    **Enum Values:**\n    - Add `enum_values` to any string property to restrict values to a predefined list\n    - Maximum 15 enum values allowed per property\n    - Use with `default` to set a default enum value\n    - Example: `"enum_values": ["small", "medium", "large"]`\n    \n    **When to Use Enums:**\n    - Limited, well-defined options (≤15 values): sizes, statuses, categories, priorities\n    - Controlled vocabularies: "active/inactive", "high/medium/low", "bronze/silver/gold"\n    - When you want exact matching and no variations\n    \n    **When to Avoid Enums:**\n    - Open-ended text fields: names, titles, descriptions, addresses\n    - Large sets of options (>15): countries, cities, product models\n    - When you want semantic similarity matching for entity resolution\n    - Dynamic or frequently changing value sets\n    \n    **Unique Identifiers & Entity Resolution:**\n    - Properties marked as `unique_identifiers` are used for entity deduplication and merging\n    - **With enum_values**: Exact matching is used - entities with the same enum value are considered identical\n    - **Without enum_values**: Semantic similarity matching is used - entities with similar meanings are automatically merged\n    - Example: A "name" unique_identifier without enums will merge "Apple Inc" and "Apple Inc." as the same entity\n    - Example: A "sku" unique_identifier with enums will only merge entities with exactly matching SKU codes\n    - Use enums for unique_identifiers when you have a limited, predefined set of values (≤15 options)\n    - Avoid enums for unique_identifiers when you have broad, open-ended values or >15 possible options\n    - **Best practices**: Use enums for controlled vocabularies (status codes, categories), avoid for open text (company names, product titles)\n    - **In the example above**: "name" uses semantic similarity (open-ended), "sku" uses exact matching (controlled set)\n    \n    **LLM-Friendly Descriptions:**\n    - Write detailed property descriptions that guide the LLM on expected formats and usage\n    - Include examples of typical values (e.g., "Product name, typically 2-4 words like \'iPhone 15 Pro\'")\n    - Specify data formats and constraints clearly (e.g., "Price in USD as decimal number")\n    - For enums, explain when to use each option (e.g., "use \'new\' for brand new items")\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., \'papr_plugin\', \'browser_extension\')',
    stainlessPath: '(resource) schemas > (method) create',
    qualified: 'client.schemas.create',
    params: [
      'name: string;',
      'id?: string;',
      'created_at?: string;',
      'description?: string;',
      'last_used_at?: string;',
      'memory_policy?: object;',
      'namespace?: string | object;',
      'namespace_id?: string;',
      'node_types?: object;',
      'organization?: string | object;',
      'organization_id?: string;',
      'read_access?: string[];',
      'relationship_types?: object;',
      "scope?: 'personal' | 'workspace' | 'namespace' | 'organization';",
      "status?: 'draft' | 'active' | 'deprecated' | 'archived';",
      'updated_at?: string;',
      'usage_count?: number;',
      'user_id?: string | object;',
      'version?: string;',
      'workspace_id?: string | object;',
      'write_access?: string[];',
    ],
    response:
      "{ success: boolean; code?: number; data?: { name: string; id?: string; created_at?: string; description?: string; last_used_at?: string; memory_policy?: object; namespace?: string | object; namespace_id?: string; node_types?: object; organization?: string | object; organization_id?: string; read_access?: string[]; relationship_types?: object; scope?: 'personal' | 'workspace' | 'namespace' | 'organization'; status?: 'draft' | 'active' | 'deprecated' | 'archived'; updated_at?: string; usage_count?: number; user_id?: string | object; version?: string; workspace_id?: string | object; write_access?: string[]; }; error?: string; }",
    markdown:
      "## create\n\n`client.schemas.create(name: string, id?: string, created_at?: string, description?: string, last_used_at?: string, memory_policy?: object, namespace?: string | object, namespace_id?: string, node_types?: object, organization?: string | object, organization_id?: string, read_access?: string[], relationship_types?: object, scope?: 'personal' | 'workspace' | 'namespace' | 'organization', status?: 'draft' | 'active' | 'deprecated' | 'archived', updated_at?: string, usage_count?: number, user_id?: string | object, version?: string, workspace_id?: string | object, write_access?: string[]): { success: boolean; code?: number; data?: user_graph_schema_output; error?: string; }`\n\n**post** `/v1/schemas`\n\nCreate a new user-defined graph schema.\n    \n    This endpoint allows users to define custom node types and relationships for their knowledge graph.\n    The schema will be validated and stored for use in future memory extractions.\n    \n    **Features:**\n    - Define custom node types with properties and validation rules\n    - Define custom relationship types with constraints\n    - Automatic validation against system schemas\n    - Support for different scopes (personal, workspace, namespace, organization)\n    - **Status control**: Set `status` to \"active\" to immediately activate the schema, or \"draft\" to save as draft (default)\n    - **Enum support**: Use `enum_values` to restrict property values to a predefined list (max 15 values)\n    - **Auto-indexing**: Required properties are automatically indexed in Neo4j when schema becomes active\n    \n    **Schema Limits (optimized for LLM performance):**\n    - **Maximum 10 node types** per schema\n    - **Maximum 20 relationship types** per schema\n    - **Maximum 10 properties** per node type\n    - **Maximum 15 enum values** per property\n    \n    **Property Types & Validation:**\n    - `string`: Text values with optional `enum_values`, `min_length`, `max_length`, `pattern`\n    - `integer`: Whole numbers with optional `min_value`, `max_value`\n    - `float`: Decimal numbers with optional `min_value`, `max_value`\n    - `boolean`: True/false values\n    - `datetime`: ISO 8601 timestamp strings\n    - `array`: Lists of values\n    - `object`: Complex nested objects\n    \n    **Enum Values:**\n    - Add `enum_values` to any string property to restrict values to a predefined list\n    - Maximum 15 enum values allowed per property\n    - Use with `default` to set a default enum value\n    - Example: `\"enum_values\": [\"small\", \"medium\", \"large\"]`\n    \n    **When to Use Enums:**\n    - Limited, well-defined options (≤15 values): sizes, statuses, categories, priorities\n    - Controlled vocabularies: \"active/inactive\", \"high/medium/low\", \"bronze/silver/gold\"\n    - When you want exact matching and no variations\n    \n    **When to Avoid Enums:**\n    - Open-ended text fields: names, titles, descriptions, addresses\n    - Large sets of options (>15): countries, cities, product models\n    - When you want semantic similarity matching for entity resolution\n    - Dynamic or frequently changing value sets\n    \n    **Unique Identifiers & Entity Resolution:**\n    - Properties marked as `unique_identifiers` are used for entity deduplication and merging\n    - **With enum_values**: Exact matching is used - entities with the same enum value are considered identical\n    - **Without enum_values**: Semantic similarity matching is used - entities with similar meanings are automatically merged\n    - Example: A \"name\" unique_identifier without enums will merge \"Apple Inc\" and \"Apple Inc.\" as the same entity\n    - Example: A \"sku\" unique_identifier with enums will only merge entities with exactly matching SKU codes\n    - Use enums for unique_identifiers when you have a limited, predefined set of values (≤15 options)\n    - Avoid enums for unique_identifiers when you have broad, open-ended values or >15 possible options\n    - **Best practices**: Use enums for controlled vocabularies (status codes, categories), avoid for open text (company names, product titles)\n    - **In the example above**: \"name\" uses semantic similarity (open-ended), \"sku\" uses exact matching (controlled set)\n    \n    **LLM-Friendly Descriptions:**\n    - Write detailed property descriptions that guide the LLM on expected formats and usage\n    - Include examples of typical values (e.g., \"Product name, typically 2-4 words like 'iPhone 15 Pro'\")\n    - Specify data formats and constraints clearly (e.g., \"Price in USD as decimal number\")\n    - For enums, explain when to use each option (e.g., \"use 'new' for brand new items\")\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n    \n    **Required Headers**:\n    - Content-Type: application/json\n    - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')\n\n### Parameters\n\n- `name: string`\n\n- `id?: string`\n\n- `created_at?: string`\n\n- `description?: string`\n\n- `last_used_at?: string`\n\n- `memory_policy?: object`\n  Default memory policy for memories using this schema. Includes mode ('auto', 'manual'), node_constraints (applied in auto mode when present), and OMO safety settings (consent, risk). Memory-level policies override schema-level.\n\n- `namespace?: string | object`\n  DEPRECATED: Use 'namespace_id' instead. Accepts Parse pointer or objectId.\n\n- `namespace_id?: string`\n  Namespace ID this schema belongs to. Accepts legacy 'namespace' alias.\n\n- `node_types?: object`\n  Custom node types (max 10 per schema)\n\n- `organization?: string | object`\n  DEPRECATED: Use 'organization_id' instead. Accepts Parse pointer or objectId.\n\n- `organization_id?: string`\n  Organization ID this schema belongs to. Accepts legacy 'organization' alias.\n\n- `read_access?: string[]`\n\n- `relationship_types?: object`\n  Custom relationship types (max 20 per schema)\n\n- `scope?: 'personal' | 'workspace' | 'namespace' | 'organization'`\n  Schema scopes available through the API\n\n- `status?: 'draft' | 'active' | 'deprecated' | 'archived'`\n\n- `updated_at?: string`\n\n- `usage_count?: number`\n\n- `user_id?: string | object`\n\n- `version?: string`\n\n- `workspace_id?: string | object`\n\n- `write_access?: string[]`\n\n### Returns\n\n- `{ success: boolean; code?: number; data?: { name: string; id?: string; created_at?: string; description?: string; last_used_at?: string; memory_policy?: object; namespace?: string | object; namespace_id?: string; node_types?: object; organization?: string | object; organization_id?: string; read_access?: string[]; relationship_types?: object; scope?: 'personal' | 'workspace' | 'namespace' | 'organization'; status?: 'draft' | 'active' | 'deprecated' | 'archived'; updated_at?: string; usage_count?: number; user_id?: string | object; version?: string; workspace_id?: string | object; write_access?: string[]; }; error?: string; }`\n  Response model for schema operations\n\n  - `success: boolean`\n  - `code?: number`\n  - `data?: { name: string; id?: string; created_at?: string; description?: string; last_used_at?: string; memory_policy?: object; namespace?: string | object; namespace_id?: string; node_types?: object; organization?: string | object; organization_id?: string; read_access?: string[]; relationship_types?: object; scope?: 'personal' | 'workspace' | 'namespace' | 'organization'; status?: 'draft' | 'active' | 'deprecated' | 'archived'; updated_at?: string; usage_count?: number; user_id?: string | object; version?: string; workspace_id?: string | object; write_access?: string[]; }`\n  - `error?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst schema = await client.schemas.create({ name: 'x' });\n\nconsole.log(schema);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/schemas \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "name": "x"\n        }\'',
      },
      python: {
        method: 'schemas.create',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nschema = client.schemas.create(\n    name="x",\n)\nprint(schema.success)',
      },
      typescript: {
        method: 'client.schemas.create',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst schema = await client.schemas.create({ name: 'x' });\n\nconsole.log(schema.success);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/schemas',
    httpMethod: 'get',
    summary: 'List User Schemas V1',
    description:
      "List all schemas accessible to the authenticated user.\n    \n    Returns schemas that the user owns or has read access to, including:\n    - Personal schemas created by the user\n    - Workspace schemas shared within the user's workspace (legacy)\n    - Namespace schemas shared within the user's namespace\n    - Organization schemas available to the user's organization\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header",
    stainlessPath: '(resource) schemas > (method) list',
    qualified: 'client.schemas.list',
    params: ['status_filter?: string;', 'workspace_id?: string;'],
    response:
      "{ success: boolean; code?: number; data?: { name: string; id?: string; created_at?: string; description?: string; last_used_at?: string; memory_policy?: object; namespace?: string | object; namespace_id?: string; node_types?: object; organization?: string | object; organization_id?: string; read_access?: string[]; relationship_types?: object; scope?: 'personal' | 'workspace' | 'namespace' | 'organization'; status?: 'draft' | 'active' | 'deprecated' | 'archived'; updated_at?: string; usage_count?: number; user_id?: string | object; version?: string; workspace_id?: string | object; write_access?: string[]; }[]; error?: string; total?: number; }",
    markdown:
      "## list\n\n`client.schemas.list(status_filter?: string, workspace_id?: string): { success: boolean; code?: number; data?: user_graph_schema_output[]; error?: string; total?: number; }`\n\n**get** `/v1/schemas`\n\nList all schemas accessible to the authenticated user.\n    \n    Returns schemas that the user owns or has read access to, including:\n    - Personal schemas created by the user\n    - Workspace schemas shared within the user's workspace (legacy)\n    - Namespace schemas shared within the user's namespace\n    - Organization schemas available to the user's organization\n    \n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n\n### Parameters\n\n- `status_filter?: string`\n  Filter by status (draft, active, deprecated, archived)\n\n- `workspace_id?: string`\n  Filter by workspace ID\n\n### Returns\n\n- `{ success: boolean; code?: number; data?: { name: string; id?: string; created_at?: string; description?: string; last_used_at?: string; memory_policy?: object; namespace?: string | object; namespace_id?: string; node_types?: object; organization?: string | object; organization_id?: string; read_access?: string[]; relationship_types?: object; scope?: 'personal' | 'workspace' | 'namespace' | 'organization'; status?: 'draft' | 'active' | 'deprecated' | 'archived'; updated_at?: string; usage_count?: number; user_id?: string | object; version?: string; workspace_id?: string | object; write_access?: string[]; }[]; error?: string; total?: number; }`\n  Response model for listing schemas\n\n  - `success: boolean`\n  - `code?: number`\n  - `data?: { name: string; id?: string; created_at?: string; description?: string; last_used_at?: string; memory_policy?: object; namespace?: string | object; namespace_id?: string; node_types?: object; organization?: string | object; organization_id?: string; read_access?: string[]; relationship_types?: object; scope?: 'personal' | 'workspace' | 'namespace' | 'organization'; status?: 'draft' | 'active' | 'deprecated' | 'archived'; updated_at?: string; usage_count?: number; user_id?: string | object; version?: string; workspace_id?: string | object; write_access?: string[]; }[]`\n  - `error?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst schemas = await client.schemas.list();\n\nconsole.log(schemas);\n```",
    perLanguage: {
      http: {
        example: 'curl https://memory.papr.ai/v1/schemas \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'schemas.list',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nschemas = client.schemas.list()\nprint(schemas.success)',
      },
      typescript: {
        method: 'client.schemas.list',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst schemas = await client.schemas.list();\n\nconsole.log(schemas.success);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/schemas/{schema_id}',
    httpMethod: 'get',
    summary: 'Get User Schema V1',
    description:
      'Get a specific schema by ID.\n    \n    Returns the complete schema definition including node types, relationship types,\n    and metadata. User must have read access to the schema.',
    stainlessPath: '(resource) schemas > (method) retrieve',
    qualified: 'client.schemas.retrieve',
    params: ['schema_id: string;'],
    response:
      "{ success: boolean; code?: number; data?: { name: string; id?: string; created_at?: string; description?: string; last_used_at?: string; memory_policy?: object; namespace?: string | object; namespace_id?: string; node_types?: object; organization?: string | object; organization_id?: string; read_access?: string[]; relationship_types?: object; scope?: 'personal' | 'workspace' | 'namespace' | 'organization'; status?: 'draft' | 'active' | 'deprecated' | 'archived'; updated_at?: string; usage_count?: number; user_id?: string | object; version?: string; workspace_id?: string | object; write_access?: string[]; }; error?: string; }",
    markdown:
      "## retrieve\n\n`client.schemas.retrieve(schema_id: string): { success: boolean; code?: number; data?: user_graph_schema_output; error?: string; }`\n\n**get** `/v1/schemas/{schema_id}`\n\nGet a specific schema by ID.\n    \n    Returns the complete schema definition including node types, relationship types,\n    and metadata. User must have read access to the schema.\n\n### Parameters\n\n- `schema_id: string`\n\n### Returns\n\n- `{ success: boolean; code?: number; data?: { name: string; id?: string; created_at?: string; description?: string; last_used_at?: string; memory_policy?: object; namespace?: string | object; namespace_id?: string; node_types?: object; organization?: string | object; organization_id?: string; read_access?: string[]; relationship_types?: object; scope?: 'personal' | 'workspace' | 'namespace' | 'organization'; status?: 'draft' | 'active' | 'deprecated' | 'archived'; updated_at?: string; usage_count?: number; user_id?: string | object; version?: string; workspace_id?: string | object; write_access?: string[]; }; error?: string; }`\n  Response model for schema operations\n\n  - `success: boolean`\n  - `code?: number`\n  - `data?: { name: string; id?: string; created_at?: string; description?: string; last_used_at?: string; memory_policy?: object; namespace?: string | object; namespace_id?: string; node_types?: object; organization?: string | object; organization_id?: string; read_access?: string[]; relationship_types?: object; scope?: 'personal' | 'workspace' | 'namespace' | 'organization'; status?: 'draft' | 'active' | 'deprecated' | 'archived'; updated_at?: string; usage_count?: number; user_id?: string | object; version?: string; workspace_id?: string | object; write_access?: string[]; }`\n  - `error?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst schema = await client.schemas.retrieve('schema_id');\n\nconsole.log(schema);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/schemas/$SCHEMA_ID \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'schemas.retrieve',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nschema = client.schemas.retrieve(\n    "schema_id",\n)\nprint(schema.success)',
      },
      typescript: {
        method: 'client.schemas.retrieve',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst schema = await client.schemas.retrieve('schema_id');\n\nconsole.log(schema.success);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/schemas/{schema_id}',
    httpMethod: 'put',
    summary: 'Update User Schema V1',
    description:
      'Update an existing schema.\n    \n    Allows modification of schema properties, node types, relationship types, and status.\n    User must have write access to the schema. Updates create a new version\n    while preserving the existing data.\n    \n    **Status Management:**\n    - Set `status` to "active" to activate the schema and trigger Neo4j index creation\n    - Set `status` to "draft" to deactivate the schema\n    - Set `status` to "archived" to soft-delete the schema',
    stainlessPath: '(resource) schemas > (method) update',
    qualified: 'client.schemas.update',
    params: ['schema_id: string;', 'body: object;'],
    response:
      "{ success: boolean; code?: number; data?: { name: string; id?: string; created_at?: string; description?: string; last_used_at?: string; memory_policy?: object; namespace?: string | object; namespace_id?: string; node_types?: object; organization?: string | object; organization_id?: string; read_access?: string[]; relationship_types?: object; scope?: 'personal' | 'workspace' | 'namespace' | 'organization'; status?: 'draft' | 'active' | 'deprecated' | 'archived'; updated_at?: string; usage_count?: number; user_id?: string | object; version?: string; workspace_id?: string | object; write_access?: string[]; }; error?: string; }",
    markdown:
      "## update\n\n`client.schemas.update(schema_id: string, body: object): { success: boolean; code?: number; data?: user_graph_schema_output; error?: string; }`\n\n**put** `/v1/schemas/{schema_id}`\n\nUpdate an existing schema.\n    \n    Allows modification of schema properties, node types, relationship types, and status.\n    User must have write access to the schema. Updates create a new version\n    while preserving the existing data.\n    \n    **Status Management:**\n    - Set `status` to \"active\" to activate the schema and trigger Neo4j index creation\n    - Set `status` to \"draft\" to deactivate the schema\n    - Set `status` to \"archived\" to soft-delete the schema\n\n### Parameters\n\n- `schema_id: string`\n\n- `body: object`\n\n### Returns\n\n- `{ success: boolean; code?: number; data?: { name: string; id?: string; created_at?: string; description?: string; last_used_at?: string; memory_policy?: object; namespace?: string | object; namespace_id?: string; node_types?: object; organization?: string | object; organization_id?: string; read_access?: string[]; relationship_types?: object; scope?: 'personal' | 'workspace' | 'namespace' | 'organization'; status?: 'draft' | 'active' | 'deprecated' | 'archived'; updated_at?: string; usage_count?: number; user_id?: string | object; version?: string; workspace_id?: string | object; write_access?: string[]; }; error?: string; }`\n  Response model for schema operations\n\n  - `success: boolean`\n  - `code?: number`\n  - `data?: { name: string; id?: string; created_at?: string; description?: string; last_used_at?: string; memory_policy?: object; namespace?: string | object; namespace_id?: string; node_types?: object; organization?: string | object; organization_id?: string; read_access?: string[]; relationship_types?: object; scope?: 'personal' | 'workspace' | 'namespace' | 'organization'; status?: 'draft' | 'active' | 'deprecated' | 'archived'; updated_at?: string; usage_count?: number; user_id?: string | object; version?: string; workspace_id?: string | object; write_access?: string[]; }`\n  - `error?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst schema = await client.schemas.update('schema_id', { body: { foo: 'bar' } });\n\nconsole.log(schema);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/schemas/$SCHEMA_ID \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "foo": "bar"\n        }\'',
      },
      python: {
        method: 'schemas.update',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nschema = client.schemas.update(\n    schema_id="schema_id",\n    body={\n        "foo": "bar"\n    },\n)\nprint(schema.success)',
      },
      typescript: {
        method: 'client.schemas.update',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst schema = await client.schemas.update('schema_id', { body: { foo: 'bar' } });\n\nconsole.log(schema.success);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/schemas/{schema_id}',
    httpMethod: 'delete',
    summary: 'Delete User Schema V1',
    description:
      'Delete a schema.\n    \n    Soft deletes the schema by marking it as archived. The schema data and\n    associated graph nodes/relationships are preserved for data integrity.\n    User must have write access to the schema.',
    stainlessPath: '(resource) schemas > (method) delete',
    qualified: 'client.schemas.delete',
    params: ['schema_id: string;'],
    response: 'object',
    markdown:
      "## delete\n\n`client.schemas.delete(schema_id: string): object`\n\n**delete** `/v1/schemas/{schema_id}`\n\nDelete a schema.\n    \n    Soft deletes the schema by marking it as archived. The schema data and\n    associated graph nodes/relationships are preserved for data integrity.\n    User must have write access to the schema.\n\n### Parameters\n\n- `schema_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst schema = await client.schemas.delete('schema_id');\n\nconsole.log(schema);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/schemas/$SCHEMA_ID \\\n    -X DELETE \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'schemas.delete',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nschema = client.schemas.delete(\n    "schema_id",\n)\nprint(schema)',
      },
      typescript: {
        method: 'client.schemas.delete',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst schema = await client.schemas.delete('schema_id');\n\nconsole.log(schema);",
      },
    },
  },
  {
    name: 'playground',
    endpoint: '/v1/graphql',
    httpMethod: 'get',
    summary: 'Graphql Playground',
    description: 'GraphQL Playground (development only)',
    stainlessPath: '(resource) graphql > (method) playground',
    qualified: 'client.graphql.playground',
    response: 'object',
    markdown:
      "## playground\n\n`client.graphql.playground(): object`\n\n**get** `/v1/graphql`\n\nGraphQL Playground (development only)\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.graphql.playground();\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example: 'curl https://memory.papr.ai/v1/graphql \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'graphql.playground',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.graphql.playground()\nprint(response)',
      },
      typescript: {
        method: 'client.graphql.playground',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.graphql.playground();\n\nconsole.log(response);",
      },
    },
  },
  {
    name: 'query',
    endpoint: '/v1/graphql',
    httpMethod: 'post',
    summary: 'Graphql Proxy',
    description:
      'GraphQL endpoint for querying PAPR Memory using GraphQL.\n\n    This endpoint proxies GraphQL queries to Neo4j\'s hosted GraphQL endpoint,\n    automatically applying multi-tenant authorization filters based on user_id and workspace_id.\n\n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n\n    **Request Body**:\n    ```json\n    {\n      "query": "query { project(id: \\"proj_123\\") { name tasks { title } } }",\n      "variables": {},\n      "operationName": "GetProject"\n    }\n    ```\n\n    **Example Query**:\n    ```graphql\n    query GetProjectTasks($projectId: ID!) {\n      project(id: $projectId) {\n        name\n        tasks {\n          title\n          status\n        }\n      }\n    }\n    ```\n\n    All queries are automatically filtered by user_id and workspace_id for security.',
    stainlessPath: '(resource) graphql > (method) query',
    qualified: 'client.graphql.query',
    response: 'object',
    markdown:
      '## query\n\n`client.graphql.query(): object`\n\n**post** `/v1/graphql`\n\nGraphQL endpoint for querying PAPR Memory using GraphQL.\n\n    This endpoint proxies GraphQL queries to Neo4j\'s hosted GraphQL endpoint,\n    automatically applying multi-tenant authorization filters based on user_id and workspace_id.\n\n    **Authentication Required**:\n    One of the following authentication methods must be used:\n    - Bearer token in `Authorization` header\n    - API Key in `X-API-Key` header\n    - Session token in `X-Session-Token` header\n\n    **Request Body**:\n    ```json\n    {\n      "query": "query { project(id: \\"proj_123\\") { name tasks { title } } }",\n      "variables": {},\n      "operationName": "GetProject"\n    }\n    ```\n\n    **Example Query**:\n    ```graphql\n    query GetProjectTasks($projectId: ID!) {\n      project(id: $projectId) {\n        name\n        tasks {\n          title\n          status\n        }\n      }\n    }\n    ```\n\n    All queries are automatically filtered by user_id and workspace_id for security.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Papr from \'@papr/memory\';\n\nconst client = new Papr();\n\nconst response = await client.graphql.query();\n\nconsole.log(response);\n```',
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/graphql \\\n    -X POST \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'graphql.query',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.graphql.query()\nprint(response)',
      },
      typescript: {
        method: 'client.graphql.query',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.graphql.query();\n\nconsole.log(response);",
      },
    },
  },
  {
    name: 'store',
    endpoint: '/v1/messages',
    httpMethod: 'post',
    summary: 'Store Message',
    description:
      'Store a chat message and queue it for AI analysis and memory creation.\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    **Processing Control**:\n    - Set `process_messages: true` (default) to enable full AI analysis and memory creation\n    - Set `process_messages: false` to store messages only without processing into memories\n    \n    **Processing Flow** (when process_messages=true):\n    1. Message is immediately stored in PostMessage class\n    2. Background processing analyzes the message for memory-worthiness\n    3. If worthy, creates a memory with appropriate role-based categorization\n    4. Links the message to the created memory\n    \n    **Role-Based Categories**:\n    - **User messages**: preference, task, goal, facts, context\n    - **Assistant messages**: skills, learning\n    \n    **Session Management**:\n    - `sessionId` is required to group related messages\n    - Use the same `sessionId` for an entire conversation\n    - **Optional `title`**: Set a human-readable title for the conversation (e.g., "Q4 Planning Session")\n    - Retrieve conversation history using GET /messages/sessions/{sessionId}',
    stainlessPath: '(resource) messages > (method) store',
    qualified: 'client.messages.store',
    params: [
      'content: string | object[];',
      "role: 'user' | 'assistant';",
      'sessionId: string;',
      'context?: object[];',
      "graph_generation?: { auto?: { property_overrides?: object[]; schema_id?: string; }; manual?: { nodes: object[]; relationships?: object[]; }; mode?: 'auto' | 'manual'; };",
      "memory_policy?: { acl?: { read?: string[]; write?: string[]; }; consent?: 'explicit' | 'implicit' | 'terms' | 'none'; edge_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; direction?: 'outgoing' | 'incoming' | 'both'; edge_type?: string; link_only?: boolean; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; source_type?: string; target_type?: string; when?: object; }[]; mode?: 'auto' | 'manual'; node_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; link_only?: boolean; node_type?: string; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; when?: object; }[]; nodes?: { id: string; type: string; properties?: object; }[]; relationships?: { source: string; target: string; type: string; properties?: object; }[]; risk?: 'none' | 'sensitive' | 'flagged'; schema_id?: string; };",
      "metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; };",
      'namespace_id?: string;',
      'organization_id?: string;',
      'process_messages?: boolean;',
      'relationships_json?: object[];',
      'title?: string;',
    ],
    response:
      "{ content: string | object[]; createdAt: string; objectId: string; role: 'user' | 'assistant'; sessionId: string; processing_status?: string; }",
    markdown:
      "## store\n\n`client.messages.store(content: string | object[], role: 'user' | 'assistant', sessionId: string, context?: object[], graph_generation?: { auto?: auto_graph_generation; manual?: manual_graph_generation; mode?: 'auto' | 'manual'; }, memory_policy?: { acl?: acl_config; consent?: 'explicit' | 'implicit' | 'terms' | 'none'; edge_constraints?: edge_constraint_input[]; mode?: 'auto' | 'manual'; node_constraints?: node_constraint_input[]; nodes?: node_spec[]; relationships?: relationship_spec[]; risk?: 'none' | 'sensitive' | 'flagged'; schema_id?: string; }, metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }, namespace_id?: string, organization_id?: string, process_messages?: boolean, relationships_json?: object[], title?: string): { content: string | object[]; createdAt: string; objectId: string; role: 'user' | 'assistant'; sessionId: string; processing_status?: string; }`\n\n**post** `/v1/messages`\n\nStore a chat message and queue it for AI analysis and memory creation.\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    **Processing Control**:\n    - Set `process_messages: true` (default) to enable full AI analysis and memory creation\n    - Set `process_messages: false` to store messages only without processing into memories\n    \n    **Processing Flow** (when process_messages=true):\n    1. Message is immediately stored in PostMessage class\n    2. Background processing analyzes the message for memory-worthiness\n    3. If worthy, creates a memory with appropriate role-based categorization\n    4. Links the message to the created memory\n    \n    **Role-Based Categories**:\n    - **User messages**: preference, task, goal, facts, context\n    - **Assistant messages**: skills, learning\n    \n    **Session Management**:\n    - `sessionId` is required to group related messages\n    - Use the same `sessionId` for an entire conversation\n    - **Optional `title`**: Set a human-readable title for the conversation (e.g., \"Q4 Planning Session\")\n    - Retrieve conversation history using GET /messages/sessions/{sessionId}\n\n### Parameters\n\n- `content: string | object[]`\n  The content of the chat message - can be a simple string or structured content objects\n\n- `role: 'user' | 'assistant'`\n  Role of the message sender (user or assistant)\n\n- `sessionId: string`\n  Session ID to group related messages in a conversation\n\n- `context?: object[]`\n  Optional context for the message (conversation history or relevant context)\n\n- `graph_generation?: { auto?: { property_overrides?: object[]; schema_id?: string; }; manual?: { nodes: object[]; relationships?: object[]; }; mode?: 'auto' | 'manual'; }`\n  Graph generation configuration\n  - `auto?: { property_overrides?: { nodeLabel: string; set: object; match?: object; }[]; schema_id?: string; }`\n    AI-powered graph generation with optional guidance\n  - `manual?: { nodes: { id: string; label: string; properties: object; }[]; relationships?: { relationship_type: string; source_node_id: string; target_node_id: string; properties?: object; }[]; }`\n    Complete manual control over graph structure\n  - `mode?: 'auto' | 'manual'`\n    Graph generation mode: 'auto' (AI-powered) or 'manual' (exact specification)\n\n- `memory_policy?: { acl?: { read?: string[]; write?: string[]; }; consent?: 'explicit' | 'implicit' | 'terms' | 'none'; edge_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; direction?: 'outgoing' | 'incoming' | 'both'; edge_type?: string; link_only?: boolean; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; source_type?: string; target_type?: string; when?: object; }[]; mode?: 'auto' | 'manual'; node_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; link_only?: boolean; node_type?: string; on_miss?: 'create' | 'ignore' | 'error'; search?: search_config_input; set?: object; when?: object; }[]; nodes?: { id: string; type: string; properties?: object; }[]; relationships?: { source: string; target: string; type: string; properties?: object; }[]; risk?: 'none' | 'sensitive' | 'flagged'; schema_id?: string; }`\n  Unified memory processing policy.\n\nThis is the SINGLE source of truth for how a memory should be processed,\ncombining graph generation control AND OMO (Open Memory Object) safety standards.\n\n**Graph Generation Modes:**\n- auto: LLM extracts entities freely (default)\n- manual: Developer provides exact nodes (no LLM extraction)\n\n**OMO Safety Standards:**\n- consent: How data owner allowed storage (explicit, implicit, terms, none)\n- risk: Safety assessment (none, sensitive, flagged)\n- acl: Access control list for read/write permissions\n\n**Schema Integration:**\n- schema_id: Reference a schema that may have its own default memory_policy\n- Schema-level policies are merged with request-level (request takes precedence)\n  - `acl?: { read?: string[]; write?: string[]; }`\n    Simplified Access Control List configuration.\n\nAligned with Open Memory Object (OMO) standard.\nSee: https://github.com/anthropics/open-memory-object\n\n**Supported Entity Prefixes:**\n\n| Prefix | Description | Validation |\n|--------|-------------|------------|\n| `user:` | Internal Papr user ID | Validated against Parse users |\n| `external_user:` | Your app's user ID | Not validated (your responsibility) |\n| `organization:` | Organization ID | Validated against your organizations |\n| `namespace:` | Namespace ID | Validated against your namespaces |\n| `workspace:` | Workspace ID | Validated against your workspaces |\n| `role:` | Parse role ID | Validated against your roles |\n\n**Examples:**\n```python\nacl = ACLConfig(\n    read=[\"external_user:alice_123\", \"organization:org_acme\"],\n    write=[\"external_user:alice_123\"]\n)\n```\n\n**Validation Rules:**\n- Internal entities (user, organization, namespace, workspace, role) are validated\n- External entities (external_user) are NOT validated - your app is responsible\n- Invalid internal entities will return an error\n- Unprefixed values default to `external_user:` for backwards compatibility\n  - `consent?: 'explicit' | 'implicit' | 'terms' | 'none'`\n    How the data owner allowed this memory to be stored/used. 'explicit': User explicitly agreed. 'implicit': Inferred from context (default). 'terms': Covered by Terms of Service. 'none': No consent - graph extraction will be SKIPPED.\n  - `edge_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; direction?: 'outgoing' | 'incoming' | 'both'; edge_type?: string; link_only?: boolean; on_miss?: 'create' | 'ignore' | 'error'; search?: { mode?: 'semantic' | 'exact' | 'fuzzy'; properties?: object[]; threshold?: number; via_relationship?: object[]; }; set?: object; source_type?: string; target_type?: string; when?: object; }[]`\n    Rules for how LLM-extracted edges/relationships should be created/handled. Used in 'auto' mode when present. Controls: - create: 'auto' (create target if not found) or 'never' (controlled vocabulary) - search: How to find existing target nodes - set: Edge property values (exact or auto-extracted) - source_type/target_type: Filter by connected node types Example: {edge_type: 'MITIGATES', create: 'never', search: {properties: ['name']}}\n  - `mode?: 'auto' | 'manual'`\n    How to generate graph from this memory. 'auto': LLM extracts entities freely. 'manual': You provide exact nodes (no LLM). Note: 'structured' is accepted as deprecated alias for 'manual'.\n  - `node_constraints?: { create?: 'upsert' | 'lookup' | 'auto' | 'never'; link_only?: boolean; node_type?: string; on_miss?: 'create' | 'ignore' | 'error'; search?: { mode?: 'semantic' | 'exact' | 'fuzzy'; properties?: object[]; threshold?: number; via_relationship?: object[]; }; set?: object; when?: object; }[]`\n    Rules for how LLM-extracted nodes should be created/updated. Used in 'auto' mode when present. Controls creation policy, property forcing, and merge behavior.\n  - `nodes?: { id: string; type: string; properties?: object; }[]`\n    For manual mode: Exact nodes to create (no LLM extraction). Required when mode='manual'. Each node needs id, type, and properties.\n  - `relationships?: { source: string; target: string; type: string; properties?: object; }[]`\n    Relationships between nodes. Supports special placeholders: '$this' = the Memory node being created, '$previous' = the user's most recent memory. Examples: {source: '$this', target: '$previous', type: 'FOLLOWS'} links to previous memory. {source: '$this', target: 'mem_abc', type: 'REFERENCES'} links to specific memory.\n  - `risk?: 'none' | 'sensitive' | 'flagged'`\n    Safety assessment for this memory. 'none': Safe content (default). 'sensitive': Contains PII or sensitive info. 'flagged': Requires review - ACL will be restricted to owner only.\n  - `schema_id?: string`\n    Reference a UserGraphSchema by ID. The schema's memory_policy (if defined) will be used as defaults, with this request's settings taking precedence.\n\n- `metadata?: { acl?: object; assistantMessage?: string; category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'; consent?: string; conversationId?: string; createdAt?: string; customMetadata?: object; emoji tags?: string[]; emotion tags?: string[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; goalClassificationScores?: number[]; hierarchical_structures?: string | object[]; location?: string; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; pageId?: string; post?: string; relatedGoals?: string[]; relatedSteps?: string[]; relatedUseCases?: string[]; risk?: string; role?: 'user' | 'assistant'; role_read_access?: string[]; role_write_access?: string[]; sessionId?: string; sourceType?: string; sourceUrl?: string; stepClassificationScores?: number[]; topics?: string[]; upload_id?: string; useCaseClassificationScores?: number[]; user_id?: string; user_read_access?: string[]; user_write_access?: string[]; userMessage?: string; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }`\n  Metadata for memory request\n  - `acl?: object`\n    DEPRECATED: Use 'memory_policy.acl' at request level instead. Format: {'read': [...], 'write': [...]}.\n  - `assistantMessage?: string`\n  - `category?: 'preference' | 'task' | 'goal' | 'fact' | 'context' | 'skills' | 'learning'`\n    Memory category based on role. For users: preference, task, goal, fact, context. For assistants: skills, learning, task, goal, fact, context.\n  - `consent?: string`\n    DEPRECATED: Use 'memory_policy.consent' at request level instead. Values: 'explicit', 'implicit' (default), 'terms', 'none'.\n  - `conversationId?: string`\n  - `createdAt?: string`\n    ISO datetime when the memory was created\n  - `customMetadata?: object`\n    Optional object for arbitrary custom metadata fields. Only string, number, boolean, or list of strings allowed. Nested dicts are not allowed.\n  - `emoji tags?: string[]`\n  - `emotion tags?: string[]`\n  - `external_user_id?: string`\n    DEPRECATED: Use 'external_user_id' at request level instead. This field will be removed in v2.\n  - `external_user_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `external_user_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `goalClassificationScores?: number[]`\n  - `hierarchical_structures?: string | object[]`\n    Hierarchical structures to enable navigation from broad topics to specific ones\n  - `location?: string`\n  - `namespace_id?: string`\n    DEPRECATED: Use 'namespace_id' at request level instead. This field will be removed in v2.\n  - `namespace_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `namespace_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `organization_id?: string`\n    DEPRECATED: Use 'organization_id' at request level instead. This field will be removed in v2.\n  - `organization_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `organization_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `pageId?: string`\n  - `post?: string`\n  - `relatedGoals?: string[]`\n  - `relatedSteps?: string[]`\n  - `relatedUseCases?: string[]`\n  - `risk?: string`\n    DEPRECATED: Use 'memory_policy.risk' at request level instead. Values: 'none' (default), 'sensitive', 'flagged'.\n  - `role?: 'user' | 'assistant'`\n    Role of the message sender\n  - `role_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `role_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `sessionId?: string`\n  - `sourceType?: string`\n  - `sourceUrl?: string`\n  - `stepClassificationScores?: number[]`\n  - `topics?: string[]`\n  - `upload_id?: string`\n    Upload ID for document processing workflows\n  - `useCaseClassificationScores?: number[]`\n  - `user_id?: string`\n    DEPRECATED: Use 'external_user_id' at request level instead. This field will be removed in v2.\n  - `user_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `user_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `userMessage?: string`\n  - `workspace_id?: string`\n  - `workspace_read_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n  - `workspace_write_access?: string[]`\n    INTERNAL: Auto-populated for vector store filtering. Use memory_policy.acl instead.\n\n- `namespace_id?: string`\n  Optional namespace ID for multi-tenant message scoping\n\n- `organization_id?: string`\n  Optional organization ID for multi-tenant message scoping\n\n- `process_messages?: boolean`\n  Whether to process messages into memories (true) or just store them (false). Default is true.\n\n- `relationships_json?: object[]`\n  Optional array of relationships for Graph DB (Neo4j)\n\n- `title?: string`\n  Optional title for the conversation session. Sets the Chat.title in Parse Server for easy identification.\n\n### Returns\n\n- `{ content: string | object[]; createdAt: string; objectId: string; role: 'user' | 'assistant'; sessionId: string; processing_status?: string; }`\n  Response model for message storage\n\n  - `content: string | object[]`\n  - `createdAt: string`\n  - `objectId: string`\n  - `role: 'user' | 'assistant'`\n  - `sessionId: string`\n  - `processing_status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.messages.store({\n  content: 'Can you help me plan the Q4 product roadmap?',\n  role: 'user',\n  sessionId: 'session_123',\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/messages \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "content": "Can you help me plan the Q4 product roadmap?",\n          "role": "user",\n          "sessionId": "session_123"\n        }\'',
      },
      python: {
        method: 'messages.store',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.messages.store(\n    content="Can you help me plan the Q4 product roadmap?",\n    role="user",\n    session_id="session_123",\n)\nprint(response.content)',
      },
      typescript: {
        method: 'client.messages.store',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.messages.store({\n  content: 'Can you help me plan the Q4 product roadmap?',\n  role: 'user',\n  sessionId: 'session_123',\n});\n\nconsole.log(response.content);",
      },
    },
  },
  {
    name: 'retrieve_history',
    endpoint: '/v1/messages/sessions/{session_id}',
    httpMethod: 'get',
    summary: 'Get Session History',
    description:
      'Retrieve message history for a specific conversation session.\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    **Pagination**:\n    - Use `limit` and `skip` parameters for pagination\n    - Messages are returned in **reverse chronological order** (newest first)\n    - `total_count` indicates total messages in the session\n    \n    **Summaries** (if available):\n    - Returns hierarchical conversation summaries (short/medium/long-term)\n    - Includes `context_for_llm` field with pre-compressed context\n    - Summaries are automatically generated every 15 messages\n    - Use `/sessions/{session_id}/compress` endpoint to retrieve on-demand\n    \n    **Access Control**:\n    - Only returns messages for the authenticated user\n    - Workspace scoping is applied if available',
    stainlessPath: '(resource) messages.sessions > (method) retrieve_history',
    qualified: 'client.messages.sessions.retrieveHistory',
    params: ['session_id: string;', 'limit?: number;', 'skip?: number;'],
    response:
      "{ messages: { content: string | object[]; createdAt: string; objectId: string; role: 'user' | 'assistant'; sessionId: string; processing_status?: string; }[]; sessionId: string; total_count: number; context_for_llm?: string; summaries?: { last_updated?: string; long_term?: string; medium_term?: string; short_term?: string; topics?: string[]; }; }",
    markdown:
      "## retrieve_history\n\n`client.messages.sessions.retrieveHistory(session_id: string, limit?: number, skip?: number): { messages: object[]; sessionId: string; total_count: number; context_for_llm?: string; summaries?: conversation_summary_response; }`\n\n**get** `/v1/messages/sessions/{session_id}`\n\nRetrieve message history for a specific conversation session.\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    **Pagination**:\n    - Use `limit` and `skip` parameters for pagination\n    - Messages are returned in **reverse chronological order** (newest first)\n    - `total_count` indicates total messages in the session\n    \n    **Summaries** (if available):\n    - Returns hierarchical conversation summaries (short/medium/long-term)\n    - Includes `context_for_llm` field with pre-compressed context\n    - Summaries are automatically generated every 15 messages\n    - Use `/sessions/{session_id}/compress` endpoint to retrieve on-demand\n    \n    **Access Control**:\n    - Only returns messages for the authenticated user\n    - Workspace scoping is applied if available\n\n### Parameters\n\n- `session_id: string`\n\n- `limit?: number`\n  Maximum number of messages to return\n\n- `skip?: number`\n  Number of messages to skip for pagination\n\n### Returns\n\n- `{ messages: { content: string | object[]; createdAt: string; objectId: string; role: 'user' | 'assistant'; sessionId: string; processing_status?: string; }[]; sessionId: string; total_count: number; context_for_llm?: string; summaries?: { last_updated?: string; long_term?: string; medium_term?: string; short_term?: string; topics?: string[]; }; }`\n  Response model for retrieving message history\n\n  - `messages: { content: string | object[]; createdAt: string; objectId: string; role: 'user' | 'assistant'; sessionId: string; processing_status?: string; }[]`\n  - `sessionId: string`\n  - `total_count: number`\n  - `context_for_llm?: string`\n  - `summaries?: { last_updated?: string; long_term?: string; medium_term?: string; short_term?: string; topics?: string[]; }`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.messages.sessions.retrieveHistory('session_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/messages/sessions/$SESSION_ID \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'messages.sessions.retrieve_history',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.messages.sessions.retrieve_history(\n    session_id="session_id",\n)\nprint(response.messages)',
      },
      typescript: {
        method: 'client.messages.sessions.retrieveHistory',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.messages.sessions.retrieveHistory('session_id');\n\nconsole.log(response.messages);",
      },
    },
  },
  {
    name: 'retrieve_status',
    endpoint: '/v1/messages/sessions/{session_id}/status',
    httpMethod: 'get',
    summary: 'Get Session Status',
    description:
      'Get processing status for messages in a session.\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    **Status Information**:\n    - Total messages in session\n    - Processing status breakdown (queued, analyzing, completed, failed)\n    - Any messages with processing errors',
    stainlessPath: '(resource) messages.sessions > (method) retrieve_status',
    qualified: 'client.messages.sessions.retrieveStatus',
    params: ['session_id: string;'],
    response: 'object',
    markdown:
      "## retrieve_status\n\n`client.messages.sessions.retrieveStatus(session_id: string): object`\n\n**get** `/v1/messages/sessions/{session_id}/status`\n\nGet processing status for messages in a session.\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    **Status Information**:\n    - Total messages in session\n    - Processing status breakdown (queued, analyzing, completed, failed)\n    - Any messages with processing errors\n\n### Parameters\n\n- `session_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.messages.sessions.retrieveStatus('session_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/messages/sessions/$SESSION_ID/status \\\n    -H "Authorization: Bearer $PAPR_MEMORY_BEARER_TOKEN"',
      },
      python: {
        method: 'messages.sessions.retrieve_status',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    bearer_token=os.environ.get("PAPR_MEMORY_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.messages.sessions.retrieve_status(\n    "session_id",\n)\nprint(response)',
      },
      typescript: {
        method: 'client.messages.sessions.retrieveStatus',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  bearerToken: process.env['PAPR_MEMORY_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.messages.sessions.retrieveStatus('session_id');\n\nconsole.log(response);",
      },
    },
  },
  {
    name: 'compress',
    endpoint: '/v1/messages/sessions/{session_id}/compress',
    httpMethod: 'get',
    summary: 'Compress Session',
    description:
      'Get compressed conversation context for a session.\n    \n    Compress your conversation into hierarchical summaries with rich metadata,\n    perfect for reducing token usage in LLM context windows.\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    **What it returns**:\n    - **short_term**: Last 15 messages compressed\n    - **medium_term**: Last ~100 messages compressed  \n    - **long_term**: Full session compressed\n    - **topics**: Key topics discussed\n    - **enhanced_fields**: Project context, tech stack, key decisions, next steps, files accessed\n    \n    **Perfect for**:\n    - Reducing token usage in LLM prompts (96% savings)\n    - Providing conversation context without full history\n    - Quick conversation overview for AI agents\n    - Project documentation and status snapshots\n    \n    **Input**: Just the session ID - all context is extracted automatically',
    stainlessPath: '(resource) messages.sessions > (method) compress',
    qualified: 'client.messages.sessions.compress',
    params: ['session_id: string;'],
    response:
      '{ ai_agent_note: string; from_cache: boolean; session_id: string; summaries: { last_updated?: string; long_term?: string; medium_term?: string; short_term?: string; topics?: string[]; }; message_count?: number; }',
    markdown:
      "## compress\n\n`client.messages.sessions.compress(session_id: string): { ai_agent_note: string; from_cache: boolean; session_id: string; summaries: conversation_summary_response; message_count?: number; }`\n\n**get** `/v1/messages/sessions/{session_id}/compress`\n\nGet compressed conversation context for a session.\n    \n    Compress your conversation into hierarchical summaries with rich metadata,\n    perfect for reducing token usage in LLM context windows.\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    **What it returns**:\n    - **short_term**: Last 15 messages compressed\n    - **medium_term**: Last ~100 messages compressed  \n    - **long_term**: Full session compressed\n    - **topics**: Key topics discussed\n    - **enhanced_fields**: Project context, tech stack, key decisions, next steps, files accessed\n    \n    **Perfect for**:\n    - Reducing token usage in LLM prompts (96% savings)\n    - Providing conversation context without full history\n    - Quick conversation overview for AI agents\n    - Project documentation and status snapshots\n    \n    **Input**: Just the session ID - all context is extracted automatically\n\n### Parameters\n\n- `session_id: string`\n\n### Returns\n\n- `{ ai_agent_note: string; from_cache: boolean; session_id: string; summaries: { last_updated?: string; long_term?: string; medium_term?: string; short_term?: string; topics?: string[]; }; message_count?: number; }`\n  Response model for session summarization endpoint\n\n  - `ai_agent_note: string`\n  - `from_cache: boolean`\n  - `session_id: string`\n  - `summaries: { last_updated?: string; long_term?: string; medium_term?: string; short_term?: string; topics?: string[]; }`\n  - `message_count?: number`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.messages.sessions.compress('session_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/messages/sessions/$SESSION_ID/compress \\\n    -H "Authorization: Bearer $PAPR_MEMORY_BEARER_TOKEN"',
      },
      python: {
        method: 'messages.sessions.compress',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    bearer_token=os.environ.get("PAPR_MEMORY_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.messages.sessions.compress(\n    "session_id",\n)\nprint(response.session_id)',
      },
      typescript: {
        method: 'client.messages.sessions.compress',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  bearerToken: process.env['PAPR_MEMORY_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.messages.sessions.compress('session_id');\n\nconsole.log(response.session_id);",
      },
    },
  },
  {
    name: 'process',
    endpoint: '/v1/messages/sessions/{session_id}/process',
    httpMethod: 'post',
    summary: 'Process Session Messages',
    description:
      "Process all stored messages in a session that were previously stored with process_messages=false.\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    This endpoint allows you to retroactively process messages that were initially stored \n    without processing. Useful for:\n    - Processing messages after deciding you want them as memories\n    - Batch processing large conversation sessions\n    - Re-processing sessions with updated AI models\n    \n    **Processing Behavior**:\n    - Only processes messages with status 'stored_only' or 'pending'\n    - Uses the same smart batch analysis (every 15 messages)\n    - Respects existing memory creation pipeline",
    stainlessPath: '(resource) messages.sessions > (method) process',
    qualified: 'client.messages.sessions.process',
    params: ['session_id: string;'],
    response: 'object',
    markdown:
      "## process\n\n`client.messages.sessions.process(session_id: string): object`\n\n**post** `/v1/messages/sessions/{session_id}/process`\n\nProcess all stored messages in a session that were previously stored with process_messages=false.\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    This endpoint allows you to retroactively process messages that were initially stored \n    without processing. Useful for:\n    - Processing messages after deciding you want them as memories\n    - Batch processing large conversation sessions\n    - Re-processing sessions with updated AI models\n    \n    **Processing Behavior**:\n    - Only processes messages with status 'stored_only' or 'pending'\n    - Uses the same smart batch analysis (every 15 messages)\n    - Respects existing memory creation pipeline\n\n### Parameters\n\n- `session_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.messages.sessions.process('session_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/messages/sessions/$SESSION_ID/process \\\n    -X POST \\\n    -H "Authorization: Bearer $PAPR_MEMORY_BEARER_TOKEN"',
      },
      python: {
        method: 'messages.sessions.process',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    bearer_token=os.environ.get("PAPR_MEMORY_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.messages.sessions.process(\n    "session_id",\n)\nprint(response)',
      },
      typescript: {
        method: 'client.messages.sessions.process',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  bearerToken: process.env['PAPR_MEMORY_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.messages.sessions.process('session_id');\n\nconsole.log(response);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/messages/sessions/{session_id}',
    httpMethod: 'patch',
    summary: 'Update Session',
    description:
      'Update session properties (e.g., title, metadata).\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    **Updatable Fields**:\n    - `title`: Update the conversation title\n    - `metadata`: Update session metadata (merged with existing)\n    \n    **Example Request**:\n    ```json\n    {\n        "title": "Updated Session Title",\n        "metadata": {"custom_field": "value"}\n    }\n    ```',
    stainlessPath: '(resource) messages.sessions > (method) update',
    qualified: 'client.messages.sessions.update',
    params: ['session_id: string;', 'metadata?: object;', 'title?: string;'],
    response: 'object',
    markdown:
      '## update\n\n`client.messages.sessions.update(session_id: string, metadata?: object, title?: string): object`\n\n**patch** `/v1/messages/sessions/{session_id}`\n\nUpdate session properties (e.g., title, metadata).\n    \n    **Authentication Required**: Bearer token, API key, or session token\n    \n    **Updatable Fields**:\n    - `title`: Update the conversation title\n    - `metadata`: Update session metadata (merged with existing)\n    \n    **Example Request**:\n    ```json\n    {\n        "title": "Updated Session Title",\n        "metadata": {"custom_field": "value"}\n    }\n    ```\n\n### Parameters\n\n- `session_id: string`\n\n- `metadata?: object`\n  Metadata to merge with existing session metadata\n\n- `title?: string`\n  New title for the session\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Papr from \'@papr/memory\';\n\nconst client = new Papr();\n\nconst session = await client.messages.sessions.update(\'session_id\');\n\nconsole.log(session);\n```',
    perLanguage: {
      http: {
        example:
          "curl https://memory.papr.ai/v1/messages/sessions/$SESSION_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $PAPR_MEMORY_BEARER_TOKEN\" \\\n    -d '{}'",
      },
      python: {
        method: 'messages.sessions.update',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    bearer_token=os.environ.get("PAPR_MEMORY_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nsession = client.messages.sessions.update(\n    session_id="session_id",\n)\nprint(session)',
      },
      typescript: {
        method: 'client.messages.sessions.update',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  bearerToken: process.env['PAPR_MEMORY_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst session = await client.messages.sessions.update('session_id');\n\nconsole.log(session);",
      },
    },
  },
  {
    name: 'export_memories',
    endpoint: '/v1/omo/export',
    httpMethod: 'post',
    summary: 'Export memories to OMO format',
    description:
      'Export memories in Open Memory Object (OMO) standard format.\n\n    This enables memory portability to other OMO-compliant platforms.\n    The exported format follows the OMO v1 schema.\n\n    **OMO Standard:** https://github.com/papr-ai/open-memory-object',
    stainlessPath: '(resource) omo > (method) export_memories',
    qualified: 'client.omo.exportMemories',
    params: ['memory_ids: string[];'],
    response: '{ count: number; memories: object[]; code?: number; error?: string; status?: string; }',
    markdown:
      "## export_memories\n\n`client.omo.exportMemories(memory_ids: string[]): { count: number; memories: object[]; code?: number; error?: string; status?: string; }`\n\n**post** `/v1/omo/export`\n\nExport memories in Open Memory Object (OMO) standard format.\n\n    This enables memory portability to other OMO-compliant platforms.\n    The exported format follows the OMO v1 schema.\n\n    **OMO Standard:** https://github.com/papr-ai/open-memory-object\n\n### Parameters\n\n- `memory_ids: string[]`\n  List of memory IDs to export\n\n### Returns\n\n- `{ count: number; memories: object[]; code?: number; error?: string; status?: string; }`\n  Response model for OMO export.\n\n  - `count: number`\n  - `memories: object[]`\n  - `code?: number`\n  - `error?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.omo.exportMemories({ memory_ids: ['string'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/omo/export \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "memory_ids": [\n            "string"\n          ]\n        }\'',
      },
      python: {
        method: 'omo.export_memories',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.omo.export_memories(\n    memory_ids=["string"],\n)\nprint(response.count)',
      },
      typescript: {
        method: 'client.omo.exportMemories',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.omo.exportMemories({ memory_ids: ['string'] });\n\nconsole.log(response.count);",
      },
    },
  },
  {
    name: 'import_memories',
    endpoint: '/v1/omo/import',
    httpMethod: 'post',
    summary: 'Import memories from OMO format',
    description:
      'Import memories from Open Memory Object (OMO) standard format.\n\n    This enables importing memories from other OMO-compliant platforms.\n\n    **OMO Standard:** https://github.com/papr-ai/open-memory-object',
    stainlessPath: '(resource) omo > (method) import_memories',
    qualified: 'client.omo.importMemories',
    params: ['memories: object[];', 'skip_duplicates?: boolean;'],
    response:
      '{ imported: number; code?: number; errors?: object[]; memory_ids?: string[]; skipped?: number; status?: string; }',
    markdown:
      "## import_memories\n\n`client.omo.importMemories(memories: object[], skip_duplicates?: boolean): { imported: number; code?: number; errors?: object[]; memory_ids?: string[]; skipped?: number; status?: string; }`\n\n**post** `/v1/omo/import`\n\nImport memories from Open Memory Object (OMO) standard format.\n\n    This enables importing memories from other OMO-compliant platforms.\n\n    **OMO Standard:** https://github.com/papr-ai/open-memory-object\n\n### Parameters\n\n- `memories: object[]`\n  List of memories in OMO v1 format\n\n- `skip_duplicates?: boolean`\n  Skip memories with IDs that already exist\n\n### Returns\n\n- `{ imported: number; code?: number; errors?: object[]; memory_ids?: string[]; skipped?: number; status?: string; }`\n  Response model for OMO import.\n\n  - `imported: number`\n  - `code?: number`\n  - `errors?: object[]`\n  - `memory_ids?: string[]`\n  - `skipped?: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.omo.importMemories({ memories: [{ foo: 'bar' }] });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/omo/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "memories": [\n            {\n              "foo": "bar"\n            }\n          ]\n        }\'',
      },
      python: {
        method: 'omo.import_memories',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.omo.import_memories(\n    memories=[{\n        "foo": "bar"\n    }],\n)\nprint(response.memory_ids)',
      },
      typescript: {
        method: 'client.omo.importMemories',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.omo.importMemories({ memories: [{ foo: 'bar' }] });\n\nconsole.log(response.memory_ids);",
      },
    },
  },
  {
    name: 'export_memories_as_json',
    endpoint: '/v1/omo/export.json',
    httpMethod: 'get',
    summary: 'Export memories as .omo.json file',
    description: 'Export memories in OMO JSON file format for download.',
    stainlessPath: '(resource) omo > (method) export_memories_as_json',
    qualified: 'client.omo.exportMemoriesAsJson',
    params: ['memory_ids: string;'],
    response: 'object',
    markdown:
      "## export_memories_as_json\n\n`client.omo.exportMemoriesAsJson(memory_ids: string): object`\n\n**get** `/v1/omo/export.json`\n\nExport memories in OMO JSON file format for download.\n\n### Parameters\n\n- `memory_ids: string`\n  Comma-separated list of memory IDs\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.omo.exportMemoriesAsJson({ memory_ids: 'memory_ids' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/omo/export.json \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'omo.export_memories_as_json',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.omo.export_memories_as_json(\n    memory_ids="memory_ids",\n)\nprint(response)',
      },
      typescript: {
        method: 'client.omo.exportMemoriesAsJson',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.omo.exportMemoriesAsJson({ memory_ids: 'memory_ids' });\n\nconsole.log(response);",
      },
    },
  },
  {
    name: 'get_tiers',
    endpoint: '/v1/sync/tiers',
    httpMethod: 'post',
    summary: 'Get Sync Tiers',
    description:
      'Return initial Tier 0 (goals/OKRs/use-cases --> tier 0 memories) and Tier 1 (hot memories) for the requesting user/workspace.\n\nThis is a minimal initial implementation to enable SDK integration. It uses simple heuristics and will be enhanced with analytics-driven selection.',
    stainlessPath: '(resource) sync > (method) get_tiers',
    qualified: 'client.sync.getTiers',
    params: [
      'embed_limit?: number;',
      'embed_model?: string;',
      "embedding_format?: 'int8' | 'float32';",
      'external_user_id?: string;',
      'include_embeddings?: boolean;',
      'max_tier0?: number;',
      'max_tier1?: number;',
      'namespace_id?: string;',
      'organization_id?: string;',
      'user_id?: string;',
      'workspace_id?: string;',
    ],
    response:
      '{ code?: number; details?: object; error?: string; has_more?: boolean; next_cursor?: string; status?: string; tier0?: object[]; tier1?: object[]; transitions?: object[]; }',
    markdown:
      "## get_tiers\n\n`client.sync.getTiers(embed_limit?: number, embed_model?: string, embedding_format?: 'int8' | 'float32', external_user_id?: string, include_embeddings?: boolean, max_tier0?: number, max_tier1?: number, namespace_id?: string, organization_id?: string, user_id?: string, workspace_id?: string): { code?: number; details?: object; error?: string; has_more?: boolean; next_cursor?: string; status?: string; tier0?: memory[]; tier1?: memory[]; transitions?: object[]; }`\n\n**post** `/v1/sync/tiers`\n\nReturn initial Tier 0 (goals/OKRs/use-cases --> tier 0 memories) and Tier 1 (hot memories) for the requesting user/workspace.\n\nThis is a minimal initial implementation to enable SDK integration. It uses simple heuristics and will be enhanced with analytics-driven selection.\n\n### Parameters\n\n- `embed_limit?: number`\n  Max items to embed per tier to control latency\n\n- `embed_model?: string`\n  Embedding model hint: 'sbert' or 'bigbird' or 'Qwen4B'\n\n- `embedding_format?: 'int8' | 'float32'`\n  Embedding format: 'int8' (quantized, 4x smaller, default for efficiency), 'float32' (full precision, recommended for CoreML/ANE fp16 models). Only applies to Tier1; Tier0 always uses float32 when embeddings are included.\n\n- `external_user_id?: string`\n  Optional external user ID to filter tiers by a specific external user. If both user_id and external_user_id are provided, user_id takes precedence.\n\n- `include_embeddings?: boolean`\n  Include embeddings in the response. Format controlled by embedding_format parameter.\n\n- `max_tier0?: number`\n  Max Tier 0 items (goals/OKRs/use-cases)\n\n- `max_tier1?: number`\n  Max Tier 1 items (hot memories)\n\n- `namespace_id?: string`\n  Optional namespace ID for multi-tenant scoping. When provided, tiers are scoped to memories within this namespace.\n\n- `organization_id?: string`\n  Optional organization ID for multi-tenant scoping. When provided, tiers are scoped to memories within this organization.\n\n- `user_id?: string`\n  Optional internal user ID to filter tiers by a specific user. If not provided, results are not filtered by user. If both user_id and external_user_id are provided, user_id takes precedence.\n\n- `workspace_id?: string`\n  Optional workspace id to scope tiers\n\n### Returns\n\n- `{ code?: number; details?: object; error?: string; has_more?: boolean; next_cursor?: string; status?: string; tier0?: { id: string; acl: object; content: string; type: string; user_id: string; category?: string; context?: context_item[]; conversation_id?: string; createdAt?: string; current_step?: string; customMetadata?: object; embedding?: number[]; embedding_int8?: number[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; file_url?: string; filename?: string; hierarchical_structures?: string; location?: string; metadata?: string | object; metrics?: object; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; page?: string; page_number?: number; popularity_score?: number; recency_score?: number; relevance_score?: number; reranker_confidence?: number; reranker_score?: number; reranker_type?: string; role?: string; role_read_access?: string[]; role_write_access?: string[]; similarity_score?: number; source_document_id?: string; source_message_id?: string; source_type?: string; source_url?: string; steps?: string[]; tags?: string[]; title?: string; topics?: string[]; total_pages?: number; totalProcessingCost?: number; updatedAt?: string; user_read_access?: string[]; user_write_access?: string[]; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }[]; tier1?: { id: string; acl: object; content: string; type: string; user_id: string; category?: string; context?: context_item[]; conversation_id?: string; createdAt?: string; current_step?: string; customMetadata?: object; embedding?: number[]; embedding_int8?: number[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; file_url?: string; filename?: string; hierarchical_structures?: string; location?: string; metadata?: string | object; metrics?: object; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; page?: string; page_number?: number; popularity_score?: number; recency_score?: number; relevance_score?: number; reranker_confidence?: number; reranker_score?: number; reranker_type?: string; role?: string; role_read_access?: string[]; role_write_access?: string[]; similarity_score?: number; source_document_id?: string; source_message_id?: string; source_type?: string; source_url?: string; steps?: string[]; tags?: string[]; title?: string; topics?: string[]; total_pages?: number; totalProcessingCost?: number; updatedAt?: string; user_read_access?: string[]; user_write_access?: string[]; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }[]; transitions?: object[]; }`\n  Response model for sync tiers endpoint\n\n  - `code?: number`\n  - `details?: object`\n  - `error?: string`\n  - `has_more?: boolean`\n  - `next_cursor?: string`\n  - `status?: string`\n  - `tier0?: { id: string; acl: object; content: string; type: string; user_id: string; category?: string; context?: { content: string; role: 'user' | 'assistant'; }[]; conversation_id?: string; createdAt?: string; current_step?: string; customMetadata?: object; embedding?: number[]; embedding_int8?: number[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; file_url?: string; filename?: string; hierarchical_structures?: string; location?: string; metadata?: string | object; metrics?: object; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; page?: string; page_number?: number; popularity_score?: number; recency_score?: number; relevance_score?: number; reranker_confidence?: number; reranker_score?: number; reranker_type?: string; role?: string; role_read_access?: string[]; role_write_access?: string[]; similarity_score?: number; source_document_id?: string; source_message_id?: string; source_type?: string; source_url?: string; steps?: string[]; tags?: string[]; title?: string; topics?: string[]; total_pages?: number; totalProcessingCost?: number; updatedAt?: string; user_read_access?: string[]; user_write_access?: string[]; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }[]`\n  - `tier1?: { id: string; acl: object; content: string; type: string; user_id: string; category?: string; context?: { content: string; role: 'user' | 'assistant'; }[]; conversation_id?: string; createdAt?: string; current_step?: string; customMetadata?: object; embedding?: number[]; embedding_int8?: number[]; external_user_id?: string; external_user_read_access?: string[]; external_user_write_access?: string[]; file_url?: string; filename?: string; hierarchical_structures?: string; location?: string; metadata?: string | object; metrics?: object; namespace_id?: string; namespace_read_access?: string[]; namespace_write_access?: string[]; organization_id?: string; organization_read_access?: string[]; organization_write_access?: string[]; page?: string; page_number?: number; popularity_score?: number; recency_score?: number; relevance_score?: number; reranker_confidence?: number; reranker_score?: number; reranker_type?: string; role?: string; role_read_access?: string[]; role_write_access?: string[]; similarity_score?: number; source_document_id?: string; source_message_id?: string; source_type?: string; source_url?: string; steps?: string[]; tags?: string[]; title?: string; topics?: string[]; total_pages?: number; totalProcessingCost?: number; updatedAt?: string; user_read_access?: string[]; user_write_access?: string[]; workspace_id?: string; workspace_read_access?: string[]; workspace_write_access?: string[]; }[]`\n  - `transitions?: object[]`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.sync.getTiers();\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          "curl https://memory.papr.ai/v1/sync/tiers \\\n    -H 'Content-Type: application/json' \\\n    -H \"X-API-Key: $PAPR_MEMORY_API_KEY\" \\\n    -d '{}'",
      },
      python: {
        method: 'sync.get_tiers',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.sync.get_tiers()\nprint(response.code)',
      },
      typescript: {
        method: 'client.sync.getTiers',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.sync.getTiers();\n\nconsole.log(response.code);",
      },
    },
  },
  {
    name: 'get_delta',
    endpoint: '/v1/sync/delta',
    httpMethod: 'get',
    summary: 'Get Sync Delta',
    description:
      'Return upserts/deletes since the provided cursor for a user/workspace.\nCursor is an opaque watermark over updatedAt and objectId.',
    stainlessPath: '(resource) sync > (method) get_delta',
    qualified: 'client.sync.getDelta',
    params: [
      'cursor?: string;',
      'include_embeddings?: boolean;',
      'limit?: number;',
      'workspace_id?: string;',
    ],
    response: 'object',
    markdown:
      "## get_delta\n\n`client.sync.getDelta(cursor?: string, include_embeddings?: boolean, limit?: number, workspace_id?: string): object`\n\n**get** `/v1/sync/delta`\n\nReturn upserts/deletes since the provided cursor for a user/workspace.\nCursor is an opaque watermark over updatedAt and objectId.\n\n### Parameters\n\n- `cursor?: string`\n  Opaque cursor from previous sync\n\n- `include_embeddings?: boolean`\n\n- `limit?: number`\n\n- `workspace_id?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.sync.getDelta();\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example: 'curl https://memory.papr.ai/v1/sync/delta \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'sync.get_delta',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.sync.get_delta()\nprint(response)',
      },
      typescript: {
        method: 'client.sync.getDelta',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.sync.getDelta();\n\nconsole.log(response);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/namespace',
    httpMethod: 'post',
    summary: 'Create Namespace',
    description: "Create a new namespace within the developer's organization.",
    stainlessPath: '(resource) namespace > (method) create',
    qualified: 'client.namespace.create',
    params: [
      'name: string;',
      "environment_type?: 'development' | 'staging' | 'production';",
      'is_active?: boolean;',
      'rate_limits?: object;',
    ],
    response:
      '{ code?: number; data?: { createdAt?: string; environment_type?: string; is_active?: boolean; memoriesCount?: number; name?: string; objectId?: string; organization_id?: string; rate_limits?: object; storageCount?: number; updatedAt?: string; }; details?: object; error?: string; status?: string; }',
    markdown:
      "## create\n\n`client.namespace.create(name: string, environment_type?: 'development' | 'staging' | 'production', is_active?: boolean, rate_limits?: object): { code?: number; data?: object; details?: object; error?: string; status?: string; }`\n\n**post** `/v1/namespace`\n\nCreate a new namespace within the developer's organization.\n\n### Parameters\n\n- `name: string`\n  Namespace name (e.g., 'acme-production')\n\n- `environment_type?: 'development' | 'staging' | 'production'`\n  Environment type: development, staging, production\n\n- `is_active?: boolean`\n  Whether this namespace is active\n\n- `rate_limits?: object`\n  Rate limits for this namespace (None values inherit from organization)\n\n### Returns\n\n- `{ code?: number; data?: { createdAt?: string; environment_type?: string; is_active?: boolean; memoriesCount?: number; name?: string; objectId?: string; organization_id?: string; rate_limits?: object; storageCount?: number; updatedAt?: string; }; details?: object; error?: string; status?: string; }`\n  Response for single-namespace operations (create, get, update).\n\n  - `code?: number`\n  - `data?: { createdAt?: string; environment_type?: string; is_active?: boolean; memoriesCount?: number; name?: string; objectId?: string; organization_id?: string; rate_limits?: object; storageCount?: number; updatedAt?: string; }`\n  - `details?: object`\n  - `error?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst namespace = await client.namespace.create({ name: 'acme-production' });\n\nconsole.log(namespace);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/namespace \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "name": "acme-production"\n        }\'',
      },
      python: {
        method: 'namespace.create',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nnamespace = client.namespace.create(\n    name="acme-production",\n)\nprint(namespace.code)',
      },
      typescript: {
        method: 'client.namespace.create',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst namespace = await client.namespace.create({ name: 'acme-production' });\n\nconsole.log(namespace.code);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/namespace',
    httpMethod: 'get',
    summary: 'List Namespaces',
    description: "List namespaces for the developer's organization.",
    stainlessPath: '(resource) namespace > (method) list',
    qualified: 'client.namespace.list',
    params: ['limit?: number;', 'skip?: number;'],
    response:
      '{ code?: number; data?: { createdAt?: string; environment_type?: string; is_active?: boolean; memoriesCount?: number; name?: string; objectId?: string; organization_id?: string; rate_limits?: object; storageCount?: number; updatedAt?: string; }[]; details?: object; error?: string; page?: number; page_size?: number; status?: string; total?: number; }',
    markdown:
      "## list\n\n`client.namespace.list(limit?: number, skip?: number): { code?: number; data?: object[]; details?: object; error?: string; page?: number; page_size?: number; status?: string; total?: number; }`\n\n**get** `/v1/namespace`\n\nList namespaces for the developer's organization.\n\n### Parameters\n\n- `limit?: number`\n  Max items to return\n\n- `skip?: number`\n  Number of items to skip\n\n### Returns\n\n- `{ code?: number; data?: { createdAt?: string; environment_type?: string; is_active?: boolean; memoriesCount?: number; name?: string; objectId?: string; organization_id?: string; rate_limits?: object; storageCount?: number; updatedAt?: string; }[]; details?: object; error?: string; page?: number; page_size?: number; status?: string; total?: number; }`\n  Response for listing namespaces with pagination.\n\n  - `code?: number`\n  - `data?: { createdAt?: string; environment_type?: string; is_active?: boolean; memoriesCount?: number; name?: string; objectId?: string; organization_id?: string; rate_limits?: object; storageCount?: number; updatedAt?: string; }[]`\n  - `details?: object`\n  - `error?: string`\n  - `page?: number`\n  - `page_size?: number`\n  - `status?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst namespaces = await client.namespace.list();\n\nconsole.log(namespaces);\n```",
    perLanguage: {
      http: {
        example: 'curl https://memory.papr.ai/v1/namespace \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'namespace.list',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nnamespaces = client.namespace.list()\nprint(namespaces.code)',
      },
      typescript: {
        method: 'client.namespace.list',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst namespaces = await client.namespace.list();\n\nconsole.log(namespaces.code);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/namespace/{namespace_id}',
    httpMethod: 'get',
    summary: 'Get Namespace',
    description: 'Retrieve a single namespace by ID.',
    stainlessPath: '(resource) namespace > (method) retrieve',
    qualified: 'client.namespace.retrieve',
    params: ['namespace_id: string;'],
    response:
      '{ code?: number; data?: { createdAt?: string; environment_type?: string; is_active?: boolean; memoriesCount?: number; name?: string; objectId?: string; organization_id?: string; rate_limits?: object; storageCount?: number; updatedAt?: string; }; details?: object; error?: string; status?: string; }',
    markdown:
      "## retrieve\n\n`client.namespace.retrieve(namespace_id: string): { code?: number; data?: object; details?: object; error?: string; status?: string; }`\n\n**get** `/v1/namespace/{namespace_id}`\n\nRetrieve a single namespace by ID.\n\n### Parameters\n\n- `namespace_id: string`\n\n### Returns\n\n- `{ code?: number; data?: { createdAt?: string; environment_type?: string; is_active?: boolean; memoriesCount?: number; name?: string; objectId?: string; organization_id?: string; rate_limits?: object; storageCount?: number; updatedAt?: string; }; details?: object; error?: string; status?: string; }`\n  Response for single-namespace operations (create, get, update).\n\n  - `code?: number`\n  - `data?: { createdAt?: string; environment_type?: string; is_active?: boolean; memoriesCount?: number; name?: string; objectId?: string; organization_id?: string; rate_limits?: object; storageCount?: number; updatedAt?: string; }`\n  - `details?: object`\n  - `error?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst namespace = await client.namespace.retrieve('namespace_id');\n\nconsole.log(namespace);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/namespace/$NAMESPACE_ID \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'namespace.retrieve',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nnamespace = client.namespace.retrieve(\n    "namespace_id",\n)\nprint(namespace.code)',
      },
      typescript: {
        method: 'client.namespace.retrieve',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst namespace = await client.namespace.retrieve('namespace_id');\n\nconsole.log(namespace.code);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/namespace/{namespace_id}',
    httpMethod: 'put',
    summary: 'Update Namespace',
    description: 'Update an existing namespace.',
    stainlessPath: '(resource) namespace > (method) update',
    qualified: 'client.namespace.update',
    params: [
      'namespace_id: string;',
      "environment_type?: 'development' | 'staging' | 'production';",
      'is_active?: boolean;',
      'name?: string;',
      'rate_limits?: object;',
    ],
    response:
      '{ code?: number; data?: { createdAt?: string; environment_type?: string; is_active?: boolean; memoriesCount?: number; name?: string; objectId?: string; organization_id?: string; rate_limits?: object; storageCount?: number; updatedAt?: string; }; details?: object; error?: string; status?: string; }',
    markdown:
      "## update\n\n`client.namespace.update(namespace_id: string, environment_type?: 'development' | 'staging' | 'production', is_active?: boolean, name?: string, rate_limits?: object): { code?: number; data?: object; details?: object; error?: string; status?: string; }`\n\n**put** `/v1/namespace/{namespace_id}`\n\nUpdate an existing namespace.\n\n### Parameters\n\n- `namespace_id: string`\n\n- `environment_type?: 'development' | 'staging' | 'production'`\n  Environment types for namespaces\n\n- `is_active?: boolean`\n  Whether this namespace is active\n\n- `name?: string`\n  Updated namespace name\n\n- `rate_limits?: object`\n  Updated rate limits (None values inherit from organization)\n\n### Returns\n\n- `{ code?: number; data?: { createdAt?: string; environment_type?: string; is_active?: boolean; memoriesCount?: number; name?: string; objectId?: string; organization_id?: string; rate_limits?: object; storageCount?: number; updatedAt?: string; }; details?: object; error?: string; status?: string; }`\n  Response for single-namespace operations (create, get, update).\n\n  - `code?: number`\n  - `data?: { createdAt?: string; environment_type?: string; is_active?: boolean; memoriesCount?: number; name?: string; objectId?: string; organization_id?: string; rate_limits?: object; storageCount?: number; updatedAt?: string; }`\n  - `details?: object`\n  - `error?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst namespace = await client.namespace.update('namespace_id');\n\nconsole.log(namespace);\n```",
    perLanguage: {
      http: {
        example:
          "curl https://memory.papr.ai/v1/namespace/$NAMESPACE_ID \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"X-API-Key: $PAPR_MEMORY_API_KEY\" \\\n    -d '{}'",
      },
      python: {
        method: 'namespace.update',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nnamespace = client.namespace.update(\n    namespace_id="namespace_id",\n)\nprint(namespace.code)',
      },
      typescript: {
        method: 'client.namespace.update',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst namespace = await client.namespace.update('namespace_id');\n\nconsole.log(namespace.code);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/namespace/{namespace_id}',
    httpMethod: 'delete',
    summary: 'Delete Namespace',
    description:
      'Delete a namespace and optionally cascade-delete all memories, Neo4j nodes, and ACL references associated with it.',
    stainlessPath: '(resource) namespace > (method) delete',
    qualified: 'client.namespace.delete',
    params: [
      'namespace_id: string;',
      'delete_memories?: boolean;',
      'delete_neo4j_nodes?: boolean;',
      'remove_acl_references?: boolean;',
    ],
    response:
      '{ cascade?: { acl_read_cleaned?: number; acl_write_cleaned?: number; memories_deleted?: number; memories_failed?: number; neo4j_nodes_deleted?: number; }; code?: number; details?: object; error?: string; message?: string; namespace_id?: string; status?: string; }',
    markdown:
      "## delete\n\n`client.namespace.delete(namespace_id: string, delete_memories?: boolean, delete_neo4j_nodes?: boolean, remove_acl_references?: boolean): { cascade?: object; code?: number; details?: object; error?: string; message?: string; namespace_id?: string; status?: string; }`\n\n**delete** `/v1/namespace/{namespace_id}`\n\nDelete a namespace and optionally cascade-delete all memories, Neo4j nodes, and ACL references associated with it.\n\n### Parameters\n\n- `namespace_id: string`\n\n- `delete_memories?: boolean`\n  Delete all memories in this namespace\n\n- `delete_neo4j_nodes?: boolean`\n  Delete all Neo4j nodes in this namespace\n\n- `remove_acl_references?: boolean`\n  Remove namespace from ACL arrays on remaining nodes\n\n### Returns\n\n- `{ cascade?: { acl_read_cleaned?: number; acl_write_cleaned?: number; memories_deleted?: number; memories_failed?: number; neo4j_nodes_deleted?: number; }; code?: number; details?: object; error?: string; message?: string; namespace_id?: string; status?: string; }`\n  Response for DELETE /v1/namespace/{namespace_id} with cascade results.\n\n  - `cascade?: { acl_read_cleaned?: number; acl_write_cleaned?: number; memories_deleted?: number; memories_failed?: number; neo4j_nodes_deleted?: number; }`\n  - `code?: number`\n  - `details?: object`\n  - `error?: string`\n  - `message?: string`\n  - `namespace_id?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst namespace = await client.namespace.delete('namespace_id');\n\nconsole.log(namespace);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/namespace/$NAMESPACE_ID \\\n    -X DELETE \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'namespace.delete',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nnamespace = client.namespace.delete(\n    namespace_id="namespace_id",\n)\nprint(namespace.namespace_id)',
      },
      typescript: {
        method: 'client.namespace.delete',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst namespace = await client.namespace.delete('namespace_id');\n\nconsole.log(namespace.namespace_id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/frequencies',
    httpMethod: 'get',
    summary: 'List all frequency schemas',
    description:
      'Returns all built-in frequency schemas with their field definitions and operational configuration. Use the schema_id or a shorthand alias when adding or searching memories with holographic embedding enabled.',
    stainlessPath: '(resource) frequencies > (method) list',
    qualified: 'client.frequencies.list',
    response:
      '{ schemas: { config: { contrast_gamma?: number; cross_encoder_model?: string; cross_encoder_topk?: number; default_scoring_method?: string; dspy_model_path?: string; enable_entailment_rerank?: boolean; llm_metadata_model?: string; qdrant_topk?: number; use_adaptive_weights?: boolean; use_complex_interference?: boolean; use_sparse_weights?: boolean; weight_mode?: string; }; domain: string; frequencies: { frequency_hz: number; name: string; type: string; description?: string; weight?: number; }[]; name: string; num_frequencies: number; schema_id: string; version: string; description?: string; }[]; total: number; shortcuts?: object; success?: boolean; }',
    markdown:
      "## list\n\n`client.frequencies.list(): { schemas: object[]; total: number; shortcuts?: object; success?: boolean; }`\n\n**get** `/v1/frequencies`\n\nReturns all built-in frequency schemas with their field definitions and operational configuration. Use the schema_id or a shorthand alias when adding or searching memories with holographic embedding enabled.\n\n### Returns\n\n- `{ schemas: { config: { contrast_gamma?: number; cross_encoder_model?: string; cross_encoder_topk?: number; default_scoring_method?: string; dspy_model_path?: string; enable_entailment_rerank?: boolean; llm_metadata_model?: string; qdrant_topk?: number; use_adaptive_weights?: boolean; use_complex_interference?: boolean; use_sparse_weights?: boolean; weight_mode?: string; }; domain: string; frequencies: { frequency_hz: number; name: string; type: string; description?: string; weight?: number; }[]; name: string; num_frequencies: number; schema_id: string; version: string; description?: string; }[]; total: number; shortcuts?: object; success?: boolean; }`\n  Response for listing all frequency schemas.\n\n  - `schemas: { config: { contrast_gamma?: number; cross_encoder_model?: string; cross_encoder_topk?: number; default_scoring_method?: string; dspy_model_path?: string; enable_entailment_rerank?: boolean; llm_metadata_model?: string; qdrant_topk?: number; use_adaptive_weights?: boolean; use_complex_interference?: boolean; use_sparse_weights?: boolean; weight_mode?: string; }; domain: string; frequencies: { frequency_hz: number; name: string; type: string; description?: string; weight?: number; }[]; name: string; num_frequencies: number; schema_id: string; version: string; description?: string; }[]`\n  - `total: number`\n  - `shortcuts?: object`\n  - `success?: boolean`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst frequencies = await client.frequencies.list();\n\nconsole.log(frequencies);\n```",
    perLanguage: {
      http: {
        example: 'curl https://memory.papr.ai/v1/frequencies \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'frequencies.list',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nfrequencies = client.frequencies.list()\nprint(frequencies.schemas)',
      },
      typescript: {
        method: 'client.frequencies.list',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst frequencies = await client.frequencies.list();\n\nconsole.log(frequencies.schemas);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/frequencies/{frequency_schema_id}',
    httpMethod: 'get',
    summary: 'Get a frequency schema by ID or shorthand',
    description:
      "Retrieve a specific frequency schema by its full ID (e.g. 'code_search:cosqa:2.0.0') or shorthand alias (e.g. 'cosqa').",
    stainlessPath: '(resource) frequencies > (method) retrieve',
    qualified: 'client.frequencies.retrieve',
    params: ['frequency_schema_id: string;'],
    response:
      '{ config: { contrast_gamma?: number; cross_encoder_model?: string; cross_encoder_topk?: number; default_scoring_method?: string; dspy_model_path?: string; enable_entailment_rerank?: boolean; llm_metadata_model?: string; qdrant_topk?: number; use_adaptive_weights?: boolean; use_complex_interference?: boolean; use_sparse_weights?: boolean; weight_mode?: string; }; domain: string; frequencies: { frequency_hz: number; name: string; type: string; description?: string; weight?: number; }[]; name: string; num_frequencies: number; schema_id: string; version: string; description?: string; }',
    markdown:
      "## retrieve\n\n`client.frequencies.retrieve(frequency_schema_id: string): { config: object; domain: string; frequencies: object[]; name: string; num_frequencies: number; schema_id: string; version: string; description?: string; }`\n\n**get** `/v1/frequencies/{frequency_schema_id}`\n\nRetrieve a specific frequency schema by its full ID (e.g. 'code_search:cosqa:2.0.0') or shorthand alias (e.g. 'cosqa').\n\n### Parameters\n\n- `frequency_schema_id: string`\n\n### Returns\n\n- `{ config: { contrast_gamma?: number; cross_encoder_model?: string; cross_encoder_topk?: number; default_scoring_method?: string; dspy_model_path?: string; enable_entailment_rerank?: boolean; llm_metadata_model?: string; qdrant_topk?: number; use_adaptive_weights?: boolean; use_complex_interference?: boolean; use_sparse_weights?: boolean; weight_mode?: string; }; domain: string; frequencies: { frequency_hz: number; name: string; type: string; description?: string; weight?: number; }[]; name: string; num_frequencies: number; schema_id: string; version: string; description?: string; }`\n  Full frequency schema with fields and config.\n\n  - `config: { contrast_gamma?: number; cross_encoder_model?: string; cross_encoder_topk?: number; default_scoring_method?: string; dspy_model_path?: string; enable_entailment_rerank?: boolean; llm_metadata_model?: string; qdrant_topk?: number; use_adaptive_weights?: boolean; use_complex_interference?: boolean; use_sparse_weights?: boolean; weight_mode?: string; }`\n  - `domain: string`\n  - `frequencies: { frequency_hz: number; name: string; type: string; description?: string; weight?: number; }[]`\n  - `name: string`\n  - `num_frequencies: number`\n  - `schema_id: string`\n  - `version: string`\n  - `description?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst frequency = await client.frequencies.retrieve('frequency_schema_id');\n\nconsole.log(frequency);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/frequencies/$FREQUENCY_SCHEMA_ID \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'frequencies.retrieve',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nfrequency = client.frequencies.retrieve(\n    "frequency_schema_id",\n)\nprint(frequency.schema_id)',
      },
      typescript: {
        method: 'client.frequencies.retrieve',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst frequency = await client.frequencies.retrieve('frequency_schema_id');\n\nconsole.log(frequency.schema_id);",
      },
    },
  },
  {
    name: 'rerank',
    endpoint: '/v1/holographic/rerank',
    httpMethod: 'post',
    summary: 'Rerank search results using holographic scoring',
    description:
      'The simplest entry point — zero infrastructure needed. Send your search query and candidate results, get back better-ranked results using CAESAR ensemble. \n\n**Auto-detection:** candidates with `phases` use the fast path (~2-5ms each). Candidates with only `content` use the cold path (~100ms each, includes LLM extraction). You can mix both in a single request.',
    stainlessPath: '(resource) holographic > (method) rerank',
    qualified: 'client.holographic.rerank',
    params: [
      'candidates: { id: string; content?: string; embedding?: number[]; phases?: number[]; score?: number; }[];',
      'query: string;',
      'domain?: string;',
      'frequency_schema_id?: string;',
      "options?: { ensemble?: 'auto' | 'caesar_8' | 'caesar_9'; return_scores?: boolean; scoring_method?: string; use_cross_encoder?: boolean; };",
      'query_embedding?: number[];',
      'top_k?: number;',
    ],
    response:
      '{ data: { domain: string; ensemble_used: string; rankings: { id: string; path: string; rank: number; score: number; original_score?: number; scores?: object; }[]; timing_ms: number; optimization_hint?: string; }; status?: string; }',
    markdown:
      "## rerank\n\n`client.holographic.rerank(candidates: { id: string; content?: string; embedding?: number[]; phases?: number[]; score?: number; }[], query: string, domain?: string, frequency_schema_id?: string, options?: { ensemble?: 'auto' | 'caesar_8' | 'caesar_9'; return_scores?: boolean; scoring_method?: string; use_cross_encoder?: boolean; }, query_embedding?: number[], top_k?: number): { data: object; status?: string; }`\n\n**post** `/v1/holographic/rerank`\n\nThe simplest entry point — zero infrastructure needed. Send your search query and candidate results, get back better-ranked results using CAESAR ensemble. \n\n**Auto-detection:** candidates with `phases` use the fast path (~2-5ms each). Candidates with only `content` use the cold path (~100ms each, includes LLM extraction). You can mix both in a single request.\n\n### Parameters\n\n- `candidates: { id: string; content?: string; embedding?: number[]; phases?: number[]; score?: number; }[]`\n  Candidate documents to rerank (max 100)\n\n- `query: string`\n  The search query text\n\n- `domain?: string`\n  Domain for frequency schema\n\n- `frequency_schema_id?: string`\n  Schema override\n\n- `options?: { ensemble?: 'auto' | 'caesar_8' | 'caesar_9'; return_scores?: boolean; scoring_method?: string; use_cross_encoder?: boolean; }`\n  Options for the rerank endpoint.\n  - `ensemble?: 'auto' | 'caesar_8' | 'caesar_9'`\n    Ensemble method: 'auto' (recommended), 'caesar_8', or 'caesar_9'\n  - `return_scores?: boolean`\n    Include per-method score breakdown in response\n  - `scoring_method?: string`\n    Specific scoring method from 160+ available (power user). Overrides ensemble.\n  - `use_cross_encoder?: boolean`\n    Enable cross-encoder scoring. Requires content on candidates.\n\n- `query_embedding?: number[]`\n  Query embedding in the same space as candidate embeddings. If provided, used for cosine similarity. If omitted, computed server-side (Qwen 2560d).\n\n- `top_k?: number`\n  Number of results to return\n\n### Returns\n\n- `{ data: { domain: string; ensemble_used: string; rankings: { id: string; path: string; rank: number; score: number; original_score?: number; scores?: object; }[]; timing_ms: number; optimization_hint?: string; }; status?: string; }`\n  Response for POST /v1/holographic/rerank\n\n  - `data: { domain: string; ensemble_used: string; rankings: { id: string; path: string; rank: number; score: number; original_score?: number; scores?: object; }[]; timing_ms: number; optimization_hint?: string; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.holographic.rerank({ candidates: [{ id: 'doc_1' }, { id: 'doc_2' }], query: 'How does troponin relate to myocardial infarction?' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/holographic/rerank \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "candidates": [\n            {\n              "id": "doc_1",\n              "content": "Troponin is a cardiac biomarker released during myocardial injury..."\n            },\n            {\n              "id": "doc_2",\n              "content": "Aspirin reduces platelet aggregation..."\n            }\n          ],\n          "query": "How does troponin relate to myocardial infarction?"\n        }\'',
      },
      python: {
        method: 'holographic.rerank',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.holographic.rerank(\n    candidates=[{\n        "id": "doc_1"\n    }, {\n        "id": "doc_2"\n    }],\n    query="How does troponin relate to myocardial infarction?",\n)\nprint(response.data)',
      },
      typescript: {
        method: 'client.holographic.rerank',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.holographic.rerank({\n  candidates: [{ id: 'doc_1' }, { id: 'doc_2' }],\n  query: 'How does troponin relate to myocardial infarction?',\n});\n\nconsole.log(response.data);",
      },
    },
  },
  {
    name: 'extract_metadata',
    endpoint: '/v1/holographic/metadata',
    httpMethod: 'post',
    summary: 'Extract metadata only (for on-device transform)',
    description:
      'Extracts frequency metadata from text content without requiring an embedding. Returns metadata + phases that can be used with the on-device SDK for local transforms. Call this once per document at index time, then use phases locally for scoring.',
    stainlessPath: '(resource) holographic > (method) extract_metadata',
    qualified: 'client.holographic.extractMetadata',
    params: ['content: string;', 'domain?: string;', 'frequency_schema_id?: string;'],
    response:
      '{ data: { domain: string; frequency_schema_id: string; metadata: object; phases: number[]; timing_ms: number; }; status?: string; }',
    markdown:
      "## extract_metadata\n\n`client.holographic.extractMetadata(content: string, domain?: string, frequency_schema_id?: string): { data: object; status?: string; }`\n\n**post** `/v1/holographic/metadata`\n\nExtracts frequency metadata from text content without requiring an embedding. Returns metadata + phases that can be used with the on-device SDK for local transforms. Call this once per document at index time, then use phases locally for scoring.\n\n### Parameters\n\n- `content: string`\n  Text content for metadata extraction\n\n- `domain?: string`\n  Domain for frequency schema\n\n- `frequency_schema_id?: string`\n  Schema override\n\n### Returns\n\n- `{ data: { domain: string; frequency_schema_id: string; metadata: object; phases: number[]; timing_ms: number; }; status?: string; }`\n  Response for POST /v1/holographic/metadata\n\n  - `data: { domain: string; frequency_schema_id: string; metadata: object; phases: number[]; timing_ms: number; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.holographic.extractMetadata({ content: 'content' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/holographic/metadata \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "content": "content"\n        }\'',
      },
      python: {
        method: 'holographic.extract_metadata',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.holographic.extract_metadata(\n    content="content",\n)\nprint(response.data)',
      },
      typescript: {
        method: 'client.holographic.extractMetadata',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.holographic.extractMetadata({ content: 'content' });\n\nconsole.log(response.data);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/holographic/transform',
    httpMethod: 'post',
    summary: 'Transform text + embedding into holographic embeddings',
    description:
      'Core BYOE endpoint. Send text content and your base embedding (any dimensions) to get back holographic-transformed embeddings. Use `output` to control which fields are returned. Default: rotation_v3 + metadata.',
    stainlessPath: '(resource) holographic.transform > (method) create',
    qualified: 'client.holographic.transform.create',
    params: [
      'content: string;',
      'embedding: number[];',
      'domain?: string;',
      'frequency_schema_id?: string;',
      'output?: string[];',
    ],
    response:
      '{ data: { base_dim: number; domain: string; frequency_schema_id: string; timing_ms: number; base?: number[]; concat?: number[]; metadata?: object; metadata_embeddings?: object; phases?: number[]; rotation_v1?: number[]; rotation_v2?: number[]; rotation_v3?: number[]; }; status?: string; }',
    markdown:
      "## create\n\n`client.holographic.transform.create(content: string, embedding: number[], domain?: string, frequency_schema_id?: string, output?: string[]): { data: object; status?: string; }`\n\n**post** `/v1/holographic/transform`\n\nCore BYOE endpoint. Send text content and your base embedding (any dimensions) to get back holographic-transformed embeddings. Use `output` to control which fields are returned. Default: rotation_v3 + metadata.\n\n### Parameters\n\n- `content: string`\n  Text content for LLM metadata extraction\n\n- `embedding: number[]`\n  Base embedding vector (any dimensionality)\n\n- `domain?: string`\n  Domain for frequency schema selection (e.g. 'biomedical', 'code', 'general')\n\n- `frequency_schema_id?: string`\n  Specific frequency schema ID override (e.g. 'biomedical:scifact:2.0.0'). Takes precedence over domain.\n\n- `output?: string[]`\n  Which output fields to return. Default: ['rotation_v3', 'metadata']. Request only what you need to minimize response size.\n\n### Returns\n\n- `{ data: { base_dim: number; domain: string; frequency_schema_id: string; timing_ms: number; base?: number[]; concat?: number[]; metadata?: object; metadata_embeddings?: object; phases?: number[]; rotation_v1?: number[]; rotation_v2?: number[]; rotation_v3?: number[]; }; status?: string; }`\n  Response for POST /v1/holographic/transform\n\n  - `data: { base_dim: number; domain: string; frequency_schema_id: string; timing_ms: number; base?: number[]; concat?: number[]; metadata?: object; metadata_embeddings?: object; phases?: number[]; rotation_v1?: number[]; rotation_v2?: number[]; rotation_v3?: number[]; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst transform = await client.holographic.transform.create({ content: 'The patient presents with elevated troponin levels indicating myocardial damage', embedding: [0.1, -0.2, 0.3] });\n\nconsole.log(transform);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/holographic/transform \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "content": "The patient presents with elevated troponin levels indicating myocardial damage",\n          "embedding": [\n            0.1,\n            -0.2,\n            0.3\n          ]\n        }\'',
      },
      python: {
        method: 'holographic.transform.create',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\ntransform = client.holographic.transform.create(\n    content="The patient presents with elevated troponin levels indicating myocardial damage",\n    embedding=[0.1, -0.2, 0.3],\n)\nprint(transform.data)',
      },
      typescript: {
        method: 'client.holographic.transform.create',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst transform = await client.holographic.transform.create({\n  content: 'The patient presents with elevated troponin levels indicating myocardial damage',\n  embedding: [0.1, -0.2, 0.3],\n});\n\nconsole.log(transform.data);",
      },
    },
  },
  {
    name: 'create_batch',
    endpoint: '/v1/holographic/transform/batch',
    httpMethod: 'post',
    summary: 'Batch transform multiple items',
    description: 'Transform up to 50 items in a single request. Same as /transform but batched.',
    stainlessPath: '(resource) holographic.transform > (method) create_batch',
    qualified: 'client.holographic.transform.createBatch',
    params: [
      'items: { id: string; content: string; embedding: number[]; }[];',
      'domain?: string;',
      'frequency_schema_id?: string;',
      'output?: string[];',
    ],
    response:
      '{ results: { id: string; data: { base_dim: number; domain: string; frequency_schema_id: string; timing_ms: number; base?: number[]; concat?: number[]; metadata?: object; metadata_embeddings?: object; phases?: number[]; rotation_v1?: number[]; rotation_v2?: number[]; rotation_v3?: number[]; }; }[]; timing_ms: number; total: number; status?: string; }',
    markdown:
      "## create_batch\n\n`client.holographic.transform.createBatch(items: { id: string; content: string; embedding: number[]; }[], domain?: string, frequency_schema_id?: string, output?: string[]): { results: object[]; timing_ms: number; total: number; status?: string; }`\n\n**post** `/v1/holographic/transform/batch`\n\nTransform up to 50 items in a single request. Same as /transform but batched.\n\n### Parameters\n\n- `items: { id: string; content: string; embedding: number[]; }[]`\n  Items to transform (max 50)\n\n- `domain?: string`\n  Domain for all items\n\n- `frequency_schema_id?: string`\n  Schema override for all items\n\n- `output?: string[]`\n  Which output fields to return for each item\n\n### Returns\n\n- `{ results: { id: string; data: { base_dim: number; domain: string; frequency_schema_id: string; timing_ms: number; base?: number[]; concat?: number[]; metadata?: object; metadata_embeddings?: object; phases?: number[]; rotation_v1?: number[]; rotation_v2?: number[]; rotation_v3?: number[]; }; }[]; timing_ms: number; total: number; status?: string; }`\n  Response for POST /v1/holographic/transform/batch\n\n  - `results: { id: string; data: { base_dim: number; domain: string; frequency_schema_id: string; timing_ms: number; base?: number[]; concat?: number[]; metadata?: object; metadata_embeddings?: object; phases?: number[]; rotation_v1?: number[]; rotation_v2?: number[]; rotation_v3?: number[]; }; }[]`\n  - `timing_ms: number`\n  - `total: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst response = await client.holographic.transform.createBatch({ items: [{\n  id: 'id',\n  content: 'content',\n  embedding: [0],\n}] });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/holographic/transform/batch \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "items": [\n            {\n              "id": "id",\n              "content": "content",\n              "embedding": [\n                0\n              ]\n            }\n          ]\n        }\'',
      },
      python: {
        method: 'holographic.transform.create_batch',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.holographic.transform.create_batch(\n    items=[{\n        "id": "id",\n        "content": "content",\n        "embedding": [0],\n    }],\n)\nprint(response.results)',
      },
      typescript: {
        method: 'client.holographic.transform.createBatch',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.holographic.transform.createBatch({\n  items: [\n    {\n      id: 'id',\n      content: 'content',\n      embedding: [0],\n    },\n  ],\n});\n\nconsole.log(response.results);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/holographic/domains',
    httpMethod: 'get',
    summary: 'List available holographic domains',
    description:
      'Returns all available frequency schemas organized by domain. Use the schema_id or domain shortname in transform/rerank calls.',
    stainlessPath: '(resource) holographic.domains > (method) list',
    qualified: 'client.holographic.domains.list',
    response:
      '{ domains: { domain: string; name: string; num_frequencies: number; schema_id: string; description?: string; is_custom?: boolean; }[]; total: number; shortcuts?: object; status?: string; }',
    markdown:
      "## list\n\n`client.holographic.domains.list(): { domains: object[]; total: number; shortcuts?: object; status?: string; }`\n\n**get** `/v1/holographic/domains`\n\nReturns all available frequency schemas organized by domain. Use the schema_id or domain shortname in transform/rerank calls.\n\n### Returns\n\n- `{ domains: { domain: string; name: string; num_frequencies: number; schema_id: string; description?: string; is_custom?: boolean; }[]; total: number; shortcuts?: object; status?: string; }`\n  Response for GET /v1/holographic/domains\n\n  - `domains: { domain: string; name: string; num_frequencies: number; schema_id: string; description?: string; is_custom?: boolean; }[]`\n  - `total: number`\n  - `shortcuts?: object`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst domains = await client.holographic.domains.list();\n\nconsole.log(domains);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/holographic/domains \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY"',
      },
      python: {
        method: 'holographic.domains.list',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\ndomains = client.holographic.domains.list()\nprint(domains.domains)',
      },
      typescript: {
        method: 'client.holographic.domains.list',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst domains = await client.holographic.domains.list();\n\nconsole.log(domains.domains);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/holographic/domains',
    httpMethod: 'post',
    summary: 'Create a custom frequency schema',
    description:
      'Define a custom frequency schema for your specific domain. Maps your metadata fields to the 14 standard brain-inspired frequency bands. Custom schemas are scoped to your API key.',
    stainlessPath: '(resource) holographic.domains > (method) create',
    qualified: 'client.holographic.domains.create',
    params: [
      "fields: { frequency: number; name: string; type: 'enum' | 'free_text' | 'numeric' | 'boolean' | 'date' | 'sequence' | 'multi_value_text'; description?: string; values?: string[]; weight?: number; }[];",
      'name: string;',
      'description?: string;',
    ],
    response: '{ domain: string; num_frequencies: number; schema_id: string; status?: string; }',
    markdown:
      "## create\n\n`client.holographic.domains.create(fields: { frequency: number; name: string; type: 'enum' | 'free_text' | 'numeric' | 'boolean' | 'date' | 'sequence' | 'multi_value_text'; description?: string; values?: string[]; weight?: number; }[], name: string, description?: string): { domain: string; num_frequencies: number; schema_id: string; status?: string; }`\n\n**post** `/v1/holographic/domains`\n\nDefine a custom frequency schema for your specific domain. Maps your metadata fields to the 14 standard brain-inspired frequency bands. Custom schemas are scoped to your API key.\n\n### Parameters\n\n- `fields: { frequency: number; name: string; type: 'enum' | 'free_text' | 'numeric' | 'boolean' | 'date' | 'sequence' | 'multi_value_text'; description?: string; values?: string[]; weight?: number; }[]`\n  Frequency field definitions (1-14 fields, one per frequency band)\n\n- `name: string`\n  Schema name in format 'company:domain:version' (e.g. 'acme:support_tickets:1.0.0')\n\n- `description?: string`\n  Human-readable description\n\n### Returns\n\n- `{ domain: string; num_frequencies: number; schema_id: string; status?: string; }`\n  Response for POST /v1/holographic/domains\n\n  - `domain: string`\n  - `num_frequencies: number`\n  - `schema_id: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Papr from '@papr/memory';\n\nconst client = new Papr();\n\nconst domain = await client.holographic.domains.create({ fields: [{\n  frequency: 4,\n  name: 'priority',\n  type: 'enum',\n}, {\n  frequency: 6,\n  name: 'component',\n  type: 'free_text',\n}, {\n  frequency: 12,\n  name: 'resolution_type',\n  type: 'enum',\n}], name: 'acme:support_tickets:1.0.0' });\n\nconsole.log(domain);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://memory.papr.ai/v1/holographic/domains \\\n    -H \'Content-Type: application/json\' \\\n    -H "X-API-Key: $PAPR_MEMORY_API_KEY" \\\n    -d \'{\n          "fields": [\n            {\n              "frequency": 4,\n              "name": "priority",\n              "type": "enum",\n              "values": [\n                "P0",\n                "P1",\n                "P2",\n                "P3"\n              ],\n              "weight": 0.9\n            },\n            {\n              "frequency": 6,\n              "name": "component",\n              "type": "free_text",\n              "weight": 0.7\n            },\n            {\n              "frequency": 12,\n              "name": "resolution_type",\n              "type": "enum",\n              "values": [\n                "bug_fix",\n                "config",\n                "wontfix"\n              ],\n              "weight": 0.8\n            }\n          ],\n          "name": "acme:support_tickets:1.0.0"\n        }\'',
      },
      python: {
        method: 'holographic.domains.create',
        example:
          'import os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\ndomain = client.holographic.domains.create(\n    fields=[{\n        "frequency": 4,\n        "name": "priority",\n        "type": "enum",\n    }, {\n        "frequency": 6,\n        "name": "component",\n        "type": "free_text",\n    }, {\n        "frequency": 12,\n        "name": "resolution_type",\n        "type": "enum",\n    }],\n    name="acme:support_tickets:1.0.0",\n)\nprint(domain.schema_id)',
      },
      typescript: {
        method: 'client.holographic.domains.create',
        example:
          "import Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst domain = await client.holographic.domains.create({\n  fields: [\n    {\n      frequency: 4,\n      name: 'priority',\n      type: 'enum',\n    },\n    {\n      frequency: 6,\n      name: 'component',\n      type: 'free_text',\n    },\n    {\n      frequency: 12,\n      name: 'resolution_type',\n      type: 'enum',\n    },\n  ],\n  name: 'acme:support_tickets:1.0.0',\n});\n\nconsole.log(domain.schema_id);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Papr Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/papr_memory.svg?label=pypi%20(stable))](https://pypi.org/project/papr_memory/)\n\nThe Papr Python library provides convenient access to the Papr REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Papr MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40papr%2Fmemory-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBwYXByL21lbW9yeS1tY3AiXSwiZW52Ijp7IlBBUFJfTUVNT1JZX0FQSV9LRVkiOiJNeSBYIEFQSSBLZXkiLCJQQVBSX01FTU9SWV9TZXNzaW9uX1Rva2VuIjoiTXkgWCBTZXNzaW9uIFRva2VuIiwiUEFQUl9NRU1PUllfQkVBUkVSX1RPS0VOIjoiTXkgQmVhcmVyIFRva2VuIn19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40papr%2Fmemory-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40papr%2Fmemory-mcp%22%5D%2C%22env%22%3A%7B%22PAPR_MEMORY_API_KEY%22%3A%22My%20X%20API%20Key%22%2C%22PAPR_MEMORY_Session_Token%22%3A%22My%20X%20Session%20Token%22%2C%22PAPR_MEMORY_BEARER_TOKEN%22%3A%22My%20Bearer%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [platform.papr.ai](https://platform.papr.ai). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install papr_memory\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom papr_memory import Papr\n\nclient = Papr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\n\nuser_response = client.user.create(\n    external_id="demo_user_123",\n    email="user@example.com",\n)\nprint(user_response.external_id)\n```\n\nWhile you can provide a `bearer_token` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `PAPR_MEMORY_BEARER_TOKEN="My Bearer Token"` to your `.env` file\nso that your Bearer Token is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncPapr` instead of `Papr` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom papr_memory import AsyncPapr\n\nclient = AsyncPapr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  user_response = await client.user.create(\n      external_id="demo_user_123",\n      email="user@example.com",\n  )\n  print(user_response.external_id)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install papr_memory[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom papr_memory import DefaultAioHttpClient\nfrom papr_memory import AsyncPapr\n\nasync def main() -> None:\n  async with AsyncPapr(\n    x_api_key=os.environ.get("PAPR_MEMORY_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    user_response = await client.user.create(\n        external_id="demo_user_123",\n        email="user@example.com",\n    )\n    print(user_response.external_id)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom papr_memory import Papr\n\nclient = Papr()\n\nmemory = client.memory.update(\n    memory_id="memory_id",\n    graph_generation={},\n)\nprint(memory.graph_generation)\n```\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed as `bytes`, or a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance or a tuple of `(filename, contents, media type)`.\n\n```python\nfrom pathlib import Path\nfrom papr_memory import Papr\n\nclient = Papr()\n\nclient.document.upload(\n    file=Path("/path/to/file"),\n)\n```\n\nThe async client uses the exact same interface. If you pass a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance, the file contents will be read asynchronously automatically.\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `papr_memory.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `papr_memory.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `papr_memory.APIError`.\n\n```python\nimport papr_memory\nfrom papr_memory import Papr\n\nclient = Papr()\n\ntry:\n    client.user.create(\n        external_id="demo_user_123",\n        email="user@example.com",\n    )\nexcept papr_memory.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept papr_memory.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept papr_memory.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom papr_memory import Papr\n\n# Configure the default for all requests:\nclient = Papr(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).user.create(\n    external_id="demo_user_123",\n    email="user@example.com",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom papr_memory import Papr\n\n# Configure the default for all requests:\nclient = Papr(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Papr(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).user.create(\n    external_id="demo_user_123",\n    email="user@example.com",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `PAPR_LOG` to `info`.\n\n```shell\n$ export PAPR_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom papr_memory import Papr\n\nclient = Papr()\nresponse = client.user.with_raw_response.create(\n    external_id="demo_user_123",\n    email="user@example.com",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nuser = response.parse()  # get the object that `user.create()` would have returned\nprint(user.external_id)\n```\n\nThese methods return an [`APIResponse`](https://github.com/Papr-ai/papr-pythonSDK/tree/main/src/papr_memory/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/Papr-ai/papr-pythonSDK/tree/main/src/papr_memory/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.user.with_streaming_response.create(\n    external_id="demo_user_123",\n    email="user@example.com",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom papr_memory import Papr, DefaultHttpxClient\n\nclient = Papr(\n    # Or use the `PAPR_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom papr_memory import Papr\n\nwith Papr() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/Papr-ai/papr-pythonSDK/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport papr_memory\nprint(papr_memory.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Papr TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@papr/memory.svg?label=npm%20(stable))](https://npmjs.org/package/@papr/memory) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@papr/memory)\n\nThis library provides convenient access to the Papr REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [platform.papr.ai](https://platform.papr.ai). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Papr MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40papr%2Fmemory-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBwYXByL21lbW9yeS1tY3AiXSwiZW52Ijp7IlBBUFJfTUVNT1JZX0FQSV9LRVkiOiJNeSBYIEFQSSBLZXkiLCJQQVBSX01FTU9SWV9TZXNzaW9uX1Rva2VuIjoiTXkgWCBTZXNzaW9uIFRva2VuIiwiUEFQUl9NRU1PUllfQkVBUkVSX1RPS0VOIjoiTXkgQmVhcmVyIFRva2VuIn19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40papr%2Fmemory-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40papr%2Fmemory-mcp%22%5D%2C%22env%22%3A%7B%22PAPR_MEMORY_API_KEY%22%3A%22My%20X%20API%20Key%22%2C%22PAPR_MEMORY_Session_Token%22%3A%22My%20X%20Session%20Token%22%2C%22PAPR_MEMORY_BEARER_TOKEN%22%3A%22My%20Bearer%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @papr/memory\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst userResponse = await client.user.create({\n  external_id: 'demo_user_123',\n  email: 'user@example.com',\n});\n\nconsole.log(userResponse.external_id);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Papr from '@papr/memory';\n\nconst client = new Papr({\n  xAPIKey: process.env['PAPR_MEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Papr.UserCreateParams = { external_id: 'demo_user_123', email: 'user@example.com' };\nconst userResponse: Papr.UserResponse = await client.user.create(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed in many different forms:\n- `File` (or an object with the same structure)\n- a `fetch` `Response` (or an object with the same structure)\n- an `fs.ReadStream`\n- the return value of our `toFile` helper\n\n```ts\nimport fs from 'fs';\nimport Papr, { toFile } from '@papr/memory';\n\nconst client = new Papr();\n\n// If you have access to Node `fs` we recommend using `fs.createReadStream()`:\nawait client.document.upload({ file: fs.createReadStream('/path/to/file') });\n\n// Or if you have the web `File` API you can pass a `File` instance:\nawait client.document.upload({ file: new File(['my bytes'], 'file') });\n\n// You can also pass a `fetch` `Response`:\nawait client.document.upload({ file: await fetch('https://somesite/file') });\n\n// Finally, if none of the above are convenient, you can use our `toFile` helper:\nawait client.document.upload({ file: await toFile(Buffer.from('my bytes'), 'file') });\nawait client.document.upload({ file: await toFile(new Uint8Array([0, 1, 2]), 'file') });\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst userResponse = await client.user\n  .create({ external_id: 'demo_user_123', email: 'user@example.com' })\n  .catch(async (err) => {\n    if (err instanceof Papr.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Papr({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.user.create({ external_id: 'demo_user_123', email: 'user@example.com' }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Papr({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.user.create({ external_id: 'demo_user_123', email: 'user@example.com' }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Papr();\n\nconst response = await client.user\n  .create({ external_id: 'demo_user_123', email: 'user@example.com' })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: userResponse, response: raw } = await client.user\n  .create({ external_id: 'demo_user_123', email: 'user@example.com' })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(userResponse.external_id);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `PAPR_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Papr from '@papr/memory';\n\nconst client = new Papr({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Papr from '@papr/memory';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Papr({\n  logger: logger.child({ name: 'Papr' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.user.create({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Papr from '@papr/memory';\nimport fetch from 'my-fetch';\n\nconst client = new Papr({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Papr from '@papr/memory';\n\nconst client = new Papr({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Papr from '@papr/memory';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Papr({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Papr from '@papr/memory';\n\nconst client = new Papr({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Papr from 'npm:@papr/memory';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Papr({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/Papr-ai/papr-TypescriptSDK/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
