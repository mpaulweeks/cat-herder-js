import jest from 'jest';
import { Manager } from '../manager';
import { Store } from "../store";

describe('util.ts', () => {
  let store: jest.Mock<Store>;
  let sut: Manager;

  beforeEach(() => {
    store = jest.fn();
    sut = new Manager(store);
  })
  test('delete', async () => {
    const data = await sut.get('foo');
    expect(data.events.length).toBe(0);
  });
});
