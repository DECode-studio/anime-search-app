import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import AnimeDetailPage from './pages/AnimeDetailPage'
import SearchPage from './pages/SearchPage'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/anime/:id" element={<AnimeDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
