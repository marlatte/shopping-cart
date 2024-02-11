import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { fetchItems } from '../../utils/fetch-data';
import { convertToTitleCase } from '../../utils/conversions';
import ProductCard from '../../components/product-displays/ProductCard';
import Loading from '../../components/Loading';
import css from './styles/products.module.css';

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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    document.title = `Yuedpao ${convertToTitleCase(
      category === 'all' || !category ? 'all products' : category
    )}`;
  }, [category]);

  return (
    <main className="products">
      <div className={css.mainContent}>
        <h1 className={css.category}>
          {convertToTitleCase(
            category === 'all' || !category ? 'all products' : category
          )}
        </h1>
        <div className={css.cardGrid}>
          {productsAreReady ? (
            products.map((item) => <ProductCard key={item.id} data={item} />)
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </main>
  );
}
