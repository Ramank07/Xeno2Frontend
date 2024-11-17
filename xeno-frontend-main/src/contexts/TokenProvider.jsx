import React, { createContext, useContext, useState } from 'react';

// Create a Context for the token
const TokenContext = createContext();

// Create a provider component
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Function to set the token
  const setAuthToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);  // Persist token in localStorage
  };

  return (
    <TokenContext.Provider value={{ token, setAuthToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// Custom hook to access token
export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
