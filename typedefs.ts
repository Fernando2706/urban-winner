import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";
// Uber simple schema

export const typeDefs = gql`
type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
}

type Post {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    updatedAt: String!
    comments: [Comment]!
}

type Comment {
    id: ID!
    body: String!
    createdAt: String!
    updatedAt: String!
    user: User
    replies: [Comment]!
}

input CreateUserInput {
    name: String!
    email: String!
    password: String!
}

input CreatePostInput {
    title: String!
    body: String!
}


input CreateCommentInput {
    body: String!
    userEmail: String!
    postId: String!
}

input CreateReplyInput {
    body: String!
    userEmail: String!
    commentId: String!
}

type Query {
    user(id: ID!): User!
    users(limit: Int): [User]!
    post(id: ID!): Post!
    posts(limit: Int, page: Int): [Post]!
    comment(id: ID!): Comment!
    comments(limit: Int): [Comment]!
}

type Mutation {
    createUser(input: CreateUserInput!): User!
    createPost(input: CreatePostInput!): Post!
    createComment(input: CreateCommentInput!): Comment!
    createReply(input: CreateReplyInput!): Comment!
}

`;