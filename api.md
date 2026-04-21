# Shared

Types:

- <code><a href="./src/resources/shared.ts">ACLConfig</a></code>
- <code><a href="./src/resources/shared.ts">AddMemoryItem</a></code>
- <code><a href="./src/resources/shared.ts">EdgeConstraintInput</a></code>
- <code><a href="./src/resources/shared.ts">Memory</a></code>
- <code><a href="./src/resources/shared.ts">MemoryPolicy</a></code>
- <code><a href="./src/resources/shared.ts">NodeConstraintInput</a></code>
- <code><a href="./src/resources/shared.ts">NodeSpec</a></code>
- <code><a href="./src/resources/shared.ts">PropertyValue</a></code>
- <code><a href="./src/resources/shared.ts">RelationshipSpec</a></code>
- <code><a href="./src/resources/shared.ts">SearchConfigInput</a></code>

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
- <code><a href="./src/resources/memory.ts">BatchMemoryError</a></code>
- <code><a href="./src/resources/memory.ts">BatchMemoryResponse</a></code>
- <code><a href="./src/resources/memory.ts">ContextItem</a></code>
- <code><a href="./src/resources/memory.ts">GraphGeneration</a></code>
- <code><a href="./src/resources/memory.ts">HTTPValidationError</a></code>
- <code><a href="./src/resources/memory.ts">ManualGraphGeneration</a></code>
- <code><a href="./src/resources/memory.ts">MemoryMetadata</a></code>
- <code><a href="./src/resources/memory.ts">MemoryType</a></code>
- <code><a href="./src/resources/memory.ts">RelationshipItem</a></code>
- <code><a href="./src/resources/memory.ts">SearchResponse</a></code>
- <code><a href="./src/resources/memory.ts">SearchResult</a></code>
- <code><a href="./src/resources/memory.ts">MemoryUpdateResponse</a></code>
- <code><a href="./src/resources/memory.ts">MemoryDeleteResponse</a></code>
- <code><a href="./src/resources/memory.ts">MemoryRetrieveBatchStatusResponse</a></code>
- <code><a href="./src/resources/memory.ts">MemoryRetrieveStatusResponse</a></code>

Methods:

- <code title="put /v1/memory/{memory_id}">client.memory.<a href="./src/resources/memory.ts">update</a>(memoryID, { ...params }) -> MemoryUpdateResponse</code>
- <code title="delete /v1/memory/{memory_id}">client.memory.<a href="./src/resources/memory.ts">delete</a>(memoryID, { ...params }) -> MemoryDeleteResponse</code>
- <code title="post /v1/memory">client.memory.<a href="./src/resources/memory.ts">add</a>({ ...params }) -> AddMemoryResponse</code>
- <code title="post /v1/memory/batch">client.memory.<a href="./src/resources/memory.ts">addBatch</a>({ ...params }) -> BatchMemoryResponse</code>
- <code title="delete /v1/memory/all">client.memory.<a href="./src/resources/memory.ts">deleteAll</a>({ ...params }) -> BatchMemoryResponse</code>
- <code title="get /v1/memory/{memory_id}">client.memory.<a href="./src/resources/memory.ts">get</a>(memoryID, { ...params }) -> SearchResponse</code>
- <code title="get /v1/memory/batch/status/{batch_id}">client.memory.<a href="./src/resources/memory.ts">retrieveBatchStatus</a>(batchID) -> MemoryRetrieveBatchStatusResponse</code>
- <code title="get /v1/memory/status/{memory_id}">client.memory.<a href="./src/resources/memory.ts">retrieveStatus</a>(memoryID) -> MemoryRetrieveStatusResponse</code>
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

- <code><a href="./src/resources/schemas.ts">PropertyDefinition</a></code>
- <code><a href="./src/resources/schemas.ts">SearchConfigOutput</a></code>
- <code><a href="./src/resources/schemas.ts">UserGraphSchemaOutput</a></code>
- <code><a href="./src/resources/schemas.ts">SchemaCreateResponse</a></code>
- <code><a href="./src/resources/schemas.ts">SchemaRetrieveResponse</a></code>
- <code><a href="./src/resources/schemas.ts">SchemaUpdateResponse</a></code>
- <code><a href="./src/resources/schemas.ts">SchemaListResponse</a></code>
- <code><a href="./src/resources/schemas.ts">SchemaDeleteResponse</a></code>

Methods:

