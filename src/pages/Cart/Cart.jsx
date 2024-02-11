import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import paymentsImg from '../../assets/payment-methods.png';
import CartItem from './CartItem';
import css from './styles/cart.module.css';

export default function Cart() {
  const { miniCart } = useOutletContext();

  const cartIsReady = !!miniCart.length;

  function getSubtotal() {
    return miniCart
      .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
      .toFixed(2);
  }

  useEffect(() => {
    document.title = 'Yuedpao Cart';
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className={css.cart}>
      <div className={css.mainContent}>
        <section className={css.cartList} data-testid="cart-list">
          <div className={css.cartHeader}>
            <h1>My Cart</h1>
            <p>Items are reserved for 60 minutes</p>
          </div>
          {cartIsReady ? (
            <>
              <div className={css.cartItems}>
                {miniCart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              <h2 className={css.subtotal}>
                <span className="label">Subtotal </span>
                <span className="value">${getSubtotal()}</span>
              </h2>
            </>
          ) : (
            <div className={css.emptyCart}>Cart is empty</div>
          )}
        </section>
        <div className={css.totalContainer}>
          <section className={css.totalColumn} data-testid="total-column">
            {cartIsReady && (
              <>
                <div className={css.cartHeader}>
                  <h1>Total</h1>
                </div>
                <div className={css.priceBreakdown}>
                  <h3 className={css.subtotal}>
                    <span className="label">Subtotal </span>
                    <span className="value">${getSubtotal()}</span>
                  </h3>
                  <DeliveryRow />
                  <div className={css.selectWrapper}>
                    <select
                      name="delivery-options"
                      id="delivery-options"
                      className={css.deliveryOptions}
                    >
                      <option value="standard">Standard Delivery (Free)</option>
                      <option value="express">Express ($7)</option>
                      <option value="overnight">Overnight ($12)</option>
                    </select>
                  </div>
                </div>
                <button className={css.checkoutBtn} type="button">
                  Checkout
                </button>
              </>
            )}
            <div className={css.payments} data-testid="payments">
              <h3>We accept:</h3>
              <img
                src={paymentsImg}
                alt="Apple Pay, American Express, VISA, VISA Electron, VISA Debit, VISA Carte Bleue, VISA Electron Carte Bleue, VISA Debit Carte Bleue, VISA Purchasing, Maestro, Mastercard, Debit Mastercard, Discover, Diners Club, PayPal, PayPal Pay in 4, 4 easy payments, Afterpay, Cash App Pay, Gift voucher, Google Pay"
              />
              <p>Got a discount code? Add it at the next step</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function DeliveryRow() {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className={css.deliveryRow} data-testid="delivery-row">
      <h3>Delivery</h3>
      <button
        className={css.showInfoBtn}
        type="button"
        aria-label="More Info"
        onClick={() => {
          setShowInfo((current) => !current);
        }}
      >
        i
      </button>
      {showInfo && (
        <div
          className={css.popover}
          role="alert"
          aria-label="Delivery Information"
        >
          <div className={css.popoverText}>
            Shipping options and speeds vary based on your location
          </div>
          <div className={css.popoverTail} />
        </div>
      )}
    </div>
  );
}
