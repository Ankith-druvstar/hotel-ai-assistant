# 🏨 Hotel AI Assistant — React + OpenAI Chatbot

A smart AI-powered hotel companion that enhances guest experience with instant assistance, room service requests, reminders, hotel information, and more — inside a polished MUI interface.

---

## 🚀 Features

- Personalized guest login (room-based session memory)
- Animated welcome slideshow
- Hotel information & amenities shown using card UI
- Guest reviews inside modern hover popups
- Fully interactive AI chatbot
- Quick actions: room service & reminders
- Persistent history using LocalStorage
- Fully responsive layout

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| React.js | Frontend UI |
| Material-UI (MUI) | Modern components & layout |
| React Router | Navigation |
| OpenAI Chat API | AI responses |
| LocalStorage | Session and reminders persistence |

---

## 📂 Project Structure

src/
├─ components/
│ ├─ Login.js
│ ├─ Welcome.js
│ ├─ Chat.js
├─ services/
│ ├─ ai.js ← OpenAI integration (already configured)
├─ App.js
├─ index.js


---

## ▶️ Run the Project (Easy Steps)

### 1️⃣ Install dependencies
npm install


### 2️⃣ Start the development server
npm start


The application will open automatically on:
http://localhost:3000


---

## 🔑 OpenAI API Key

You **do not** need to register or add your own API key.  
The project already includes a configured OpenAI integration inside:

/src/services/ai.js


So it will **work immediately after running** the project — no extra setup required.

---

## 💬 Chatbot Capabilities

You can ask the assistant things like:

| Example Message | Result |
|----------------|--------|
| “What are today’s breakfast hours?” | AI responds with hotel info |
| “Call room service” | Initiates simulated request |
| “Set reminder to visit the spa at 6 PM” | Saves reminder |
| “View reminders” | Displays all saved reminders |
| “Suggest activities nearby” | AI suggests locations |

---

## 🧩 Customization Reference

| Component | Editable content |
|----------|------------------|
| `Welcome.js` | Hotel details, amenities & reviews |
| `Chat.js` | Chat UI, quick actions & styling |
| `ai.js` | AI response style / temperature |
| `index.css` or theme | Colors & theme |

---

## 🌍 Deployment (Optional)

To build for production:
npm run build


Recommended hosting:
- Vercel
- Netlify
- Surge
- GitHub Pages

---

## 💙 Credits

Built using:
- React
- Material-UI
- OpenAI Chat API

Designed to demonstrate how AI can transform hospitality and improve guest experience.

---
