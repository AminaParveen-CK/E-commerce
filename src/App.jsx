import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { ToastContainer } from 'react-toastify'
import Home from './Components/Home/Home';
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Categoryshow from './Components/Categories/Categoryshow';
import Details from './Components/Details/Details';
import axios from 'axios';
import Categories from './Components/Categories/Categories';

const Samplecontext=createContext();

function App() {
  
  const [allProducts, setallProducts] = useState();
  const [cartCount, setcartCount] = useState(0)
  const [productId, setproductId] = useState()
  const [productPrice, setproductPrice] = useState()
  const [cartItem, setcartItem] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState();
  const [searchItem, setsearchItem] = useState('')
 const [searchFilter, setsearchFilter] = useState([]);
  useEffect(() => {
    axios.get('https://dummyjson.com/products').then((response)=>{ 
      setallProducts(response?.data?.products);
      setsearchFilter(response.data.products)
  })
   }, [])

  return (
    <Samplecontext.Provider value={{cartCount,setcartCount,productId,setproductId,allProducts,setallProducts,cartItem,setcartItem,productPrice,setproductPrice,filteredProducts,setfilteredProducts,searchItem,setsearchItem,searchFilter,setsearchFilter}}>
    <BrowserRouter>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
    
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/products' element={<Products/>} />
            <Route path='/categories' element={<Categories/>} />
            <Route path='/categoriesshow' element={<Categoryshow/>} />
            <Route path='/details' element={<Details/>} />
          </Routes>
          <ToastContainer/>

        </div>
      </div>
    </div>
    </BrowserRouter>
    </Samplecontext.Provider>
  );
}

export default App;
export {Samplecontext}
