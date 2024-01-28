import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { fetchItem } from '../../utils/fetch-data';
import CartItem from './CartItem';

export default function Cart({ miniCart }) {
  const [cart, setCart] = useState([]);

  const cartIsReady = !!cart.length;

  useEffect(() => {
    let ignore = false;
    async function getItemData(id) {
      const itemData = await fetchItem(id);

      if (!ignore) setCart((currentCart) => currentCart.concat(itemData));
    }

    miniCart.forEach((item) => {
      getItemData(item.id);
    });

    return () => {
      ignore = true;
    };
  }, [miniCart]);

  console.log('cart:', cart.length);

  return (
    <main className="cart">
      <section className="cart-list">
        <div className="header">
          <h1>My Cart</h1>
          <p>Items are reserved for 60 minutes</p>
        </div>
        {cartIsReady ? (
          <div className="cart-items">
            {cart.map((item) => (
              <>
                <hr />
                <CartItem item={item} fns={[() => {}]} />
              </>
            ))}
          </div>
        ) : (
          <div className="empty-cart">Cart is empty</div>
        )}
      </section>
      <section className="total">
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
