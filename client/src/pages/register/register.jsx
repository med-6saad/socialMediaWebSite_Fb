import './register.css';
import {useRef} from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default function Register() {
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const passwordAgain=useRef();
    const navigate=useNavigate();
    const handleClick=async(e)=>{
        e.preventDefault();
        if(passwordAgain.current.value!==password.current.value){
            password.current.setCustomValidity("Password don't match!")
        }else{
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value
            }
            try{
                const user1=await axios.post('/auth/register',user);
                navigate('/login')//hkda tir redirect ll pages mchi llcomponents
            }catch(err){
                console.log(err)
            }
        }
    }
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">
                    MedSocial
                </h3>
                <span className="loginDesc">
                    hellow in MedSocial web app for connect sfsdfs with friends and the world.
                </span>
            </div>
            <div onSubmit={handleClick} className="loginRight">
                <form className="loginBox">
                    <input type="text"
                     ref={username}
                     required
                     placeholder='Username'
                     className="loginInput"
                    />
                    <input
                     type="email"
                     ref={email}
                     required
                     min={6}
                     placeholder='Email'
                     className="loginInput"
                    />
                    <input
                     type="password"
                     ref={password}
                     required
                     min={6}
                     placeholder='Password'
                     className="loginInput"
                    />
                    <input
                     type="password" 
                     ref={passwordAgain} 
                     required 
                     placeholder='Password Again' 
                     className="loginInput"
                    />
                    <button type='submit' className="loginButton">Sign Up</button>
                    <Link to={'/login'}>
                        <button className="loginRegisterButton">Login to your account</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}


