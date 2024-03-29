import { sanitizeAll, sanitizeProduct } from './conversions';

export async function fetchItems({ category, desc, limit } = {}) {
  const useCategory = category ? `/category/${category}` : '';
  const sort = desc ? '?sort=desc' : '?sort=asc';
  const useLimit = limit ? `&limit=${limit}` : '';
  const res = await fetch(
    `https://fakestoreapi.com/products${useCategory}${sort}${useLimit}`
  );
  const data = await res.json();
  return sanitizeAll(data);
}

export async function fetchCategoryNames() {
  const res = await fetch('https://fakestoreapi.com/products/categories');
  const data = await res.json();
  return data;
}
export async function fetchItem(id) {
  if (!id) throw Error('Product not found');
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
  return sanitizeProduct(data);
}

export function getRandom3(data) {
  return data.toSorted(() => Math.random() - 0.5).slice(0, 3);
}
