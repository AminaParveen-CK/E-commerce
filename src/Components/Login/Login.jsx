import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase';
import { toast } from 'react-toastify';
import './login.css'
import emoji from '../../images/wmnemoji.png'
import logo from '../../images/logo.png';

const Login = () => {
    const navigate=useNavigate()
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")

    const handleSubmit= async (e)=>{
      e.preventDefault();
      try{
        await signInWithEmailAndPassword(auth,email,password);
        console.log('User Logged in Successfully!!');
        toast.success('User Logged in Successfully!!',{position:'top-center'})
        navigate('/home')
      
      }catch(error) {
         console.error(error.message); 
         toast.error(error.message,{position:'bottom-center'}) 
      }
    }
    
  return (
    <div className='whole-login-page'>
      <div className="login-container">
        <div className="login-page row">
          
          <div className="login-img-part col-lg-6 col-md-6 col-sm-6 col-12">
           <img src={emoji} alt="" />
          </div>
        
          <div className="form-part-container col-lg-6 col-md-6 col-sm-6 col-12">

            <div className="form-part">
              <img src={logo} alt="" />
              <h2>Welcome Back</h2>
              <p>please login to your account</p>
              <form action="" className='login-form' onSubmit={handleSubmit}>
               <div className="mb-3">
                <input 
                  type="email" 
                  className='form-control'
                  placeholder='Enter email' 
                  defaultValue={email}
                  onChange={(e)=>setemail(e.target.value)} 
                />
               </div>

               <div className="mb-3">
                 <input 
                   type="password" 
                   className='form-control' 
                   placeholder='Enter password' 
                   defaultValue={password}
                   onChange={(e)=>setpassword(e.target.value)} 
                 />
               </div>

               <div className="d-grid  m-auto">
                 <button type='submit' className='btn submit'>Log in</button>
               </div>

               <div className='register-btn row m-3'>
                <p>Are you a new user ? </p> 
                  <Link to={'/register'} style={{color:'beige',fontWeight:'400px',margin:'0% 1%'}}> Register here</Link>
               </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login