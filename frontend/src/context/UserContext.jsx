import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      console.log("Não foi possível carregar o usuário");
      return null;
    }
    
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  }, [userData]);

  const logout = () => {
    setUserData(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ userData, logout, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};