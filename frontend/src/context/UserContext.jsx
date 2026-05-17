import React, { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Tenta carregar do sessionStorage primeiro
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) return JSON.parse(sessionUser);

    // Se não tiver, tenta o localStorage (do "Lembrar-me")
    const localUser = localStorage.getItem("user");
    if (localUser) return JSON.parse(localUser);

    return null;
  });

  useEffect(() => {
    if (userData) {
      sessionStorage.setItem("user", JSON.stringify(userData));

      // Se houver dados no localStorage, atualiza eles também para manter o ícone e outras infos sincronizadas
      if (localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } else {
      sessionStorage.removeItem("user");
      localStorage.removeItem("user");
    }
  }, [userData]);

  const logout = () => {
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, logout, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};