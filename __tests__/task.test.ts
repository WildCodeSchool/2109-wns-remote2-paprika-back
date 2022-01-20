import { Status, Priority } from '@prisma/client';
import taskResolver from '../src/graphql/resolvers/taskResolver';

import { MockContext, Context, createMockContext } from '../testConfig/context';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test('should create new task ', async () => {
  const taskInput = {
    id: '',
    name: 'task',
    description: 'desc',
    projectId: '08e10906-c1e1-4919-ba81-4e9d8847da3d',
    timing: null,
    status: Status.OPEN,
    priority: Priority.LOW
  };
  const _parent = '';

  mockCtx.prisma.task.create.mockResolvedValue(taskInput);
  const taskCreated = taskResolver.Mutation.createTask(_parent, {
    taskInput: taskInput
  });

  await expect(taskCreated).resolves.toEqual({
    id: (await taskCreated).id,
    name: 'task',
    description: 'desc',
    projectId: '08e10906-c1e1-4919-ba81-4e9d8847da3d',
    timing: null,
    status: 'OPEN',
    priority: 'LOW'
  });
});
