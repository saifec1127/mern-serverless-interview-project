import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      success
      message
      data {
        id
        name
        role
        createdAt
        updatedAt
      }
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      success
      message
      data {
        id
        name
        role
        createdAt
        updatedAt
      }
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      success
      message
      data {
        id
        name
        role
      }
    }
  }
`;