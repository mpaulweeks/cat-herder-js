const key = 'display-name';
export function getStorageName() {
  return localStorage.getItem(key) ?? '';
}
export function setStorageName(value: string) {
  return localStorage.setItem(key, value);
}
