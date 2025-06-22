import OpenAI from 'openai';
import { config } from 'dotenv';
config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const messages = [
    {
        role: 'system',
        content: 'You are a helpful knowledge expert',
        
    },
    {
        role: 'user',
        content: 'Who invented the television'
    }
]

const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: messages
});

console.log(response.choices[0].message.content)
