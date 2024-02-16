import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import css from './styles/navMenu.module.css';

export default function NavMenu({ onClick }) {
  const closeMenuRef = useRef(null);

  useEffect(() => {
    closeMenuRef.current.focus();
  }, []);

  const linkData = [
    ['Home', '/'],
    ['Women', '/products/women'],
    ['Men', '/products/men'],
    ['Jewelry', '/products/jewelry'],
    ['Electronics', '/products/electronics'],
    ['All Products', '/products/all'],
  ];
  return (
    <>
      <menu>
        <button
          type="button"
          aria-label="Close Menu"
          className={`close-menu-btn ${css.menuBtn}`}
          ref={closeMenuRef}
          onClick={onClick}
        >
          <div className={css.symbol}>
            <i className="fa fa-times" aria-hidden="true" />
          </div>
        </button>
        <nav>
          {linkData.map(([text, path]) => (
            <NavLink
              key={text}
              to={path}
              onClick={onClick}
              className={css.navLink}
            >
              <h2>{text}</h2>
            </NavLink>
          ))}
        </nav>
      </menu>
      <div className={css.menuBackdrop} onClick={onClick} aria-hidden="true" />
    </>
  );
}

NavMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
};
