import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CartButton from './CartButton';
import NavMenu from './NavMenu';
import HomeLink from '../ui/HomeLink';
import css from './styles/header.module.css';

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
      <div className={css.content}>
        <button
          type="button"
          aria-label="Menu"
          className={`open-menu-btn ${css.btn}`}
          onClick={() => {
            setMenuOpen(true);
          }}
        >
          <div className={css.symbol}>☰</div>
        </button>
        <HomeLink />
        <CartButton miniCart={miniCart} />
      </div>
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
