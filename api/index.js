import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './config/dbConnection.js'
import authRoutes from './routes/auth.route.js'
import path from 'path'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import categoryRoutes from './routes/category.route.js'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import multer from 'multer'
import { verifyToken } from './middleware/verifyUser.js'
import { createPost } from './controller/post.controller.js'

import helmet from 'helmet'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()

const app = express()
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json())

app.use(cookieParser())
app.use(cors())

app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

/*FILE STORAGE */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.post('/post', upload.single('picture'), createPost)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/category', categoryRoutes)

connectDb()
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server listening on Port ${port}`)
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  })
})
