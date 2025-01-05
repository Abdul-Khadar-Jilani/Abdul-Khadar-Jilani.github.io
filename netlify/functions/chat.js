const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed. Use POST." }),
    };
  }

  const { question, resumeText } = JSON.parse(event.body || "{}");

  if (!question || !resumeText) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request. Missing question or resumeText." }),
    };
  }

  const prompt = `
    You are a friendly assistant AI who answers questions based on a resume and chats comfortably.
    I am providing you with the resume of Abdul Khadar Jilani/Jilani Abdul. Based on the resume, please answer the following question.
    Please don't mention I provided you with the resume in response.
    
    Resume:
    ${resumeText}

    Question: ${question}
  `;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 540,
      }),
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Groq API Error: ${response.statusText}` }),
      };
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content.trim();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: aiMessage }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" }),
    };
  }
};
