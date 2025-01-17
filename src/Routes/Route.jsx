import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import AllClasses from "../pages/AllClasses/AllClasses";
import TeachOnEdu from "../pages/TeachOnEdu/TeachOnEdu";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<h1>Here Have some 404 not found Error</h1>,
      children:[
        {
            path:"/",
            element:<Home></Home>,
        },
        {
            path:"/allClasses",
            element:<AllClasses></AllClasses>,
        },
        {
            path:"/teachOnEdu",
            element:<TeachOnEdu></TeachOnEdu>,
        },
        {
            path:"/signIn",
            element:<SignIn></SignIn>,
        },
        {
            path:"/signUp",
            element:<SignUp></SignUp>,
        }

      ]
    },
  ]);
  