const cart = new Map();

export function get() {
  return [...cart].map(([id, quantity]) => ({ id, quantity }));
}

export function plus(id) {
  cart.set(id, cart.get(id) + 1);
}

export function minus(id) {
  cart.set(id, cart.get(id) - 1);
}

export function addNew(id) {
  if (!cart.has(id)) cart.set(id, 1);
  else plus(id);
}

export function clear() {
  cart.clear();
}

export function remove(id) {
  cart.delete(id);
}

export function update(id, quantity) {
  const valid = cart.has(id) && typeof quantity === 'number' && quantity > 0;
  if (valid) cart.set(id, quantity);
}
