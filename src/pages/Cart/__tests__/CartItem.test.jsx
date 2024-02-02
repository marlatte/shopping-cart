import { render, screen } from '@testing-library/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import allProducts from '../../Products/__tests__/allProducts';
import CartItem from '../CartItem';
import { sanitizeProduct } from '../../../utils/conversions';

const [product1, product2] = [allProducts[0], sanitizeProduct(allProducts[1])];

function getFakes(product) {
  return {
    fakeData: product,
    fakeItem: {
      id: product.id,
      quantity: 1,
      price: product.price,
    },
  };
}

let { fakeData, fakeItem } = getFakes(product1);

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(fakeData),
  })
);

function setup() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <CartItem item={fakeItem} />,
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
    name: getPriceAlt(fakeData),
  });
  const links = await screen.findAllByRole('link', {
    name: fakeData.title,
  });
  const title = links[1];
  const image = await screen.findByRole('img');

  expect(price).toHaveTextContent(`$${fakeData.price}`);
  expect(title.href).toMatch(`/product/${fakeData.id}`);
  expect(image.src).toBe(fakeData.image);
  expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/1');
});

test('displays fetched price, title, and image for id:2', async () => {
  ({ fakeData, fakeItem } = getFakes(product2));
  setup();
  const price = await screen.findByRole('heading', {
    name: getPriceAlt(fakeData),
  });
  const links = await screen.findAllByRole('link', {
    name: fakeData.title,
  });
  const title = links[1];
  const image = await screen.findByRole('img');

  expect(price).toHaveTextContent(`$${fakeData.price}`);
  expect(title.href).toMatch(`/product/${fakeData.id}`);
  expect(image.src).toBe(fakeData.image);
});

test('displays quantity setter with +/- buttons', async () => {
  fakeItem.quantity = 2;
  setup();
  const quantity = await screen.findByRole('spinbutton');
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
  expect(+removeBtn.value).toBe(fakeData.id);
});
