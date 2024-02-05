import { Outlet, useLoaderData } from 'react-router-dom';
import Header from './components/Navbar/Header';
import Footer from './components/Footer';
import './root.module.css';

export default function Root() {
  const { miniCart } = useLoaderData();

  return (
    <>
      <Header miniCart={miniCart} />
      <Outlet context={{ miniCart }} />
      <Footer />
    </>
  );
}
