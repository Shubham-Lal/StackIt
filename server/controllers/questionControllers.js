const Question = require('../models/Question');

exports.getQuestionById = async (req, res) => {
    const { id } = req.params;

    try {
        const question = await Question.findById(id)
            .populate('user', 'name avatar')
            .exec();

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
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

exports.uploadImage = (req, res) => {
    const fileUrl = `http://localhost:${process.env.PORT || 5000}/uploads/questions/${req.file.filename}`;
    res.json({ url: fileUrl });
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

        res.status(201).json({
            message: 'Question saved successfully',
            question: savedQuestion
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to save question' });
    }
};