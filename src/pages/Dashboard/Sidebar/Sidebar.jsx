import { useContext, useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { BiSolidDonateBlood } from "react-icons/bi";
import { IoCreateOutline } from "react-icons/io5";

import { AiOutlineBars } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'

import { Link } from 'react-router-dom'
import { AuthContext } from '../../../Provider/AuthProvider'
import useRole from '../../../hooks/useRole';

const Sidebar = () => {
  const { logOut } = useContext(AuthContext)
  const [isActive, setActive] = useState(false)
  const [role] =useRole()

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
          <Link to='/'>
           <div className='flex'>
           <img className='w-auto h-14 pt-4' src="/bloodDrop.png" alt='' />
           <p className='font-semibold text-black text-xl py-5 '> Blood <span className='text-red-700'>Bridge </span> </p>
           </div>
              </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-black mx-auto'>
              <Link to='/'>
           <div className='flex'>
           <img className='w-auto h-14 pt-4' src="/bloodDrop.png" alt='' />
           <p className='font-semibold text-white text-xl py-5 '> Blood <span className='text-red-700'>Bridge </span> </p>
           </div>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 px-5 mt-6'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
             

              {/* my donation request */}
              {role ==='donor' &&   <NavLink
                to='my-donation-requests'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-red-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <BiSolidDonateBlood  className='w-5 h-5' />

                <span className='mx-4 font-medium'>My Donation Requests</span>
              </NavLink>}
              {/* create donation request */}
           {role ==='donor' &&   <NavLink
                to='create-donation-request'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-red-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <IoCreateOutline className='w-5 h-5' />

                <span className='mx-4 font-medium'>Create Donation Request</span>
              </NavLink> }

{/* Admin Dashboard */}
{/* All users */}
{role ==='admin' &&   <NavLink
                to='all-users'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-red-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <IoCreateOutline className='w-5 h-5' />

                <span className='mx-4 font-medium'>All Users</span>
              </NavLink> }
{/* All Blood donation Request Page */}
{role ==='admin' &&   <NavLink
                to='all-blood-donation-request'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-red-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <IoCreateOutline className='w-5 h-5' />

                <span className='mx-4 text-[15px] font-medium'>All Blood Donation Request</span>
              </NavLink> }

              {/* Content Management  */}

{role ==='admin' &&   <NavLink
                to='content-management'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-red-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <IoCreateOutline className='w-5 h-5' />

                <span className='mx-4 font-medium'>Content Management</span>
              </NavLink> }

              {/* volunteer Dashboard */}

              {role ==='volunteer' &&   <NavLink
                to='all-blood-donation-request'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-red-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <IoCreateOutline className='w-5 h-5' />

                <span className='mx-4 text-[15px] font-medium'>All Blood Donation Request</span>
              </NavLink> }

              {role ==='volunteer' &&   <NavLink
                to='content-management'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-red-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <IoCreateOutline className='w-5 h-5' />

                <span className='mx-4 font-medium'>Content Management</span>
              </NavLink> }




            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to='/dashboard/profile'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FcSettings className='w-5 h-5' />

            <span className='mx-4 font-medium'>Profile</span>
          </NavLink>
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar