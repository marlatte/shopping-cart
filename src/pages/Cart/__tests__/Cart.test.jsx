import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import allProducts from '../../Products/__tests__/allProducts';
import { sanitizeProduct } from '../../../utils/conversions';
import Cart from '../Cart';

const fakeData = [allProducts[0], sanitizeProduct(allProducts[1])];

const fakeCart = [
  { product: fakeData[0], quantity: 1 },
  { product: fakeData[1], quantity: 2 },
];

const fakeMiniCart = [
  { id: fakeData[0].id, quantity: 1 },
  { id: fakeData[1].id, quantity: 2 },
];

global.fetch = vi.fn((url) => {
  const targetId = +url[url.length - 1];
  return Promise.resolve({
    json: () =>
      Promise.resolve(fakeData.filter((item) => item.id === targetId)[0]),
  });
});

function setup(hasItems) {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Cart miniCart={hasItems ? fakeMiniCart : []} onChange={() => {}} />
      ),
    },
  ]);

  return render(<RouterProvider router={router} />);
}

function getSubtotal(cart) {
  return cart.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );
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
    const itemList = await screen.findAllByTestId('cart-item');
    const dividers = container.querySelectorAll('.item-container > hr');

    expect(itemList).toHaveLength(2);
    expect(dividers).toHaveLength(2);
    expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/1');
  });

  test('has subtotal below items', async () => {
    setup(true);
    const cartList = screen.getByTestId('cart-list');
    const subtotalText = await screen.findByRole('heading', {
      name: /subtotal/i,
    });

    expect(cartList).toContain(subtotalText);
    expect(subtotalText.textContent).toMatch(
      `Subtotal $${getSubtotal(fakeCart)}`
    );
  });
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
