//import multer from 'multer';
const multer = require('multer');
import { ImageFile } from '../interfaces/ImageFile';

const storage = multer.diskStorage({
    destination: function (req: Request, file: ImageFile, cb: Function) {
        cb(null, './uploads')
    },
    filename: function (req: Request, file: any, cb: Function) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix);
        //cb(null, file.originalname)
    }
});

const fileFilter = (req: Request, file: ImageFile, cb: Function) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/heic') {
        cb(null, true)
    }
    cb(null, false)
}


export = (() => {
    return multer({
        storage: storage, limits: {
            fileSize: 1024 * 1024 * 10
        },
        fileFilter: fileFilter
    })
})()

