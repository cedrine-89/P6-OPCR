import multer from 'multer';

const MIMETYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const nameFile = file.originalname.split(' ').join('_').split('.')[0];
        const extFile = MIMETYPES[file.mimetype];
        cb(null, `${nameFile}-${Date.now()}.${extFile}`);
    }
});

export default multer({ storage }).single('image');
