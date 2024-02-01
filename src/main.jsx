import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import ErrorPage from './ErrorPage';
import { Pages, loaders, actions } from './pages/pages';
import './index.css';
import rootLoader from './root-loader';

import { FakeProduct, FakeCart } from './__tests__/FakeComponent';
import { addNew, remove, update } from './cartController';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      // {
      //   errorElement: <ErrorPage />,
      //   children: [
      //     { index: true, element: <Pages.Home />, action: actions.newsletterAction },
      //     { path: 'cart', element: <Pages.Cart /> },
      //     {
      //       path: '/products/:category',
      //       element: <Pages.Products />,
      //       loader: loaders.multiLoader,
      //     },
      //     {
      //       path: '/product/:id',
      //       element: <Pages.SingleProduct />,
      //       loader: loaders.singleLoader,
      //       action: actions.addToCart,
      //     },
      //   ],
      // },
      {
        element: <FakeProduct />,
        index: true,
        action: actions.addToCart,
      },
      {
        path: '/cart',
        element: <FakeCart />,
        action: actions.updateCart,
      },
      {
        path: '/cart/destroy',
        action: actions.removeFromCart,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
