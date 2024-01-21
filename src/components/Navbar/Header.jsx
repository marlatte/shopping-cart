import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import CartButton from './CartButton';
import NavMenu from './NavMenu';

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
      <Link to="/">
        <span
          className="logo"
          title="Yuedpao Homepage"
          aria-label="Yuedpao Homepage"
        >
          Yuedpao
        </span>
      </Link>
      <CartButton items={items} />
    </header>
  );
}

Header.propTypes = {
  items: PropTypes.number.isRequired,
};
