import { ButtonProps } from "@/interfaces";
import React from "react";

const Button: React.FC<ButtonProps> = ({ name, styles, icon }) => {
  return (
    <button className={styles}>
      {name} <span>{icon}</span>
    </button>
  );
};

export default Button;
