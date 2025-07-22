import { LayoutProps } from "@/interfaces";
import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
