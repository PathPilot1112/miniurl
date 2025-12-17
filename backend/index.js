import express from 'express'
import dotenv from 'dotenv'
import connectDB from './lib/db.js'
dotenv.config()

const app = express()

const port = process.env.PORT || 3001

connectDB()

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})