const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    role: String!
    createdAt: String
    updatedAt: String
  }

  type UserResponse {
    success: Boolean!
    message: String!
    data: User
  }

  type UsersResponse {
    success: Boolean!
    message: String!
    data: [User!]!
  }

  input CreateUserInput {
    name: String!
    role: String!
  }

  input UpdateUserInput {
    name: String!
    role: String!
  }

  type Query {
    users: UsersResponse!
    user(id: ID!): UserResponse!
  }

  type Mutation {
    createUser(input: CreateUserInput!): UserResponse!
    updateUser(id: ID!, input: UpdateUserInput!): UserResponse!
    deleteUser(id: ID!): UserResponse!
  }
`;

module.exports = typeDefs;