import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './config/dbConnection.js'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

dotenv.config()

connectDb()

const app = express()

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

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
