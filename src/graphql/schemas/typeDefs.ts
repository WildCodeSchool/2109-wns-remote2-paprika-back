import commentSchemas from './commentSchemas';
import documentSchemas from './documentSchemas';
import projectSchema from './projectSchemas';
import taskSchemas from './taskSchemas';
import userSchemas from './userSchemas';

const typeDefs = [
  taskSchemas,
  userSchemas,
  projectSchema,
  commentSchemas,
  documentSchemas
];

export default typeDefs;
