import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";

export interface IProps {
  errorMessage: string | null;
  onChange: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Backdrop: React.FC<IProps> = ({ errorMessage, onChange }) => {
  return (
    <div>
   
        <div className="fixed top-0 left-0 w-full h-screen flex items-center  justify-center bg-stone-800 bg-opacity-70 ">
          <div className="border-solid border-slate-900 border-2 rounded-md bg-white p-32">
            <p className="text-slate-800 text-center font-bold">{errorMessage}</p>
            <div>
              <Button type="button" onClick={onChange}>Verstanden</Button>
            </div>
          </div>
        </div>

    </div>
  );
};

const ErrorModal: React.FC<IProps> = (props) => {
  return ReactDOM.createPortal(
    <Backdrop {...props} />,
    document.getElementById("modal")!
  );
};

export default ErrorModal;
