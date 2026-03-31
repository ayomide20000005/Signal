export default function TweetCard({ item }) {
  return (
    <div style={{
      border: "1px solid #2f3336",
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "12px",
      backgroundColor: "#16181c"
    }}>
      <div style={{ fontSize: "12px", color: "#71767b", marginBottom: "6px" }}>
        {item.source} · {item.published}
      </div>
      <div style={{ fontSize: "15px", color: "#e7e9ea", marginBottom: "10px", lineHeight: "1.5" }}>
        {item.tweet}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <a href={item.link} target="_blank" rel="noreferrer"
          style={{ fontSize: "13px", color: "#1d9bf0" }}>
          Source
        </a>
        <button
          onClick={() => navigator.clipboard.writeText(item.tweet)}
          style={{
            fontSize: "13px",
            color: "#1d9bf0",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0
          }}>
          Copy Tweet
        </button>
      </div>
    </div>
  )
}