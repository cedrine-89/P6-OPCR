import http from "http";
import express from "express";

import userRouter from "./route/userRouter.js";

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

app.use('/api/auth/', userRouter);

export default server;
