const userService = require("../services/user.service");

const resolvers = {
  Query: {
    users: async () => {
      const users = await userService.getUsers();

      return {
        success: true,
        message: "Users fetched successfully",
        data: users,
      };
    },

    user: async (_, { id }) => {
      const user = await userService.getUserById(id);

      if (!user) {
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "User fetched successfully",
        data: user,
      };
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      const user = await userService.createUser(input);

      return {
        success: true,
        message: "User created successfully",
        data: user,
      };
    },

    updateUser: async (_, { id, input }) => {
      const existingUser = await userService.getUserById(id);

      if (!existingUser) {
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }

      const updatedUser = await userService.updateUser(id, input);

      return {
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      };
    },

    deleteUser: async (_, { id }) => {
      const existingUser = await userService.getUserById(id);

      if (!existingUser) {
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }

      await userService.deleteUser(id);

      return {
        success: true,
        message: "User deleted successfully",
        data: existingUser,
      };
    },
  },
};

module.exports = resolvers;