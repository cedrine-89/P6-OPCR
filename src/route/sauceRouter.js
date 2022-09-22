import express from "express";
import { createSauce, readAllSauce, readSauce, updateSauce, deleteSauce } from "./../controllers/sauceController.js";
import { auth } from "./../middleware/auth.js";
import multerConfig from "./../middleware/multerConfig.js";

const sauceRouter = express.Router();
// TODO Create validator name file special character
sauceRouter.post('/sauces', auth, multerConfig, createSauce);
sauceRouter.get('/sauces', auth, readAllSauce);
sauceRouter.get('/sauces/:id', auth, readSauce);
sauceRouter.put('/sauces/:id', auth, multerConfig, updateSauce);
sauceRouter.delete('/sauces/:id', auth, deleteSauce);

export default sauceRouter;
