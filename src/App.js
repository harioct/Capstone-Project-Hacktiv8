import './App.css';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }/>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App;
