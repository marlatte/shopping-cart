import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NavMenu from '../NavMenu';

const onClick = () => {};

function setup() {
  render(<NavMenu onClick={onClick} />, {
    wrapper: BrowserRouter,
  });
}

test('renders a nav', () => {
  setup();
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('has a close button', () => {
  setup();
  expect(screen.getByRole('button')).toHaveAccessibleName(/close menu/i);
});

test('contains 6 links with h2 text', () => {
  setup();
  expect(screen.getAllByRole('link')).toHaveLength(6);
  expect(screen.getAllByRole('heading')).toHaveLength(6);
});
