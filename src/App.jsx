import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./components/AuthLayout/AuthLayout"
import Login from "./components/Login/Login"
import MasterLayout from "./components/MasterLayout/MasterLayout"
import Home from "./components/Home/Home"
import UsersList from "./components/UsersList/UsersList"
import Profile from "./components/Profile/Profile"
import UserData from "./components/UserData/UserData"
import NotFound from "./components/NotFound/NotFound"
import { useState } from "react"


function App() {
  const [userData, setUserData] = useState({})
  const router = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> }
      ]
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "users", element: <UsersList setUserData={setUserData} /> },
        { path: "profile", element: <Profile /> },
        { path: "user-data", element: <UserData userData={userData} setUserData={setUserData} /> },
      ]
    },
  ])

  return (
    <>
      
      <RouterProvider router={router} />
    </>
  )
}

export default App


