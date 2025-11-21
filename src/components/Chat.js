import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import { sendMessageToAI } from "../services/ai";

export default function Chat({ user }) {
  const [messages, setMessages] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("hotel_chat_" + (user?.room || "guest"))
        ) || []
      );
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    localStorage.setItem(
      "hotel_chat_" + (user?.room || "guest"),
      JSON.stringify(messages)
    );
  }, [messages]);

  useEffect(
    () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages]
  );

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input, time: Date.now() };
    setMessages((m) => [...m, userMsg]);
    const question = input;
    setInput("");

    const lower = question.toLowerCase();

    // Built-in commands
    if (lower.includes("room service")) {
      return setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Room service has been notified 🛎 They will reach your room shortly.",
          time: Date.now(),
        },
      ]);
    }

    if (lower.includes("remind me") || lower.includes("set reminder")) {
      const extracted = question.replace(/remind me to|set reminder to/i, "");
      const reply = {
        role: "assistant",
        text: `⏰ Reminder set: "${extracted.trim()}". You can view it anytime via "View Reminders".`,
        time: Date.now(),
      };
      setMessages((m) => [...m, reply]);

      const reminders = JSON.parse(
        localStorage.getItem("hotel_reminders") || "[]"
      );
      reminders.push({
        text: extracted.trim(),
        created: Date.now(),
        room: user?.room,
      });
      localStorage.setItem("hotel_reminders", JSON.stringify(reminders));
      return;
    }

    // --- AI REQUEST ---
    setLoading(true);
    const aiReply = await sendMessageToAI(question, user);
    setLoading(false);

    setMessages((m) => [
      ...m,
      { role: "assistant", text: aiReply, time: Date.now() },
    ]);
  }

  return (
    <Paper
      elevation={8}
      sx={{
        p: 3,
        borderRadius: 4,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(6px)",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        AI Assistant 💬
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.7 }}>
        Ask anything about hotel, services, food, reminders, and more.
      </Typography>

      {/* Quick Suggested Prompts */}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
        {[
          "Breakfast time",
          "Spa timings",
          "Set reminder to visit gym at 6pm",
          "Request room service",
        ].map((p, i) => (
          <Chip
            key={i}
            label={p}
            variant="outlined"
            sx={{ cursor: "pointer" }}
            onClick={() => setInput(p)}
          />
        ))}
      </Box>

      {/* Chat Window */}
      <Box
        sx={{
          maxHeight: 370,
          overflowY: "auto",
          p: 2,
          borderRadius: 3,
          background: "#f6f8ff",
          mb: 2,
        }}
      >
        {messages.map((m, i) => {
          const mine = m.role === "user";
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: mine ? "flex-end" : "flex-start",
                mb: 1.5,
              }}
            >
              <Box
                sx={{
                  maxWidth: "75%",
                  p: 1.6,
                  borderRadius: 3,
                  fontSize: "1.05rem",
                  background: mine ? "#1a73e8" : "rgba(255,255,255,0.75)",
                  color: mine ? "white" : "#000",
                  boxShadow: mine
                    ? "0 3px 10px rgba(0,0,0,0.2)"
                    : "0 3px 8px rgba(0,0,0,0.15)",
                }}
              >
                {m.text}
                <Typography
                  sx={{ fontSize: "0.72rem", opacity: 0.65, mt: 0.5 }}
                >
                  {new Date(m.time).toLocaleTimeString()}
                </Typography>
              </Box>
            </Box>
          );
        })}

        {/* Typing */}
        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={20} />
            <Typography>Assistant is typing…</Typography>
          </Box>
        )}

        <div ref={bottomRef}></div>
      </Box>

      {/* Input */}
      {/* Input Area */}
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          alignItems: "center",
          p: 1.5,
          borderRadius: 3,
          background: "rgba(255,255,255,0.8)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        }}
      >
        <TextField
          fullWidth
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2.5,
              background: "#fff",
            },
          }}
        />
        <IconButton
          onClick={handleSend}
          sx={{
            background: "linear-gradient(45deg,#1c4a91,#007aff)",
            color: "#fff",
            p: 2,
            borderRadius: 3,
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            transition: "0.25s",
            ":hover": { transform: "translateY(-3px)", opacity: 0.92 },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>

      {/* Bottom Buttons */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Button
          onClick={() => {
            const rem = JSON.parse(
              localStorage.getItem("hotel_reminders") || "[]"
            ).filter((r) => r.room === user?.room);
            if (!rem.length)
              return setMessages((m) => [
                ...m,
                {
                  role: "assistant",
                  text: "📌 You don't have any reminders yet.",
                  time: Date.now(),
                },
              ]);
            setMessages((m) => [
              ...m,
              {
                role: "assistant",
                text:
                  "📅 Your reminders:\n" +
                  rem.map((r) => `• ${r.text}`).join("\n"),
                time: Date.now(),
              },
            ]);
          }}
          sx={{
            flexGrow: 1,
            py: 1.4,
            fontSize: "1rem",
            borderRadius: 2,
            border: "2px solid #1c4a91",
            boxShadow: "0 5px 16px rgba(0,0,0,0.15)",
            transition: "0.3s",
            ":hover": {
              background: "rgba(0,0,0,0.06)",
              transform: "translateY(-3px)",
            },
          }}
        >
          📅 View Reminders
        </Button>

        <Button
          onClick={() =>
            setInput(
              "Request room service for (e.g., towels / cleaning / coffee)"
            )
          }
          sx={{
            flexGrow: 1,
            py: 1.4,
            fontSize: "1rem",
            borderRadius: 2,
            background: "linear-gradient(45deg, #1c4a91, #007aff)",
            color: "#fff",
            fontWeight: 600,
            boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
            transition: "0.3s",
            ":hover": { opacity: 0.88, transform: "translateY(-3px)" },
          }}
        >
          🛎 Notify Room Service
        </Button>
      </Box>
    </Paper>
  );
}
