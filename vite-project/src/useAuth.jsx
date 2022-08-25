import { createContext, useState, useEffect } from 'react'
import Axios from 'axios';

const AuthContext = createContext()

export const useAuth = () => {

//Este es el hook que cree para saber si esta registrado o no el usuario

  const [Authenticated, setAuthenticated] = useState(true)

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setAuthenticated(true);
      }
      else {
        setAuthenticated(false);
      }
    });
  }, [])
  console.log(Authenticated)

  return {
    Authenticated
  }
}

export const AuthProvider = ({ children }) => {

  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export default useAuth;