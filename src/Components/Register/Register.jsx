import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth,db } from '../Firebase';
import { setDoc,doc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './register.css'
const Register = () => {
    const navigate=useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");

    const handleRegister= async (e)=>{
      e.preventDefault();
      try{
       await createUserWithEmailAndPassword(auth,email,password);
       const user=auth?.currentUser;
       console.log(user);
       if(user){
        await setDoc(doc(db,'users',user.uid),{
            email: email,
            firstname: fname,
            lastname: lname,
        } );
       }
       console.log(email);
       toast.success('User Registetred Successfully!!',{position:'top-center'})
       navigate('/home')
      }catch(error){
        console.log(error.message); 
        toast.error(error.message,{position:'bottom-center'}) 
      }
    }
  return (
    <div className="register-container">
      <form action="" className='register-form' onSubmit={handleRegister}>
        <h3>Sign Up</h3>
        <div className="nb-3">
           
            <input type="text" className='form-control register-form-control' placeholder='First name'
             onChange={(e)=>setfname(e.target.value)} required />
        </div>
        <div className="nb-3">
          
            <input type="text" className='form-control register-form-control' placeholder='Last name'
             onChange={(e)=>setlname(e.target.value)} />
        </div>
        <div className="nb-3">
            
            <input type="email" className= 'form-control register-form-control' placeholder='Enter email'
             onChange={(e)=>setemail(e.target.value)} required />
        </div>
        <div className="nb-3">
           
            <input type="password" className='form-control register-form-control' placeholder='Enter password'
             onChange={(e)=>setpassword(e.target.value)} required />
        </div>
        <div className="d-grid w-50 m-auto">
            <button type='submit' className='btn submit'>Sign Up</button>
        </div>
        <div>
            <p>Already registered ?</p> <Link to={'/login'} style={{color:'beige',fontWeight:'700',fontSize:'1rem',textDecoration:'none'}}> Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register