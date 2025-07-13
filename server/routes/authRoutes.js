const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyToken = require('../middlewares/verifyToken');
const {
    getMe,
    login,
    signup
} = require('../controllers/authControllers');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/me', verifyToken, getMe);
router.post('/login', login);
router.post('/signup', upload.single('avatar'), signup);

module.exports = router;