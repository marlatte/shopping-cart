import { useFetcher, useOutletContext } from 'react-router-dom';

export function FakeProduct() {
  console.log('Fake Product');
  const { miniCart } = useOutletContext();
  const addFetcher = useFetcher('test-add');

  return (
    <main className="product">
      <h1>My Fake Product</h1>
      <div>miniCart: {JSON.stringify(miniCart)}</div>

      <addFetcher.Form method="post">
        <button type="submit" name="id" value="1">
          Add 1 to cart
        </button>
        <button type="submit" name="id" value="2">
          Add 2 to cart
        </button>
      </addFetcher.Form>
    </main>
  );
}

export function FakeCart() {
  console.log('Fake Cart');
  const { miniCart } = useOutletContext();

  const quantityFetcher = useFetcher('test-quantity');
  const destroyFetcher = useFetcher('test-destroy');

  return (
    <main className="cart">
      <h1>My Fake Cart</h1>
      <div>miniCart: {JSON.stringify(miniCart)}</div>

      <destroyFetcher.Form method="post" action="destroy">
        <button
          type="submit"
          name="remove"
          value={miniCart[0]?.id || ''}
          aria-label="Remove Item from Cart"
        >
          ×
        </button>
      </destroyFetcher.Form>

      {!!miniCart.length && (
        <div className="quantity">
          <quantityFetcher.Form method="post">
            <button
              type="submit"
              name="modifier"
              value="-1"
              aria-label="Subtract 1 from quantity"
            >
              -
            </button>
            <label>
              Qty.
              <input
                type="number"
                min="1"
                name="quantity"
                value={miniCart[0].quantity}
                onChange={(e) => {
                  quantityFetcher.submit(e.currentTarget.form);
                }}
              />
            </label>
            <input type="hidden" name="id" value={miniCart[0].id} />
            <button
              type="submit"
              name="modifier"
              value="1"
              aria-label="Add 1 to quantity"
            >
              +
            </button>
          </quantityFetcher.Form>
        </div>
      )}
    </main>
  );
}
