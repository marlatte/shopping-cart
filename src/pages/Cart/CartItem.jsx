import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchItem } from '../../utils/fetch-data';

function getPriceAlt(product) {
  return `Price: ${product.price} dollar${product.price === 1 ? '' : 's'}`;
}

export default function CartItem({ item, onChange }) {
  const [product, setProduct] = useState({});

  const itemIsReady = !!Object.values(product).length;

  useEffect(() => {
    let ignore = false;
    async function getItemData() {
      const itemData = await fetchItem(item.id);
      if (!ignore) setProduct(itemData);
    }

    getItemData();

    return () => {
      ignore = true;
    };
  });

  return (
    <article className="cart-item">
      {itemIsReady && (
        <div className="image-container">
          <div className="frame">
            <img src={product.image} alt={product.title} />
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
                  name={`product-${item.id}-quantity`}
                  value={item.quantity}
                  onChange={onChange}
                />
              </label>
              <button type="button" aria-label="Add 1 to quantity">
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
