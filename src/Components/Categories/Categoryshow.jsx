import React, { useContext } from 'react'
import { Samplecontext } from '../../App'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';

const Categoryshow = () => {
    const {allProducts,setallProducts,setcategorySelected,filteredProducts,setfilteredProducts,setproductId,setproductPrice,cartCount,setcartCount,cartItem,setcartItem} = useContext(Samplecontext)
    
    const navigate = useNavigate()

    // ======Add to cart ======
    const addToCart = (product)=>{
      setproductId(product.id);
      setproductPrice(product.price)
      setcartCount(cartCount+1);
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
    }

    // pass id for Details page
    const getId = (id)=>{
      setproductId(id)
    }

  return (
    <div className="whole-productspage">
     <div className='products-page row'>
       
      {filteredProducts?.map((item)=>{
        return(

         <Card className='product-cards' style={{ width: '21rem' }} onClick={()=>getId(item.id)}>
          <Link to={'/details'}>
           <div className="product-img-section">
            <Card.Img className='product-img' variant="top" src={item.images[0]} />
           </div>
          </Link>
          <Card.Body>
            <Card.Title className='product-title'>{item?.title}</Card.Title>
            <p> $ {item.price} </p>
            <Rating name="half-rating-read" value={Number(item?.rating)} precision={0.5} readOnly />
          </Card.Body>
           <Button className='addtocart-btn' onClick={()=>addToCart(item)}>Add to Cart</Button>
         </Card>
        )
      })}
     </div>
    </div>
  )
}

export default Categoryshow