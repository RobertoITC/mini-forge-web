
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Products from './Pages/Products';
import NavBar from './Components/NavBar';
import ProductDetails from './Pages/ProductDetails';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';



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
      </Routes>

    </BrowserRouter>
  );
}

export default App;
