import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Signup from './components/Login/Signup';
import Menu from './components/Menu';
import Transactions from './components/Transactions';
import Details from './components/Details.js';
import Footer from './components/Footer';

function App() {

  // const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))


  const handleSignUp = (accessToken) => {
    // console.log('Signed up successfully. Access token:');
    setAccessToken(accessToken);
    localStorage.setItem('accessToken', accessToken);
    setIsAuthenticated(true);

  };

  const handleLogin = (accessToken) => {
    // console.log('Logged in successfully. Access token:');
    setAccessToken(accessToken);
    localStorage.setItem('accessToken', accessToken);
    setIsAuthenticated(true);
  };

  
  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/menu" /> : <Signup onLogin={handleLogin} onSignUp={handleSignUp} />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/transactions" element={<Transactions accessToken={accessToken}/>} />
        <Route path="/details" element={<Details accessToken={accessToken}/>} />
      </Routes>
    </Router>

  );
}

export default App;
