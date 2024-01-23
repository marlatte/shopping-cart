import Hero from './Hero';
import CallToAction from './CallToAction';
import Articles from './Articles';
import ProductTeaser from './ProductTeaser';

export default function Home() {
  // Get jewelry products, random sort, pick first 3
  return (
    <main className="home">
      <Hero />
      <ProductTeaser />
      <Articles />
      <CallToAction />
    </main>
  );
}
