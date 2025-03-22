import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <SessionContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
