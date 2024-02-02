import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NavMenu({ onClick }) {
  return (
    <>
      <menu>
        <button
          type="button"
          aria-label="Close Menu"
          className="close-menu-btn"
          onClick={onClick}
        >
          ×
        </button>
        <nav>
          <NavLink to="/" onClick={onClick}>
            <h2>Home</h2>
          </NavLink>
          <NavLink to="/products/women" onClick={onClick}>
            <h2>Women</h2>
          </NavLink>
          <NavLink to="/products/men" onClick={onClick}>
            <h2>Men</h2>
          </NavLink>
          <NavLink to="/products/jewelry" onClick={onClick}>
            <h2>Jewelry</h2>
          </NavLink>
          <NavLink to="/products/electronics" onClick={onClick}>
            <h2>Electronics</h2>
          </NavLink>
          <NavLink to="/products/" onClick={onClick}>
            <h2>All</h2> Products
          </NavLink>
        </nav>
      </menu>
      <div className="menu-backdrop" />
    </>
  );
}

NavMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
};
