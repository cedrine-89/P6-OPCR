import express from "express";
import { signupController, loginController } from "./../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/signup', signupController);
userRouter.post('/login', loginController);

export default userRouter;
