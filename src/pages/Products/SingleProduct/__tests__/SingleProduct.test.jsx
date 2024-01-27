import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import SingleProduct from '../SingleProduct';
import { singleLoader } from '../../products-loaders';
import {
  convertToHref,
  convertToTitleCase,
} from '../../../../utils/conversions';
import allProducts from '../../__tests__/allProducts';

const testProduct1 = allProducts[0];
const testProduct2 = allProducts[1];

let fakeData;
global.fetch = vi.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(fakeData) })
);

function setup() {
  const routes = [
    {
      path: '/product/:id?',
      element: <SingleProduct />,
      loader: singleLoader,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [`/product/${fakeData.id}`],
  });

  return render(<RouterProvider router={router} />);
}

test('breadcrumbs list proper category', async () => {
  fakeData = testProduct1;
  setup();
  const allProductsLink = await screen.findByRole('link', {
    name: 'All Products',
  });
  const currentCategory = await screen.findByRole('link', {
    name: convertToTitleCase(fakeData.category),
  });

  expect(allProductsLink.href).toMatch('/products');
  expect(currentCategory.href).toMatch(convertToHref(fakeData.category));
  expect(fetch).toHaveBeenCalledWith(
    `https://fakestoreapi.com/products/${fakeData.id}`
  );
});

test('image has correct url', async () => {
  setup();
  const productImage = await screen.findByRole('img', {
    name: fakeData.title,
  });

  expect(productImage.src).toMatch(fakeData.image);
  expect(fetch).toHaveBeenCalledWith(
    `https://fakestoreapi.com/products/${fakeData.id}`
  );
});

test('ProductInfo shows data for id 1', async () => {
  setup();
  const productTitle = await screen.findByRole('heading');

  expect(productTitle.textContent).toBe(fakeData.title);
});

test('ProductInfo shows data for id 2', async () => {
  fakeData = testProduct2;
  setup();
  const productTitle = await screen.findByRole('heading');

  expect(productTitle.textContent).toBe(fakeData.title);
});
