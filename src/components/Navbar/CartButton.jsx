import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CartButton({ miniCart }) {
  const totalItems = miniCart.reduce((acc, curr) => acc + curr.quantity, 0);
  return <Link to="/cart">Cart ({totalItems})</Link>;
}

CartButton.propTypes = {
  miniCart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};
