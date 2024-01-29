import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Navbar/Header';
import Footer from './Footer';

export default function Root() {
  const [miniCart, setMiniCart] = useState([]);

  function addToCart(e) {
    const id = +e.target.value;
    const duplicateIndex = miniCart.findIndex((item) => id === item.id);
    if (duplicateIndex === -1) {
      const newItem = { id, quantity: 1 };
      setMiniCart((current) => [...current, newItem]);
    } else {
      setMiniCart((current) => {
        const replacement = current[duplicateIndex];
        replacement.quantity += 1;
        return current.splice(duplicateIndex, 1, replacement);
      });
    }
  }
  return (
    <>
      <Header miniCart={miniCart} />
      <div>hi</div>
      <Outlet context={{ miniCart, addToCart }} />
      {/* <Footer /> */}
    </>
  );
}
