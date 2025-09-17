import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

 const AuthContext = createContext()
function AuthProvider({ children }) {
    const [loggedUser,setLoggedUser]=useState(null);
    
    const saveUserData=()=>{
        const encodedToken = localStorage.getItem("userToken")
        const decodedToken=jwtDecode(encodedToken)
        setLoggedUser(decodedToken);
        console.log(decodedToken);
    }

    useEffect(() => {
    if(localStorage.getItem("userToken"))
    {
        saveUserData()
    }
    }, [])

    return (<>
        <AuthContext.Provider value={{saveUserData,loggedUser,setLoggedUser}}>
            { children}
        </AuthContext.Provider>
    </>)
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("context out of provider");
    return context;
  }

export { AuthProvider, useAuth };


