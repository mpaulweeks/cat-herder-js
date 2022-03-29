import { Schedule } from "@mpaulweeks/cat-shared";
import { Manager } from '../manager';
import { IStore } from "../store";

class FakeStore implements IStore {
  get(sid: string) {
    return Promise.resolve(undefined);
  }
  create(schedule: Schedule) {
    return Promise.resolve();
  }
  update(schedule: Schedule) {
    return Promise.resolve();
  }
}

describe('manager.ts', () => {
  let fs: FakeStore;
  let sut: Manager;
  beforeEach(() => {
    fs = new FakeStore();
    sut = new Manager(fs);
  });

  test('get()', async () => {
    const result = await sut.get('a');
    expect(result).toBeUndefined();
  });
});
