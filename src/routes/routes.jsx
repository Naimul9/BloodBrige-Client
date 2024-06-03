import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

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
          {
            path: 'login',
            element:<Login/>
          }
        ],
        }
  ]);

  export default router