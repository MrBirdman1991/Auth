import  { FC, useContext, useEffect } from "react";
import { healthCheck } from "../../api/healthCheckApi";
import { AuthContext } from "../../context/AuthContext";

interface IProps {

}

const HomePage: FC<IProps> = (props) => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    (async()=> {
     const response = await healthCheck()
     console.log(response);
     console.log(authContext.authState);
    })()
  }, [])
  return (
    <>
      <h1 className='text-5xl text-gray-800'>hallo HOme</h1>
    </>
  );
};

export default HomePage;
