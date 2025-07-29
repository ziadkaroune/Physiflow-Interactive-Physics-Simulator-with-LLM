import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';  
import dotenv from 'dotenv'; // load API key securely

dotenv.config(); //  load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());  
app.use(express.json()); 

 
app.post('/api/generate-animation', async (req, res) => {
  const { prompt } = req.body;  

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen/qwen3-coder:free',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.4,
        max_tokens: 500
      })
    });

    if (!response.ok) throw new Error("Failed to fetch from OpenRouter");

    const data = await response.json();
    res.json({ result: data.choices[0].message.content }); 

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
