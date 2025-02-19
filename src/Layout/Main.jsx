import { Outlet } from "react-router-dom";
import Navbar from "../Sheared/Navbar/Navbar";
import Footer from "../Sheared/Footer/Footer";

const Main = () => {
    return (
        <div className="bg-teal-50">
            <Navbar></Navbar>
            <div className="container mx-auto max-w-7xl">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;