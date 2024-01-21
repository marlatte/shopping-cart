import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CartButton({ items }) {
  return (
    <Link to="/cart">
      Cart
      {!!items && (
        <span className="badge">
          {items}
          <span aria-label={items > 1 ? 'items' : 'item'} />
        </span>
      )}
    </Link>
  );
}

CartButton.propTypes = {
  items: PropTypes.number.isRequired,
};
