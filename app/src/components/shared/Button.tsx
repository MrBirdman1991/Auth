import React, { FC } from "react";

interface IProps {
    type: "submit" |"button",
    children: any
}

const Button: FC<IProps> = ({type, children}) => {
  return (
    <button type={type} className="m-2 bg-red-400 rounded-md shadow-md py-1 px-16 text-white">
        {children}
    </button>
  );
};

export default Button;
