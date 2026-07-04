export const selectUsersList = (state) => state.users.usersList;

export const selectSelectedUser = (state) => state.users.selectedUser;

export const selectUsersLoading = (state) => state.users.loading;

export const selectUserCreating = (state) => state.users.creating;

export const selectUserUpdating = (state) => state.users.updating;

export const selectUserDeleting = (state) => state.users.deleting;

export const selectUsersError = (state) => state.users.error;