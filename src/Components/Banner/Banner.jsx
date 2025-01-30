import React from 'react'
import './banner.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Banner = () => {

  return (
    <div className='whole-banner-page'>
      <div  className='banner-data'>
         <div className="banner-data-part">
           <h2> <span> Summer</span> </h2>
           <h1>BEAUTY</h1>
           <h3>SALE</h3>
           <h4>Discounts upto <h1>75%</h1></h4>
           <h6>Best Makeup Brands and Stores</h6>
           <Link to={'/products'}>
             <Button className='btn shop-btn'>Shop Now</Button>
          </Link>
         </div>
      </div>
    </div>



  )
}

export default Banner