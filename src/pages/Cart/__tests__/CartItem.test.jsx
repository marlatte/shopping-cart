import { render, screen } from '@testing-library/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import allProducts from '../../Products/__tests__/allProducts';
import CartItem from '../CartItem';
import { sanitizeProduct } from '../../../utils/conversions';

const [product1, product2] = [allProducts[0], sanitizeProduct(allProducts[1])];

const fakeData = { product: product1, quantity: 1 };
const fns = [() => {}];

function setup() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <CartItem item={fakeData} handlers={fns} />,
    },
  ]);

  return render(<RouterProvider router={router} />);
}

function getPriceAlt(product) {
  return `Price: ${product.price} dollar${product.price === 1 ? '' : 's'}`;
}

test('displays fetched price, title, and image for id:1', async () => {
  setup();
  const price = await screen.findByRole('heading', {
    name: getPriceAlt(fakeData.product),
  });
  const title = await screen.findByRole('link', {
    name: fakeData.product.title,
  });
  const image = await screen.findByRole('img');

  expect(price).toHaveTextContent(`$${fakeData.product.price}`);
  expect(title.href).toMatch(`/product/${fakeData.product.id}`);
  expect(image.src).toBe(fakeData.product.image);
});

test('displays fetched price, title, and image for id:2', async () => {
  fakeData.product = product2;
  setup();
  const price = await screen.findByRole('heading', {
    name: getPriceAlt(fakeData.product),
  });
  const title = await screen.findByRole('link', {
    name: fakeData.product.title,
  });
  const image = await screen.findByRole('img');

  expect(price).toHaveTextContent(`$${fakeData.product.price}`);
  expect(title.href).toMatch(`/product/${fakeData.product.id}`);
  expect(image.src).toBe(fakeData.product.image);
});

test('displays quantity setter with +/- buttons', async () => {
  fakeData.quantity = 2;
  setup();
  const quantity = await screen.findByRole('textbox');
  const plusButton = await screen.findByRole('button', {
    name: 'Add 1 to quantity',
  });
  const minusButton = await screen.findByRole('button', {
    name: 'Subtract 1 from quantity',
  });

  expect(+quantity.value).toBe(2);
  expect(plusButton).toHaveTextContent('+');
  expect(minusButton).toHaveTextContent('-');
});

test('displays Remove button with correct product id', async () => {
  setup();
  const removeBtn = await screen.findByRole('button', {
    name: 'Remove Item from Cart',
  });

  expect(removeBtn).toHaveTextContent('×');
  expect(+removeBtn.value).toBe(fakeData.product.id);
});
