import { capitalize, trim } from 'lodash';

export function convertToHref(str, { location = 'products' } = {}) {
  return `/${location}/${str
    .split(' ')
    .map((word) => word.replace(/'/g, ''))
    .join('-')}`;
}

export function convertToTitleCase(str) {
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

export function sanitizeProduct(product) {
  const categoryLookup = {
    jewelery: 'jewelry',
    "men's clothing": 'men',
    "women's clothing": 'women',
  };

  const displayCategory = categoryLookup[product.category];

  const result = Object.fromEntries(
    Object.entries(product).map(([key, value]) => {
      // eslint-disable-next-line no-param-reassign
      if (key === 'category') value = displayCategory || value;
      if (typeof value !== 'string') return [key, value];
      return [key, trim(value)];
    })
  );

  return result;
}

export function sanitizeAll(products) {
  return products.map((item) => sanitizeProduct(item));
}
