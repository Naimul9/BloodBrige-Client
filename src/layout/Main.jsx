import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";


const Main = () => {
    return (
        <div className="font-mulish">
            <Navbar/>
          <div  className="min-h-[calc(100vh-349.5px)]">  <Outlet/></div> 
            <Footer/>
        </div>
    );
};

export default Main;