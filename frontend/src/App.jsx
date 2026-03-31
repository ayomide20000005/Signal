import Feed from "./components/Feed"

export default function App() {
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
      <Feed />
    </div>
  )
}