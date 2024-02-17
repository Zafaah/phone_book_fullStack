import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Toaster } from 'react-hot-toast'
import Add from './pages/Add.jsx'
import { View } from 'lucide-react'
import ViewPage from './pages/ViewPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import Login from './components/Login.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,



      }, {
        path: "/Add",
        element: <Add />,
      },
      {
        path: "/viewPage",
        element: <ViewPage />,
      },

      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/",
        element: <Home />,
      },




    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
