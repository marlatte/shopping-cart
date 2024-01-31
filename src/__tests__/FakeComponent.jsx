import { useFetcher, useOutletContext } from 'react-router-dom';
import { vi } from 'vitest';

export async function cartAction({ request }) {
  const formData = await request.formData();
  const quantity = formData.get('quantity');
  const id = formData.get('id');
  console.log(id, ':', quantity);
  return { id, quantity };
}

export const FakeComponent = vi.fn(() => {
  console.log('Fake Component');
  const { miniCart, addToCart, removeFromCart, plusQty, minusQty, changeQty } =
    useOutletContext();
  const testFetcher = useFetcher('test-quantity');

  return (
    <main>
      <h1>My Fake Component</h1>
      <div>miniCart: {JSON.stringify(miniCart)}</div>

      <button type="button" value="1" onClick={addToCart}>
        Add 1 to cart
      </button>
      <button type="button" value="2" onClick={addToCart}>
        Add 2 to cart
      </button>

      <div className="remove-container">
        <button
          type="button"
          name="remove"
          value="1"
          aria-label="Remove Item from Cart"
          onClick={removeFromCart}
        >
          ×
        </button>
      </div>

      {!!miniCart.length && (
        <div className="quantity">
          <testFetcher.Form method="post" id="2">
            <button
              type="button"
              aria-label="Subtract 1 from quantity"
              onClick={minusQty}
            >
              -
            </button>
            <label>
              Qty.
              <input
                type="number"
                min="1"
                name="quantity"
                defaultValue={miniCart[0].quantity}
                onChange={(e) => {
                  changeQty();
                  testFetcher.submit(e.currentTarget.form);
                }}
              />
            </label>
            <input type="hidden" name="id" value="2" />
            <button
              type="button"
              aria-label="Add 1 to quantity"
              onClick={plusQty}
            >
              +
            </button>
          </testFetcher.Form>
        </div>
      )}
    </main>
  );
});
