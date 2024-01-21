import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import HomeLink from '../HomeLink';

function setup() {
  render(<HomeLink />, { wrapper: BrowserRouter });
}

test('logo is link to homepage', () => {
  setup();
  expect(
    screen.getByRole('link', { name: 'Yuedpao Homepage' })
  ).toHaveAccessibleName(/yuedpao homepage/i);
});
