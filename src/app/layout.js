import React from "react";
import "../styles/globals.css";
import Provider from "../provider/Provider";

const Layout = ({ children }) => {
  return (
    <>
      <head>
        <title>PUSB Admin - President University Student Board</title>
        <meta name="description" content="PUSB ADMIN" />
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </>
  );
};

export default Layout;
