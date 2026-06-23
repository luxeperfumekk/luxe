import { Routes, Route } from 'react-router-dom'
import { perfumes } from './data/perfumes'
import HomePage from './sections/HomePage'
import ProductPage from './sections/ProductPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {perfumes.map((perfume) => (
        <Route
          key={perfume.id}
          path={`/perfume/${perfume.id}`}
          element={<ProductPage perfume={perfume} />}
        />
      ))}
    </Routes>
  )
}

export default App
