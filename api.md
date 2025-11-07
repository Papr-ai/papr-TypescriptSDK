# Shared

Types:

- <code><a href="./src/resources/shared.ts">AddMemoryItem</a></code>

# User

Types:

- <code><a href="./src/resources/user.ts">UserResponse</a></code>
- <code><a href="./src/resources/user.ts">UserType</a></code>
- <code><a href="./src/resources/user.ts">UserListResponse</a></code>
- <code><a href="./src/resources/user.ts">UserDeleteResponse</a></code>
- <code><a href="./src/resources/user.ts">UserCreateBatchResponse</a></code>

Methods:

- <code title="post /v1/user">client.user.<a href="./src/resources/user.ts">create</a>({ ...params }) -> UserResponse</code>
- <code title="put /v1/user/{user_id}">client.user.<a href="./src/resources/user.ts">update</a>(userID, { ...params }) -> UserResponse</code>
- <code title="get /v1/user">client.user.<a href="./src/resources/user.ts">list</a>({ ...params }) -> UserListResponse</code>
- <code title="delete /v1/user/{user_id}">client.user.<a href="./src/resources/user.ts">delete</a>(userID, { ...params }) -> UserDeleteResponse</code>
- <code title="post /v1/user/batch">client.user.<a href="./src/resources/user.ts">createBatch</a>({ ...params }) -> UserCreateBatchResponse</code>
- <code title="get /v1/user/{user_id}">client.user.<a href="./src/resources/user.ts">get</a>(userID) -> UserResponse</code>

# Memory

Types:

- <code><a href="./src/resources/memory.ts">AddMemory</a></code>
- <code><a href="./src/resources/memory.ts">AddMemoryResponse</a></code>
- <code><a href="./src/resources/memory.ts">AutoGraphGeneration</a></code>
- <code><a href="./src/resources/memory.ts">BatchMemoryResponse</a></code>
- <code><a href="./src/resources/memory.ts">ContextItem</a></code>
- <code><a href="./src/resources/memory.ts">GraphGeneration</a></code>
- <code><a href="./src/resources/memory.ts">HTTPValidationError</a></code>
- <code><a href="./src/resources/memory.ts">ManualGraphGeneration</a></code>
- <code><a href="./src/resources/memory.ts">MemoryMetadata</a></code>
- <code><a href="./src/resources/memory.ts">MemoryType</a></code>
- <code><a href="./src/resources/memory.ts">RelationshipItem</a></code>
- <code><a href="./src/resources/memory.ts">SearchResponse</a></code>
- <code><a href="./src/resources/memory.ts">MemoryUpdateResponse</a></code>
- <code><a href="./src/resources/memory.ts">MemoryDeleteResponse</a></code>

Methods:

- <code title="put /v1/memory/{memory_id}">client.memory.<a href="./src/resources/memory.ts">update</a>(memoryID, { ...params }) -> MemoryUpdateResponse</code>
- <code title="delete /v1/memory/{memory_id}">client.memory.<a href="./src/resources/memory.ts">delete</a>(memoryID, { ...params }) -> MemoryDeleteResponse</code>
- <code title="post /v1/memory">client.memory.<a href="./src/resources/memory.ts">add</a>({ ...params }) -> AddMemoryResponse</code>
- <code title="post /v1/memory/batch">client.memory.<a href="./src/resources/memory.ts">addBatch</a>({ ...params }) -> BatchMemoryResponse</code>
- <code title="delete /v1/memory/all">client.memory.<a href="./src/resources/memory.ts">deleteAll</a>({ ...params }) -> BatchMemoryResponse</code>
- <code title="get /v1/memory/{memory_id}">client.memory.<a href="./src/resources/memory.ts">get</a>(memoryID) -> SearchResponse</code>
- <code title="post /v1/memory/search">client.memory.<a href="./src/resources/memory.ts">search</a>({ ...params }) -> SearchResponse</code>

# Feedback

Types:

