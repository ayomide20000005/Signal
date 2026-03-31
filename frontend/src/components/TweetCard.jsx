export default function TweetCard({ item, tweet, generating, onGenerate }) {
  return (
    <div style={{
      border: "1px solid #2f3336",
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "12px",
      backgroundColor: "#16181c"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "12px", color: "#71767b" }}>{item.source}</span>
        <span style={{
          fontSize: "11px",
          color: "#fff",
          background: "#1d9bf022",
          border: "1px solid #1d9bf055",
          borderRadius: "20px",
          padding: "2px 10px"
        }}>{item.category}</span>
      </div>
      <div style={{ fontSize: "15px", color: "#e7e9ea", marginBottom: "10px", lineHeight: "1.5", fontWeight: "bold" }}>
        {item.title}
      </div>
      <div style={{ fontSize: "13px", color: "#71767b", marginBottom: "12px", lineHeight: "1.5" }}>
        {item.summary?.slice(0, 150)}...
      </div>
      {tweet ? (
        <>
          <div style={{
            fontSize: "15px",
            color: "#e7e9ea",
            marginBottom: "10px",
            lineHeight: "1.5",
            borderLeft: "2px solid #1d9bf0",
            paddingLeft: "10px"
          }}>
            {tweet}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <a href={item.link} target="_blank" rel="noreferrer"
              style={{ fontSize: "13px", color: "#1d9bf0" }}>
              Source
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(tweet)}
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
        </>
      ) : (
        <button
          onClick={onGenerate}
          disabled={generating}
          style={{
            fontSize: "13px",
            color: "#fff",
            background: generating ? "#333" : "#1d9bf0",
            border: "none",
            borderRadius: "20px",
            padding: "6px 16px",
            cursor: generating ? "not-allowed" : "pointer",
          }}>
          {generating ? "Generating..." : "Generate Tweet"}
        </button>
      )}
    </div>
  )
}