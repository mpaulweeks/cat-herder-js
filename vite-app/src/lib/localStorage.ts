
type StorageWrapper<T> = {
  updated: string;
  value: T;
}

export interface StorageContainer {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export class StorageEntry<T> {
  constructor(
    readonly storage: StorageContainer,
    readonly key: string,
  ) {}
  get(): T | null {
    const json = this.storage.getItem(this.key);
    if (!json) return null;
    const wrapper: StorageWrapper<T> = JSON.parse(json);
    return wrapper.value;
  }
  set(value: T) {
    const wrapper: StorageWrapper<T> = {
      updated: new Date().toISOString(),
      value,
    };
    const json = JSON.stringify(wrapper);
    return this.storage.setItem(this.key, json);
  }
}
