import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NavMenu({ onClick }) {
  return (
    <>
      <menu>
        <button type="button" aria-label="close menu" onClick={onClick}>
          ×
        </button>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Women</NavLink>
          <NavLink to="/">Men</NavLink>
          <NavLink to="/">Jewelry</NavLink>
          <NavLink to="/">Electronics</NavLink>
          <NavLink to="/">All Products</NavLink>
        </nav>
      </menu>
      <div className="menu-backdrop" />
    </>
  );
}

NavMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
};
