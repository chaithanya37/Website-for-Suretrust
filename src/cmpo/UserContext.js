import React, { createContext, useContext, useState } from 'react';
import './UserContext.css';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signOut = () => {
    localStorage.removeItem('token'); 
    setUser(null); 
  };

  return (
    <UserContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
