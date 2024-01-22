import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CartButton from './CartButton';
import NavMenu from './NavMenu';
import HomeLink from '../ui/HomeLink';

export default function Header({ items }) {
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
      <CartButton items={items} />
    </header>
  );
}

Header.propTypes = {
  items: PropTypes.number.isRequired,
};
