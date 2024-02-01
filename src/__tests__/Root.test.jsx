import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Root from '../Root';
import { FakeComponent, cartAction } from './FakeComponent';
import rootLoader from '../root-loader';

function setup() {
  console.log('setup');
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      loader: rootLoader,
      children: [
        {
          index: true,
          element: <FakeComponent />,
          action: cartAction,
        },
      ],
    },
  ]);

  return render(<RouterProvider router={router} />);
}

describe.skip('Adding to cart', () => {
  test('creates new entry', async () => {
    setup();
    // const user = userEvent.setup();
    const addBtn = screen.getByRole('button', { name: /add 1 to cart/i });
    expect(addBtn).toBeInTheDocument();
    // const miniCartDisplay = screen.getByText(/miniCart/);

    // expect(miniCartDisplay.textContent).toMatch(' []');

    // await user.click(addBtn);

    // expect(miniCartDisplay.textContent).toMatch('[{"id":1,"quantity":1}]');
  });

  test.skip('adds a second product', async () => {
    setup();
    const user = userEvent.setup();
    const addBtn1 = screen.getByRole('button', { name: /add 1 to cart/i });
    const addBtn2 = screen.getByRole('button', { name: /add 2 to cart/i });
    const miniCartDisplay = screen.getByText(/miniCart/);

    await user.click(addBtn1);
    expect(miniCartDisplay.textContent).toMatch('[{"id":1,"quantity":1}]');

    await user.click(addBtn2);
    expect(miniCartDisplay.textContent).toMatch(
      '[{"id":1,"quantity":1},{"id":2,"quantity":1}]'
    );
  });

  test.skip('same product adds quantity, not new entry', async () => {
    setup();
    const user = userEvent.setup();
    const addBtn = screen.getByRole('button', { name: /add 1 to cart/i });
    const miniCartDisplay = screen.getByText(/miniCart/);

    await user.click(addBtn);
    expect(miniCartDisplay.textContent).toMatch('[{"id":1,"quantity":1}]');

    await user.click(addBtn);
    expect(miniCartDisplay.textContent).toMatch('[{"id":1,"quantity":2}]');

    await user.click(addBtn);
    expect(miniCartDisplay.textContent).toMatch('[{"id":1,"quantity":3}]');
  });
});

describe.skip('Removing from cart', () => {
  test('deletes whole entry', async () => {
    setup();
    const user = userEvent.setup();
    const addBtn1 = screen.getByRole('button', { name: /add 1 to cart/i });
    const addBtn2 = screen.getByRole('button', { name: /add 2 to cart/i });
    const removeBtn = screen.getByRole('button', { name: /remove/i });
    const miniCartDisplay = screen.getByText(/miniCart/);

    await user.click(addBtn1);
    await user.click(addBtn1);
    await user.click(addBtn2);
    expect(miniCartDisplay.textContent).toMatch(
      '[{"id":1,"quantity":2},{"id":2,"quantity":1}]'
    );

    await user.click(removeBtn);

    expect(miniCartDisplay.textContent).toMatch('[{"id":2,"quantity":1}]');
  });
});

describe.skip('Cart quantity controls', () => {
  test('quantity input matches miniCart', async () => {
    setup();
    const user = userEvent.setup();
    const addBtn2 = screen.getByRole('button', { name: /add 2 to cart/i });
    const miniCartDisplay = screen.getByText(/miniCart/);
    await user.click(addBtn2);

    const qtyInput = screen.getByRole('spinbutton');
    expect(+qtyInput.value).toBe(1);
    expect(miniCartDisplay.textContent).toMatch('[{"id":2,"quantity":1}]');
  });

  test('quantity input changes miniCart', async () => {
    setup();
    const user = userEvent.setup();
    const addBtn2 = screen.getByRole('button', { name: /add 2 to cart/i });
    const miniCartDisplay = screen.getByText(/miniCart/);
    await user.click(addBtn2);

    const qtyInput = screen.getByRole('spinbutton');
    expect(+qtyInput.value).toBe(1);

    await user.type(qtyInput, '[Backspace] 3');

    expect(+qtyInput.value).toBe(3);
    expect(miniCartDisplay.textContent).toMatch('[{"id":2,"quantity":3}]');
  });

  test.todo('+ button raises quantity');

  test.todo('- button lowers quantity');
});
