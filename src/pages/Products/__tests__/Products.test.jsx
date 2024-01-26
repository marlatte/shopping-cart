import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import allProducts from './allProducts';
import Products from '../Products';

function setup(products) {
  const router = createBrowserRouter([
    { path: '/', element: <Products products={products} /> },
  ]);

  return render(<RouterProvider router={router} />);
}

let fakeData;
global.fetch = () => Promise.resolve({ json: () => Promise.resolve(fakeData) });

test('displays All products category heading and 20 cards', async () => {
  fakeData = allProducts;
  setup();
  const heading = await screen.findByRole('heading', { name: 'All Products' });
  const cards = await screen.findAllByTestId('product card');

  expect(heading).toBeInTheDocument();
  expect(cards).toHaveLength(20);
});
test.todo('displays Electronics category heading and 6 cards');
test.todo('fetches the correct data from the location');
