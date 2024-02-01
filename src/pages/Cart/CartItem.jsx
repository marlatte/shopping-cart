import PropTypes from 'prop-types';
import { Link, useFetcher } from 'react-router-dom';

function getPriceAlt(product) {
  return `Price: ${product.price} dollar${product.price === 1 ? '' : 's'}`;
}

export default function CartItem({ item }) {
  console.log('Cart Item');
  const { product, quantity } = item;
  const quantityFetcher = useFetcher('update-quantity');
  const destroyFetcher = useFetcher('destroy');

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
                value={quantity}
                onChange={(e) => {
                  quantityFetcher.submit(e.currentTarget.form);
                }}
              />
            </label>
            <input type="hidden" name="id" value={product.id} />
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
      </div>
      <div className="remove-container">
        <destroyFetcher.Form method="post" action="destroy">
          <button
            type="submit"
            name="remove"
            value={product.id}
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
};
