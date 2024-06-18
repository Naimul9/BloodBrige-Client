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
import AllBloodDonationRequests from "../pages/Dashboard/Admin/AllBloodDonationRequests";
import AdminRoute from "./AdminRoute";
import ContentManagement from "../pages/Dashboard/Admin/ContentManagement";
import DonationRequests from "../pages/DonationRequests/DonationRequests";
import AddBlog from "../pages/Dashboard/Admin/AddBlog";
import SearchPage from "../pages/SearchPage/SearchPage";
import BloodDonationRequestDetail from "../pages/BloodDonationRequestDetail/BloodDonationRequestDetail";
import Blog from "../pages/Blog/Blog";
import UpdateDonationRequest from "../pages/Dashboard/Donor/UpdateDonationRequest";
import BlogDetail from "../pages/Blog/BlogDetail";
import Funding from "../pages/Funding/Funding";
import GiveFund from "../pages/Funding/GiveFund";

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
        path:'/donation-requests',
        element:<DonationRequests/>
      },
      {
        path:'/search-page',
        element:<SearchPage/>
      },
      {
        path:'/blood-donation-request-detail/:id',
        element:<BloodDonationRequestDetail/>
      },
      {
        path:'/blog',
        element:<Blog/> 
      },
      {
        path:'/blog-detail/:id',
        element:<BlogDetail/>
      },
      {
        path:'/funding',
        element:<Funding/>
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
        path:'update-donation-request/:id', 
        element:<UpdateDonationRequest/>
      },
      {
        path:'all-users',
        element:<AdminRoute><AllUser/></AdminRoute>
      },
      {
        path:'all-blood-donation-request',
        element:<AdminRoute><AllBloodDonationRequests/></AdminRoute>
      },
      {
        path:'content-management',
        element:<AdminRoute><ContentManagement/></AdminRoute>
      },
      {
        path:'add-blog',
        element:<AdminRoute><AddBlog/></AdminRoute>
      },
      

    ],
  }
]);

export default router