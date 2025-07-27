import { ButtonProps } from "@/interfaces";
import React from "react";

const Button: React.FC<ButtonProps> = ({ name, styles, icon, action }) => {
  return (
    <button className={styles} onClick={action}>
      {name} <span>{icon}</span>
    </button>
  );
};

export default Button;
