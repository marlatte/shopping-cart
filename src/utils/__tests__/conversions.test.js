import { expect, test } from 'vitest';
import { convertToHref, convertToTitleCase } from '../conversions';

test('turns string into Title Case', () => {
  expect(convertToTitleCase("men's clothing")).toBe('Men&apos;s Clothing');
});

test('turns string into href', () => {
  expect(convertToHref("men's clothing")).toBe('mens-clothing');
});
