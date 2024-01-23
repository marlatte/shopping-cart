import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Articles from '../Articles';

function setup() {
  return render(<Articles />, { wrapper: BrowserRouter });
}

test.todo('', () => {
  expect();
});
