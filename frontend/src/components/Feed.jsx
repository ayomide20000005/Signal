import { useEffect, useState } from "react"
import axios from "axios"
import TweetCard from "./TweetCard"

export default function Feed({ onArticlesLoaded }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [tweets, setTweets] = useState({})
  const [generating, setGenerating] = useState({})

  useEffect(() => {
    axios.get("http://localhost:8000/articles")
      .then(res => {
        setItems(res.data)
        onArticlesLoaded(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const generateTweet = (index) => {
    setGenerating(prev => ({ ...prev, [index]: true }))
    axios.get(`http://localhost:8000/tweet/${index}`)
      .then(res => {
        setTweets(prev => ({ ...prev, [index]: res.data.tweet }))
        setGenerating(prev => ({ ...prev, [index]: false }))
      })
      .catch(err => {
        console.error(err)
        setGenerating(prev => ({ ...prev, [index]: false }))
      })
  }

  if (loading) return <div style={{ color: "#e7e9ea", padding: "20px" }}>Fetching signals...</div>

  const grouped = items.reduce((acc, item, i) => {
    const cat = item.category || "General"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push({ ...item, index: i })
    return acc
  }, {})

  return (
    <div>
      {Object.entries(grouped).map(([category, articles]) => (
        <div key={category} style={{ marginBottom: "24px" }}>
          <h2 style={{
            color: "#1d9bf0",
            fontSize: "14px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "12px",
            borderBottom: "1px solid #2f3336",
            paddingBottom: "6px"
          }}>
            {category}
          </h2>
          {articles.map((item) => (
            <TweetCard
              key={item.index}
              item={item}
              tweet={tweets[item.index]}
              generating={generating[item.index]}
              onGenerate={() => generateTweet(item.index)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}