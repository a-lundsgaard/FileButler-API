import * as express from "express";
import { imageController } from '../controllers/ocr'
const router = express.Router();

export = (() => {
    router.post('/', imageController ); 
    return router;
})();