const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyToken = require('../middlewares/verifyToken');
const {
    getAllQuestions,
    uploadImage,
    saveQuestion,
    saveAnswer,
    voteQuestion,
    voteAnswer,
    getQAsById,
} = require('../controllers/qaControllers');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/all', getAllQuestions);
router.post('/upload-image', verifyToken, upload.single('image'), uploadImage);
router.post('/save-question', verifyToken, saveQuestion);
router.post('/save-answer', verifyToken, saveAnswer);
router.post('/vote-question', verifyToken, voteQuestion);
router.post('/vote-answer', verifyToken, voteAnswer);
router.get('/:id', getQAsById);

module.exports = router;