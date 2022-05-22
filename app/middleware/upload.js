const multer = require("multer");
const path = require("path");

const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
];

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'public/');
    },
    filename: function (req, file, cb) {
       cb(null, Date.now() + '-' + file.originalname);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
            req.fileValidationError = "file is not allowed";
            return cb(null, false, req.fileValidationError);
        }
    
        cb(null, true);
    }
});

module.exports = upload;