import { UserModel } from "../../models/Users.js";

export const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
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
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // createUser: async (req, res) => {
  //   const newUser = req.body;
  //   try {
  //     const userId = await UserModel.createUser(newUser);
  //     res.json({ id: userId });
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // },

  // updateUser: async (req, res) => {
  //   const userId = req.params.id;
  //   const updatedUser = req.body;
  //   try {
  //     const result = await UserModel.updateUser(userId, updatedUser);
  //     res.json(result);
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // },

  // deleteUser: async (req, res) => {
  //   const userId = req.params.id;
  //   try {
  //     const result = await UserModel.deleteUser(userId);
  //     res.json(result);
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // },
};
