
import { Route, Routes } from 'react-router-dom'
import './App.css'
import CategoryForm from './components/category/CategoryForm'
import Navbar from './components/navbar/Navbar'
import Shop from './pages/Shop'
import Home from './pages/Home'
import ManageCategory from './pages/ManageCategory'


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageProducts from './pages/ManageProducts'
import ProductForm from './components/products/ProductForm'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
 
  return (
    <>
    <Navbar/>
    <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/shop" element={<Shop />} />
     <Route path="/manageCategory" element={<ManageCategory/>}/>
     <Route path="/add-category" element={<CategoryForm/>}/>
     <Route path="/add-category/:id" element={<CategoryForm />} />
     <Route path="/manageProducts" element={<ManageProducts/>}/>
     <Route path="add-products" element={<ProductForm/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/cart" element={<Cart/>}/>
     <Route path="/checkout" element={<Checkout/>}/>
       
    </Routes>


     <ToastContainer />
    </>
  )
}

export default App