- <code><a href="./src/resources/feedback.ts">BatchRequest</a></code>
- <code><a href="./src/resources/feedback.ts">BatchResponse</a></code>
- <code><a href="./src/resources/feedback.ts">FeedbackRequest</a></code>
- <code><a href="./src/resources/feedback.ts">FeedbackResponse</a></code>
- <code><a href="./src/resources/feedback.ts">ParsePointer</a></code>

Methods:

- <code title="get /v1/feedback/{feedback_id}">client.feedback.<a href="./src/resources/feedback.ts">getByID</a>(feedbackID) -> FeedbackResponse</code>
- <code title="post /v1/feedback">client.feedback.<a href="./src/resources/feedback.ts">submit</a>({ ...params }) -> FeedbackResponse</code>
- <code title="post /v1/feedback/batch">client.feedback.<a href="./src/resources/feedback.ts">submitBatch</a>({ ...params }) -> BatchResponse</code>

# Document

Types:

- <code><a href="./src/resources/document.ts">DocumentCancelProcessingResponse</a></code>
- <code><a href="./src/resources/document.ts">DocumentGetStatusResponse</a></code>
- <code><a href="./src/resources/document.ts">DocumentUploadResponse</a></code>

Methods:

- <code title="delete /v1/document/{upload_id}">client.document.<a href="./src/resources/document.ts">cancelProcessing</a>(uploadID) -> DocumentCancelProcessingResponse</code>
- <code title="get /v1/document/status/{upload_id}">client.document.<a href="./src/resources/document.ts">getStatus</a>(uploadID) -> DocumentGetStatusResponse</code>
- <code title="post /v1/document">client.document.<a href="./src/resources/document.ts">upload</a>({ ...params }) -> DocumentUploadResponse</code>

# Schemas

Types:

- <code><a href="./src/resources/schemas.ts">UserGraphSchemaOutput</a></code>
- <code><a href="./src/resources/schemas.ts">SchemaCreateResponse</a></code>
- <code><a href="./src/resources/schemas.ts">SchemaRetrieveResponse</a></code>
- <code><a href="./src/resources/schemas.ts">SchemaUpdateResponse</a></code>
- <code><a href="./src/resources/schemas.ts">SchemaListResponse</a></code>
- <code><a href="./src/resources/schemas.ts">SchemaDeleteResponse</a></code>
- <code><a href="./src/resources/schemas.ts">SchemaActivateResponse</a></code>

Methods:

- <code title="post /v1/schemas">client.schemas.<a href="./src/resources/schemas.ts">create</a>({ ...params }) -> SchemaCreateResponse</code>
- <code title="get /v1/schemas/{schema_id}">client.schemas.<a href="./src/resources/schemas.ts">retrieve</a>(schemaID) -> SchemaRetrieveResponse</code>
- <code title="put /v1/schemas/{schema_id}">client.schemas.<a href="./src/resources/schemas.ts">update</a>(schemaID, { ...params }) -> SchemaUpdateResponse</code>
- <code title="get /v1/schemas">client.schemas.<a href="./src/resources/schemas.ts">list</a>({ ...params }) -> SchemaListResponse</code>
- <code title="delete /v1/schemas/{schema_id}">client.schemas.<a href="./src/resources/schemas.ts">delete</a>(schemaID) -> unknown</code>
- <code title="post /v1/schemas/{schema_id}/activate">client.schemas.<a href="./src/resources/schemas.ts">activate</a>(schemaID, { ...params }) -> unknown</code>

# Messages

## Sessions

# Graphql

Types:

- <code><a href="./src/resources/graphql.ts">GraphqlPlaygroundResponse</a></code>
- <code><a href="./src/resources/graphql.ts">GraphqlQueryResponse</a></code>

Methods:

- <code title="get /v1/graphql">client.graphql.<a href="./src/resources/graphql.ts">playground</a>() -> unknown</code>
- <code title="post /v1/graphql">client.graphql.<a href="./src/resources/graphql.ts">query</a>() -> unknown</code>
