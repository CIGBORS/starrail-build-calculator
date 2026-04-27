import React, { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {

    if (userData) {
      sessionStorage.setItem("user", JSON.stringify(userData));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [userData]);

  const logout = () => {
    setUserData(null);
    sessionStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ userData, logout, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};