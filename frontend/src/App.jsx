import { Outlet } from "react-router-dom"
import Header from "./components/Header"

function App() {


  return (
    <div className=" p-4 bg-cyan-700 ">
      <Header />
      <div className="w-full max-w-lg mx-auto h-screen">
        <Outlet />
      </div>



    </div>
  )
}

export default App
