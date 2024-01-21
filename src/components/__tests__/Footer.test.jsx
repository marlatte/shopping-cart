import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import Footer from '../Footer';

function setup() {
  render(<Footer />, { wrapper: BrowserRouter });
}

test('has 2 children, & child 1 has 2 children', () => {
  setup();
  expect(screen.getByRole('contentinfo').childElementCount).toBe(2);
  expect(screen.getByRole('contentinfo').children[0].childElementCount).toBe(2);
});

test(' contains 19 fake links', () => {
  setup();
  expect(screen.getAllByTestId('fake-link').length).toBe(14);
});

test('contains a link to GitHub', () => {
  setup();
  const gitHubLink = screen.getByRole('link', { name: "Marlatte's Github" });
  expect(gitHubLink.href).toMatch('https://github.com/marlatte');
  expect(gitHubLink.textContent).toMatch(/walkermarlatt/i);
});
