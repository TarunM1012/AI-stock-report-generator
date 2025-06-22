// server.js
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import aiRoutes from './routes/aiRoutes.js'
console.log('Current working directory:', process.cwd())


dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/', aiRoutes)  // Mount your AI routes

app.listen(3000, () => {
  console.log('Server running on http://host:3000')
})