- <code title="post /v1/schemas">client.schemas.<a href="./src/resources/schemas.ts">create</a>({ ...params }) -> SchemaCreateResponse</code>
- <code title="get /v1/schemas/{schema_id}">client.schemas.<a href="./src/resources/schemas.ts">retrieve</a>(schemaID) -> SchemaRetrieveResponse</code>
- <code title="put /v1/schemas/{schema_id}">client.schemas.<a href="./src/resources/schemas.ts">update</a>(schemaID, { ...params }) -> SchemaUpdateResponse</code>
- <code title="get /v1/schemas">client.schemas.<a href="./src/resources/schemas.ts">list</a>({ ...params }) -> SchemaListResponse</code>
- <code title="delete /v1/schemas/{schema_id}">client.schemas.<a href="./src/resources/schemas.ts">delete</a>(schemaID) -> unknown</code>

# Graphql

Types:

- <code><a href="./src/resources/graphql.ts">GraphqlPlaygroundResponse</a></code>
- <code><a href="./src/resources/graphql.ts">GraphqlQueryResponse</a></code>

Methods:

- <code title="get /v1/graphql">client.graphql.<a href="./src/resources/graphql.ts">playground</a>() -> unknown</code>
- <code title="post /v1/graphql">client.graphql.<a href="./src/resources/graphql.ts">query</a>() -> unknown</code>

# Messages

Types:

- <code><a href="./src/resources/messages/messages.ts">MessageStoreResponse</a></code>

Methods:

- <code title="post /v1/messages">client.messages.<a href="./src/resources/messages/messages.ts">store</a>({ ...params }) -> MessageStoreResponse</code>

## Sessions

Types:

- <code><a href="./src/resources/messages/sessions.ts">ConversationSummaryResponse</a></code>
- <code><a href="./src/resources/messages/sessions.ts">SessionUpdateResponse</a></code>
- <code><a href="./src/resources/messages/sessions.ts">SessionCompressResponse</a></code>
- <code><a href="./src/resources/messages/sessions.ts">SessionProcessResponse</a></code>
- <code><a href="./src/resources/messages/sessions.ts">SessionRetrieveHistoryResponse</a></code>
- <code><a href="./src/resources/messages/sessions.ts">SessionRetrieveStatusResponse</a></code>

Methods:

- <code title="patch /v1/messages/sessions/{session_id}">client.messages.sessions.<a href="./src/resources/messages/sessions.ts">update</a>(sessionID, { ...params }) -> unknown</code>
- <code title="get /v1/messages/sessions/{session_id}/compress">client.messages.sessions.<a href="./src/resources/messages/sessions.ts">compress</a>(sessionID) -> SessionCompressResponse</code>
- <code title="post /v1/messages/sessions/{session_id}/process">client.messages.sessions.<a href="./src/resources/messages/sessions.ts">process</a>(sessionID) -> unknown</code>
- <code title="get /v1/messages/sessions/{session_id}">client.messages.sessions.<a href="./src/resources/messages/sessions.ts">retrieveHistory</a>(sessionID, { ...params }) -> SessionRetrieveHistoryResponse</code>
- <code title="get /v1/messages/sessions/{session_id}/status">client.messages.sessions.<a href="./src/resources/messages/sessions.ts">retrieveStatus</a>(sessionID) -> unknown</code>

# Omo

Types:

- <code><a href="./src/resources/omo.ts">OmoExportMemoriesResponse</a></code>
- <code><a href="./src/resources/omo.ts">OmoExportMemoriesAsJsonResponse</a></code>
- <code><a href="./src/resources/omo.ts">OmoImportMemoriesResponse</a></code>

Methods:

- <code title="post /v1/omo/export">client.omo.<a href="./src/resources/omo.ts">exportMemories</a>({ ...params }) -> OmoExportMemoriesResponse</code>
- <code title="get /v1/omo/export.json">client.omo.<a href="./src/resources/omo.ts">exportMemoriesAsJson</a>({ ...params }) -> unknown</code>
- <code title="post /v1/omo/import">client.omo.<a href="./src/resources/omo.ts">importMemories</a>({ ...params }) -> OmoImportMemoriesResponse</code>

# Sync

Types:

- <code><a href="./src/resources/sync.ts">SyncGetDeltaResponse</a></code>
- <code><a href="./src/resources/sync.ts">SyncGetTiersResponse</a></code>

Methods:

- <code title="get /v1/sync/delta">client.sync.<a href="./src/resources/sync.ts">getDelta</a>({ ...params }) -> SyncGetDeltaResponse</code>
- <code title="post /v1/sync/tiers">client.sync.<a href="./src/resources/sync.ts">getTiers</a>({ ...params }) -> SyncGetTiersResponse</code>

# Namespace

Types:

