import { UserModel } from "../../models/Users.js";

export const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const response = await UserModel.getAllUsers();
      const users = response.map((user) => {
        return {
          id: user.id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          role: user.role,
        };
      });

      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await UserModel.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // createUser: async (req, res) => {
  //   const newUser = req.body;
  //   try {
  //     const userId = await UserModel.createUser(newUser);
  //     res.json({ id: userId });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },

  // updateUser: async (req, res) => {
  //   const userId = req.params.id;
  //   const updatedUser = req.body;
  //   try {
  //     const result = await UserModel.updateUser(userId, updatedUser);
  //     res.json(result);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },

  // deleteUser: async (req, res) => {
  //   const userId = req.params.id;
  //   try {
  //     const result = await UserModel.deleteUser(userId);
  //     res.json(result);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },
};
