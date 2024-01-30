import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import ErrorPage from './ErrorPage';
import { Pages, loaders, actions } from './pages/pages';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Pages.Home />, action: actions.toastAction },
          { path: 'cart', element: <Pages.Cart /> },
          {
            path: '/products/:category',
            element: <Pages.Products />,
            loader: loaders.multiLoader,
          },
          {
            path: '/product/:id',
            element: <Pages.SingleProduct />,
            loader: loaders.singleLoader,
            action: actions.addToCart,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
