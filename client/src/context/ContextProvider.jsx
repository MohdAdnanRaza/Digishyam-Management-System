// import React, { useContext, useState } from "react";
// import { createContext } from "react";

// const userContext = createContext();

// const ContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const role = "admin";
//   const authenticated = true;
//   const login = (user) => {
//     setUser(user);
//   };
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <userContext.Provider value={{ role, authenticated, user, login, logout }}>
//       {children}
//     </userContext.Provider>
//   );
// };
// // Custom hook
// const useAuth = () => {
//   const context = useContext(userContext);
//   if (!context) {
//     throw new Error("useAuth must be used within a ContextProvider");
//   }
//   return context;
// };
// export { ContextProvider, useAuth };
import React, { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const role = user?.role || "guest"; // Default role as "guest" if no user
  const authenticated = !!user; // Boolean based on whether user exists

  // Load user from token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setUser(user);
    }
  }, []);
  console.log(user);
  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ role, authenticated, user, login, logout }}>
      {children}
    </userContext.Provider>
  );
};

// Custom hook
const useAuth = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useAuth must be used within a ContextProvider");
  }
  return context;
};

export { ContextProvider, useAuth };
