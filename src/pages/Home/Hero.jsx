import { Link } from 'react-router-dom';
import stylishGroupUrl from '../../assets/stylish-group.png';
import css from './styles/home.module.css';

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className="text-container">
        <h1>Clothes that are more than just fabric</h1>
        <p>Beautiful &apos;fits that encourage you to get creative</p>
        <Link to="/products/">Shop All Categories</Link>
      </div>
      <Link to="/products/">
        <img src={stylishGroupUrl} alt="Shop these styles and more!" />
      </Link>
    </section>
  );
}
