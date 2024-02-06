import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './styles/productCard.module.css';

export default function ProductCard({ data, homepage }) {
  const url = `/product/${data.id}`;
  return (
    <div className={css.productCard}>
      <Link to={url} data-testid="product card">
        <div className={homepage ? css.imgFrameHome : css.imgFrame}>
          <img src={data.image} alt={data.title} />
        </div>
        <div className={css.cardBody}>
          <p
            className="price"
            aria-label={`Price: $${data.price}`}
          >{`$${data.price}`}</p>
          <h4 className="card-title truncate" title={data.title}>
            {data.title}
          </h4>
        </div>
      </Link>
    </div>
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
  homepage: PropTypes.bool,
};

ProductCard.defaultProps = {
  homepage: false,
};
