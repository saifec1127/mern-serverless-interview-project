import { createAsyncThunk } from "@reduxjs/toolkit";

import { graphqlClient } from "../../services/graphql/graphqlClient";
import {
  GET_USERS_QUERY,
  GET_USER_BY_ID_QUERY,
} from "../../graphql/users/userQueries";
import {
  CREATE_USER_MUTATION,
  UPDATE_USER_MUTATION,
  DELETE_USER_MUTATION,
} from "../../graphql/users/userMutations";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await graphqlClient.query({
        query: GET_USERS_QUERY,
        fetchPolicy: "network-only",
      });

      const usersResponse = response.data.users;

      if (!usersResponse.success) {
        return rejectWithValue(usersResponse.message);
      }

      return usersResponse.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await graphqlClient.query({
        query: GET_USER_BY_ID_QUERY,
        variables: { id },
        fetchPolicy: "network-only",
      });

      const userResponse = response.data.user;

      if (!userResponse.success) {
        return rejectWithValue(userResponse.message);
      }

      return userResponse.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (input, { rejectWithValue }) => {
    try {
      const response = await graphqlClient.mutate({
        mutation: CREATE_USER_MUTATION,
        variables: { input },
      });

      const createUserResponse = response.data.createUser;

      if (!createUserResponse.success) {
        return rejectWithValue(createUserResponse.message);
      }

      return createUserResponse.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, input }, { rejectWithValue }) => {
    try {
      const response = await graphqlClient.mutate({
        mutation: UPDATE_USER_MUTATION,
        variables: { id, input },
      });

      const updateUserResponse = response.data.updateUser;

      if (!updateUserResponse.success) {
        return rejectWithValue(updateUserResponse.message);
      }

      return updateUserResponse.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await graphqlClient.mutate({
        mutation: DELETE_USER_MUTATION,
        variables: { id },
      });

      const deleteUserResponse = response.data.deleteUser;

      if (!deleteUserResponse.success) {
        return rejectWithValue(deleteUserResponse.message);
      }

      return deleteUserResponse.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);