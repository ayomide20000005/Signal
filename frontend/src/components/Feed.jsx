import { useEffect, useState } from "react"
import axios from "axios"
import TweetCard from "./TweetCard"

export default function Feed() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [tweets, setTweets] = useState({})
  const [generating, setGenerating] = useState({})

  useEffect(() => {
    axios.get("http://localhost:8000/articles")
      .then(res => {
        setItems(res.data)
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

  return (
    <div>
      {items.map((item, i) => (
        <TweetCard
          key={i}
          item={item}
          tweet={tweets[i]}
          generating={generating[i]}
          onGenerate={() => generateTweet(i)}
        />
      ))}
    </div>
  )
}