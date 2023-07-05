import { StorageEntry } from "../lib";

export const STORAGE = new (class {
  userLabel = new StorageEntry<string>(localStorage, 'user-label');
});
