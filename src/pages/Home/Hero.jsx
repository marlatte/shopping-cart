import { Link } from 'react-router-dom';
import stylishGroupUrl from '../../assets/stylish-group.png';
import css from './styles/home.module.css';

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className={css.text}>
        <h1 className={css.heroHeading}>
          Clothes that are <strong>more</strong> than fabric
        </h1>
        <p>
          Beautiful fits that encourage you to{' '}
          <strong>get&nbsp;creative</strong>
        </p>
        <Link to="/products/" className={css.btn}>
          Shop <span className={css.btnCaps}>All Categories</span>
        </Link>
      </div>
      <Link to="/products/">
        <img src={stylishGroupUrl} alt="Shop these styles and more!" />
      </Link>
    </section>
  );
}
