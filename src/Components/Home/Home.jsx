import React from 'react'
import Header from '../Navbar/Navbar'
import Products from '../Products/Products'
import Banner from '../Banner/Banner'
import Categories from '../Categories/Categories'

const Home = () => {  
  return (
    <div>
      <Header/>
      <Banner/>
      <Categories/>
      <Products/>
    </div>
  )
}

export default Home