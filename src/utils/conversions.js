import { capitalize, trim } from 'lodash';

export function convertToHref(str) {
  return str
    .split(' ')
    .map((word) => word.replace(/'/g, ''))
    .join('-');
}

export function convertToTitleCase(str) {
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

export function sanitizeProduct(product) {
  return Object.fromEntries(
    Object.entries(product).map(([key, value]) => {
      if (typeof value !== 'string') return [key, value];
      return [key, trim(value)];
    })
  );
}

export function sanitizeAll(products) {
  return products.map((item) => sanitizeProduct(item));
}
