import express from "express";

const userRouter = express.Router();

userRouter.post('/signup', (req, res) => {
    res.status(200).json({ status : true })
});

userRouter.post('/login', (req, res) => {
    res.status(200).json({ status : true })
});

export default userRouter;
