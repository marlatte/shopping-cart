import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';

const fakeCarts = {
  empty: [],
  one: [{ id: 1, quantity: 1 }],
  three: [
    { id: 1, quantity: 1 },
    { id: 2, quantity: 2 },
  ],
};

function setup(miniCart = fakeCarts.empty) {
  return render(<Header miniCart={miniCart} />, {
    wrapper: BrowserRouter,
  });
}

test('has 3 children by default: a title, mini-cart, and menu button', () => {
  setup();
  expect(screen.getByRole('banner').children[0].childElementCount).toBe(3);
});

test('menu button shows 3 bars but is named "menu"', () => {
  setup();
  expect(screen.getByRole('button')).toHaveAccessibleName(/menu/i);
});

test('Matches snapshot for title, mini-cart, and menu button', () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
});

test('clicking the menu button opens the NavMenu', async () => {
  const user = userEvent.setup();
  setup();
  const menuBtn = screen.getByRole('button', { name: 'Menu' });

  await user.click(menuBtn);

  expect(screen.getByRole('banner').childElementCount).toBe(3);
});

test('opening the menu shifts focus to the close button', async () => {
  const user = userEvent.setup();
  setup();
  const menuBtn = screen.getByRole('button', { name: 'Menu' });

  await user.click(menuBtn);

  expect(screen.getByRole('button', { name: /close menu/i })).toHaveFocus();
});

test('clicking the close button closes the NavMenu', async () => {
  const user = userEvent.setup();
  setup();

  const menuBtn = screen.getByRole('button', { name: 'Menu' });
  await user.click(menuBtn);

  const closeBtn = screen.getByRole('button', { name: 'Close Menu' });
  await user.click(closeBtn);

  expect(screen.getByRole('banner').childElementCount).toBe(1);
});

test('closing the menu shifts focus back to the menu button', async () => {
  const user = userEvent.setup();
  setup();

  const menuBtn = screen.getByRole('button', { name: 'Menu' });
  await user.click(menuBtn);

  const closeBtn = screen.getByRole('button', { name: 'Close Menu' });
  await user.click(closeBtn);

  expect(screen.getByRole('button', { name: /menu/i })).toHaveFocus();
});
