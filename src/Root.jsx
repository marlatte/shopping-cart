import { Outlet, useLoaderData } from 'react-router-dom';
import Header from './components/Navbar/Header';
import Footer from './components/Footer';

export default function Root() {
  const { miniCart } = useLoaderData();

  return (
    <>
      <Header miniCart={miniCart} />
      <div>hi</div>
      <Outlet context={{ miniCart }} />
      <Footer />
    </>
  );
}
