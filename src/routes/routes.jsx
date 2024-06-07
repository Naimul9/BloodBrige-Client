import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Dashboard/Profile/Profile";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        // errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Home />,
          },
       
        ],
        },
           { path: 'login',element:<Login/>},
          { path: 'register', element:<Register/>},
          {
            path:'/dashboard',
            element:<Dashboard/>,
            children: [
{
  path:'profile',
  element:<Profile/>
}
            ],
          }
  ]);

  export default router