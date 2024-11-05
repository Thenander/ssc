import express from "express";

const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    /* const user = await UserModel.create({
      email: req.body.email,
      password: req.body.password,
    }); */

    return res.status(201).json({
      message: "user created",
      /* user: { email: user.email, id: user._id }, */
    });
  } catch (error) {
    console.log(error);
  }
});

authRouter.get("/profile", async (req, res, next) => {
  try {
    // check if user exists
    /* const userExists = await UserModel.findOne({ email: req.body.email }); */
    /* if (!userExists) {
      return res.status(400).json({ message: "user does not exist" });
    } */

    return res.status(200).json({
      /* userId: userExists._id, email: userExists.email */
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
