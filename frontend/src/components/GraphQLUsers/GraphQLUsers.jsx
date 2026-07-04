import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../store/users/usersThunks";

import {
  selectUserCreating,
  selectUserDeleting,
  selectUserUpdating,
  selectUsersError,
  selectUsersList,
  selectUsersLoading,
} from "../../store/users/usersSelectors";

const GraphQLUsers = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectUsersList);
  const loading = useSelector(selectUsersLoading);
  const creating = useSelector(selectUserCreating);
  const updating = useSelector(selectUserUpdating);
  const deleting = useSelector(selectUserDeleting);
  const error = useSelector(selectUsersError);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const resetForm = () => {
    setName("");
    setRole("");
    setEditingUserId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !role.trim()) {
      return;
    }

    if (editingUserId) {
      await dispatch(
        updateUser({
          id: editingUserId,
          input: {
            name,
            role,
          },
        })
      );
    } else {
      await dispatch(
        createUser({
          name,
          role,
        })
      );
    }

    resetForm();
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setName(user.name);
    setRole(user.role);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const isSubmitting = creating || updating;

  return (
    <div>
      <h2>GraphQL Users with Redux Toolkit</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="text"
          placeholder="Enter role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        />

        <button type="submit" disabled={isSubmitting}>
          {editingUserId ? "Update User" : "Create User"}
        </button>

        {editingUserId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {loading && <p>Loading users...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && users.length === 0 && <p>No users found.</p>}

      {!loading &&
        users.map((user) => {
          return (
            <div key={user.id}>
              <p>
                {user.name} - {user.role}
              </p>

              <button onClick={() => handleEdit(user)}>Edit</button>

              <button disabled={deleting} onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default GraphQLUsers;