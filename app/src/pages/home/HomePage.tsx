import React, { FC, useEffect } from "react";
import axios from "../../api/axiosInstance"

interface IProps {

}

const HomePage: FC<IProps> = (props) => {
  useEffect(() => {
    (async()=> {
     const response = await axios.get("/helper/healthcheck");
     console.log(response)
    })()
  }, [])
  return (
    <>
      <h1 className='text-5xl text-gray-800'>hallo HOme</h1>
    </>
  );
};

export default HomePage;
