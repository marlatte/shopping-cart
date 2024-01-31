import { addNew, get as getCart } from './cartController';

export default async function rootLoader() {
  addNew(1);
  const miniCart = getCart();
  console.log('loader:', miniCart);
  return { miniCart };
}
