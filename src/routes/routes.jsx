import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

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
           {
            path: 'login',
            element:<Login/>
          },
          {
            path: 'register',
            element:<Register/>
          },
  ]);

  export default router