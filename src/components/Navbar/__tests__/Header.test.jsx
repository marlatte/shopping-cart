import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';

function setup(items = 0) {
  return render(<Header items={items} />, {
    wrapper: BrowserRouter,
  });
}

test('has 3 children by default: a title, mini-cart, and menu button', () => {
  setup();
  expect(screen.getByRole('banner').childElementCount).toBe(3);
});

test('logo is link to homepage', () => {
  setup();
  expect(
    screen.getByRole('link', { name: 'Yuedpao Homepage' })
  ).toHaveAccessibleName(/yuedpao homepage/i);
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

  expect(screen.getByRole('banner').childElementCount).toBe(5);
});

test('clicking the close button closes the NavMenu', async () => {
  const user = userEvent.setup();
  setup();

  const menuBtn = screen.getByRole('button', { name: 'Menu' });
  await user.click(menuBtn);

  const closeBtn = screen.getByRole('button', { name: 'Close Menu' });
  await user.click(closeBtn);

  expect(screen.getByRole('banner').childElementCount).toBe(3);
});