- <code><a href="./src/resources/namespace/namespace.ts">InstanceConfigItem</a></code>
- <code><a href="./src/resources/namespace/namespace.ts">NamespaceItem</a></code>
- <code><a href="./src/resources/namespace/namespace.ts">Neo4jInstanceConfigItem</a></code>
- <code><a href="./src/resources/namespace/namespace.ts">NamespaceCreateResponse</a></code>
- <code><a href="./src/resources/namespace/namespace.ts">NamespaceRetrieveResponse</a></code>
- <code><a href="./src/resources/namespace/namespace.ts">NamespaceUpdateResponse</a></code>
- <code><a href="./src/resources/namespace/namespace.ts">NamespaceListResponse</a></code>
- <code><a href="./src/resources/namespace/namespace.ts">NamespaceDeleteResponse</a></code>

Methods:

- <code title="post /v1/namespace">client.namespace.<a href="./src/resources/namespace/namespace.ts">create</a>({ ...params }) -> NamespaceCreateResponse</code>
- <code title="get /v1/namespace/{namespace_id}">client.namespace.<a href="./src/resources/namespace/namespace.ts">retrieve</a>(namespaceID) -> NamespaceRetrieveResponse</code>
- <code title="put /v1/namespace/{namespace_id}">client.namespace.<a href="./src/resources/namespace/namespace.ts">update</a>(namespaceID, { ...params }) -> NamespaceUpdateResponse</code>
- <code title="get /v1/namespace">client.namespace.<a href="./src/resources/namespace/namespace.ts">list</a>({ ...params }) -> NamespaceListResponse</code>
- <code title="delete /v1/namespace/{namespace_id}">client.namespace.<a href="./src/resources/namespace/namespace.ts">delete</a>(namespaceID, { ...params }) -> NamespaceDeleteResponse</code>

## Instance

Types:

- <code><a href="./src/resources/namespace/instance.ts">InstanceRetrieveResponse</a></code>
- <code><a href="./src/resources/namespace/instance.ts">InstanceUpdateResponse</a></code>
- <code><a href="./src/resources/namespace/instance.ts">InstanceDeleteResponse</a></code>

Methods:

- <code title="get /v1/namespace/{namespace_id}/instance">client.namespace.instance.<a href="./src/resources/namespace/instance.ts">retrieve</a>(namespaceID) -> InstanceRetrieveResponse</code>
- <code title="put /v1/namespace/{namespace_id}/instance">client.namespace.instance.<a href="./src/resources/namespace/instance.ts">update</a>(namespaceID, { ...params }) -> InstanceUpdateResponse</code>
- <code title="delete /v1/namespace/{namespace_id}/instance">client.namespace.instance.<a href="./src/resources/namespace/instance.ts">delete</a>(namespaceID) -> InstanceDeleteResponse</code>

# Frequencies

Types:

- <code><a href="./src/resources/frequencies.ts">FrequencyFieldResponse</a></code>
- <code><a href="./src/resources/frequencies.ts">SchemaConfigResponse</a></code>
- <code><a href="./src/resources/frequencies.ts">FrequencyRetrieveResponse</a></code>
- <code><a href="./src/resources/frequencies.ts">FrequencyListResponse</a></code>

Methods:

- <code title="get /v1/frequencies/{frequency_schema_id}">client.frequencies.<a href="./src/resources/frequencies.ts">retrieve</a>(frequencySchemaID) -> FrequencyRetrieveResponse</code>
- <code title="get /v1/frequencies">client.frequencies.<a href="./src/resources/frequencies.ts">list</a>() -> FrequencyListResponse</code>

# Holographic

Types:

- <code><a href="./src/resources/holographic/holographic.ts">HolographicExtractMetadataResponse</a></code>
- <code><a href="./src/resources/holographic/holographic.ts">HolographicRerankResponse</a></code>

Methods:

- <code title="post /v1/holographic/metadata">client.holographic.<a href="./src/resources/holographic/holographic.ts">extractMetadata</a>({ ...params }) -> HolographicExtractMetadataResponse</code>
- <code title="post /v1/holographic/rerank">client.holographic.<a href="./src/resources/holographic/holographic.ts">rerank</a>({ ...params }) -> HolographicRerankResponse</code>

## Transform

Types:

- <code><a href="./src/resources/holographic/transform.ts">TransformData</a></code>
- <code><a href="./src/resources/holographic/transform.ts">TransformCreateResponse</a></code>
- <code><a href="./src/resources/holographic/transform.ts">TransformCreateBatchResponse</a></code>

Methods:

- <code title="post /v1/holographic/transform">client.holographic.transform.<a href="./src/resources/holographic/transform.ts">create</a>({ ...params }) -> TransformCreateResponse</code>
- <code title="post /v1/holographic/transform/batch">client.holographic.transform.<a href="./src/resources/holographic/transform.ts">createBatch</a>({ ...params }) -> TransformCreateBatchResponse</code>

## Domains

Types:

- <code><a href="./src/resources/holographic/domains.ts">DomainCreateResponse</a></code>
- <code><a href="./src/resources/holographic/domains.ts">DomainListResponse</a></code>

