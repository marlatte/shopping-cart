import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/product-displays/ProductCard';
import css from './styles/productTeaser.module.css';
import { fetchItems, getRandom3 } from '../../utils/fetch-data';

export default function ProductTeaser() {
  const [products, setProducts] = useState([]);

  const teaserIsReady = !!products.length;

  useEffect(() => {
    let ignore = false;
    async function getJewelry() {
      const jewelry = await fetchItems({ category: 'jewelery' });
      if (!ignore) setProducts(getRandom3(jewelry));
    }

    getJewelry();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className={css.productTeaser}>
      <div className={css.text}>
        <h3 className={css.teaserHeading}>
          Check out our <strong>new&nbsp;arrivals</strong>
        </h3>
        <p>
          We might be known for our sick threads, but we&apos;ve also got a
          sleek selection of jewelry.
        </p>
        <Link to="/products/jewelry" className={css.jewelryLink}>
          Shop <span className={css.jewelryCaps}>jewelry</span>
        </Link>
      </div>
      {teaserIsReady &&
        products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
    </section>
  );
}
