import express, { Express, Request, Response } from 'express';
import { ImageFile } from '../interfaces/ImageFile';
import tesseract from "node-tesseract-ocr"
import * as fs from 'fs';

export async function imageController(req: Request, res: Response) {
    try {
        const request = req.file as ImageFile;
        const filePath = request.path;
        const img = fs.readFileSync(filePath);

        const config = {
            lang: "eng+dan",
            oem: 1,
            psm: 3,
        }
        const imageText = await tesseract.recognize(img, config);
        fs.unlinkSync(filePath); // removing image from server after use
        console.log('Found image text: ', imageText);
        return res.json({ text: imageText });
    } catch (error) {
        console.log('Could not convert: ', error);
        return res.status(500).json({
            error: error
        })
    }
}; 