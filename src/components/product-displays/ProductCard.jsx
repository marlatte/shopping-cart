import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './styles/productCard.module.css';

export default function ProductCard({ data }) {
  const url = `/product/${data.id}`;
  return (
    <Link to={url} className={css.productCard} data-testid="product card">
      <div className="img-container">
        <div className={css.imgFrame}>
          <img src={data.image} alt={data.title} />
        </div>
      </div>
      <div className="card-body">
        <h4 className="card-title truncate" title={data.title}>
          {data.title}
        </h4>
        <p
          className="price"
          aria-label={`Price: $${data.price}`}
        >{`$${data.price}`}</p>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  data: PropTypes.shape({
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
  }).isRequired,
};
