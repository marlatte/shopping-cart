import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { fetchItem } from '../../utils/fetch-data';
import CartItem from './CartItem';

export default function Cart({ miniCart }) {
  const [cart, setCart] = useState([]);

  const cartIsReady = !!cart.length;

  useEffect(() => {
    let ignore = false;
    async function getItemData(item) {
      const itemData = await fetchItem(item.id);
      if (!ignore)
        setCart((currentCart) =>
          currentCart.concat({ product: itemData, quantity: item.quantity })
        );
    }

    miniCart.forEach((item) => {
      getItemData(item);
    });

    return () => {
      ignore = true;
    };
  }, [miniCart]);

  function getSubtotal(cartData) {
    return cartData.reduce(
      (acc, curr) => acc + curr.product.price * curr.quantity,
      0
    );
  }

  return (
    <main className="cart">
      <section className="cart-list" data-testid="cart-list">
        <div className="header">
          <h1>My Cart</h1>
          <p>Items are reserved for 60 minutes</p>
        </div>
        {cartIsReady ? (
          <div className="cart-items">
            {cart.map((item) => (
              <div className="item-container" key={item.product.id}>
                <hr />
                <CartItem item={item} handlers={[() => {}]} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-cart">Cart is empty</div>
        )}
        <h2 className="subtotal">
          <span className="label">Subtotal </span>
          <span className="value">${getSubtotal(cart)}</span>
        </h2>
      </section>
      <section className="total-column">
        <h1>Total</h1>
        <hr />
      </section>
    </main>
  );
}

Cart.propTypes = {
  miniCart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  // onChange: PropTypes.func.isRequired,
};
