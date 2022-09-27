import http from "http";
import * as path from "path";
import { fileURLToPath } from 'url';
import express from "express";

import userRouter from "./route/userRouter.js";
import sauceRouter from "./route/sauceRouter.js";

// Dirname of static file express
const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const app = express();
app.set('port', process.env.PORT || 3000);

// Middleware General
app.use(express.json());
app.use((req,res,next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.set('Content-Type', 'application/json');
    next();
});

// Path static images
app.use('/images', express.static(__dirname + '/images'));
// Path Authenticator
app.use('/api/auth/', userRouter);
// Path CRUD Sauces
app.use('/api/', sauceRouter);

const server = http.createServer(app);
export default server;
