import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Dashboard/Profile/Profile";
import MyDonationRequests from "../pages/Dashboard/Donor/MyDonationRequests";
import CreateDonationRequest from "../pages/Dashboard/Donor/CreateDonationRequest";
import DashboardShow from "../pages/Dashboard/DashboardShow";
import PrivateRoute from "./PrivateRoute";
import AllUser from "../pages/Dashboard/Admin/AllUser";

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
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        index: true,
        element:<DashboardShow/>
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path:'my-donation-requests',
        element:<MyDonationRequests/>
      },
      {
        path:'create-donation-request',
        element:<CreateDonationRequest/>
      },
      {
        path:'all-users',
        element:<AllUser/>
      }

    ],
  }
]);

export default router