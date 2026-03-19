<img width="900" height="850" alt="Image" src="https://github.com/user-attachments/assets/dad3806d-80ee-4799-a63d-c1e47ec22c29" />

# 🤖 AI Visual Chatbot

แชทบอท AI สมัยใหม่ที่สร้างด้วย **React + Vite** สามารถตอบคำถามและ **วิเคราะห์รูปภาพ** ได้ — ขับเคลื่อนด้วยโมเดลฟรีผ่าน **OpenRouter AI**

---

## ✨ ฟีเจอร์เด่น

- 💬 **คุยกับ AI** — ถามอะไรก็ได้ทุกภาษา
- 🖼️ **วิเคราะห์รูปภาพ** — อัปโหลดรูปแล้วถามเกี่ยวกับรูปนั้นได้เลย
- ⚡ **แอนิเมชันขณะคิด** — แสดง typing indicator ขณะ AI ประมวลผล
- 🎨 **UI สวยงาม Dark Mode** — ดีไซน์ Glassmorphism พร้อม animated background
- 🆓 **ฟรี 100%** — ใช้โมเดลระดับ free tier ผ่าน OpenRouter

---

## 🛠️ Tech Stack

| หมวดหมู่ | เทคโนโลยี |
|----------|-----------|
| Framework | [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/) |
| AI Provider | [OpenRouter](https://openrouter.ai/) |
| โมเดลข้อความ | `nvidia/nemotron-3-super-120b-a12b:free` |
| โมเดลวิเคราะห์ภาพ | `meta-llama/llama-3.2-11b-vision-instruct:free` |
| AI SDK | [openai](https://www.npmjs.com/package/openai) (OpenAI-compatible) |
| Styling | Vanilla CSS (Glassmorphism) |
| Fonts | Google Fonts — Inter, Space Grotesk |

---

## 🚀 รันบนเครื่องตัวเอง (Local)

### สิ่งที่ต้องมีก่อน
- [Node.js](https://nodejs.org/) v18 ขึ้นไป
- OpenRouter API Key (ฟรี — ดูวิธีด้านล่าง)

### ขั้นตอน

```bash
# 1. Clone โปรเจกต์
git clone https://github.com/ms584/Simple_AI-Visual-Chatbot.git
cd Simple_AI-Visual-Chatbot/my-ai-app

# 2. ติดตั้ง dependencies
npm install

# 3. ตั้งค่า API Key
cp .env.example .env
# จากนั้นเปิดไฟล์ .env แล้วใส่ OpenRouter Key ของคุณ

# 4. เริ่ม dev server
npm run dev
```

เปิด **http://localhost:5173** ในเบราว์เซอร์ได้เลย 🎉

---

<img width="1446" height="876" alt="Image" src="https://github.com/user-attachments/assets/8151848b-c27c-4b09-be92-45c9077e5667" />
<img width="1215" height="889" alt="Image" src="https://github.com/user-attachments/assets/121bd7a8-1374-4f06-9ef8-b557b4f24460" />
<img width="1321" height="274" alt="Image" src="https://github.com/user-attachments/assets/0f6f9f1b-1ea4-4f52-a05c-8e666d30eae4" />

## 🔑 วิธีขอ OpenRouter API Key ฟรี

1. ไปที่ **[https://openrouter.ai](https://openrouter.ai)** แล้วสมัครสมาชิก (ฟรี)
2. ไปที่หน้า **[https://openrouter.ai/keys](https://openrouter.ai/keys)**
3. กด **"Create Key"** → ตั้งชื่อ → Copy key ที่ได้
4. เปิดไฟล์ `.env` แล้วใส่ key ลงไป:

```env
VITE_OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxx
```

> **หมายเหตุ:** โมเดลที่ใช้ในโปรเจกต์นี้เป็นโมเดลฟรีทั้งหมด OpenRouter ให้โควตาฟรีเพียงพอสำหรับโปรเจกต์ส่วนตัวและการเรียนรู้

---

## 📁 โครงสร้างโปรเจกต์

```
my-ai-app/
├── src/
│   ├── App.jsx        # คอมโพเนนต์หลัก — logic การแชทและเรียก AI API
│   ├── App.css        # สไตล์ glassmorphism สวยงาม
│   └── index.css      # Global reset และ design tokens
├── index.html         # HTML หลักพร้อม SEO meta
├── .env               # API Key ของคุณ (ไม่ถูก commit ขึ้น Git)
└── .env.example       # ตัวอย่างการตั้งค่า API Key
```

---

## 📄 License

MIT — ใช้ แก้ไข และต่อยอดได้อย่างอิสระ
