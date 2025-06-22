// routes/aiRoutes.js
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { generateStockReport } from '../services/openaiService.js'

const router = express.Router()

router.post('/api/generate-report', async (req, res) => {
  try {
    const { stockData } = req.body
    const report = await generateStockReport(stockData)
    res.json({ report })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'AI processing failed.' })
  }
})

export default router
