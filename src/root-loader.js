import { get as getCart } from './cartController';

export default async function rootLoader() {
  const miniCart = getCart();
  return { miniCart };
}
