const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyToken = require('../middlewares/verifyToken');
const {
    getQuestionById,
    getAllQuestions,
    uploadImage,
    saveQuestion
} = require('../controllers/questionControllers');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/all', getAllQuestions);
router.post('/upload-image', verifyToken, upload.single('image'), uploadImage);
router.post('/save-question', verifyToken, saveQuestion);
router.get('/:id', getQuestionById);

module.exports = router;