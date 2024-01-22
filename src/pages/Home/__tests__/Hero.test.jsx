import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../Hero';

function setup() {
  return render(<Hero />, { wrapper: BrowserRouter });
}

test('has an h1 and paragraph with proper text', () => {
  setup();
  expect(screen.getByRole('heading').textContent).toMatch(
    /clothes that are more than just fabric/i
  );
  expect(
    screen.getByText(/beautiful 'fits that encourage you to get creative/i)
  ).toBeInTheDocument();
});

test('has a text link to all products', () => {
  setup();
  expect(
    screen.getByRole('link', { name: 'Shop All Categories' })
  ).toBeInTheDocument();
});

test('has an image link to all products', () => {
  setup();
  const link = screen.getByRole('link', {
    name: 'Shop these styles and more!',
  });
  const image = screen.getByRole('img');

  expect(link).toContainElement(image);
  expect(image).toHaveAttribute('src', '/src/assets/stylish-group.png');
});

test('matches a snapshot', () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
});
