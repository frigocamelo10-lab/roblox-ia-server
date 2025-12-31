import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  const msg = req.body.message;

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Você é uma IA dentro de um jogo Roblox." },
          { role: "user", content: msg }
        ]
      })
    });

    const j = await r.json();
    res.json({ reply: j.choices[0].message.content });

  } catch (e) {
    res.status(500).json({ error: "Erro na IA" });
  }
});

app.listen(3000);
