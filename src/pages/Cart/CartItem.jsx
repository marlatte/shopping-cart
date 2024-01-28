import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function getPriceAlt(product) {
  return `Price: ${product.price} dollar${product.price === 1 ? '' : 's'}`;
}

export default function CartItem({ item, handlers }) {
  const { product, quantity } = item;
  return (
    <article className="cart-item" data-testid="cart-item">
      <div className="image-container">
        <div className="frame">
          <img src={product.image} alt={product.title} />
        </div>
      </div>
      <div className="text">
        <h3 className="price" aria-label={getPriceAlt(product)}>
          ${product.price}
        </h3>
        <h4>
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h4>
        <div className="quantity">
          <button type="button" aria-label="Subtract 1 from quantity">
            -
          </button>
          <label>
            Qty.
            <input
              type="tel"
              name={`product-${product.id}-quantity`}
              value={quantity}
              onChange={handlers[0]}
            />
          </label>
          <button type="button" aria-label="Add 1 to quantity">
            +
          </button>
        </div>
      </div>
      <div className="remove-container">
        <button
          type="button"
          name="remove"
          value={product.id}
          aria-label="Remove Item from Cart"
        >
          ×
        </button>
      </div>
    </article>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      rating: PropTypes.shape({
        rate: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  handlers: PropTypes.arrayOf(PropTypes.func).isRequired,
};
