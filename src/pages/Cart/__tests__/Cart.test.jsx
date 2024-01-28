import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import allProducts from '../../Products/__tests__/allProducts';
import { sanitizeProduct } from '../../../utils/conversions';
import Cart from '../Cart';

const fakeData = [allProducts[0], sanitizeProduct(allProducts[1])];

global.fetch = vi.fn((url) => {
  const targetId = +url[url.length - 1];
  return Promise.resolve({
    json: () =>
      Promise.resolve(fakeData.filter((item) => item.id === targetId)[0]),
  });
});

function setup(hasItems) {
  const fakeCart = [
    { id: fakeData[0].id, quantity: 1 },
    { id: fakeData[1].id, quantity: 2 },
  ];
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Cart miniCart={hasItems ? fakeCart : []} onChange={() => {}} />,
    },
  ]);

  return render(<RouterProvider router={router} />);
}

describe('Section: Cart list', () => {
  test('has heading & reservation message', () => {
    setup(false);
    const myCartHeading = screen.getByRole('heading', { name: /my cart/i });
    const reservation = screen.getByText('Items are reserved for 60 minutes');

    expect(myCartHeading).toBeInTheDocument();
    expect(reservation).toBeInTheDocument();
  });

  test('displays empty cart message', () => {
    setup(false);

    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });

  test("has correct number of items and hr's", async () => {
    const { container } = setup(true);
    const itemList = await screen.findAllByTestId('cart item');
    const dividers = container.querySelectorAll('hr');

    expect(itemList).toHaveLength(2);
    expect(dividers).toHaveLength(2);
    expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/1');
  });

  test.todo('has subtotal below items');
});

describe.skip('Section: Total', () => {
  test('has heading', () => {
    setup();
    expect(screen.getByRole('heading', { name: /total/i })).toBeInTheDocument();
  });
  test.todo('has subtotal');
  test.todo('has delivery with clickable icon');
  test.todo('has dropdown with delivery options');
  test.todo('has checkout button');
  test.todo('has payment options');
});
