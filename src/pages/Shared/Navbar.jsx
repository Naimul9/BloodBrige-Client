import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";






const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
 
  
  return (
    <div className='navbar fixed  z-10 bg-opacity-30 bg-black shadow-sm  py-1'>
      <div className='flex-1'>
        <Link to='/' className='flex gap-2 items-center'>
          <img className='w-auto h-16' src="/bloodDrop.png" alt='' />
          <span className="uppercase">
            <span className="text-center text-xl text-white ml-2  font-semibold">Blood</span>
            <br />
            <span className="text-[25px] font-bold  text text-red-600">Bridge </span>
          </span>
        </Link>
      </div>


      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1 text-white   font-semibold text-sm   '>
          <li className="hover:text-[#e93d41] ">
            <Link to='/'>Home</Link>
          </li>
          <li className="hover:text-[#e93d41] lg:block hidden">
            <Link to='/donation-requests'>Donation Requests</Link>
          </li>
          <li className='lg:block hidden '>
            <Link to='/blog' className='justify-between hover:text-[#e93d41]'>
              Blogs
            </Link>
          </li>
          {user &&
            <li className='lg:block hidden hover:text-[#e93d41] mr-16'>
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
                  src={ user?.photoURL }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium'
            >
              <li className='justify-between px-3 mt-1 mb-1'>{user.displayName}</li>

              <li>
                <Link to='/dashboard' className='justify-between text-black font-semibold text-sm hover:text-[#e93d41]'>
                  Dashboard
                </Link>
              </li>


              <li className="hover:text-[#e93d41] ">
                <Link to='/donation-requests'>Donation Requests</Link>
              </li>
              <li className=''>
                <Link to='/blog' className='justify-between hover:text-[#e93d41]'>
                  Blogs
                </Link>
              </li>
              {user &&
                <li className='hover:text-[#e93d41] mr-16'>
                  <Link to='/funding'>Funding Links</Link>
                </li>}






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