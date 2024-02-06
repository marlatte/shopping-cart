import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CartButton from './CartButton';
import NavMenu from './NavMenu';
import HomeLink from '../ui/HomeLink';
import css from './styles/header.module.css';

export default function Header({ miniCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusedClassName, setFocusedClassName] = useState('none');

  useEffect(() => {
    document.querySelector(focusedClassName)?.focus();
  }, [focusedClassName]);

  return (
    <header className={css.stickyHeader}>
      {menuOpen && (
        <NavMenu
          onClick={() => {
            setMenuOpen(false);
            setFocusedClassName('.open-menu-btn');
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
            setFocusedClassName('.close-menu-btn');
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
