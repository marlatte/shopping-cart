import { useEffect } from 'react';
import Hero from './Hero';
import CallToAction from './CallToAction';
import Articles from './Articles';
import ProductTeaser from './ProductTeaser';
import css from './styles/home.module.css';

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <main className={css.home}>
      <div className={css.mainContent}>
        <Hero />
        <ProductTeaser />
        <Articles />
        <CallToAction />
      </div>
    </main>
  );
}
