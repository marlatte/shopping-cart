import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NavMenu({ onClick }) {
  return (
    <>
      <menu>
        <button type="button" aria-label="Close Menu" onClick={onClick}>
          ×
        </button>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products/women">Women</NavLink>
          <NavLink to="/products/men">Men</NavLink>
          <NavLink to="/products/jewelry">Jewelry</NavLink>
          <NavLink to="/products/electronics">Electronics</NavLink>
          <NavLink to="/products/">All Products</NavLink>
        </nav>
      </menu>
      <div className="menu-backdrop" />
    </>
  );
}

NavMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
};
