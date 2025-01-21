import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import AllClasses from "../pages/AllClasses/AllClasses";
import TeachOnEdu from "../pages/TeachOnEdu/TeachOnEdu";
import Register from "../pages/Register/Register";
import LogIn from "../pages/LogIn/LogIn";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../utility/ErrorPage/ErrorPage";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import MyEnrollClass from "../pages/Dashboard/MyEnrollClass";
import Dashboard from "../Layout/Dashboard";
import TeacherRequest from "../pages/Dashboard/TeacherRequest";
import Users from "../pages/Dashboard/Users";
import Profile from "../pages/Dashboard/Profile";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "allClasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "teachOnEdu",
        element:
          <PrivateRoute>
            <TeachOnEdu></TeachOnEdu>
          </PrivateRoute>,
      },
      {
        path: "logIn",
        element: <LogIn></LogIn>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ]
  },
  {
    path: "dashboard",
    element:
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>,
    children: [
      {
        path: "/dashboard",
        element:
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
      },
      {
        path: "myClass",
        element:
          <PrivateRoute>
            <MyEnrollClass></MyEnrollClass>
          </PrivateRoute>
      },
      {
        path: "teacherRequest",
        element:
          <AdminRoute>
            <TeacherRequest></TeacherRequest>
          </AdminRoute>
      },
      {
        path: "users",
        element:
          <AdminRoute>
            <Users></Users>
          </AdminRoute>
      },
      {
        path: "allClasses",
        element:
          <AdminRoute>
            <AllClasses></AllClasses>
          </AdminRoute>


      },
      {
        path: "profile",
        element:
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
      },
    ]
  }
]);
