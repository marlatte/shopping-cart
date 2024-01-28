import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import CartButton from '../CartButton';

const fakeCarts = {
  empty: [],
  one: [{ id: 1, quantity: 1 }],
  three: [
    { id: 1, quantity: 1 },
    { id: 2, quantity: 2 },
  ],
};
function setup(miniCart) {
  render(<CartButton miniCart={miniCart} />, { wrapper: BrowserRouter });
}

test('renders a link with text "cart (0)"', () => {
  setup(fakeCarts.empty);
  expect(screen.getByRole('link', { name: /cart/i }).textContent).toMatch(
    /cart \(0\)/i
  );
});

test('conditionally renders 1 item in the cart', () => {
  setup(fakeCarts.one);
  expect(screen.getByRole('link')).toHaveAccessibleName(/cart \(1\)/i);
});

test('conditionally renders 3 items in the cart', () => {
  setup(fakeCarts.three);
  expect(screen.getByRole('link')).toHaveAccessibleName(/cart \(3\)/i);
});
