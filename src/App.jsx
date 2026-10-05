import { useState } from 'react'
import Dashboard from './component/dashboard'
import Deskripsi from './component/deskripsi'
import './App.css'

function App() {
  const [selectedNews, setSelectedNews] = useState(null)

  return selectedNews ? (
    <Deskripsi
      news={selectedNews}
      onBack={() => setSelectedNews(null)}
      onSelectNews={setSelectedNews}
    />
  ) : (
    <Dashboard onSelectNews={setSelectedNews} />
  )
}

export default App