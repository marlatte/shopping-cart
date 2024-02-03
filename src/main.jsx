import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import ErrorPage from './components/ErrorPage';
import { Pages, loaders, actions } from './pages/pages';
import './index.css';
import rootLoader from './root-loader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Pages.Home />,
            action: actions.newsletterAction,
          },
          {
            path: '/cart',
            element: <Pages.Cart />,
            action: actions.updateCart,
          },
          {
            path: '/cart/destroy',
            action: actions.removeFromCart,
          },
          {
            path: '/products/:category?',
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
