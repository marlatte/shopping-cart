import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductTeaser from '../ProductTeaser';

const testProducts = [
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: 'Solid Gold Petite Micropave ',
    price: 168,
    description:
      'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 3.9, count: 70 },
  },
  {
    id: 7,
    title: 'White Gold Plated Princess',
    price: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 3, count: 400 },
  },
];

function setup() {
  return render(<ProductTeaser products={testProducts} />, {
    wrapper: BrowserRouter,
  });
}

test('contains a heading, paragraph, and link to jewelry', () => {
  setup();

  expect(
    screen.getByRole('heading', { name: /check out our new arrivals/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/sick threads/i)).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /shop all jewelry/i })
  ).toBeInTheDocument();
});

test('contains 3 cards', () => {
  setup();
  const cards = screen.getAllByTestId(/product card/i);

  expect(cards).toHaveLength(3);
});
