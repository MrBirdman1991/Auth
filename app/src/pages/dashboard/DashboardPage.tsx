import { FC, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


interface IProps {}

const DashboardPage: FC<IProps> = (props) => {
  const [message, setMessage] = useState("");
  const axios = useAxiosPrivate();

  useEffect(() => {
    const controller = new AbortController();
    (async() => {
      try{
        const response =  await axios.get("/helper/authcheck")
        setMessage(response.data);
      }catch(err){
        console.log(err)
      }
    })()

    return () => {
      controller.abort();
    }
  }, [])

  return (
    <>
      <h1 className='text-5xl text-gray-800'>Hallo Dashboard</h1>
      <h2 className='text-5xl text-gray-800'>{message}</h2>
    </>
  );
};

export default DashboardPage;
