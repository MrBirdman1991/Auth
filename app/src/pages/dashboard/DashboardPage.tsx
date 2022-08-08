import { FC, useEffect } from "react";
import { authCheck } from "../../api/healthCheckApi";

interface IProps {}

const DashboardPage: FC<IProps> = (props) => {

  useEffect(() => {
    const controller = new AbortController();
    (async() => {
      try{
        const response = await authCheck({signal: controller.signal})
        console.log(response);
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
    </>
  );
};

export default DashboardPage;
