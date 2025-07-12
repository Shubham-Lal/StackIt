const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const verifyToken = require('../middlewares/verifyToken');
const {
    getMe,
    login,
    signup
} = require('../controllers/authControllers');

const avatarUploadPath = path.join(__dirname, '..', 'uploads', 'avatars');
if (!fs.existsSync(avatarUploadPath)) {
    fs.mkdirSync(avatarUploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, avatarUploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

router.get('/me', verifyToken, getMe);
router.post('/login', login);
router.post('/signup', upload.single('avatar'), signup);

module.exports = router;