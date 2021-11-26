import taskResolvers from './taskResolver';
import userResolver from './userResolver';
import projectResolvers from './projectResolvers';

const resolvers = [taskResolvers, projectResolvers, userResolver];

export default resolvers;
