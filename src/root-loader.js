import { get as getCart } from './cartController';

export default function rootLoader() {
  const miniCart = getCart();
  console.log('loader:', miniCart);
  return { miniCart };
}
