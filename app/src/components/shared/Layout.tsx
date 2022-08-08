import { Outlet } from "react-router-dom";


const Layout = () => {
    return (
        <div className="w-screen min-h-screen bg-gray-100">
        <header></header>
        <main className="min-h-screen flex justify-center items-center">
          <Outlet/>
        </main>
        <footer></footer>
      </div>
    )
}

export default Layout