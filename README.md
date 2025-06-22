# Stock Predictor AI

An AI-powered stock analysis tool that generates trading recommendations based on stock data.

## Features

- Real-time stock data fetching from Polygon.io
- AI-powered stock analysis using OpenAI GPT-4
- Interactive ticker input and report generation
- Modern, responsive UI

## Deployment to Vercel

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **OpenAI API Key**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
3. **Polygon.io API Key**: Get your API key from [Polygon.io](https://polygon.io)

### Environment Variables

Set these environment variables in your Vercel project dashboard:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### Deployment Steps

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   - **Option A**: Connect your GitHub repository to Vercel
   - **Option B**: Use Vercel CLI:
     ```bash
     vercel
     ```

3. **Set Environment Variables**:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add `OPENAI_API_KEY` with your OpenAI API key

4. **Deploy**:
   - If using GitHub integration: Push to your main branch
   - If using CLI: Run `vercel --prod`

### Project Structure

```
AI-stock-report-generator/
├── api/
│   └── generate-report.js    # Vercel serverless function
├── public/                   # Static files served by Vercel
│   ├── index.html
│   ├── index.js
│   ├── index.css
│   └── utils/
├── services/
│   └── openaiService.js      # OpenAI integration
├── vercel.json              # Vercel configuration
└── package.json
```

### Local Development

For local development, you can use the Express server:

```bash
npm install
node server.js
```

For Vercel-like local development:

```bash
npm install -g vercel
vercel dev
```

## API Endpoints

- `POST /api/generate-report`: Generates AI stock analysis report

## Technologies Used

- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Backend**: Node.js, Express (local), Vercel Serverless Functions (production)
- **AI**: OpenAI GPT-4
- **Data**: Polygon.io API
- **Deployment**: Vercel

## Notes

- The Express server (`server.js`) is only used for local development
- Production deployment uses Vercel's serverless functions
- Environment variables are handled by Vercel's platform
- Static files are served from the `/public` directory 