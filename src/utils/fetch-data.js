export async function fetchItems({ category, limit } = {}) {
  const useCategory = category ? `category/${category}` : '';
  const useLimit = limit ? `?limit=${limit}` : '';
  const res = await fetch(
    `https://fakestoreapi.com/products/${useCategory}${useLimit}`
  );
  const data = await res.json();
  return data;
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
  return data;
}
