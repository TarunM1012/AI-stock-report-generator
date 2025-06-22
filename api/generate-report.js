// api/generate-report.js
import { generateStockReport } from '../services/openaiService.js'

export default async function (req, res) {
  // Enable CORS for Vercel
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

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
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}