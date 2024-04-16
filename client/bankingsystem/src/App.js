import './App.css';
import React, { useState, useEffect } from "react";
import Signup from './components/Login/Signup';

function App() {
  const [signupData, setSignupData] = useState([]);
  const [loginData, setLoginData] = useState([])


  function handleLogin(loginDetails) {
    fetch(' "https//awating/api/com"', {
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
  }

  function handleSignUp(signUpDetails) {
    fetch(' "https//awating/api/com"', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login Successful:', data);
        setSignupData([...signupData, signUpDetails]);
      })
      .catch((error) => console.error('Error:', error));
  }

  return (
    <>
      <Signup onSignUp={handleSignUp} onLogin={handleLogin}/>
    </>
  );
}

export default App;
