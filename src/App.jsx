import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ProductListing from './pages/ProductListing'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-800 p-4 flex gap-4">
        <Link className="text-white" to="/">Home</Link>
        <Link className="text-white" to="/products">Products</Link>
        <Link className="text-white" to="/cart">Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App