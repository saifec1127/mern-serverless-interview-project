const userService = require("../services/user.service");
const { sendSuccess, sendError } = require("../utils/response");

const createUser = async (req, res) => {
  try {
    const { name, role } = req.body;

    if (!name || !role) {
      return sendError(res, 400, "Name and role are required");
    }

    const user = await userService.createUser({ name, role });

    return sendSuccess(res, 201, "User created successfully", user);
  } catch (error) {
    console.error("Create user error:", error);
    return sendError(res, 500, "Failed to create user");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    return sendSuccess(res, 200, "Users fetched successfully", users);
  } catch (error) {
    console.error("Get users error:", error);
    return sendError(res, 500, "Failed to fetch users");
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    return sendSuccess(res, 200, "User fetched successfully", user);
  } catch (error) {
    console.error("Get user by id error:", error);
    return sendError(res, 500, "Failed to fetch user");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    if (!name || !role) {
      return sendError(res, 400, "Name and role are required");
    }

    const existingUser = await userService.getUserById(id);

    if (!existingUser) {
      return sendError(res, 404, "User not found");
    }

    const updatedUser = await userService.updateUser(id, { name, role });

    return sendSuccess(res, 200, "User updated successfully", updatedUser);
  } catch (error) {
    console.error("Update user error:", error);
    return sendError(res, 500, "Failed to update user");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await userService.getUserById(id);

    if (!existingUser) {
      return sendError(res, 404, "User not found");
    }

    await userService.deleteUser(id);

    return sendSuccess(res, 200, "User deleted successfully");
  } catch (error) {
    console.error("Delete user error:", error);
    return sendError(res, 500, "Failed to delete user");
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};