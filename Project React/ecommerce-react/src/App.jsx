// import logo from './logo.svg';
import './App.css';
import React from 'react';
import LandingPage from './Pages/LandingPage';
import NavbarComponent from './Components/Navbar';
import { Routes, Route } from 'react-router-dom';
import ProductsPage from './Pages/ProductsPage';
import RegisterPage from './Pages/RegisterPage';
import ProductsAdmin from './Pages/ProductsAdmin';
import ProductDetail from './Pages/ProductDetail';
import Axios from 'axios';
import { API_URL } from './helper';
import { useDispatch } from 'react-redux'
import { getProductsAction } from './redux/actions/productsAction';

// import Footer from './Components/Footer';

// FUNCTIONAL COMPONENT
// Initialize component
function App() {

  // untuk mengeksekusi action pada redux dan menghubungkannya ke reducer by sistem redux
  const dispatch = useDispatch();

  // function and data

  const getProducts = () => {
    Axios.get(`${API_URL}/products`)
      .then((response) => {
        console.log(response.data)
        dispatch(getProductsAction(response.data))
      }).catch((error) => {
        console.log(error)
      })
  }

  React.useEffect(() => {
    getProducts()
  }, [])
  // return html component
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/admin' element={<ProductsAdmin />} />
        <Route path='/product/detail' element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

// Untuk mengeksport component agar dapat ditampilkan oleh virtualDOM react
export default App;
