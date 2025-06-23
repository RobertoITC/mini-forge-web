
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Products from './Pages/Products';
import NavBar from './Components/NavBar';
import ProductDetails from './Pages/ProductDetails';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import Login from "./Pages/Login.tsx";
import ProtectedRoute from './Components/ProtectedRoute.tsx';
import Profile from './Pages/Profile.tsx';
import Register from "./Pages/Register.tsx";

function App() {
  return (
    <BrowserRouter>
        <NavBar />

        {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products/> }/>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route
              path="/profile"
              element={
                  <ProtectedRoute>
                      <Profile />
                  </ProtectedRoute>
              }
          />
        <Route path={'/register'} element={<Register />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
