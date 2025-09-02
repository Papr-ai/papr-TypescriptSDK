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
- <code><a href="./src/resources/memory.ts">BatchMemoryResponse</a></code>
- <code><a href="./src/resources/memory.ts">ContextItem</a></code>
- <code><a href="./src/resources/memory.ts">HTTPValidationError</a></code>
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

- <code><a href="./src/resources/logout.ts">LogoutLogoutResponse</a></code>

Methods:

- <code title="get /logout">client.logout.<a href="./src/resources/logout.ts">logout</a>() -> LogoutLogoutResponse</code>
