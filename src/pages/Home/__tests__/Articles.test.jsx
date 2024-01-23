import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Articles from '../Articles';

function setup() {
  return render(<Articles />, { wrapper: BrowserRouter });
}

test('has 2 entries, each with an image and a heading', () => {
  setup();

  expect(screen.getAllByRole('img')).toHaveLength(2);
  expect(screen.getAllByRole('heading')).toHaveLength(2);
});

test('image urls match', () => {
  setup();

  expect(screen.getByRole('img', { name: /shirts on a hanger/i }).src).toMatch(
    /shirts-on-hanger.jpg/i
  );
  expect(screen.getByRole('img', { name: /stylish model/i }).src).toMatch(
    /model-in-field.jpg/i
  );
});
