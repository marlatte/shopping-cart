import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useFetcher } from 'react-router-dom';
import { fetchItem } from '../../utils/fetch-data';
import css from './styles/cartItem.module.css';

export default function CartItem({ item }) {
  const [product, setProduct] = useState({});
  const { id, quantity, price } = item;
  const quantityFetcher = useFetcher('update-quantity');
  const destroyFetcher = useFetcher('destroy');

  useEffect(() => {
    let ignore = false;
    async function getItemData() {
      const itemData = await fetchItem(id);
      if (!ignore) {
        setProduct(itemData);
      }
    }

    getItemData();

    return () => {
      ignore = true;
    };
  }, [id]);

  function getPriceAlt() {
    return `Price: ${price} dollar${price === 1 ? '' : 's'}`;
  }

  return (
    <article className={css.cartItem} data-testid="cart-item">
      <div className={css.imgContainer}>
        <div className={css.frame}>
          <Link className={css.imgLink} to={`/product/${id}`}>
            <img src={product.image} alt={product.title} />
          </Link>
        </div>
      </div>
      <div className={css.text}>
        <h3 className={css.price} aria-label={getPriceAlt()}>
          ${price}
        </h3>
        <h4 className={css.title}>
          <Link to={`/product/${id}`}>{product.title}</Link>
        </h4>
        <quantityFetcher.Form method="post">
          <label className={css.quantity}>
            Qty.
            <div className={css.quantityChanger}>
              <button
                type="submit"
                name="modifier"
                value="-1"
                aria-label="Subtract 1 from quantity"
              >
                –
              </button>
              <input
                type="number"
                min="1"
                name="quantity"
                value={quantity}
                onChange={(e) => {
                  quantityFetcher.submit(e.currentTarget.form);
                }}
              />
              <button
                type="submit"
                name="modifier"
                value="1"
                aria-label="Add 1 to quantity"
              >
                +
              </button>
            </div>
          </label>
          <input type="hidden" name="id" value={id} />
        </quantityFetcher.Form>
      </div>
      <div className="remove-container">
        <destroyFetcher.Form method="post" action="destroy">
          <button
            type="submit"
            name="remove"
            value={id}
            aria-label="Remove Item from Cart"
          >
            ×
          </button>
        </destroyFetcher.Form>
      </div>
    </article>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
