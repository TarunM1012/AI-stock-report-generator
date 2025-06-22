import OpenAI from "openai";

import {config} from 'dotenv';

config();

const opneai  = new OpenAI({
    apikey: process.env.OPENAI_API_KEY,
})

const messages = [
    {
        role: 'system',
        content: 'You are an expert on quantum computing having a Q and A session with 10 year olds.'
    },

    {
        role: 'user',
        content: 'Explain quantum computing'
    }
]

const response = await opneai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: messages
})

console.log(response.choices[0].message.content);