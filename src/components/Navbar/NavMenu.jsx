import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NavMenu({ onClick, menuOpen }) {
  return (
    <>
      <menu className={menuOpen ? 'open' : ''}>
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
      <div className={menuOpen ? 'menu-backdrop open' : 'menu-backdrop'} />
    </>
  );
}

NavMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
};
