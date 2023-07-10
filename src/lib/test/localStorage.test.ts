import { expect, test } from 'vitest';
import { StorageContainer, StorageEntry } from '../localStorage';

class MockStorage implements StorageContainer {
  db = new Map<string, string>();
  getItem(key: string): string | null {
    return this.db.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.db.set(key, value);
  }
}

test('StorageEntry string', () => {
  const db = new MockStorage();
  const sut = new StorageEntry<string>(db, 'testkey');
  expect(sut.get()).toBe(null);
  sut.set('hello world');
  expect(sut.get()).toEqual('hello world');
});

test('StorageEntry object', () => {
  const db = new MockStorage();
  const sut = new StorageEntry<{ hello: string; }>(db, 'testkey');
  expect(sut.get()).toBe(null);
  sut.set({ hello: 'world', });
  expect(sut.get()).toEqual({ hello: 'world', });
});
