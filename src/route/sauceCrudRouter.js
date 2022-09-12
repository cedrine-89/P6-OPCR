import express from "express";
import { createSauce, readSauce } from "../controllers/sauceCrudController.js";
import { auth } from "../middleware/auth.js";
import multerConfig from "../middleware/multerConfig.js";

const sauceCrudRouter = express.Router();

sauceCrudRouter.post('/sauces', auth, multerConfig, createSauce);
sauceCrudRouter.get('/sauces', auth, readSauce);

export default sauceCrudRouter;
