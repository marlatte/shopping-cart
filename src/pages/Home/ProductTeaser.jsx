import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from '../../components/product-displays/ProductCard';

export default function ProductTeaser({ products }) {
  return (
    <section className="product-teaser">
      <div className="text">
        <h3>Check out our new arrivals</h3>
        <p>
          We might be known for our sick threads, but we&apos;ve also got a
          sleek selection of jewelry.
        </p>
        <Link to="/products/jewelry">Shop all jewelry</Link>
      </div>
      <div className="cards">
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
