import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CartButton from './CartButton';
import NavMenu from './NavMenu';
import HomeLink from '../ui/HomeLink';

export default function Header({ miniCart }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const focusedClassName = menuOpen ? '.close-menu-btn' : '.open-menu-btn';
    document.querySelector(focusedClassName).focus();
  }, [menuOpen]);

  return (
    <header>
      {menuOpen && (
        <NavMenu
          onClick={() => {
            setMenuOpen(false);
          }}
        />
      )}
      <button
        type="button"
        aria-label="Menu"
        className="open-menu-btn"
        onClick={() => {
          setMenuOpen(true);
        }}
      >
        ☰
      </button>
      <HomeLink />
      <CartButton miniCart={miniCart} />
    </header>
  );
}

Header.propTypes = {
  miniCart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};
