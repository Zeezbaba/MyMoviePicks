import React from "react";

export interface LayoutProps {
  children: React.ReactNode;
}


export interface ButtonProps {
    name: string;
    styles: string;
    icon?: React.ReactNode;
}