Methods:

- <code title="post /v1/holographic/domains">client.holographic.domains.<a href="./src/resources/holographic/domains.ts">create</a>({ ...params }) -> DomainCreateResponse</code>
- <code title="get /v1/holographic/domains">client.holographic.domains.<a href="./src/resources/holographic/domains.ts">list</a>() -> DomainListResponse</code>

# Organization

## Instance

Types:

- <code><a href="./src/resources/organization/instance.ts">InstanceRetrieveResponse</a></code>
- <code><a href="./src/resources/organization/instance.ts">InstanceUpdateResponse</a></code>
- <code><a href="./src/resources/organization/instance.ts">InstanceDeleteResponse</a></code>

Methods:

- <code title="get /v1/organization/instance">client.organization.instance.<a href="./src/resources/organization/instance.ts">retrieve</a>() -> InstanceRetrieveResponse</code>
- <code title="put /v1/organization/instance">client.organization.instance.<a href="./src/resources/organization/instance.ts">update</a>({ ...params }) -> InstanceUpdateResponse</code>
- <code title="delete /v1/organization/instance">client.organization.instance.<a href="./src/resources/organization/instance.ts">delete</a>() -> InstanceDeleteResponse</code>

# AI

Types:

- <code><a href="./src/resources/ai/ai.ts">AIGetUsageResponse</a></code>

Methods:

- <code title="get /v1/ai/usage">client.ai.<a href="./src/resources/ai/ai.ts">getUsage</a>() -> unknown</code>

## OpenAI

Types:

- <code><a href="./src/resources/ai/openai/openai.ts">OpenAICreateResponseResponse</a></code>

Methods:

- <code title="post /v1/ai/openai/responses">client.ai.openai.<a href="./src/resources/ai/openai/openai.ts">createResponse</a>() -> unknown</code>

### Chat

Types:

- <code><a href="./src/resources/ai/openai/chat.ts">ChatCreateCompletionResponse</a></code>

Methods:

- <code title="post /v1/ai/openai/chat/completions">client.ai.openai.chat.<a href="./src/resources/ai/openai/chat.ts">createCompletion</a>() -> unknown</code>

## Anthropic

Types:

- <code><a href="./src/resources/ai/anthropic.ts">AnthropicSendMessageResponse</a></code>

Methods:

- <code title="post /v1/ai/anthropic/messages">client.ai.anthropic.<a href="./src/resources/ai/anthropic.ts">sendMessage</a>() -> unknown</code>

## Google

### Models

Types:

- <code><a href="./src/resources/ai/google/models.ts">ModelGenerateContentResponse</a></code>
- <code><a href="./src/resources/ai/google/models.ts">ModelStreamGenerateContentResponse</a></code>

Methods:

- <code title="post /v1/ai/google/models/{model_id}:generateContent">client.ai.google.models.<a href="./src/resources/ai/google/models.ts">generateContent</a>(modelID) -> unknown</code>
- <code title="post /v1/ai/google/models/{model_id}:streamGenerateContent">client.ai.google.models.<a href="./src/resources/ai/google/models.ts">streamGenerateContent</a>(modelID) -> unknown</code>

# Telemetry

Types:

- <code><a href="./src/resources/telemetry.ts">TelemetryTrackEventResponse</a></code>

Methods:

- <code title="post /v1/telemetry/events">client.telemetry.<a href="./src/resources/telemetry.ts">trackEvent</a>({ ...params }) -> TelemetryTrackEventResponse</code>

# Login

Types:

- <code><a href="./src/resources/login.ts">LoginInitiateResponse</a></code>

Methods:

- <code title="get /login">client.login.<a href="./src/resources/login.ts">initiate</a>() -> LoginInitiateResponse</code>

# Callback

Types:

- <code><a href="./src/resources/callback.ts">CallbackProcessResponse</a></code>

Methods:

- <code title="get /callback">client.callback.<a href="./src/resources/callback.ts">process</a>() -> CallbackProcessResponse</code>

# Token

Types:

- <code><a href="./src/resources/token.ts">TokenCreateResponse</a></code>

Methods:

- <code title="post /token">client.token.<a href="./src/resources/token.ts">create</a>() -> TokenCreateResponse</code>

# Me

Types:

- <code><a href="./src/resources/me.ts">MeRetrieveResponse</a></code>

Methods:

- <code title="get /me">client.me.<a href="./src/resources/me.ts">retrieve</a>() -> MeRetrieveResponse</code>

# Logout

Types:

- <code><a href="./src/resources/logout.ts">LogoutPerformResponse</a></code>

Methods:

- <code title="get /logout">client.logout.<a href="./src/resources/logout.ts">perform</a>() -> LogoutPerformResponse</code>
