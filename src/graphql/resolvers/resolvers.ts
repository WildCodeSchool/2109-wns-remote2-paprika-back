import commentResolver from './commentResolvers';
import documentResolvers from './documentResolvers';
import projectResolvers from './projectResolvers';
import taskResolvers from './taskResolvers';
import userResolver from './userResolvers';

const resolvers = [
  taskResolvers,
  projectResolvers,
  userResolver,
  commentResolver,
  documentResolvers
];

export default resolvers;
