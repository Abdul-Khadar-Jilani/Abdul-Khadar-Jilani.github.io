const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API route (example)
app.post('/api/chat', async (req, res) => {
  const { question, resumeText } = req.body;

  if (!question || !resumeText) {
    return res.status(400).json({ error: 'Invalid request. Missing question or resumeText.' });
  }

  const prompt = `
  You are a virtual assistant designed to answer questions *about* Abdul Khadar Jilani, using only the profile information provided below.
  
  You are not Abdul yourself. Always respond as an AI assistant — do not answer in first-person from his point of view.
  
  If someone asks what *you* can do, explain that you’re an AI built to help users understand Abdul Khadar Jilani’s background and skills.
  
  Here is his profile:
  ${resumeText}
  
  Now answer this question:
  ${question}
  
  If the question is not relevant to Abdul Khadar Jilani, politely mention your limitations.`;
  

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 540,
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Groq API Error: ${response.statusText}` });
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content.trim();

    res.json({ message: aiMessage });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
