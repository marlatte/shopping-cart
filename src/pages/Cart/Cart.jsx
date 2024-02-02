import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import paymentsImg from '../../assets/payment-methods.png';
import CartItem from './CartItem';

export default function Cart() {
  const { miniCart } = useOutletContext();

  const cartIsReady = !!miniCart.length;

  function getSubtotal() {
    return miniCart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
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
            {miniCart.map((item) => (
              <div className="item-container" key={item.id}>
                <hr />
                <CartItem item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-cart">Cart is empty</div>
        )}
        <h2 className="subtotal">
          <span className="label">Subtotal </span>
          <span className="value">${getSubtotal()}</span>
        </h2>
      </section>
      <section className="total-column" data-testid="total-column">
        <h1>Total</h1>
        <hr />
        <h3 className="subtotal">
          <span className="label">Subtotal </span>
          <span className="value">${getSubtotal()}</span>
        </h3>
        <DeliveryRow />
        <select name="delivery-options" id="delivery-options">
          <option value="standard">Standard Delivery (Free)</option>
          <option value="express">Express ($7)</option>
          <option value="overnight">Overnight ($12)</option>
        </select>
        <hr />
        <button type="button">Checkout</button>
        <div className="payments" data-testid="payments">
          <h3>We accept:</h3>
          <img
            src={paymentsImg}
            alt="Apple Pay, American Express, VISA, VISA Electron, VISA Debit, VISA Carte Bleue, VISA Electron Carte Bleue, VISA Debit Carte Bleue, VISA Purchasing, Maestro, Mastercard, Debit Mastercard, Discover, Diners Club, PayPal, PayPal Pay in 4, 4 easy payments, Afterpay, Cash App Pay, Gift voucher, Google Pay"
          />
          <p>Got a discount code? Add it at the next step</p>
        </div>
      </section>
    </main>
  );
}

function DeliveryRow() {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="delivery-row" data-testid="delivery-row">
      <h3>Delivery</h3>
      <button
        type="button"
        aria-label="More Info"
        onClick={() => {
          setShowInfo((current) => !current);
        }}
      >
        i
      </button>
      {showInfo && (
        <div className="popover" role="alert" aria-label="Delivery Information">
          Shipping options and speeds vary based on your location
        </div>
      )}
    </div>
  );
}
