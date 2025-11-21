export async function sendMessageToAI(message, user) {
  try {
    const resp = await fetch("http://localhost:5000/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: message, user })
    });
    const data = await resp.json();
    return data.reply;
  } catch {
    return "AI request failed — using fallback.";
  }
}
