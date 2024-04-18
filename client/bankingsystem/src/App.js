import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Signup from './components/Login/Signup';
import Menu from './components/Menu';
import Transactions from './components/Transactions';
import Details from './components/Details';

function App() {
  const [signupData, setSignupData] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('authenticated');
    if (storedAuth === 'true') {
      setAuthenticated(true);
    }
  }, []);

  function handleLogin(loginDetails) {
    fetch('https://awating/api/com', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login Successful:', data);
        setLoginData([...loginData, loginDetails]);
      })
      .catch((error) => console.error('Error:', error));
      setAuthenticated(true);
  }

  function handleSignUp(signUpDetails) {
    fetch('https://awating/api/com', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Signup Successful:', data); 
        setSignupData([...signupData, signUpDetails]);
      })
      .catch((error) => console.error('Error:', error));
      setAuthenticated(true);

  }

  return (
    <Router>
      <div className="App">
        {authenticated && <Navbar />} 
        <Routes>
          <Route path="/menu" element={authenticated ? <Menu /> : <Navigate to="/" />} />
          <Route path="/transactions" element={authenticated ? <Transactions /> : <Navigate to="/" />} />
          <Route path="/details" element={authenticated ? <Details /> : <Navigate to="/" />} />
          <Route path="/" element={!authenticated ? <Signup onSignUp={handleSignUp} onLogin={handleLogin} /> : <Navigate to="/menu" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
