## Deno-GraphQL-Server with MongoDB

This is a simple GraphQL server using Deno, Oak, GraphQL, and MongoDB.

# Setup

## Install Deno

```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

## Install Docker

```bash
sudo apt install docker.io
```

## Run MongoDB

```bash
docker run -d -p 27017:27017 mongo
```

## Run Server

```bash
deno run --allow-net --allow-read --allow-write --allow-plugin --allow-env --unstable app.ts
```

# Usage

Run the server and go to http://localhost:8080/graphql

# Types

## User

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  createdAt: String!
  updatedAt: String!
}
```

## Post

```graphql
type Post {
  id: ID!
  title: String!
  body: String!
  imageUrl: String!
  comments: [Comment!]!
  createdAt: String!
  updatedAt: String!
}
```

## Comment

```graphql
type Comment {
  id: ID!
  body: String!
  createdAt: String!
  updatedAt: String!
  user: User!
}
```

# Queries

```graphql
user(id: ID!): User!
users(limit: Int): [User]!
post(id: ID!): Post!
posts(limit: Int, page: Int): [Post]!
comment(id: ID!): Comment!
comments(limit: Int): [Comment]!
```

# Mutations

```graphql
createUser(input: CreateUserInput!): User!
createPost(input: CreatePostInput!): Post!
createComment(input: CreateCommentInput!): Comment!
createReply(input: CreateReplyInput!): Comment!
```

# Inputs

## CreateUserInput

```graphql
input CreateUserInput {
  name: String!
  email: String!
  password: String!
}
```

## CreatePostInput

```graphql
input CreatePostInput {
  title: String!
  body: String!
  imageUrl: String!
}
```

## CreateCommentInput

```graphql
input CreateCommentInput {
  body: String!
  userEmail: String!
  postId: String!
}
```

## CreateReplyInput

```graphql
input CreateReplyInput {
  body: String!
  userEmail: String!
  commentId: String!
}
```