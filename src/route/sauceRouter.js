import express from "express";
import { auth } from "./../middleware/auth.js";
import { createSauce, readAllSauce, readSauce, updateSauce, deleteSauce } from "./../controllers/sauceController.js";
import { likeSauce } from "../controllers/likeController.js";
import multerConfig from "./../middleware/multerConfig.js";

const sauceRouter = express.Router();
// TODO Create validator name file special character
sauceRouter.post('/sauces', auth, multerConfig, createSauce);
sauceRouter.get('/sauces', auth, readAllSauce);
sauceRouter.get('/sauces/:id', auth, readSauce);
sauceRouter.put('/sauces/:id', auth, multerConfig, updateSauce);
sauceRouter.delete('/sauces/:id', auth, deleteSauce);
sauceRouter.post('/sauces/:id/like', auth, likeSauce);

export default sauceRouter;
