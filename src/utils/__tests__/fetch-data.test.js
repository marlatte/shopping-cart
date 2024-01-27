import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  fetchCategoryNames,
  fetchItem,
  fetchItems,
  getRandom3,
} from '../fetch-data';
import allProducts from '../../pages/Products/__tests__/allProducts';

let fakeData;
global.fetch = vi.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(fakeData) })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('fetch tests', () => {
  test('fetches data for all 20 items in normal order', async () => {
    fakeData = allProducts;
    const data = await fetchItems();

    expect(data).toHaveLength(20);
    expect(data[0].id).toBe(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://fakestoreapi.com/products?sort=asc'
    );
  });

  test('fetches only data for a specific category', async () => {
    fakeData = [{ id: 5 }];
    fakeData.length = 4;
    const data = await fetchItems({ category: 'jewelery' });

    expect(data).toHaveLength(4);
    expect(data[0].id).toBe(5);
    expect(fetch).toHaveBeenCalledWith(
      'https://fakestoreapi.com/products/category/jewelery?sort=asc'
    );
  });

  test('fetches a specific item', async () => {
    [fakeData] = allProducts;
    const data = await fetchItem(fakeData.id);

    expect(data.id).toBe(1);
    expect(data.title).toMatch(/fjallraven/i);
    expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/1');
  });

  test('throws if no item id is passed', async () => {
    await expect(fetchItem()).rejects.toThrow('Product not found');
    expect(fetch).not.toHaveBeenCalled();
  });

  test('fetches category names', async () => {
    fakeData = [
      'electronics',
      'jewelery',
      "men's clothing",
      "women's clothing",
    ];
    const data = await fetchCategoryNames();

    expect(data).toHaveLength(4);
    expect(data).toMatchObject(fakeData);
  });

  test('fetches correct number of items', async () => {
    fakeData = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const data = await fetchItems({ limit: 3 });

    expect(data).toHaveLength(3);
    expect(fetch).toHaveBeenCalledWith(
      'https://fakestoreapi.com/products?sort=asc&limit=3'
    );
  });

  test('fetches correct number of items in a category', async () => {
    fakeData = [{ category: 'electronics' }, { category: 'electronics' }];
    const data = await fetchItems({ category: 'electronics', limit: 2 });

    expect(data).toHaveLength(2);
    expect(data.map((item) => item.category)).toMatchObject([
      'electronics',
      'electronics',
    ]);
    expect(fetch).toHaveBeenCalledWith(
      'https://fakestoreapi.com/products/category/electronics?sort=asc&limit=2'
    );
  });

  test('fetches in reverse order', async () => {
    fakeData = [{ id: 10 }];
    fakeData.length = 10;
    const reverseData = await fetchItems({ desc: true, limit: 10 });

    expect(reverseData[0].id).toBe(10);
    expect(fetch).toHaveBeenCalledWith(
      'https://fakestoreapi.com/products?sort=desc&limit=10'
    );
  });
});

describe('sort tests', () => {
  const testProducts = [{ id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }];

  test('sorts products randomly, picks first 3', () => {
    const result1 = getRandom3(testProducts);
    const result2 = getRandom3(testProducts);
    const result3 = getRandom3(testProducts);

    expect(result1).toHaveLength(3);
    expect(result1).toMatchObject(result1);
    try {
      expect(result1).not.toMatchObject(result2);
    } catch (error) {
      console.log(error);
      expect(result1).not.toMatchObject(result3);
    }
  });
});
