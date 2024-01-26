import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SingleProduct from '../SingleProduct';
import {
  convertToHref,
  convertToTitleCase,
} from '../../../../utils/conversions';

const testProduct1 = {
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
    { path: '/', element: <SingleProduct productId={testProduct1.id} /> },
  ]);

  return render(<RouterProvider router={router} />);
}

global.fetch = vi.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(testProduct1) })
);

test('breadcrumbs list proper category', async () => {
  setup();
  const allProducts = await screen.findByRole('link', { name: 'All Products' });
  const currentCategory = await screen.findByRole('link', {
    name: convertToTitleCase(testProduct1.category),
  });

  expect(allProducts.href).toMatch('/products');
  expect(currentCategory.href).toMatch(convertToHref(testProduct1.category));
  expect(fetch).toHaveBeenCalledWith(
    `https://fakestoreapi.com/products/${testProduct1.id}`
  );
});

test('image has correct url', async () => {
  setup();
  const productImage = await screen.findByRole('img', {
    name: testProduct1.title,
  });

  expect(productImage.src).toMatch(testProduct1.image);
  expect(fetch).toHaveBeenCalledWith(
    `https://fakestoreapi.com/products/${testProduct1.id}`
  );
});

test('ProductInfo is getting passed the correct info', async () => {
  setup();
  const productTitle = await screen.findByRole('heading');

  expect(productTitle.textContent).toBe(testProduct1.title);
});

test.todo('Get correct product data from loader');
