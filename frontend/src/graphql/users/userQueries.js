import { gql } from "@apollo/client";

export const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
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

export const GET_USER_BY_ID_QUERY = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
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