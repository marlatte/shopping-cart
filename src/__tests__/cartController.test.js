import { beforeEach, describe, expect, test } from 'vitest';
import * as cart from '../cartController';

beforeEach(() => {
  cart.clear();
});

describe('Adding', () => {
  test('creates new entry', () => {
    expect(cart.get()).toEqual([]);

    cart.addNew(1);

    expect(cart.get()).toEqual([{ id: 1, quantity: 1 }]);
  });

  test('adds a second product', () => {
    cart.addNew(1);
    cart.addNew(2);

    expect(cart.get()).toEqual([
      { id: 1, quantity: 1 },
      { id: 2, quantity: 1 },
    ]);
  });

  test('same product adds quantity, not new entry', () => {
    cart.addNew(1);
    cart.addNew(1);
    expect(cart.get()).toHaveLength(1);
    expect(cart.get()).toEqual([{ id: 1, quantity: 2 }]);

    cart.addNew(1);
    expect(cart.get()).toEqual([{ id: 1, quantity: 3 }]);
  });
});

describe('Removing', () => {
  test('deletes whole entry', async () => {
    cart.addNew(1);
    cart.addNew(1);
    cart.addNew(2);
    expect(cart.get()).toEqual([
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
    ]);

    cart.remove(1);
    expect(cart.get()).toEqual([{ id: 2, quantity: 1 }]);
  });
});

describe('Updating', () => {
  test('quantity increments by 1', () => {
    const id = 5;
    cart.addNew(id);
    expect(cart.get()).toEqual([{ id, quantity: 1 }]);

    cart.plus(id);
    expect(cart.get()).toEqual([{ id, quantity: 2 }]);

    cart.plus(id);
    expect(cart.get()).toEqual([{ id, quantity: 3 }]);
  });

  test('quantity decrements by 1', () => {
    const id = 4;
    cart.addNew(id);
    cart.plus(id);
    cart.plus(id);
    expect(cart.get()).toEqual([{ id, quantity: 3 }]);

    cart.minus(id);
    expect(cart.get()).toEqual([{ id, quantity: 2 }]);

    cart.minus(id);
    expect(cart.get()).toEqual([{ id, quantity: 1 }]);
  });

  test('quantity can be assigned a random num', () => {
    const id = 8;
    const newQty = Math.floor(Math.random() * 99 + 1);
    cart.addNew(id);
    expect(cart.get()).toEqual([{ id, quantity: 1 }]);

    cart.update(id, newQty);

    expect(cart.get()).toEqual([{ id, quantity: newQty }]);
  });

  test('quantity can NOT be negative', () => {
    const id = 8;
    const negative = -1;
    cart.addNew(id);
    expect(cart.get()).toEqual([{ id, quantity: 1 }]);

    cart.update(id, negative);

    expect(cart.get()).not.toEqual([{ id, quantity: negative }]);
    expect(cart.get()).toEqual([{ id, quantity: 1 }]);
  });

  test('quantity must be a number', () => {
    const id = 8;
    const hiThere = 'hi there';
    cart.addNew(id);
    expect(cart.get()).toEqual([{ id, quantity: 1 }]);

    cart.update(id, hiThere);

    expect(cart.get()).not.toEqual([{ id, quantity: hiThere }]);
    expect(cart.get()).toEqual([{ id, quantity: 1 }]);
  });
});
