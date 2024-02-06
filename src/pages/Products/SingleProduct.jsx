import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { fetchItem } from '../../utils/fetch-data';
import { convertToHref, convertToTitleCase } from '../../utils/conversions';
import ProductInfo from './ProductInfo';

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
    <main className="single-product">
      {productIsReady && (
        <>
          <div className="breadcrumbs">
            <Link to="/products">All Products</Link>
            <div>&gt;</div>
            <Link to={convertToHref(product.category)}>
              {convertToTitleCase(product.category)}
            </Link>
          </div>
          <section className="image-container">
            <div className="frame">
              <img src={product.image} alt={product.title} />
            </div>
          </section>
          <ProductInfo product={product} />
        </>
      )}
    </main>
  );
}
