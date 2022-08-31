import './login.css';
import { useRef } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import {Link} from 'react-router-dom';
import {CircularProgress} from '@mui/material';
export default function Login() {
    const email=useRef();
    const password=useRef();
    const {user,isFetching,error,dispatch}=useContext(AuthContext);
    const handleClick=(e)=>{
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch);
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
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input type="email" placeholder='Email' className="loginInput" ref={email}/>
                    <input type="password" 
                        placeholder='Password' 
                        className="loginInput" 
                        required
                        minLength={6}
                        ref={password}/>
                    <button className="loginButton" disabled={isFetching}>{isFetching?<CircularProgress style={{color:'white'}} size='25px'/>:'Login'}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <Link to={'/register'}>
                        <button className="loginRegisterButton" disabled={isFetching}>
                            {isFetching?<CircularProgress style={{color:'white'}} size='25px'/>:'Create a New Account'}
                        </button>
                    </Link>
                    
                </form>
            </div>
        </div>
    </div>
  )
}
