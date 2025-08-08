import { LayoutProps } from "@/interfaces";
import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Toaster } from "react-hot-toast";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  
  return (
    <div className="w-full">
       <Toaster />
      <Header />
      <main className="mt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
