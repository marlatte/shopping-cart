import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import CartButton from '../CartButton';

function setup(items = 0) {
  render(<CartButton items={items} />, { wrapper: BrowserRouter });
}

test('renders a link with text "cart (0)"', () => {
  setup();
  expect(screen.getByRole('link', { name: /cart/i }).textContent).toMatch(
    /cart \(0\)/i
  );
});

test('conditionally renders 1 item in the cart', () => {
  setup(1);
  expect(screen.getByRole('link')).toHaveAccessibleName(/cart \(1\)/i);
});

test('conditionally renders 3 items in the cart', () => {
  setup(3);
  expect(screen.getByRole('link')).toHaveAccessibleName(/cart \(3\)/i);
});
