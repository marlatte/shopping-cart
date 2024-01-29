import {
  RouterProvider,
  createBrowserRouter,
  useOutletContext,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Root from '../Root';

const FakeComponent = vi.fn(() => {
  const { miniCart, addToCart } = useOutletContext();

  return (
    <main>
      <h1>My Fake Component</h1>
      <div>miniCart: {JSON.stringify(miniCart)}</div>

      <button type="button" value="1" onClick={addToCart}>
        Add to cart
      </button>
    </main>
  );
});

function setup() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: <FakeComponent />,
        },
      ],
    },
  ]);

  return render(<RouterProvider router={router} />);
}

describe('Adding to cart', () => {
  test('creates new entry', async () => {
    setup();
    const user = userEvent.setup();
    const addBtn = screen.getByRole('button', { name: /add to cart/i });
    const miniCartDisplay = screen.getByText(/miniCart/);

    expect(miniCartDisplay.textContent).toMatch(' []');

    await user.click(addBtn);

    expect(miniCartDisplay.textContent).toMatch('[{"id":1,"quantity":1}]');
  });

  test('same product adds quantity, not new entry', async () => {
    setup();
    const user = userEvent.setup();
    const addBtn = screen.getByRole('button', { name: /add to cart/i });
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
  test('deletes whole entry');
});

describe.skip('Cart quantity controls', () => {
  test('quantity input changes miniCart');
  test('+ button raises quantity');
  test('- button lowers quantity');
});
