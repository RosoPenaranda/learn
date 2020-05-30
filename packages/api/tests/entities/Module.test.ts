import { Path } from '../../types';
import { TestClient } from '../utils/TestClient';
import { pathInput } from './Path.test';
import { ModuleType } from '../../src/Module/Module.entity';

export const moduleInput = {
  name: 'module name',
  icon: 'icon',
  type: ModuleType.lesson
};

beforeAll(async () => {
  await TestClient.start();
});

afterAll(async () => {
  await TestClient.stop();
});

const setup = async () => {
  await TestClient.resetDatabase();
  await TestClient.workflowSignup();
};

describe('Module entity', () => {
  let path: Path;

  describe('Mutation: createModule', () => {
    beforeEach(async () => {
      await setup();
      path = await TestClient.createPath(pathInput);
    });

    it('should create a module successfully', async () => {
      expect.assertions(4);

      const module = await TestClient.createModule({
        ...moduleInput,
        pathId: path.id
      });

      expect(module).toMatchObject(moduleInput);
      expect(module.id).toBeDefined();
      expect(module.previousId).toBeNull();

      const moduleWithPrevious = await TestClient.createModule({
        ...moduleInput,
        name: 'moduleWithPrevious name',
        pathId: path.id,
        previousId: module.id
      });

      expect(moduleWithPrevious.previousId).toBeDefined();
    });

    it('should throw error if module name exists', async () => {
      expect.assertions(1);
      try {
        const [module1, module2] = Array(2)
          .fill(undefined)
          .map(() => ({
            ...moduleInput,
            pathId: path.id
          }));

        await TestClient.createModule(module1);
        await TestClient.createModule(module2);
      } catch (e) {
        expect(e.message).toMatch(/unique constraint/i);
      }
    });
  });

  describe('Mutation: updateModule', () => {
    beforeEach(async () => {
      await setup();
      path = await TestClient.createPath(pathInput);
    });

    it('should update a module successfully', async () => {
      expect.assertions(2);

      const modulePrev = await TestClient.createModule({
        ...moduleInput,
        name: 'previous',
        pathId: path.id
      });

      const module = await TestClient.createModule({
        ...moduleInput,
        pathId: path.id
      });

      const path2 = await TestClient.createPath({
        ...pathInput,
        name: 'path 2'
      });

      const update = {
        id: module.id,
        name: 'New name',
        icon: 'new icon',
        type: ModuleType.assignment,
        previousId: modulePrev.id,
        pathId: path2.id
      };

      const updated = await TestClient.updateModule(update);

      expect(updated.id).toBeDefined();
      expect(updated).toMatchObject(update);
    });
  });

  describe('Mutation: deleteModule', () => {
    beforeEach(async () => {
      await setup();
      path = await TestClient.createPath(pathInput);
    });

    it('should delete a module successfully', async () => {
      expect.assertions(1);
      const module = await TestClient.createModule({
        ...moduleInput,
        pathId: path.id
      });
      await TestClient.deleteModule(module.id);
      const modules = await TestClient.modules();
      expect(modules.length).toBe(0);
    });
  });

  describe.only('Mutation: Join Module', () => {
    beforeEach(async () => {
      await setup();
      path = await TestClient.createPath(pathInput);
    });

    it('join a module successfully', async () => {
      const module = await TestClient.createModule({
        ...moduleInput,
        pathId: path.id
      });

      console.log(module);

      const user = await TestClient.createUser();

      console.log(user);

      const res = await TestClient.joinModule(user.id, module.id);

      console.log(`res: ${res}`);
    });

    it('should not allow to join a module twice', async () => {
      // expect.assertions(1);
      // await TestClient.createPath(pathInput);
      // // Find path
      // const { id } = await TestClient.getPathByName(pathInput.name);
      // // Join path
      // await TestClient.joinPath(id);

      // try {
      //   // Join same path again
      //   await TestClient.joinPath(id);
      // } catch (e) {
      //   expect(e.message).toMatch(/unique constraint/i);
      // }
    });
  });
});
