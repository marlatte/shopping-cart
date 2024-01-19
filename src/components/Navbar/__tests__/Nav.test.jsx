import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Nav from '../Nav';

function setup() {
  render(<Nav />, { wrapper: BrowserRouter });
}

test('renders a nav', () => {
  setup();
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('has a close button', () => {
  setup();
  expect(screen.getByRole('button', { name: 'close menu' }));
});

test('contains 6 links', () => {
  setup();
  expect(screen.getAllByRole('link')).toHaveLength(6);
});
