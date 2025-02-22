import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from "../layout/Root";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import UpdateTask from "../pages/UpdateTask/UpdateTask";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Root></Root></PrivateRoute>,
    children: [
      {
        index: true,
        element: <Home></Home>, 
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  { path: "/update-task/:taskId",
      loader: async ({ params })=> {
            return fetch(`http://localhost:5000/tasks/${params.taskId}`);
        },
      element:  <UpdateTask></UpdateTask>      
  }

]);