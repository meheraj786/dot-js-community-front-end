import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Signup from './pages/Signup.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import LoginPage from './pages/Login.tsx';
import Home from './pages/Home.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
        {
    index: true,
    element:<Home/>,
  },
    ]
  },
  {
    path: "/signup",
    element:<Signup/>,
  },
  {
    path: "/login",
    element:<LoginPage/>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <RouterProvider router={router} />,
  </StrictMode>,
)
