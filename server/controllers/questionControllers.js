const Question = require('../models/Question');

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
        res.status(201).json({ message: 'Question saved successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to save question' });
    }
};