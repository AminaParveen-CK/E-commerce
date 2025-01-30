import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import { Samplecontext } from '../../App';
import { Link} from 'react-router-dom';
import "./navbar.css"
import Form from 'react-bootstrap/Form';
import { FaSearch } from "react-icons/fa";
import logo from '../../images/logo.png';
import { BsCart4 } from "react-icons/bs";

const Header = () => {
 const {cartCount,setsearchItem} = useContext(Samplecontext);

 const searching = (e)=>{
  e.preventDefault()
  setsearchItem(e?.target?.value);
}

  return (
 
    <Navbar expand="lg" className="whole-navbar bg-body-tertiary" >
      <Container>
        <Navbar.Brand href="#home" className='brand'>
          <img width="60"
              height="60"
              className="d-inline-block align-top"
              alt="React Bootstrap logo" 
              src={logo}
          />
        </Navbar.Brand> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            <Link to={'/home'} style={{textDecoration:'none'}}>
              <Nav.Link href="#home"  style={{color:'beige'}}>Home</Nav.Link>
            </Link>
            <Link to={'/products'} style={{textDecoration:'none'}}> 
              <Nav.Link href="#link"  style={{color:'beige'}}>Shop</Nav.Link>
            </Link>
            <Link to={'/categories'}  style={{textDecoration:'none'}}> 
              <Nav.Link href="#link"  style={{color:'beige'}}>Categories</Nav.Link> 
            </Link>
          </Nav>

          <div className='search-container'>
            <FaSearch className='search-icon'/>
              <Form>
                <Form.Control
                 type="text"
                 placeholder="Search products"
                 className="search-control mr-sm-2"
                 name='search'
                 onChange={searching}
                />
              </Form>
          </div>

        <Badge badgeContent={cartCount} style={{color:"rgb(251, 246, 239)"}} >
          <Link to={'/cart'}><BsCart4  size={30} color='beige'/></Link>
        </Badge>
       
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header