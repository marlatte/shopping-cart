import { render, screen } from '@testing-library/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import allProducts from '../../Products/__tests__/allProducts';
import CartItem from '../CartItem';
import { sanitizeProduct } from '../../../utils/conversions';

let fakeData;
global.fetch = vi.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(fakeData) })
);

const [product1, product2] = [allProducts[0], sanitizeProduct(allProducts[1])];

function setup(quantity) {
  const fakeItem = { id: fakeData.id, quantity };
  const router = createBrowserRouter([
    { path: '/', element: <CartItem item={fakeItem} /> },
  ]);

  return render(<RouterProvider router={router} />);
}

function getPriceAlt(product) {
  return `Price: ${product.price} dollar${product.price === 1 ? '' : 's'}`;
}

test('displays fetched price, title, and image for id:1', async () => {
  fakeData = product1;
  setup(1);
  const price = await screen.findByRole('heading', {
    name: getPriceAlt(fakeData),
  });
  const title = await screen.findByRole('link', { name: fakeData.title });
  const image = await screen.findByRole('img');

  expect(price).toHaveTextContent(`$${fakeData.price}`);
  expect(title.href).toMatch(`/product/${fakeData.id}`);
  expect(image.src).toBe(fakeData.image);
});

test('displays fetched price, title, and image for id:2', async () => {
  fakeData = product2;
  setup(1);
  const price = await screen.findByRole('heading', {
    name: getPriceAlt(fakeData),
  });
  const title = await screen.findByRole('link', { name: fakeData.title });
  const image = await screen.findByRole('img');

  expect(price).toHaveTextContent(`$${fakeData.price}`);
  expect(title.href).toMatch(`/product/${fakeData.id}`);
  expect(image.src).toBe(fakeData.image);
});

test.todo('displays quantity setter with +/- buttons');
