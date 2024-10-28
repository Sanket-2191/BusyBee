import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

function App() {
  const { products, isLoading, error } = useSelector(storeSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    // Only dispatch actions when the component mounts
    dispatch(setIsLoading());
    dispatch(getProducts());
  }, [dispatch]);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />, // Navbar used at the top level

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
          element: <Cart />, // Cart page
        },
        {
          path: 'myorders',
          element: <Myorders />, // Checkout page
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
