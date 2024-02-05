import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from '../../components/product-displays/ProductCard';
import css from './styles/productTeaser.module.css';

export default function ProductTeaser({ products }) {
  return (
    <section className={css.productTeaser}>
      <div className={css.text}>
        <h3 className={css.teaserHeading}>Check out our new arrivals</h3>
        <p>
          We might be known for our sick threads, but we&apos;ve also got a
          sleek selection of jewelry.
        </p>
        <Link to="/products/jewelry" className={css.jewelryLink}>
          Shop all jewelry
        </Link>
      </div>
      <div className={css.cards}>
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </section>
  );
}

ProductTeaser.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      rating: PropTypes.shape({
        rate: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
