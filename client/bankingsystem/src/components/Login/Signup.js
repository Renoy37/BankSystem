import React, { useState } from 'react';

function Signup({ onLogin, onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div>
      <h3>Banking System</h3>
      <form onSubmit={handleSignupSubmit}>
        <div>
          <label>Enter email address</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Enter password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <span>SignUp or Login</span>
        </div>
        <button type="submit">Signup</button>
        <button  onClick={handleLoginSubmit}>Login</button>
      </form>
    </div>
  );
}

export default Signup;
