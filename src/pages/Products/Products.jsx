import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { fetchItems } from '../../utils/fetch-data';
import { convertToTitleCase } from '../../utils/conversions';
import ProductCard from '../../components/product-displays/ProductCard';

export default function Products() {
  const { category } = useLoaderData();
  const [products, setProducts] = useState([]);

  const productsAreReady = !!products.length;

  useEffect(() => {
    let ignore = false;
    async function getProducts() {
      const data = await fetchItems({ category });
      if (!ignore) setProducts(data);
    }

    getProducts();

    return () => {
      ignore = true;
    };
  });

  return (
    <main className="products">
      <h1 className="title">
        {convertToTitleCase(category || 'all products')}
      </h1>
      <div className="cards-grid">
        {productsAreReady &&
          products.map((item) => <ProductCard key={item.id} data={item} />)}
      </div>
    </main>
  );
}
