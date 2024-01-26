/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchItem } from '../../../utils/fetch-data';
import { convertToHref, convertToTitleCase } from '../../../utils/conversions';

export default function SingleProduct({ productId }) {
  const [product, setProduct] = useState({ category: '' });

  useEffect(() => {
    let ignore = false;
    async function getItemData() {
      const productData = await fetchItem(productId);
      if (!ignore) setProduct(productData);
    }

    getItemData();

    return () => {
      ignore = true;
    };
  }, [productId]);

  return (
    <main className="single-product">
      <div className="breadcrumbs">
        <Link to="/products">All Products</Link>
        <div>&gt;</div>
        <Link to={convertToHref(product.category)}>
          {convertToTitleCase(product.category)}
        </Link>
      </div>
    </main>
  );
}
