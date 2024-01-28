import { render, screen } from '@testing-library/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import allProducts from '../../Products/__tests__/allProducts';
import CartItem from '../CartItem';
import { sanitizeProduct } from '../../../utils/conversions';

const [product1, product2] = [allProducts[0], sanitizeProduct(allProducts[1])];

let fakeData;

function setup(quantity) {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <CartItem product={fakeData} quantity={quantity} onChange={() => {}} />
      ),
    },
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

test('displays quantity setter with +/- buttons', async () => {
  fakeData = product2;
  setup(2);
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
  setup(1);
  const removeBtn = await screen.findByRole('button', {
    name: 'Remove Item from Cart',
  });

  expect(removeBtn).toHaveTextContent('×');
  expect(+removeBtn.value).toBe(fakeData.id);
});
