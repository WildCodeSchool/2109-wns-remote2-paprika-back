import { Priority, Status } from '@prisma/client';
import { TaskInput } from '../src/graphql/types.d';
import { Context, createMockContext, MockContext } from './context';

let mockCtx: MockContext;
let ctx: Context;

async function createTask(task: TaskInput, ctx: Context) {
  return await ctx.prisma.task.create({ data: task });
}

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test('should create new task ', async () => {
  const taskInput = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'task',
    description: 'desc',
    projectId: '08e10906-c1e1-4919-ba81-4e9d8847da3d',
    timing: null,
    status: Status.OPEN,
    priority: Priority.LOW,
    users: []
  };

  mockCtx.prisma.task.create.mockResolvedValue(taskInput);

  expect(createTask(taskInput, ctx)).resolves.toEqual({
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'task',
    description: 'desc',
    projectId: '08e10906-c1e1-4919-ba81-4e9d8847da3d',
    timing: null,
    status: 'OPEN',
    priority: 'LOW',
    users: []
  });
});
