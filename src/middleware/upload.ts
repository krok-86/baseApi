import { Request } from 'express';
import * as moment from 'moment';
import * as multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req: Request, file, cb) => {
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        cb(null, `${date}-${file.originalname}`);
    }
});

const fileFilter = (req:Request, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

export default upload;

// import moment = require("moment")
// import multer = require("multer")//fix?

// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename(req, file, cb) {
//         const date = moment().format('DDMMYYYY-HHmmss_SSS')
//         cb(null, `${date}-${file.originalname}`)
//     }
// })

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpag') {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }
// // const limits = {
// //     fileSize: 1024 * 1024 * 5
// // }
// export default multer ({
//     storage: storage,
//     fileFilter: fileFilter,
//     // limits: limits,
// })