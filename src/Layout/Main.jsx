import { Outlet } from "react-router-dom";
import Navbar from "../Sheared/Navbar/Navbar";
import Footer from "../Sheared/Footer/Footer";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="container mx-auto ">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;