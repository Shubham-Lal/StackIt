require('dotenv').config();
const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

const app = express()
app.set('trust proxy', true);

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(express.json())

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/qa', require('./routes/qaRoutes'));

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        app.get('/', (req, res) => res.status(200).json({ status: 'Server running...' }));

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`)
        })
    })
    .catch(err => console.log(`MongoDB connection error: ${err}`));