import express from "express";
import { createSauce, readAllSauce, readSauce } from "./../controllers/sauceCrudController.js";
import { auth } from "./../middleware/auth.js";
import multerConfig from "./../middleware/multerConfig.js";

const sauceCrudRouter = express.Router();
// TODO Create validator name file special character
sauceCrudRouter.post('/sauces', auth, multerConfig, createSauce);
sauceCrudRouter.get('/sauces', auth, readAllSauce);
sauceCrudRouter.get('/sauces/:id', auth, readSauce);

export default sauceCrudRouter;
