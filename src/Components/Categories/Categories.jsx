import React, { useContext} from 'react'
import Card from 'react-bootstrap/Card';
import furniture from '../../images/furniture.avif'
import groceries from '../../images/groceries.jpg'
import cosmetics from '../../images/cosmetic.avif'
import fragrences from '../../images/fragrence.webp'
import './categories.css'
import { Samplecontext } from '../../App';
import { useNavigate } from 'react-router-dom';
const Categories = () => {

  const navigate = useNavigate();
  const {allProducts,filteredProducts,setfilteredProducts} = useContext(Samplecontext)
  
  const Cosmetics = () =>{
    setfilteredProducts(allProducts.filter(product=>product?.category === 'beauty'))
    console.log(filteredProducts);
    navigate('/categoriesshow')
  }
  const Fragrences = () =>{
    setfilteredProducts(allProducts.filter(product=>product?.category === 'fragrances'))
    console.log(filteredProducts);
    navigate('/categoriesshow')
  }
  const Groceries = () =>{
    setfilteredProducts(allProducts.filter(product=>product?.category === 'groceries'))
    console.log(filteredProducts);
    navigate('/categoriesshow')
  }
  const Furnitures = () =>{
    setfilteredProducts(allProducts.filter(product=>product?.category === 'furniture'))
    console.log(filteredProducts);
    navigate('/categoriesshow')
  }
  return (
    <div className='categories-section'>
      <div className='whole-categories-page '>
   
        <div className='left-cards'>

          <div className='left-top-card'>
            <Card onClick={Groceries} className="cards card1 text-white">
              <Card.Img src={groceries} alt="Card image" height={'100%'} />
              <Card.ImgOverlay>
                <Card.Title className='card-text'>Groceries</Card.Title>
              </Card.ImgOverlay>
            </Card>

            <Card onClick={Fragrences} className="cards card1 text-white">
              <Card.Img src={fragrences} alt="Card image"height={'100%'} />
              <Card.ImgOverlay>
                <Card.Title  className='card-text'>Fragrences</Card.Title>
              </Card.ImgOverlay>
            </Card>
          </div> 

          <Card onClick={Cosmetics} className="cards cardbotm text-white">
            <Card.Img src={cosmetics} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title className='card-text'>Cosmetics</Card.Title>
            </Card.ImgOverlay>
          </Card>

        </div>

        <div className="right-side-card">
          <Card onClick={Furnitures} className="cards cardright text-white">
            <Card.Img src={furniture} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title className='card-text'>Furnitures</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Categories