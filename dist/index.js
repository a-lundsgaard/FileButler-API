"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require('express');
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const ocr_route_1 = __importDefault(require("./routes/ocr_route"));
const diskStorage_1 = __importDefault(require("./middleware/diskStorage"));
//const dotnev = require('dotenv');
//dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.use(diskStorage_1.default.single('productImage')); // handling image uploads. Name must be the same as the one appended in the form data
app.use('/uploads', express_1.default.static('uploads')); // makes the folder public so the images is available on the server
app.use('/image', ocr_route_1.default);
// initial route
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`[server]: Server is yes running at http://localhost:${port}`);
});
