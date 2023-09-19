import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './config/dbConnection.js'
import authRoutes from './routes/auth.route.js'
dotenv.config()

connectDb()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server listening on Port ${port}`)
})
