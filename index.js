const express = require('express');
const { OpenAI } = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// होम रूट को एकदम सिंपल रखो
app.get('/', (req, res) => {
  res.send('API is working');
});

// चैट एंडपॉइंट
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: 'system', content: 'You are JANEXA AI, a helpful AI assistant.' },
        { role: 'user', content: message }
      ],
    });

    res.json({ reply: response.choices.message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;


