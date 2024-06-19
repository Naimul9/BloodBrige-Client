import { createContext, useEffect, useState } from 'react'
import {

  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'

import axios from 'axios'
import { app } from '../../firebase.config'
import useAxiosPublic from '../hooks/useAxiosPublic'
import { Navigate } from 'react-router-dom'


export const AuthContext = createContext(null)
const auth = getAuth(app)


// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const axiosPublic =useAxiosPublic()

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }



  const logOut = async () => {
    setLoading(true)
    await axios(`${import.meta.env.VITE_API_URL}/logout`, { withCredentials: true })
    return signOut(auth)
    
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }


  // save user
  // const saveUser = async (user) => {
  //   const currentUser = {
  //     email: user?.email,
  //     name : user?.displayName,
  //     photo: user?.photoURL,
  //     role: 'donor',
  //     status: 'active',
  //   };
  //   const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/user`, currentUser);
  //   return data;
  // };


  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      if (currentUser) {
       
        const userInfo = { email: currentUser.email }
        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            if (res.data.token){
              localStorage.setItem('access-token', res.data.token)
            }})
            // saveUser(currentUser)
      } else{
          localStorage.removeItem('access-token')
      }
      setLoading(false)
    })


    return () => {
      return unsubscribe()
    }
  }, [axiosPublic])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,

  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider