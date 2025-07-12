const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const verifyToken = require('../middlewares/verifyToken');
const {
    uploadImage,
    saveQuestion
} = require('../controllers/questionControllers');

const imageDir = path.join(__dirname, '..', 'uploads', 'questions');
if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});
const upload = multer({ storage });

router.post('/upload-image', verifyToken, upload.single('image'), uploadImage);
router.post('/save-question', verifyToken, saveQuestion);

module.exports = router;