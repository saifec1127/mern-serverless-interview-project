import { createSlice } from "@reduxjs/toolkit";

import {
  createUser,
  deleteUser,
  fetchUserById,
  fetchUsers,
  updateUser,
} from "./usersThunks";

const initialState = {
  usersList: [],
  selectedUser: null,

  loading: false,
  creating: false,
  updating: false,
  deleting: false,

  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsersError: (state) => {
      state.error = null;
    },

    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload || [];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
      })

      // fetch user by id
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user";
      })

      // create user
      .addCase(createUser.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.creating = false;

        if (action.payload) {
          state.usersList.push(action.payload);
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload || "Failed to create user";
      })

      // update user
      .addCase(updateUser.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updating = false;

        const updatedUser = action.payload;

        if (updatedUser) {
          state.usersList = state.usersList.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          );

          if (state.selectedUser?.id === updatedUser.id) {
            state.selectedUser = updatedUser;
          }
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload || "Failed to update user";
      })

      // delete user
      .addCase(deleteUser.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleting = false;

        const deletedUser = action.payload;

        if (deletedUser) {
          state.usersList = state.usersList.filter(
            (user) => user.id !== deletedUser.id
          );

          if (state.selectedUser?.id === deletedUser.id) {
            state.selectedUser = null;
          }
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload || "Failed to delete user";
      });
  },
});

export const { clearUsersError, clearSelectedUser } = usersSlice.actions;

export default usersSlice.reducer;