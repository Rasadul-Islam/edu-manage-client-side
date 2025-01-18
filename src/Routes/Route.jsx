import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import AllClasses from "../pages/AllClasses/AllClasses";
import TeachOnEdu from "../pages/TeachOnEdu/TeachOnEdu";
import Register from "../pages/Register/Register";
import LogIn from "../pages/LogIn/LogIn";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <h1>Here Have some 404 not found Error</h1>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/teachOnEdu",
        element:
          <PrivateRoute>
            <TeachOnEdu></TeachOnEdu>
          </PrivateRoute>,
      },
      {
        path: "/logIn",
        element: <LogIn></LogIn>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/dashboard",
        element:
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>,
      }

    ]
  },
]);
