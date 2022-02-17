import taskResolvers from './taskResolvers';
import userResolver from './userResolvers';
import projectResolvers from './projectResolvers';
import commentResolver from './commentResolvers';
import documentResolvers from './documentResolvers';

const resolvers = [
  taskResolvers,
  projectResolvers,
  userResolver,
  commentResolver,
  documentResolvers
];

export default resolvers;
