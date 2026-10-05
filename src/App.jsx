import { useState } from 'react'
import Dashboard from './component/dashboard'
import Deskripsi from './component/deskripsi'
import { useNews } from './hooks/useNews'
import './App.css'

function App() {
  const [selectedNews, setSelectedNews] = useState(null)
  const { newsItems } = useNews()

  return selectedNews ? (
    <Deskripsi
      news={selectedNews}
      onBack={() => setSelectedNews(null)}
      onSelectNews={setSelectedNews}
      allNews={newsItems}
    />
  ) : (
    <Dashboard onSelectNews={setSelectedNews} />
  )
}

export default App