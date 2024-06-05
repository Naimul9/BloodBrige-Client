import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'

import { AuthContext } from '../../Provider/AuthProvider'

const Login = () => {
  const navigate = useNavigate()
  const { signIn} = useContext(AuthContext)
  const [error, setError] = useState('')


  // Email Password SignIn
  const handleSignIn = async (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const pass = form.password.value
    console.log({ email, pass })

    try {
      // User Login
      const result = await signIn(email, pass)
      console.log(result.user);

      navigate('/')
      toast.success('SignIn Successful')
    } catch (err) {
      console.log(err)
      setError('Invalid email or password')
      toast.error( 'Invalid email or password')
    }
  }

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
      <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-red-50 rounded-lg shadow-lg  lg:max-w-4xl '>
        <div
          className='hidden bg-cover bg-center lg:block lg:w-1/2'
          style={{
            backgroundImage: "url('/bloodBridge.png')",
          }}
        ></div>

        <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
          <div className='flex justify-center mx-auto'>
            <img className='w-auto h-7 sm:h-8' src="" alt='' />
          </div>

          <p className='mt-3 text-xl text-center text-gray-600 '>
            Welcome back!
          </p>

      

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  lg:w-1/4'></span>

            <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
             login with email
            </div>

            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
          </div>

          {error && (
            <div className='mt-4 text-center text-red-500'>
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn}>
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 '
                htmlFor='LoggingEmailAddress'
              >
                Email Address
              </label>
              <input
                id='LoggingEmailAddress'
                autoComplete='email'
                name='email'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
              />
            </div>

            <div className='mt-4'>
              <div className='flex justify-between'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-600 '
                  htmlFor='loggingPassword'
                >
                  Password
                </label>
              </div>

              <input
                id='loggingPassword'
                autoComplete='current-password'
                name='password'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
              />
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-6 py-3 bg-red-700 hover text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform hover:bg-red-800 rounded-lg  focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
              >
                Sign In
              </button>
            </div>
          </form>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b border-red-600  md:w-1/4'></span>

            <Link
              to='/register'
              className='text-xs text-gray-500 uppercase  hover:underline'
            >
              or Register
            </Link>

            <span className='w-1/5 border-b border-red-600 md:w-1/4'></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
