import PropTypes from 'prop-types';
import { useState } from 'react';
import CartButton from './CartButton';
import NavMenu from './NavMenu';
import HomeLink from '../ui/HomeLink';

export default function Header({ items }) {
  const [menuOpen, setMenuOpen] = useState(false);

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
