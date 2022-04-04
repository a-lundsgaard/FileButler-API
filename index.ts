//const express = require('express');
import express, { Express, Request, Response } from 'express';

import bodyParser from 'body-parser';
import imageRoute from './routes/ocr_route';
import upload from './middleware/diskStorage'

//const dotnev = require('dotenv');
//dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(upload.single('productImage')); // handling image uploads. Name must be the same as the one appended in the form data
app.use('/uploads',express.static('uploads')) // makes the folder public so the images is available on the server

app.use('/image', imageRoute);


// initial route
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is yes running at http://localhost:${port}`);
});