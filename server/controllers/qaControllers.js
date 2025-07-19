const ImageKit = require('imagekit');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const viewCache = require('../utils/cache');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
            .populate('user', 'name avatar')
            .sort({ createdAt: -1 })
            .lean();

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
            _id: req.user._id,
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

exports.saveAnswer = async (req, res) => {
    const { question_id, content } = req.body;

    const extractPlainText = (html) => {
        return html
            .replace(/<[^>]*>/g, '')
            .replace(/\u00a0/g, '')
            .replace(/\s/g, '')
            .trim();
    };

    if (!question_id || !content || !extractPlainText(content)) {
        return res.status(400).json({ message: 'Answer content is required' });
    }

    try {
        const question = await Question.findById(question_id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const answer = new Answer({
            question: question_id,
            user: req.user._id,
            content
        });

        await answer.save();
        await Question.updateOne(
            { _id: question_id },
            { $inc: { answerCount: 1 } },
            { timestamps: false }
        );

        const savedAnswer = answer.toObject();
        savedAnswer._id = answer._id;
        savedAnswer.user = {
            _id: req.user._id,
            name: req.user.name,
            avatar: req.user.avatar
        };

        res.status(201).json({
            message: 'Answer saved successfully',
            answer: savedAnswer
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to save answer', error: err.message });
    }
};

exports.voteQuestion = async (req, res) => {
    const { questionId, type } = req.body;
    const userId = req.user._id;

    if (!questionId || !['upvote', 'downvote'].includes(type)) {
        return res.status(400).json({ message: 'Invalid vote request' });
    }

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        if (question.user.toString() === userId.toString()) {
            return res.status(403).json({ message: 'You cannot vote on your own question' });
        }

        const hasUpvoted = question.upvotes.includes(userId);
        const hasDownvoted = question.downvotes.includes(userId);

        question.upvotes = question.upvotes.filter(id => id.toString() !== userId.toString());
        question.downvotes = question.downvotes.filter(id => id.toString() !== userId.toString());

        if (type === 'upvote' && !hasUpvoted) {
            question.upvotes.push(userId);
        }
        if (type === 'downvote' && !hasDownvoted) {
            question.downvotes.push(userId);
        }

        await question.save({ timestamps: false });

        return res.status(200).json({
            message: 'Vote updated',
            upvotes: question.upvotes,
            downvotes: question.downvotes
        });
    }
    catch (err) {
        return res.status(500).json({ message: 'Failed to vote', error: err.message });
    }
};

exports.voteAnswer = async (req, res) => {
    const { answerId, type } = req.body;
    const userId = req.user._id;

    if (!answerId || !['upvote', 'downvote'].includes(type)) {
        return res.status(400).json({ message: 'Invalid vote request' });
    }

    try {
        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        if (answer.user.toString() === userId.toString()) {
            return res.status(403).json({ message: 'You cannot vote on your own answer' });
        }

        const hasUpvoted = answer.upvotes.includes(userId);
        const hasDownvoted = answer.downvotes.includes(userId);

        answer.upvotes = answer.upvotes.filter(id => id.toString() !== userId.toString());
        answer.downvotes = answer.downvotes.filter(id => id.toString() !== userId.toString());

        if (type === 'upvote' && !hasUpvoted) {
            answer.upvotes.push(userId);
        }
        else if (type === 'downvote' && !hasDownvoted) {
            answer.downvotes.push(userId);
        }

        await answer.save();

        return res.status(200).json({
            message: 'Vote updated',
            upvotes: answer.upvotes,
            downvotes: answer.downvotes
        });
    }
    catch (err) {
        return res.status(500).json({ message: 'Failed to vote', error: err.message });
    }
};

exports.getQAsById = async (req, res) => {
    const { id } = req.params;

    try {
        const question = await Question.findById(id)
            .populate('user', 'name avatar')
            .lean();

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;
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

        const answers = await Answer.find({ question: id })
            .populate('user', 'name avatar')
            .lean();

        return res.status(200).json({
            question,
            answers
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch question', error: err.message });
    }
};