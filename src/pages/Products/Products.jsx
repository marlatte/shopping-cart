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
    const apiCategories = {
      women: "women's clothing",
      men: "men's clothing",
      jewelry: 'jewelery',
      electronics: 'electronics',
      all: '',
    };

    let ignore = false;

    async function getProducts() {
      const data = await fetchItems({ category: apiCategories[category] });
      if (!ignore) setProducts(data);
    }

    getProducts();

    return () => {
      ignore = true;
    };
  }, [category]);

  return (
    <main className="products">
      <h1 className="title">
        {convertToTitleCase(
          category === 'all' || !category ? 'all products' : category
        )}
      </h1>
      <div className="cards-grid">
        {productsAreReady &&
          products.map((item) => <ProductCard key={item.id} data={item} />)}
      </div>
    </main>
  );
}
