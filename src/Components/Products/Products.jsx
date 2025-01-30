import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Samplecontext } from '../../App';
import './products.css'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';

const Products = () => {

  const {
    allProducts,
    cartCount,
    setcartCount,
    setproductId,
    cartItem,
    setcartItem,
    setproductPrice,
    searchItem,
    setsearchFilter
  } = useContext(Samplecontext);

  const [sortOrder, setsortOrder] = useState('none');
  const [filteredProduct, setfilteredProduct] = useState(allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8

  {/* ======Search Functionality====== */}
  useEffect(() => {
    //if there is no search input show all products
    if(searchItem?.length === 0){
      setsearchFilter(allProducts);
      setfilteredProduct(allProducts);
    }
    //else filter products based on search term
    else if(searchItem?.length > 0){
      const result = allProducts?.filter(
        (item)=>
          item?.title?.toLowerCase().includes(searchItem?.toLowerCase()) ||
          item?.brand?.toLowerCase().includes(searchItem?.toLowerCase())    
      );
     setsearchFilter(result);
     setfilteredProduct(result);
    }
  },[searchItem,allProducts,setsearchFilter]) //Reruns on changes in searchItem or allProducts

  {/* ======Add to Cart====== */}
  const addToCart = (product)=>{
    setproductId(product.id);
    setproductPrice(product.price)
    setcartCount(cartCount+1);

    const existingProduct = cartItem.find((item) => item.id === product.id);
    if (existingProduct) {
      // If product exists, update the quantity
      const updatedCart = cartItem.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setcartItem(updatedCart);
    } else {
      // If product doesn't exist, add it with quantity 1
      setcartItem([...cartItem, { ...product, quantity: 1 }]);
    }
    toast.success("Product added to Cart!", { position: "top-center" });
  }

  {/* ======Top Rated====== */}
  const topRatedProducts = allProducts?.filter((product) => product.rating >= 4 && product.category!=='groceries');

  {/* ======Sort-Products====== */}
  const sortProducts = (order) => {
    const sortedProducts = [...allProducts]?.sort((a, b) => {
      if (order === 'lowToHigh') {
        return a?.price - b?.price;
      } else if (order === 'highToLow') {
        return b?.price - a?.price;
      }
      return 0;
    });
    setfilteredProduct(sortedProducts);
  };
  
  {/* ======Sort-Order Selection====== */}
  const handleSortChange = (e) => {
    const order = e.target.value;
    setsortOrder(order); 
    sortProducts(order); 
  };

  {/* ======Pass id for Details page====== */}
  const get_id = (id)=>{
    setproductId(id);
  }

  {/* ======Pagination functionality====== */}
  const handlePageChange = (event,value) => {
    setCurrentPage(value);
  }

  //calculation on pagination
  const paginatedProducts = React.useMemo(() => {
  const startIndex = (currentPage - 1)*itemsPerPage;
  const endIndex =startIndex + itemsPerPage;
  return filteredProduct?.slice(startIndex,endIndex);
  },[currentPage,filteredProduct]);

  return (
    <div className="whole-productspage">

      {/* ======Sort-Select====== */}
      <Form inline className='sort-select'>
        <Form.Select 
          as="select" 
          value={sortOrder} 
          onChange={handleSortChange} 
          className='select-control custom-select' 
          style={{textAlign:'center',fontWeight:'bold'}}
        >
           <option value="none">Sort by price  </option>
           <option value="lowToHigh">Low to High</option>
           <option value="highToLow">High to Low</option>
        </Form.Select>
      </Form>

      {/* ======Display Products ====== */}
      <div className='products-page row justify-content-center'>
        { paginatedProducts?.map((item)=>{
          return(
          <Card 
             className='product-cards' 
             style={{ width: '20rem' }} 
             onClick={()=>get_id(item?.id)}
           >
            <Link to={'/details'} style={{textDecoration:'none',color:'black'}}>
              <div className="product-img-section">
                <Card.Img className='product-img' variant="top" src={item?.images[0]} />
              </div>
              <Card.Title className='product-title'>{item?.title}</Card.Title>
              <p> $ {item?.price}</p> 
              <Rating name="half-rating-read" value={Number(item?.rating)} precision={0.5} readOnly />
            </Link>
            <Button className='addtocart-btn' onClick={()=>addToCart(item)}>Add to Cart </Button>
          </Card>
          )
        })}
      </div>

      {/* ====== Pagination Controls ====== */}
      <div className='pagination-container'>
       <Pagination 
         className='pagination'
         count={Math.ceil(filteredProduct?.length / itemsPerPage)} 
         page={currentPage} 
         color='dark'
         onChange={handlePageChange}  
       />
      </div>

      {/* ======Top Rated Section====== */}
      <div className="top-rated ">
        <h3 >Top Rated Products</h3>
        <div className='top-rated-grid horizontal-scroll'>
          {topRatedProducts?.map((item,key)=>{
           return(
            <Card className="top-rated-cards" style={{backgroundColor:' rgb(253, 250, 246)', width: '18rem',height:"22rem",border: "1px solid #ddd", padding: "16px", borderRadius: "8px",margin:'0% 20%'  }} key={item?.id} onClick={()=>get_id(item?.id)}>
              <Link to={'/details'} style={{textDecoration:'none',color:'black'}}>
               <Card.Img className='top-rated-img' variant="top" src={item?.images[0]} />
              </Link>
              <Card.Body>
               <Card.Title>{item?.title}</Card.Title>
               <Rating name="half-rating-read" value={Number(item?.rating)} precision={0.5} readOnly />
              </Card.Body> 
            </Card>
          )
        })}  
        </div>
      </div>
     
    </div>
  )
}

export default Products