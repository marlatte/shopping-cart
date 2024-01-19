import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Nav from '../Nav';

test('Renders a nav', () => {
  render(<Nav />);
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});
