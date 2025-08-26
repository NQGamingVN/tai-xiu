
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

    const apiKey = "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"; // Thay bằng key của bạn
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
