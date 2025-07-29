import logo from './logo.svg';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { userContext } from './Components/LoginContext';
import OrderHistory from './Components/OrderHistory';
import Admin from './Components/Admin';
import Payment from './Components/Payment';

function App() {
  const [userDetails, setUserDetails] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();

  return (
    <userContext.Provider value={{ userDetails, setUserDetails, loggedInUser, setLoggedInUser }}>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Registration' element={<Signup />} />
            {/* <Route path='/Dashboard' element={<Dashboard />} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='/Admin' element={<Admin />} />
            <Route path='/OrderHistory' element={<OrderHistory />} />
            <Route path='/Payment' element={<Payment />} />
            {/* <Route path="*" element={<Navigate to="/home" replace />} />  */}
            {/* <Route path='/Dashboard' element={<Dashboard />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
