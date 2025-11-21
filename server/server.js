import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OR_KEY = process.env.OPENROUTER_API_KEY;

app.post("/api/ai", async (req, res) => {
  const { prompt, user } = req.body;

  const systemPrompt = `
You are Hotel BlueHarbor's AI assistant.
Be friendly, respectful and concise.
User: ${user?.name || "Guest"}
Room: ${user?.room || "Unknown"}

Rules:
• DO NOT use <s>, </s>, [OUT], [/OUT], or any XML-style tags.
• Just answer normally like a chatbot.
• If user asks for room service → reply: "Room service has been notified."
• If user asks for a reminder → reply: "Reminder saved."
• If user asks hotel timings, spa, breakfast, activities → answer clearly.
`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OR_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", // FREE MODEL
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    console.log("AI:", data);

    let text = data.choices?.[0]?.message?.content || "No reply";

    // Fallback cleanup
    text = text
      .replace(/<s>/g, "")
      .replace(/<\/s>/g, "")
      .replace(/\[OUT\]/g, "")
      .replace(/\[\/OUT\]/g, "")
      .trim();

    res.json({ reply: text });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ reply: "AI backend error. Please try again." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("AI Server running on port", PORT));
