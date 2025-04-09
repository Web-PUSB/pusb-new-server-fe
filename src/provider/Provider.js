import React from "react";
import { SessionProvider } from "../context/sessionContext";

const Provider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
