import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';

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
  return render(<ProductCard data={testProduct} />, { wrapper: BrowserRouter });
}

test('has 2 children: image & body', () => {
  setup();
  expect(screen.getByRole('link').childElementCount).toBe(2);
});

test('displays an image with a src and alt text', () => {
  setup();
  expect(screen.getByRole('img').src).toBe(testProduct.image);
  expect(screen.getByRole('img')).toHaveAccessibleName(testProduct.title);
});

test('displays a product name', () => {
  setup();
  expect(screen.getByRole('heading').textContent).toMatch(testProduct.title);
});

test('displays a price', () => {
  const { container } = setup();
  const price = container.querySelector('.price');
  expect(price).toHaveAccessibleName(`Price: $${testProduct.price}`);
  expect(price.textContent).toBe(`$${testProduct.price}`);
});

test('links to the correct product', () => {
  setup();

  expect(screen.getByRole('link').href).toMatch(/product\/1/i);
});
