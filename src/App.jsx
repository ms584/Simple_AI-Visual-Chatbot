import { useState, useRef, useEffect, useCallback } from "react";
import OpenAI from "openai";
import "./App.css";

// ─── OpenRouter Client ───────────────────────────────────────────────────────
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "AI Visual Chatbot",
  },
});

// Use a free model that supports both text and vision
const TEXT_MODEL = "nvidia/nemotron-3-super-120b-a12b:free";
const VISION_MODEL = "meta-llama/llama-3.2-11b-vision-instruct:free";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ThinkingIndicator() {
  return (
    <div className="message ai">
      <div className="avatar ai">✦</div>
      <div className="bubble">
        <div className="thinking-dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }) {
  return (
    <div className={`message ${msg.role}${msg.isError ? " error" : ""}`}>
      <div className={`avatar ${msg.role}`}>
        {msg.role === "ai" ? "✦" : "คุณ"}
      </div>
      <div className="bubble">
        {msg.imageUrl && (
          <img src={msg.imageUrl} alt="uploaded" className="chat-image" />
        )}
        <pre>{msg.text}</pre>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const chatWindowRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleTextareaInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
  };

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed && !imageFile) return;
    if (loading) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      text: trimmed || "(ส่งรูปภาพ)",
      imageUrl: imagePreviewUrl,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const capturedFile = imageFile;
    const capturedPreview = imagePreviewUrl;
    setImageFile(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);

    try {
      let messageContent;
      let model;

      if (capturedFile) {
        // Vision: send image as base64 data URL
        const dataUrl = await fileToDataUrl(capturedFile);
        const prompt = trimmed || "ช่วยอธิบายภาพนี้ให้ฉันหน่อยได้ไหม?";
        model = VISION_MODEL;
        messageContent = [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: dataUrl } },
        ];
      } else {
        model = TEXT_MODEL;
        messageContent = trimmed;
      }

      const completion = await client.chat.completions.create({
        model,
        messages: [{ role: "user", content: messageContent }],
      });

      const text = completion.choices[0]?.message?.content ?? "(ไม่มีคำตอบ)";
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", text },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text: `❌ เกิดข้อผิดพลาด: ${err.message}`,
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, imageFile, imagePreviewUrl, loading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app">
      <div className="container">

        {/* ── Header ── */}
        <header className="header">
          <div className="header-badge">
            <span className="dot" />
            OpenRouter · Free Models · Live
          </div>
          <h1>AI Visual Chatbot</h1>
          <p>ถามอะไรก็ได้ · วิเคราะห์รูปภาพ · ตอบได้ทุกภาษา</p>
        </header>

        {/* ── Capabilities ── */}
        <div className="capabilities">
          {[
            ["💬", "ถาม–ตอบทั่วไป"],
            ["🖼️", "วิเคราะห์รูปภาพ"],
            ["🌐", "รองรับทุกภาษา"],
            ["🆓", "ฟรี 100%"],
          ].map(([icon, label]) => (
            <div key={label} className="cap-chip">
              <span>{icon}</span>
              {label}
            </div>
          ))}
        </div>

        {/* ── Chat Window ── */}
        <div className="chat-window" ref={chatWindowRef}>
          {messages.length === 0 && !loading ? (
            <div className="empty-state">
              <span className="icon">✦</span>
              <strong>เริ่มต้นการสนทนา</strong>
              <span>พิมพ์ข้อความหรืออัปโหลดรูปภาพด้านล่าง</span>
            </div>
          ) : (
            messages.map((msg) => <MessageBubble key={msg.id} msg={msg} />)
          )}
          {loading && <ThinkingIndicator />}
        </div>

        {/* ── Input Panel ── */}
        <div className="input-panel">
          {/* Image upload */}
          <div className="image-upload-zone">
            {imagePreviewUrl ? (
              <div className="image-preview-container">
                <img
                  src={imagePreviewUrl}
                  alt="preview"
                  className="image-preview"
                />
                <button
                  className="remove-image-btn"
                  onClick={removeImage}
                  title="ลบรูปภาพ"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="image-upload-label" htmlFor="file-upload">
                <span className="upload-icon">📎</span>
                <span>แนบรูปภาพ (ไม่บังคับ)</span>
                <input
                  id="file-upload"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="image-upload-input"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Text + Send */}
          <div className="text-row">
            <textarea
              ref={textareaRef}
              className="text-input"
              placeholder="ถามอะไรก็ได้... (Enter เพื่อส่ง, Shift+Enter ขึ้นบรรทัดใหม่)"
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={loading}
            />
            <button
              className="send-btn"
              onClick={handleSend}
              disabled={loading || (!input.trim() && !imageFile)}
              title="ส่ง"
              id="send-button"
            >
              {loading ? (
                <div className="spinner" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              )}
            </button>
          </div>
          <p className="input-hint">Enter ส่ง · Shift+Enter ขึ้นบรรทัดใหม่</p>
        </div>

      </div>
    </div>
  );
}
