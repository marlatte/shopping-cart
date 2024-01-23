import { describe, expect, test } from 'vitest';
import { fetchCategoryNames, fetchItem, fetchItems } from '../fetch-data';

describe.skip('fetch tests', () => {
  test('fetches data for all 20 items from server', async () => {
    const data = await fetchItems();
    expect(data).toHaveLength(20);
  });

  test('fetches only data for a specific category', async () => {
    const data = await fetchItems({ category: 'jewelery' });
    expect(data).toHaveLength(4);
    expect(data[0].id).toBe(5);
  });

  test('fetches a specific item', async () => {
    const data = await fetchItem(1);
    expect(data.id).toBe(1);
    expect(data.title).toMatch(/fjallraven/i);
  });

  test('throws if no item id is passed', async () => {
    await expect(fetchItem()).rejects.toThrow('Product not found');
  });

  test('fetches category names', async () => {
    const data = await fetchCategoryNames();
    expect(data).toHaveLength(4);
    expect(data).toMatchObject([
      'electronics',
      'jewelery',
      "men's clothing",
      "women's clothing",
    ]);
  });

  test('fetches correct number of items', async () => {
    const data = await fetchItems({ limit: 3 });
    expect(data).toHaveLength(3);
  });

  test('fetches correct number of items in a category', async () => {
    const data = await fetchItems({ category: 'electronics', limit: 2 });
    expect(data).toHaveLength(2);
    expect(data.map((item) => item.category)).toMatchObject([
      'electronics',
      'electronics',
    ]);
  });
});
