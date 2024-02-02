const cart = new Map();

export function get() {
  return [...cart].map(([id, { quantity, price }]) => ({
    id,
    quantity,
    price,
  }));
}

export function plus(id) {
  const { quantity, price } = cart.get(id);
  cart.set(id, { quantity: quantity + 1, price });
}

export function minus(id) {
  const { quantity, price } = cart.get(id);
  cart.set(id, { quantity: quantity - 1, price });
}

export function addNew(id, price) {
  if (!cart.has(id)) cart.set(id, { quantity: 1, price });
  else plus(id);
}

export function clear() {
  cart.clear();
}

export function remove(id) {
  cart.delete(id);
}

export function update(id, newQuantity) {
  const valid =
    cart.has(id) && typeof newQuantity === 'number' && newQuantity > 0;
  const { price } = cart.get(id);
  if (valid) cart.set(id, { quantity: newQuantity, price });
}
