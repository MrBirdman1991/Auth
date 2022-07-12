import React, { FC } from "react";

interface IProps {
    type: "submit" |"button",
    children: any
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button: FC<IProps> = ({type, children, onClick}) => {
  return (
    <button type={type} className="m-2 bg-red-400 rounded-md shadow-md py-1 px-16 text-white" onClick={onClick}>
        {children}
    </button>
  );
};

export default Button;
