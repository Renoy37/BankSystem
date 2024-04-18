import React, { useState } from 'react';
import './form.css'

function Signup({ onLogin, onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(true); 

  function handleSignupSubmit(e) {
    e.preventDefault();
    const signUpDetails = {
      email,
      password,
    };
    onSignUp(signUpDetails);
    setEmail('');
    setPassword('');
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    const loginDetails = {
      email,
      password,
    };
    onLogin(loginDetails);
    setEmail('');
    setPassword('');
  }

  return (
    <div className="signup-container">
      <h3>Banking System</h3>
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
