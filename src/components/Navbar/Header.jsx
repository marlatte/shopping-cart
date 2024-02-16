import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import CartButton from './CartButton';
import NavMenu from './NavMenu';
import HomeLink from '../ui/HomeLink';
import css from './styles/header.module.css';

export default function Header({ miniCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenuRef = useRef(null);

  return (
    <header className={css.stickyHeader}>
      {menuOpen && (
        <NavMenu
          onClick={() => {
            setMenuOpen(false);
            openMenuRef.current.focus();
          }}
        />
      )}
      <div className={css.content}>
        <div className={css.btnContainer}>
          <button
            type="button"
            aria-label="Menu"
            className={`open-menu-btn ${css.btn}`}
            ref={openMenuRef}
            onClick={() => {
              setMenuOpen(true);
            }}
          >
            <div className={css.symbol}>☰</div>
          </button>
        </div>
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
