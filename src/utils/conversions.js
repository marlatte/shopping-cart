import { capitalize } from 'lodash';

export function convertToHref(str) {
  return str
    .split(' ')
    .map((word) => word.replace(/'/g, ''))
    .join('-');
}

export function convertToTitleCase(str) {
  return str
    .split(' ')
    .map((word) => capitalize(word.replace(/'/g, '&apos;')))
    .join(' ');
}
