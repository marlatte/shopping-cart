import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Navbar/Header';
import Footer from './Footer';

export default function Root() {
  const [miniCart, setMiniCart] = useState([]);
  return (
    <>
      <Header miniCart={miniCart} />
      <Outlet context={{ miniCart }} />
      <Footer />
    </>
  );
}
