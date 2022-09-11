import express from "express";
import { signupController, loginController } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/signup', signupController);
userRouter.get('/login', loginController);

export default userRouter;
