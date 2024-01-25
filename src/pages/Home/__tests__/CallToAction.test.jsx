import { expect, test } from 'vitest';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CallToAction from '../CallToAction';
import toastAction from '../toast-action';

function setup() {
  const router = createBrowserRouter([
    { path: '/', element: <CallToAction />, action: toastAction },
  ]);
  return render(<RouterProvider router={router} />);
}

test('has a header and paragraph', () => {
  setup();
  expect(screen.getByRole('heading').textContent).toMatch(
    /upgrade your style/i
  );
  expect(
    screen.getByText(
      /Get 15% off your next order by subscribing to our newsletter!/i
    )
  ).toBeInTheDocument();
});

test('has a form with an email input and subscribe button', () => {
  setup();
  const form = screen.getByRole('form', {
    name: /subscribe to our newsletter/i,
  });
  const emailInput = screen.getByRole('textbox', {
    name: /email/i,
  });
  const subscribeBtn = screen.getByRole('button', { name: /subscribe/i });

  expect(form).toBeInTheDocument();
  expect(form).toContainElement(emailInput);
  expect(form).toContainElement(subscribeBtn);
  expect(emailInput).toHaveAttribute('placeholder', 'Enter your email...');
});

test('shows a toast with placeholder email on submit', async () => {
  const user = userEvent.setup();
  setup();
  const subscribeBtn = screen.getByRole('button', { name: /subscribe/i });

  await user.click(subscribeBtn);

  expect(
    screen.getByRole('alert', { name: /subscribe successful/i }).children[0]
      .textContent
  ).toBe(`Thanks for subscribing, johnsmith@example.com!`);
});

test('shows a toast with submitted email', async () => {
  const user = userEvent.setup();
  setup();
  const subscribeBtn = screen.getByRole('button', { name: /subscribe/i });
  const input = screen.getByRole('textbox', { name: 'Email' });
  const testEmail = 'second@example.com';

  input.focus();
  await user.keyboard(testEmail);

  await user.click(subscribeBtn);

  const successMsg = screen.getByRole('alert', {
    name: /subscribe successful/i,
  }).children[0].textContent;

  expect(successMsg).toBe(`Thanks for subscribing, ${testEmail}!`);
});

test('toast goes away after 10 seconds', async () => {
  const user = userEvent.setup();
  setup();
  const subscribeBtn = screen.getByRole('button', { name: /subscribe/i });

  await user.click(subscribeBtn);

  const toast = screen.queryByRole('alert', {
    name: /subscribe successful/i,
  });

  expect(toast).toBeInTheDocument();

  await waitForElementToBeRemoved(
    screen.queryByRole('alert', {
      name: /subscribe successful/i,
    }),
    { timeout: 3060 }
  );

  expect(toast).not.toBeInTheDocument();
});

test('toast can be closed manually', async () => {
  const user = userEvent.setup();
  setup();
  const subscribeBtn = screen.getByRole('button', { name: /subscribe/i });

  await user.click(subscribeBtn);

  const toast = screen.queryByRole('alert', {
    name: /subscribe successful/i,
  });
  expect(toast).toBeInTheDocument();
  const closeBtn = screen.queryByRole('button', { name: 'Close Toast' });

  await user.click(closeBtn);

  expect(toast).not.toBeInTheDocument();
});
