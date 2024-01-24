import PropTypes from 'prop-types';
import { useFetcher } from 'react-router-dom';

export default function ProductInfo({ product }) {
  const { id, title, price, description } = product;
  const { rate: rating, count } = product.rating;
  const roundedRating = (Math.round((10 * rating) / 5) * 5) / 10;

  return (
    <section className="product-info">
      <h1>{title}</h1>
      <div className="feedback">
        <div
          className={`rating star-${roundedRating}`}
          aria-label={`Rating: ${rating} out of 5`}
        >
          {rating}
        </div>
        <div className="reviews">{count} reviews</div>
      </div>
      <p className="price" aria-label={`Price: $${price}`}>{`$${price}`}</p>
      <p className="description">{description}</p>
      <AddToCartButton id={id} />
    </section>
  );
}

function AddToCartButton({ id }) {
  const fetcher = useFetcher({ key: 'add-to-cart' });
  return (
    <fetcher.Form method="post">
      <button type="submit" data-product-id={id}>
        Add to cart
      </button>
    </fetcher.Form>
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

AddToCartButton.propTypes = {
  id: PropTypes.number.isRequired,
};
