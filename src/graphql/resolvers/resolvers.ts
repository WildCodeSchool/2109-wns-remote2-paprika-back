import taskResolvers from './taskResolver';
import userResolver from './userResolver';
import projectResolvers from './projectResolvers';
import commentResolver from './commentResolver';

const resolvers = [
  taskResolvers,
  projectResolvers,
  userResolver,
  commentResolver
];

export default resolvers;
