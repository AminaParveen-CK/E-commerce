import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Samplecontext } from '../../App'
import Rating from '@mui/material/Rating';
import './details.css';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Details = () => {
   const navigate = useNavigate()
    const {
       productId,
       allProducts,
       setproductId,
       setcartCount,
       cartCount,
       cartItem,
       setcartItem,
       setproductPrice
    } = useContext(Samplecontext);

    const [productDetails, setproductDetails] = useState({});

    useEffect(() => {
      const filter = allProducts?.filter((product)=>product.id===productId)?.[0]
      setproductDetails(filter)
    }, [productId,allProducts])
    
    {/* ======Add to Cart====== */}
    const addToCart = (product)=>{
      setproductId(product?.id);
      setproductPrice(product?.price)
      setcartCount(cartCount+1);
      //find existing products in cart
      const existingProduct = cartItem.find((item) => item.id === product.id);
      if (existingProduct) {
        // If product exists, update the quantity
        const updatedCart = cartItem.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
          setcartItem(updatedCart);
      } else {
        // If product doesn't exist, add it with quantity 1
        setcartItem([...cartItem, { ...product, quantity: 1 }]);
      }
      toast.success("Product added to Cart!", { position: "top-center" });
      navigate('/cart')
    }
    
  return (
    <div className="details-container">
      <div className="detail-page row">

        {/* product image section */}
        <div className="details-img col-lg-6 col-md-6 col-sm-6 col-12">
          <img src={productDetails?.images?.[0]} alt="" />
        </div>

        {/* product information section */}
        <div className="details col-lg-6 col-md-6 col-sm-6 col-12" >
          <h3>{productDetails?.title}</h3>
          <hr />
          <h5>{productDetails?.brand}</h5>
          <h4>$ {productDetails?.price}</h4>
          <p>{productDetails?.description}</p>
          <h3>{productDetails?.discountPercentage} % Discount</h3>
          <Rating name="half-rating-read" value={Number(productDetails?.rating)} precision={0.5} readOnly />
          <h6>{productDetails?.stock} Left</h6>
          <p>{productDetails?.warrantyInformation}</p>
          <h6>{productDetails?.shippingInformation}</h6>
          <p>{productDetails?.returnPolicy}</p>
          <Button className='addtocart-btn' onClick={()=>addToCart(productDetails)}>Add to Cart</Button> 
        </div>
      </div>
    </div>
  )
}

export default Details