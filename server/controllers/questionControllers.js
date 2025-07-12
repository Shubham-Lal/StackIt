const Question = require('../models/Question');

exports.uploadImage = (req, res) => {
    const fileUrl = `http://localhost:${process.env.PORT || 5000}/uploads/questions/${req.file.filename}`;
    res.json({ url: fileUrl });
};

exports.saveQuestion = async (req, res) => {
    const { title, description, tags } = req.body;

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