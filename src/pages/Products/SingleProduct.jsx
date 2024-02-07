import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { fetchItem } from '../../utils/fetch-data';
import { convertToHref, convertToTitleCase } from '../../utils/conversions';
import ProductInfo from './ProductInfo';
import css from './styles/singleProduct.module.css';

export default function SingleProduct() {
  const { id } = useLoaderData();
  const [product, setProduct] = useState({});

  const productIsReady = !!Object.values(product).length;

  useEffect(() => {
    let ignore = false;
    async function getItemData() {
      const productData = await fetchItem(id);
      if (!ignore) setProduct(productData);
    }

    getItemData();

    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <main className={css.singleProduct}>
      {productIsReady && (
        <>
          <div className={css.breadcrumbs}>
            <Link to="/products">All Products</Link>
            <div>&gt;</div>
            <Link to={convertToHref(product.category)}>
              {convertToTitleCase(product.category)}
            </Link>
          </div>
          <section className={css.content}>
            <div className={css.imgContainer}>
              <div className={css.imgFrame}>
                <img src={product.image} alt={product.title} />
              </div>
            </div>
            <ProductInfo product={product} />
          </section>
        </>
      )}
    </main>
  );
}
