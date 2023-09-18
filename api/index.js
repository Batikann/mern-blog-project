import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/dbConnection.js'
dotenv.config()

connectDb()

const app = express()

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server listening on Port ${port}`)
})
