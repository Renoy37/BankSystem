import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Signup from './components/Login/Signup';
import Menu from './components/Menu';
import Transactions from './components/Transactions';
import Details from './components/Details';
import Footer from './components/Footer';

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
    fetch('http://127.0.0.1:5555/login', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDetails),
    })

      .then((response) => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })

      .then((data) => {
        console.log('Login Successful:', data);
        const { access_token } = data;
        localStorage.setItem('access_token', access_token);
        setAuthenticated(true);
      })
      .catch((error) => console.error('Error:', error));
  }
  

  function handleSignUp(signUpDetails) {
    fetch('http://127.0.0.1:5555/signup', { 
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
      localStorage.setItem('authenticated', 'true');

  }

  // function handleLogout () {
  //   setAuthenticated(false);
  //   localStorage.removeItem('authenticated');
  // }

  return (
    <Router>
      <div className="App">
        {authenticated && <Navbar />}
        <Routes>
          {/* If the user is not authenticated, render the signup component */}
          {!authenticated && <Route path="/" element={<Signup onSignUp={handleSignUp} onLogin={handleLogin} />} />}
          {/* If the user is authenticated, render the rest of the pages */}
          <Route path="/menu" element={authenticated ? <Menu /> : <Navigate to="/" />} />
          <Route path="/transactions" element={authenticated ? <Transactions /> : <Navigate to="/" />} />
          <Route path="/details" element={authenticated ? <Details /> : <Navigate to="/" />} />
        </Routes>
        {authenticated && <Footer />}
      </div>
    </Router>

  );
}

export default App;
