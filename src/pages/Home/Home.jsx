import Hero from './Hero';
import CallToAction from './CallToAction';
import Articles from './Articles';
import ProductTeaser from './ProductTeaser';
import css from './styles/home.module.css';

export default function Home() {
  return (
    <main className={css.home}>
      <Hero />
      <ProductTeaser />
      <Articles />
      <CallToAction />
    </main>
  );
}
