require('dotenv').config();
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const app = express()
const PORT = 5000

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(express.json())

app.use('/api/auth', require('./routes/authRoutes'));

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const dir = './uploads'
//         if (!fs.existsSync(dir)) fs.mkdirSync(dir)
//         cb(null, dir)
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
//         const ext = path.extname(file.originalname)
//         cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
//     },
// })
// const upload = multer({ storage })

// app.post('/upload-image', upload.single('image'), (req, res) => {
//     const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`
//     res.json({ url: fileUrl })
// })

// app.post('/save-content', (req, res) => {
//     const { html } = req.body

//     res.json({ message: 'Content saved successfully' })
// })

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        app.get('/', (req, res) => res.status(200).json({ status: 'Server running...' }));

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`)
        })
    })
    .catch(err => console.log(`MongoDB connection error: ${err}`));