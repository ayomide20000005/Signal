import { useState } from "react"
import axios from "axios"
import Feed from "./components/Feed"

export default function App() {
  const [articles, setArticles] = useState([])
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = { role: "user", text: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setThinking(true)
    axios.post("http://localhost:8000/chat", { message: input })
      .then(res => {
        setMessages(prev => [...prev, { role: "signal", text: res.data.response }])
        setThinking(false)
      })
      .catch(() => setThinking(false))
  }

  return (
    <div style={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#000",
      minHeight: "100vh",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <h1 style={{ color: "#e7e9ea", fontSize: "20px", marginBottom: "20px" }}>
        Signal ⚡
      </h1>

      <Feed onArticlesLoaded={setArticles} />

      <div style={{
        marginTop: "32px",
        border: "1px solid #2f3336",
        borderRadius: "12px",
        overflow: "hidden"
      }}>
        <div style={{
          padding: "12px 16px",
          borderBottom: "1px solid #2f3336",
          color: "#e7e9ea",
          fontSize: "14px",
          fontWeight: "bold"
        }}>
          Signal AI ⚡ — Ask anything about today's news
        </div>

        <div style={{
          padding: "16px",
          minHeight: "200px",
          maxHeight: "400px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}>
          {messages.length === 0 && (
            <div style={{ color: "#71767b", fontSize: "13px" }}>
              Ask me to write a thread, summarize the biggest story, or draft a post about anything in today's feed.
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "#1d9bf0" : "#16181c",
              color: "#e7e9ea",
              padding: "10px 14px",
              borderRadius: "16px",
              fontSize: "14px",
              maxWidth: "85%",
              lineHeight: "1.5"
            }}>
              {msg.text}
            </div>
          ))}
          {thinking && (
            <div style={{ color: "#71767b", fontSize: "13px" }}>Signal is thinking...</div>
          )}
        </div>

        <div style={{
          display: "flex",
          borderTop: "1px solid #2f3336",
          padding: "10px"
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Ask Signal..."
            style={{
              flex: 1,
              background: "none",
              border: "none",
              color: "#e7e9ea",
              fontSize: "14px",
              outline: "none",
              padding: "6px"
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              background: "#1d9bf0",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              padding: "6px 16px",
              cursor: "pointer",
              fontSize: "13px"
            }}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}