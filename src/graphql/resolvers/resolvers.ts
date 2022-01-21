import taskResolvers from './taskResolvers';
import userResolver from './userResolvers';
import projectResolvers from './projectResolvers';
import commentResolver from './commentResolvers';

const resolvers = [
  taskResolvers,
  projectResolvers,
  userResolver,
  commentResolver
];

export default resolvers;
