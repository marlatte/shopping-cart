import { useEffect, useState } from 'react';
import Hero from './Hero';
import CallToAction from './CallToAction';
import Articles from './Articles';
import ProductTeaser from './ProductTeaser';
import { getRandom3, fetchItems } from '../../utils/fetch-data';

export default function Home() {
  const [products, setProducts] = useState([]);

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
    <main className="home">
      <Hero />
      <ProductTeaser products={products} />
      <Articles />
      <CallToAction />
    </main>
  );
}
