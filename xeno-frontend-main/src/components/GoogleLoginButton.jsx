import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Use for navigation
import { useToken } from '../contexts/TokenProvider';  // Context API for token management

function GoogleLoginButton() {
  const { setAuthToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a token in the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl) {
      // Store the token in context and localStorage
      setAuthToken(tokenFromUrl);

      // Redirect to dashboard (or any other page)
      navigate('/dashboard');
    }
  }, [setAuthToken, navigate]);

  const handleLogin = () => {
    // Redirect to Google's OAuth login page
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <button onClick={handleLogin}>
      Sign in with Google
    </button>
  );
}

export default GoogleLoginButton;
