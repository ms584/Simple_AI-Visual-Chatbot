<img width="900" height="850" alt="Image" src="https://github.com/user-attachments/assets/dad3806d-80ee-4799-a63d-c1e47ec22c29" />

# 🤖 AI Visual Chatbot

A modern AI chatbot built with **React + Vite** that can answer questions and **analyze images** — powered by free models via **OpenRouter AI**.

---

## ✨ Features

- 💬 **Chat with AI** — Ask anything in any language
- 🖼️ **Image Analysis** — Upload a photo and ask questions about it
- ⚡ **Thinking Animation** — Smooth typing indicator while AI responds
- 🎨 **Premium Dark UI** — Glassmorphism design with animated backgrounds
- 🆓 **100% Free** — Uses free-tier models via OpenRouter

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/) |
| AI Provider | [OpenRouter](https://openrouter.ai/) |
| Text Model | `nvidia/nemotron-3-super-120b-a12b:free` |
| Vision Model | `meta-llama/llama-3.2-11b-vision-instruct:free` |
| AI SDK | [openai](https://www.npmjs.com/package/openai) (OpenAI-compatible) |
| Styling | Vanilla CSS (Glassmorphism) |
| Fonts | Google Fonts — Inter, Space Grotesk |

---

## 🚀 Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- An OpenRouter API Key (free — see below)

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/ms584/Simple_AI-Visual-Chatbot.git
cd Simple_AI-Visual-Chatbot/my-ai-app

# 2. Install dependencies
npm install

# 3. Set up your API key
cp .env.example .env
# Then open .env and paste your OpenRouter key

# 4. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser 🎉

---

## 🔑 How to Get a Free OpenRouter API Key

1. Go to **[https://openrouter.ai](https://openrouter.ai)** and sign up (free)
2. Navigate to **[https://openrouter.ai/keys](https://openrouter.ai/keys)**
3. Click **"Create Key"** → give it a name → copy the key
4. Open `my-ai-app/.env` and paste it:

```env
VITE_OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxx
```

> **Note:** The free models used in this project have no cost. OpenRouter's free tier is generous enough for personal projects and learning.

---

## 📁 Project Structure

```
my-ai-app/
├── src/
│   ├── App.jsx        # Main component — chat logic & AI API calls
│   ├── App.css        # Premium glassmorphism styles
│   └── index.css      # Global reset & design tokens
├── index.html         # HTML entry with SEO meta
├── .env               # Your API key (not committed)
└── .env.example       # Template for API key setup
```

---

## 📄 License

MIT — feel free to use, modify, and build upon this project.
