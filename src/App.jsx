import Dashboard from './component/dashboard'
import './App.css'

function App() {

  function handleSelectNews(news) {
    console.log('Artikel dipilih:', news?.title)
  }

  return <Dashboard onSelectNews={handleSelectNews} />
}

export default App

