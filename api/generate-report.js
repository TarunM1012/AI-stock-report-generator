// api/api/generate-report.js
import dotenv from 'dotenv'
dotenv.config()

import { generateStockReport } from '../services/openaiService.js' // Adjust path if needed

export default async function (req, res) {
  if (req.method === 'POST') {
    try {
      const { stockData } = req.body
      const report = await generateStockReport(stockData)
      res.json({ report })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'AI processing failed.' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' }) // Handle non-POST requests if necessary
  }
}