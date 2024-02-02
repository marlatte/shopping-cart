import { render, screen, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';
import allProducts from '../../Products/__tests__/allProducts';
import { sanitizeProduct } from '../../../utils/conversions';
import Cart from '../Cart';

const fakeData = [allProducts[0], sanitizeProduct(allProducts[1])];

const fakeMiniCart = [
  { id: fakeData[0].id, quantity: 1, price: fakeData[0].price },
  { id: fakeData[1].id, quantity: 2, price: fakeData[1].price },
];

// eslint-disable-next-line react/prop-types
function ContextWrapper({ hasItems }) {
  const [miniCart, setMiniCart] = useState([]);
  useEffect(() => {
    if (hasItems) setMiniCart(fakeMiniCart);
  }, [hasItems]);
  return <Outlet context={{ miniCart }} />;
}

function setup(hasItems) {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ContextWrapper hasItems={hasItems} />,
      children: [
        {
          index: true,
          element: <Cart />,
        },
      ],
    },
  ]);

  return render(<RouterProvider router={router} />);
}

function getSubtotal(cart) {
  return cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
}

describe('Section: Cart list', () => {
  test('has heading, reservation, & empty cart messages', () => {
    setup(false);
    const myCartHeading = screen.getByRole('heading', { name: /my cart/i });
    const reservation = screen.getByText('Items are reserved for 60 minutes');

    expect(myCartHeading).toBeInTheDocument();
    expect(reservation).toBeInTheDocument();
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });

  test("has correct number of items and hr's", async () => {
    const { container } = setup(true);
    const itemList = await screen.findAllByTestId('cart-item');
    const dividers = container.querySelectorAll('.item-container > hr');

    expect(itemList).toHaveLength(2);
    expect(dividers).toHaveLength(2);
  });

  test('has subtotal below items', async () => {
    setup(true);
    const cartList = screen.getByTestId('cart-list');
    const subtotalText = await within(cartList).findByRole('heading', {
      name: /subtotal/i,
      level: 2,
    });

    expect(cartList).toContain(subtotalText);
    expect(subtotalText.textContent).toMatch(
      `Subtotal $${getSubtotal(fakeMiniCart)}`
    );
  });
});

describe('Section: Total Column', () => {
  test('has heading', () => {
    setup();
    expect(screen.getByRole('heading', { name: 'Total' })).toBeInTheDocument();
  });

  test('has subtotal', async () => {
    setup(true);
    const totalColumn = screen.getByTestId('total-column');
    // Wait to find subtotal until after items are displayed
    await screen.findAllByTestId('cart-item');
    const subtotalText = await within(totalColumn).findByRole('heading', {
      name: /subtotal/i,
      level: 3,
    });

    expect(totalColumn).toContain(subtotalText);
    expect(subtotalText.textContent).toMatch(
      `Subtotal $${getSubtotal(fakeMiniCart)}`
    );
  });

  test('has delivery with info button', () => {
    setup();
    const row = screen.getByTestId('delivery-row');
    const heading = screen.getByRole('heading', {
      name: /delivery/i,
      level: 3,
    });
    const button = screen.getByRole('button', {
      name: /more info/i,
    });

    expect(row).toContain(heading);
    expect(row).toContain(button);
    expect(button).toHaveTextContent('i');
  });

  test('clicking delivery info button toggles a popover', async () => {
    setup();
    const user = userEvent.setup();
    const row = screen.getByTestId('delivery-row');
    const button = screen.getByRole('button', {
      name: /more info/i,
    });

    expect(row.children).toHaveLength(2);

    await user.click(button);

    expect(row.children).toHaveLength(3);
    const popover = screen.getByRole('alert', {
      name: /delivery information/i,
    });
    expect(popover).toHaveTextContent(
      'Shipping options and speeds vary based on your location'
    );

    await user.click(button);

    expect(row.children).toHaveLength(2);
    expect(popover).not.toBeInTheDocument();
  });

  test('has dropdown with delivery options', () => {
    setup();
    const dropdown = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');

    options.forEach((option) => {
      expect(dropdown).toContain(option);
      expect(option.textContent).toMatch(capitalize(option.value));
    });
  });

  test('has checkout button', () => {
    setup();
    const checkout = screen.getByRole('button', { name: /checkout/i });
    expect(checkout).toBeInTheDocument();
  });

  test('has payment options', () => {
    setup();
    const payments = screen.getByTestId('payments');
    const heading = within(payments).getByRole('heading', { level: 3 });
    const image = within(payments).getByRole('img');
    const discounts = within(payments).getByText(
      'Got a discount code? Add it at the next step'
    );

    expect(heading).toHaveTextContent(/we accept:/i);
    expect(image.src).toMatch('payment-methods.png');
    expect(image.alt).toBe(
      'Apple Pay, American Express, VISA, VISA Electron, VISA Debit, VISA Carte Bleue, VISA Electron Carte Bleue, VISA Debit Carte Bleue, VISA Purchasing, Maestro, Mastercard, Debit Mastercard, Discover, Diners Club, PayPal, PayPal Pay in 4, 4 easy payments, Afterpay, Cash App Pay, Gift voucher, Google Pay'
    );
    expect(discounts).toBeInTheDocument();
  });
});
