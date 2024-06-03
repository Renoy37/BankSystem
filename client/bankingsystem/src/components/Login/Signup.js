import React, { useState } from 'react';
import './form.css';


function Signup({ onLogin, onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(true);
  const [error, setError] = useState(null);


  function handleSignupSubmit(e) {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error signing up. Please try again.');
      }
    })
    .then(data => {
      onSignUp(data.access_token);
      setEmail('');
      setPassword('');
      setError(null);
    })
    .catch(error => {
      setError(error.message);
    });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid email or password. Please try again.');
      }
    })
    .then(data => {
      onLogin(data.access_token);
      setEmail('');
      setPassword('');
      setError(null);
    })
    .catch(error => {
      setError(error.message);
    });
  }

  return (
    <div className="signup-container">
      <h3>Coin Sage</h3>
      {error && <p className="error">{error}</p>}
      <form className="signup-form" onSubmit={isSigningUp ? handleSignupSubmit : handleLoginSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="switch-auth">
          <span>
            {isSigningUp ? (
              <>
                Already have an account?{' '}
                <button type="button" onClick={() => setIsSigningUp(false)}>Login</button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button type="button" onClick={() => setIsSigningUp(true)}>Signup</button>
              </>
            )}
          </span>
        </div>
        <button className="submit-btn" type="submit">{isSigningUp ? 'Signup' : 'Login'}</button>
      </form>
    </div>
  );
}

export default Signup;
