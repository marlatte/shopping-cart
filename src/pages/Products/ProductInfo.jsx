import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import css from './styles/singleProduct.module.css';
import './styles/star-ratings.css';

export default function ProductInfo({ product }) {
  const fetcher = useFetcher({ key: 'add' });
  const [showToast, setShowToast] = useState(false);
  const { id, title, price, description } = product;
  const { rate: rating, count } = product.rating;
  const roundedRating = ((Math.round((10 * rating) / 5) * 5) / 10)
    .toString()
    .split('.')
    .join('-');

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [showToast]);

  return (
    <section className={css.productInfo}>
      <h1 className={css.title}>{title}</h1>
      <div className={css.feedback}>
        <div
          className={`${css.rating} star-${roundedRating}`}
          aria-label={`Rating: ${rating} out of 5`}
        >
          {rating}
        </div>
        <div className={css.divider} />
        <div className="reviews">{count} reviews</div>
      </div>
      <p className={css.price} aria-label={`Price: $${price}`}>
        ${price}
      </p>
      <p className={css.description}>{description}</p>
      <fetcher.Form
        method="post"
        onSubmit={() => {
          setShowToast(true);
        }}
      >
        <button className={css.btn} type="submit" name="id" value={id}>
          Add to cart
        </button>
        <input type="hidden" name="price" value={price} />
      </fetcher.Form>
      {showToast && (
        <Toast
          onClick={() => {
            setShowToast(false);
          }}
        />
      )}
    </section>
  );
}

function Toast({ onClick }) {
  return (
    <div className="toast" role="alert" aria-label="Add to Cart Successful">
      <p>Product added to cart</p>
      <button
        type="button"
        aria-label="Close Toast"
        className="close-toast-btn"
        onClick={onClick}
      >
        ×
      </button>
    </div>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.shape({
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

Toast.propTypes = {
  onClick: PropTypes.func.isRequired,
};
