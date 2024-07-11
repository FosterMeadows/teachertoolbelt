// src/components/Login.js
import React from 'react';
import { Button } from '@mui/material';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Login = () => {
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <Button variant="contained" color="primary" onClick={handleGoogleSignIn}>
        Sign in with Google
      </Button>
    </div>
  );
};

export default Login;
