import http from "http";
import * as path from "path";
import { fileURLToPath } from 'url';
import express from "express";

import userRouter from "./route/userRouter.js";
import sauceCrudRouter from "./route/sauceCrudRouter.js";

const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const app = express();
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

app.use(express.json());
app.use((req,res,next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.set('Content-Type', 'application/json');
    next();
});

app.use('/images', express.static(__dirname + '/images'));
app.use('/api/auth/', userRouter);
app.use('/api/', sauceCrudRouter);

export default server;
