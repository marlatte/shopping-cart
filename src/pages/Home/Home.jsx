import Hero from './Hero';
import CallToAction from './CallToAction';
import Articles from './Articles';
import ProductTeaser from './ProductTeaser';
import css from './styles/home.module.css';

export default function Home() {
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
