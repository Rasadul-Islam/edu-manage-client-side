import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Sheared/Navbar/Navbar";
import Footer from "../Sheared/Footer/Footer";

const Main = () => {
    const location = useLocation();
    const isSignIn = location.pathname.includes("/signIn")
    return (
        <div>
            {isSignIn || <Navbar></Navbar>}
            <Outlet></Outlet>
            {isSignIn || <Footer></Footer>}
        </div>
    );
};

export default Main;