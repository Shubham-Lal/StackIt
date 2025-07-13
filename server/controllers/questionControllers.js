const ImageKit = require('imagekit');
const Question = require('../models/Question');
const viewCache = require('../utils/cache');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

exports.getQuestionById = async (req, res) => {
    const { id } = req.params;

    try {
        const question = await Question.findById(id)
            .populate('user', 'name avatar')
            .exec();

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const ip =
            req.headers['x-forwarded-for']?.split(',').shift() ||
            req.socket?.remoteAddress;

        const cacheKey = `${id}:${ip}`;
        const alreadyViewed = await viewCache.get(cacheKey);

        if (!alreadyViewed) {
            await Question.updateOne(
                { _id: id },
                { $inc: { views: 1 } },
                { timestamps: false }
            );
            await viewCache.set(cacheKey, true);
            question.views += 1;
        }

        res.json(question);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch question', error: err.message });
    }
};

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
            .populate('user', 'name avatar')
            .sort({ createdAt: -1 });

        res.status(200).json({ questions });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch questions' });
    }
};

exports.uploadImage = async (req, res) => {
    try {
        const file = req.file;

        const uploadResult = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            tags: ['question-image'],
            folder: 'question-images',
        });

        return res.status(200).json({ url: uploadResult.url });
    }
    catch (error) {
        return res.status(500).json({ message: 'Image upload failed' });
    }
};

exports.saveQuestion = async (req, res) => {
    const { title, description, tags } = req.body;

    const extractPlainText = (html) => {
        return html
            .replace(/<[^>]*>/g, '')
            .replace(/\u00a0/g, '')
            .replace(/\s/g, '')
            .trim();
    };

    if (!title || !title.trim()) {
        return res.status(400).json({ message: 'Title is required' });
    }

    if (!description || !extractPlainText(description)) {
        return res.status(400).json({ message: 'Description cannot be empty' });
    }

    if (!Array.isArray(tags) || tags.length === 0) {
        return res.status(400).json({ message: 'At least one tag is required' });
    }

    try {
        const question = new Question({
            user: req.user._id,
            title,
            description,
            tags
        });

        await question.save();

        const savedQuestion = question.toObject();
        savedQuestion._id = question._id;
        savedQuestion.user = {
            name: req.user.name,
            avatar: req.user.avatar
        };

        res.status(201).json({
            message: 'Question saved successfully',
            question: savedQuestion
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to save question' });
    }
};