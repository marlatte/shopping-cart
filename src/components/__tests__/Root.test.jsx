import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { describe, test } from 'vitest';
import { render } from '@testing-library/react';
import Root from '../Root';
import { Pages, loaders, actions } from '../../pages/pages';

function setup() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: 'cart', element: <Pages.Cart /> },
        {
          path: 'product/:id',
          element: <Pages.SingleProduct />,
          loader: loaders.singleLoader,
          action: actions.addToCart,
        },
      ],
    },
  ]);

  return render(<RouterProvider router={router} />);
}

describe.skip('Adding to cart', () => {
  test('creates new entry');
  test('same product adds quantity, not new entry');
});

describe.skip('Removing from cart', () => {
  test('deletes whole entry');
});

describe.skip('Cart quantity controls', () => {
  test('quantity input changes miniCart');
  test('+ button raises quantity');
  test('- button lowers quantity');
});
