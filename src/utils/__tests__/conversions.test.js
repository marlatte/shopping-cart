import { expect, test } from 'vitest';
import {
  convertToHref,
  convertToTitleCase,
  sanitizeAll,
  sanitizeProduct,
} from '../conversions';
import allProducts from '../../pages/Products/__tests__/allProducts';

test('turns string into Title Case', () => {
  expect(convertToTitleCase("men's clothing")).toBe("Men's Clothing");
});

test('turns string into href', () => {
  expect(convertToHref("men's clothing")).toBe('mens-clothing');
});

test('trims whitespace from product values that are strings', () => {
  const cleanProduct = sanitizeProduct(allProducts[1]);
  const cleanTitle = cleanProduct.title;
  const lastChar = cleanTitle[cleanTitle.length - 1];
  expect(lastChar).not.toBe(' ');
});

test('trims whitespace from products 2, 6, 9, and 14 at once', () => {
  const testProducts = allProducts.filter((item) =>
    [2, 6, 9, 14].includes(item.id)
  );
  const cleanProducts = sanitizeAll(testProducts);
  const cleanTitles = cleanProducts.map((item) => item.title);
  const lastChars = cleanTitles.map((title) => title[title.length - 1]);
  expect(lastChars).not.toContain(' ');
});
