import { authbg } from "@/constants";
import { LayoutProps } from "@/interfaces";
import Image from "next/image";
import React from "react";

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center text-white">
      <div className="w-full h-full rounded-xl lg:bg-[#171717] flex flex-col lg:flex-row">
        <div className="left h-[30vh] md:h-[35vh] lg:h-full w-full lg:w-1/2">
          <Image src={authbg} alt="auth-bg" className="h-full w-full lg:rounded-l-xl" />
        </div>
        <div className="right md:h-full lg:w-1/2 p-5 md:p-10 flex items-center">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
