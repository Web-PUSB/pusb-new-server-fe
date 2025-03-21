import React from "react";
import { Helmet } from "react-helmet";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/src/provider/Provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Helmet>
        <title>PUSB Admin - President University Student Board</title>
        <meta name="description" content="PUSB ADMIN" />
      </Helmet>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
