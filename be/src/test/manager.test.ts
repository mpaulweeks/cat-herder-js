import { Schedule } from "@mpaulweeks/cat-shared";
import { Manager } from '../manager';

class FakeStore {
  get(sid: string) {
    return Promise.resolve(undefined);
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
