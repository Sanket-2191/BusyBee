import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Navbar from './pages/Navbar.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { Home } from './pages/Home.jsx';
import { Store } from './pages/Store.jsx';
import { Cart } from './pages/Cart.jsx';
import { Myorders } from './pages/Myorders.jsx';
import { getProducts, setIsLoading, storeSelector } from './reducers/storeReducer.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { signinSelector } from './reducers/loginReducer.js';
import Signin from './pages/Signin.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoutes from './pages/ProtectedRoutes.jsx';

function App() {
  const { isLoading, error } = useSelector(storeSelector);
  const dispatch = useDispatch();
  const { loggedIn, users } = useSelector(signinSelector);

  useEffect(() => {
    if (loggedIn) {
      toast.success("Login successful!", {
        autoClose: 2000, // Automatically closes after 2 seconds
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (users.length) {
      toast.success("Sign-in successful!", {
        autoClose: 2000, // Closes after 2 seconds
      });
    }
  }, [users.length]);

  useEffect(() => {
    // Only dispatch actions when the component mounts
    dispatch(setIsLoading());
    dispatch(getProducts());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
      </>, // Navbar used at the top level
      errorElement: <NotFound />, // Custom error page for invalid routes
      children: [
        {
          index: true,
          element: <Home />, // Home page as the index route (default for '/')
        },
        {
          path: 'store',
          element: <Store />, // Store page under /store
        },
        {
          path: 'cart',
          element: <ProtectedRoutes> <Cart /></ProtectedRoutes>, // Cart page
        },
        {
          path: 'myorders',
          element: <ProtectedRoutes>  <Myorders /> </ProtectedRoutes>, // Checkout page
        },
        {
          path: 'signin',
          element: <Signin />
        },
        {
          path: 'login',
          element: <Login />
        }
      ]
    }
  ]);

  if (isLoading) return <h1>Loading.....</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>

      <RouterProvider router={router} />
    </>
  );
}

export default App;
