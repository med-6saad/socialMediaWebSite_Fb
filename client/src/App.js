
import React, { useContext } from "react";
import Home from "./pages/home/Home";
import Profile from "./components/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import {BrowserRouter,Routes,Route,Link}from 'react-router-dom';
import {AuthContext} from './context/AuthContext';
import {Navigate} from 'react-router-dom';
function App() {
  const {user}=useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user?<Home/>:<Register/>}/>
      </Routes>
      <Routes>
        <Route path='/login' element={user?<Navigate to='/'/>:<Login/>}/>
      </Routes>
      <Routes>
        <Route path='/register' element={user?<Navigate to='/'/>:<Register/>}/>
      </Routes>
      <Routes>
        <Route path='/profile/:username' element={<Profile/>}/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
