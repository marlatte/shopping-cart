import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NavMenu from '../NavMenu';

const onClick = () => {};

function setup() {
  render(<NavMenu menuOpen={false} onClick={onClick} />, {
    wrapper: BrowserRouter,
  });
}

test('renders a nav', () => {
  setup();
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('has a close button', () => {
  setup();
  expect(
    screen.getByRole('button', { name: 'close menu' })
  ).toBeInTheDocument();
});

test('contains 6 links', () => {
  setup();
  expect(screen.getAllByRole('link')).toHaveLength(6);
});

test('menu defaults to closed', () => {
  setup();
  expect(screen.getByRole('list').className).toBe('');
});

test('menu can be open', () => {
  render(<NavMenu menuOpen onClick={onClick} />, { wrapper: BrowserRouter });
  expect(screen.getByRole('list').className).toBe('open');
});
