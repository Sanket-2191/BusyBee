import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import './App.css'
import { Navbar } from './pages/Navbar';
import { Home } from './pages/Home';

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
          // children: [
          //   {
          //     index: true,
          //     element: <Store />
          //   },
          //   // {
          //   //   path: 'product:id',
          //   //   element: <Product />
          //   // }
          // ]
        },
        // {
        //   path: 'cart',
        //   children: [
        //     {
        //       index: true,
        //       element: <Cart />
        //     },
        //     {
        //       path: 'product:id',
        //       element: <Product />
        //     },
        //     {
        //       path: 'checkout',
        //       element: <Checkout />
        //     },

        //   ]
        // }

      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router}>
        <Navbar />
      </RouterProvider>

    </>
  )
}

export default App
