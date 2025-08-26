
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // index.html ở đây

app.post('/api/predict', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) return res.status(400).json({ error: "Thiếu prompt" });

    const apiKey = process.env.DEEPSEEK_KEY; // Thay bằng key của bạn
    const response = await fetch('https://api.openrouter.ai/v1/engines/deepseek/deepseek-v3-0324/completions', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 10,
        temperature: 0.3
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
