🏨 Hotel AI Assistant — React + OpenAI Chatbot

A smart AI-powered hotel companion that enhances guest experience with instant assistance, room service requests, reminders, hotel information, and more — beautifully designed using MUI.

🚀 Features

Guest login with room-based session memory

Animated welcome slideshow

Hotel info & amenities displayed in modern card UI

Hover-based guest review previews

Powerful AI chatbot (OpenAI)

Quick actions: reminders & room service

Persistent chat history & reminders using LocalStorage

Fully responsive and mobile-friendly design

🛠️ Tech Stack
Technology	Purpose
React.js	Frontend interface
Material-UI (MUI)	UI components and styling
React Router	Routing & navigation
Express.js	Backend API
OpenAI Chat API	AI responses
LocalStorage	Persistent reminders & chat memory


📂 Project Structure
project/
├─ src/
│  ├─ components/
│  │  ├─ Login.js
│  │  ├─ Welcome.js
│  │  ├─ Chat.js
│  ├─ services/
│  │  ├─ ai.js   ← OpenAI integration
│  ├─ App.js
│  ├─ index.js
│
├─ server/       ← Node/Express backend
│  ├─ index.js
│  ├─ package.json
│
├─ package.json  ← React dependencies

▶️ How to Run the Project
1️⃣ Start the backend (server folder)
cd server
npm install
npm start


Backend runs at:

http://localhost:5000

2️⃣ Start the React app (root folder)

Open a second terminal in the root project folder (NOT inside server):

npm install
npm start


Frontend runs at:

http://localhost:3000

🔑 OpenAI API Setup

❗ You do not need to add your own API key.
The project already contains a configured OpenAI connection located at:

src/services/ai.js


It will work immediately after running the project.

💬 AI Chatbot Commands

Try asking the assistant:

Message	Result
What are breakfast timings?	Provides hotel info
Call room service	Triggers a service request
Set reminder to visit spa at 7pm	Saves reminder
View reminders	Shows saved reminders
Suggest tourist places nearby	AI recommendations
🧩 Customization Guide
File	Customizable Section
Welcome.js	Hotel banner, amenities & reviews
Chat.js	Chat UI & quick action buttons
ai.js	AI personality, temperature and model settings
App.js	Navigation flow
🌍 Deployment

To build the React app for production:

npm run build


Hosting recommendations:

Vercel

Netlify

Surge

GitHub Pages

Backend deployment (optional):

Render

Railway

Heroku

AWS / VPS

💙 Credits

Built with:

React.js

Material-UI

Express.js

OpenAI Chat API

Designed to show how AI can improve hotel hospitality and elevate guest experience.