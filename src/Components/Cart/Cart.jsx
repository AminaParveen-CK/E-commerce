import React, { useContext } from 'react'
import { Samplecontext } from '../../App';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './cart.css';

const Cart = () => {

  const {cartCount,setcartCount,cartItem,setcartItem} = useContext(Samplecontext);

  const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);

  // quantity increment
  const qtyplus = (id) => {
    const updatedCart = cartItem.map((item)=>
      item.id === id ? {...item,quantity:item.quantity + 1 } : item);
    setcartItem(updatedCart);
    setcartCount(cartCount+1);  
  };
  
  //quantity decrement
  const qtyminus= (id) => {
    const updatedCart = cartItem.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
        ).filter((item) => item.quantity > 0); // Remove item if quantity is 0
    setcartItem(updatedCart);
    setcartCount(Math.max(cartCount - 1, 0));
  };

  //remove from cart
  const removeFromCart = (id) => {
    const itemToRemove = cartItem.find((item) => item.id === id);
    const updatedCart = cartItem.filter((item) => item.id !== id);
    setcartItem(updatedCart);
    setcartCount(cartCount - itemToRemove.quantity);
  };

  return (
    <div className="cart-container">
      <div className='whole-cart-page'>

        <div className='headline'>
          <h2>Your Cart</h2>
          <h6>{cartCount} item ships at checkout</h6>
        </div>

        <div className="full-part row">
          <div className="left-part">

            <div className="free-shipping">
              <h5>GET FREE SHIPPING WITH SHOPIFY,ON EVERY ORDER EVERY TIME</h5>
              <p>Non members free shipping for only above $59</p>
            </div>
            <hr />

            { cartItem?.map((item)=>{
              return(
              
              <Card className='cart-card'>
                <div className='card-item d-flex '>
                  <img src={item.images[0]} alt="product" />
                  <Card.Body className='cart-card-body'>
                    <Card.Title>{item?.title}</Card.Title>
                    ${item?.price} <br />
                    Quantity    
                    <div className='quantity d-flex'>
                      <button onClick={()=>qtyminus(item.id)}>-</button>
                       {item.quantity} 
                      <button onClick={()=>qtyplus(item.id)}>+</button>
                       <br />
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="remove-btn"> Remove</button>
                  </Card.Body>
                </div>
              </Card>
              )
            })}

          </div>
          
          <div className="right-part">
             <h4 className='m-4'>Cart Totals</h4>
             <p> {cartCount} items in Cart </p>
             <p>Subtotal  ${totalPrice.toFixed(2)}</p>
             <p>Shipping  $0</p>
             <hr className='m-4'/>
             <p>Total Amount ${totalPrice.toFixed(2)} </p>
             <div className='text-center'>
               <Button className='btn-checkout'>Checkout</Button>
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart