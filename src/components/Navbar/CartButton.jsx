import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CartButton({ items }) {
  return <Link to="/cart">Cart ({items})</Link>;
}

CartButton.propTypes = {
  items: PropTypes.number.isRequired,
};
