import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import addCartAction from '../add-action';
import ProductInfo from '../ProductInfo';

const testProduct = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description:
    'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: { rate: 3.9, count: 120 },
};

function setup() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProductInfo product={testProduct} />,
      action: addCartAction,
    },
  ]);
  return render(<RouterProvider router={router} />);
}

test('displays accurate title, price, description', () => {
  setup();
  const price = screen.getByRole('article', {
    name: `Price: $${testProduct.price}`,
  });

  expect(screen.getByRole('heading').textContent).toBe(testProduct.title);
  expect(price).toHaveTextContent(`$${testProduct.price}`);
  expect(screen.getByText(testProduct.description)).toBeInTheDocument();
});

test('displays accurate rating and review count, rounds rating for image', () => {
  setup();

  expect(screen.getByText('3.9')).toHaveAccessibleName('Rating: 3.9 out of 5');
  expect(screen.getByText('120 reviews')).toBeInTheDocument();
  expect(screen.getByText('3.9').className).toMatch('star-4');
});

test('roundedRating also rounds down', () => {
  testProduct.rating.rate = 3.6;
  setup();
  expect(screen.getByText('3.6').className).toMatch('star-3-5');
});

test('Add to cart button shows toast', async () => {
  const user = userEvent.setup();
  setup();

  const addBtn = screen.getByRole('button', { name: /add to cart/i });
  expect(+addBtn.value).toBe(testProduct.id);

  await user.click(addBtn);

  const toast = screen.queryByRole('alert', {
    name: /add to cart successful/i,
  });
  expect(toast).toBeInTheDocument();
});
