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
import AdminAllClasses from "../pages/Dashboard/AdminAllClasses";
import AddClass from "../pages/Dashboard/AddClass";
import MyClass from "../pages/Dashboard/MyClass";
import UpdateClass from "../pages/Dashboard/UpdateClass";
import SeeClassDitails from "../pages/Dashboard/SeeClassDitails";
import EnrollClass from "../pages/Dashboard/EnrollClass";
import Payment from "../pages/AllClasses/Payment";
import EnrollClassDetails from "../pages/Dashboard/EnrollClassDetails";
import UpcomingFeture from "../pages/Dashboard/UpcomingFeture";

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
        path: "allClasses/enroll-class/:id",
        element: 
        <PrivateRoute>
          <EnrollClass></EnrollClass>
        </PrivateRoute> ,
      },
      {
        path: "enroll-class/payment",
        element: 
        <PrivateRoute>
         <Payment></Payment>
        </PrivateRoute> ,
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
      {
        path: "/class/:id",
        element: <UpcomingFeture></UpcomingFeture>,
      },
    ]
  },
  {
    path: "dashboard",
    element:
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>,
    errorElement: <h1>Not Fot any item here</h1>,
    children: [
      {
        path: "/dashboard",
        element:
          <PrivateRoute>
            <DashboardHome></DashboardHome>
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
        path: "adimAllClasses",
        element:
          <AdminRoute>
            <AdminAllClasses></AdminAllClasses>
          </AdminRoute>
      },
      {
        path: "addClass",
        element:
          <AddClass></AddClass>
      },
      {
        path: "myClass",
        element:
          <MyClass></MyClass>
      },
      {
        path: "myEnrollClass",
        element:
          <PrivateRoute>
            <MyEnrollClass></MyEnrollClass>
          </PrivateRoute>
      },
      {
        path: "profile",
        element:
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
      },
      {
        path: "update-class/:id",
        element:
          <PrivateRoute>
            <UpdateClass></UpdateClass>
          </PrivateRoute>
      },
      {
        path: "my-class/:id",
        element:
          <PrivateRoute>
            <SeeClassDitails></SeeClassDitails>
          </PrivateRoute>
      },
      {
        path: "myEnrollClass/:id",
        element:
          <PrivateRoute>
            <EnrollClassDetails></EnrollClassDetails>
          </PrivateRoute>
      },
    ]
  }
]);
