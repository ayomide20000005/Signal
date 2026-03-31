import { useEffect, useState } from "react"
import axios from "axios"
import TweetCard from "./TweetCard"

export default function Feed() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("http://localhost:8000/feed")
      .then(res => {
        setItems(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div style={{ color: "#e7e9ea", padding: "20px" }}>Fetching signals...</div>

  return (
    <div>
      {items.map((item, i) => <TweetCard key={i} item={item} />)}
    </div>
  )
}