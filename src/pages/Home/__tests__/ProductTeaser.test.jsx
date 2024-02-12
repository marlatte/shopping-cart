import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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

global.fetch = vi.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(testProducts) })
);

function setup() {
  const router = createBrowserRouter([
    { path: '/', element: <ProductTeaser /> },
  ]);

  return render(<RouterProvider router={router} />);
}

test('contains a heading, paragraph, and link to jewelry', () => {
  setup();
  const heading = screen.getByRole('heading', { name: /check out our/i });
  const paragraph = screen.getByText(/sick threads/i);

  expect(heading).toHaveTextContent(/check out our new arrivals/i);
  expect(paragraph).toHaveTextContent(
    /We might be known for our sick threads, but we've also got a sleek selection of jewelry/i
  );
  expect(
    screen.getByRole('link', { name: /shop jewelry/i })
  ).toBeInTheDocument();
});

test('contains 3 cards', async () => {
  setup();
  const cards = await screen.findAllByTestId(/product card/i);

  expect(cards).toHaveLength(3);
});
