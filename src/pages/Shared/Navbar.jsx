import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";




const Navbar = () => {

    const { user,logOut } = useContext(AuthContext)
    return (
        <div className='navbar bg-base-100 shadow-sm container px-4 mx-auto'>
        <div className='flex-1'>
          <Link to='/' className='flex gap-2 items-center'>
            <img className='w-auto h-16' src="/bloodBridge.png" alt='' />
            <span className='font-bold text-red-300 '>Blood Bridge</span>
          </Link>
        </div>
  
  
        <div className='flex-none'>
          <ul className='menu menu-horizontal px-1 font-medium '>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/donation-requests'>Donation Requests</Link>
            </li>
            <li className='lg:block hidden'>
               <Link to='/blog' className='justify-between'>
                    Blogs
                  </Link>
                </li>
               { user &&
                <li className='lg:block hidden'>
                  <Link to='/funding'>Funding Links</Link>
                </li>}
           
  
            {!user && (
              <li>
                <Link to='/login'>Login</Link>
              </li>
            )}
          </ul>
  
          
  
  
          {user && (
            <div className='dropdown dropdown-end z-50'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'
              >
                <div title={user?.displayName} className='w-10 rounded-full'>
                  <img
                    referrerPolicy='no-referrer'
                    alt='User Profile Photo'
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium'
              >
                  <li className='justify-between px-3 mt-1 mb-1'>{user.displayName}</li>
                <li>
                  <Link to='/add-books' className='justify-between'>
                    Add Books
                  </Link>
                </li>
                <li>
                  <Link to='/borrowed-books'>Borrowed Books</Link>
                </li>
              
                <li className='mt-2'>
                  <button
                    onClick={logOut}
                    className='bg-gray-200 block text-center'
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
           
        </div>
      </div>
    );
};

export default Navbar;