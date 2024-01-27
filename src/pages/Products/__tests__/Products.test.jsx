import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import allProducts from './allProducts';
import Products from '../Products';

function setup(category) {
  const fakeLoader = { category };
  const routes = [
    {
      path: '/products/:category?',
      element: <Products />,
      loader: () => fakeLoader,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/products'],
  });

  return render(<RouterProvider router={router} />);
}

let fakeData;
global.fetch = vi.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(fakeData) })
);

test('displays All products category heading and 20 cards', async () => {
  fakeData = allProducts;
  setup();
  const heading = await screen.findByRole('heading', { name: 'All Products' });
  const cards = await screen.findAllByTestId('product card');

  expect(heading).toBeInTheDocument();
  expect(cards).toHaveLength(20);
  expect(fetch).toHaveBeenCalledWith(
    'https://fakestoreapi.com/products?sort=asc'
  );
});

test('displays Electronics category heading and 6 cards', async () => {
  fakeData = allProducts.filter((item) => item.category === 'electronics');
  setup('electronics');

  const heading = await screen.findByRole('heading', { name: 'Electronics' });
  const cards = await screen.findAllByTestId('product card');

  expect(heading).toBeInTheDocument();
  expect(cards).toHaveLength(6);
  expect(fetch).toHaveBeenCalledWith(
    'https://fakestoreapi.com/products/category/electronics?sort=asc'
  );
});
