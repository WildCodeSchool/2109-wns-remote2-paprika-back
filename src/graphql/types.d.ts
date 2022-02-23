import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  taskId: Scalars['String'];
  userId: Scalars['String'];
};

export type CommentInput = {
  content: Scalars['String'];
  taskId: Scalars['String'];
};

export type Document = {
  __typename?: 'Document';
  fileName: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  projectId: Scalars['String'];
};

export type DocumentInput = {
  name: Scalars['String'];
  projectId: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDocument: Document;
  assignUsers?: Maybe<Scalars['Boolean']>;
  createComment: Comment;
  createProject: Project;
  createProjectRole: ProjectRole;
  createTask: Task;
  deleteComment: Scalars['Boolean'];
  deleteDocument: Document;
  deleteProject?: Maybe<Scalars['Boolean']>;
  deleteTask?: Maybe<Scalars['Boolean']>;
  deleteUser?: Maybe<Scalars['Boolean']>;
  login: LoginResponse;
  register: User;
  updateDocument: Document;
  updateProject: Project;
  updateTask: Task;
  updateUser: User;
};


export type MutationAddDocumentArgs = {
  DocumentInput: DocumentInput;
};


export type MutationAssignUsersArgs = {
  projectId: Scalars['String'];
  usersRoles?: InputMaybe<Array<InputMaybe<UsersRoles>>>;
};


export type MutationCreateCommentArgs = {
  commentInput: CommentInput;
};


export type MutationCreateProjectArgs = {
  projectInput: ProjectInput;
};


export type MutationCreateProjectRoleArgs = {
  roleName: Scalars['String'];
};


export type MutationCreateTaskArgs = {
  taskInput: TaskInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDeleteDocumentArgs = {
  docId: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['String'];
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationRegisterArgs = {
  userInput: UserInput;
};


export type MutationUpdateDocumentArgs = {
  docId: Scalars['String'];
  newName: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  projectId: Scalars['String'];
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateTaskArgs = {
  updateTaskInput: UpdateTaskInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export enum Priority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type Project = {
  __typename?: 'Project';
  client: Scalars['String'];
  description: Scalars['String'];
  endAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  startAt?: Maybe<Scalars['Date']>;
};

export type ProjectInput = {
  client: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
};

export type ProjectRole = {
  __typename?: 'ProjectRole';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllDocumentsByProject?: Maybe<Array<Maybe<Document>>>;
  getAllProjects: Array<Project>;
  getAllTasks: Array<Task>;
  getAllUsers: Array<User>;
  getCommentsByTask: Array<Comment>;
  getDocumentById?: Maybe<Document>;
  getProjectById: Project;
  getProjectRoles: Array<Maybe<ProjectRole>>;
  getProjectsByUser: Array<Maybe<Project>>;
  getTask: Task;
  getTaskByProject: Array<Maybe<Task>>;
  getUser: User;
};


export type QueryGetAllDocumentsByProjectArgs = {
  projectId: Scalars['String'];
};


export type QueryGetCommentsByTaskArgs = {
  taskId: Scalars['String'];
};


export type QueryGetDocumentByIdArgs = {
  docId: Scalars['String'];
};


export type QueryGetProjectByIdArgs = {
  projectId: Scalars['String'];
};


export type QueryGetTaskArgs = {
  taskId: Scalars['String'];
};


export type QueryGetTaskByProjectArgs = {
  projectId: Scalars['String'];
};


export type QueryGetUserArgs = {
  userId: Scalars['String'];
};

export enum RoleSite {
  Admin = 'ADMIN',
  Po = 'PO',
  User = 'USER'
}

export enum Status {
  Done = 'DONE',
  Inprogress = 'INPROGRESS',
  Open = 'OPEN'
}

export type Task = {
  __typename?: 'Task';
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  priority: Priority;
  projectId: Scalars['String'];
  status: Status;
  timing?: Maybe<Scalars['String']>;
};

export type TaskInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  projectId: Scalars['String'];
  users: Array<Scalars['String']>;
};

export type UpdateProjectInput = {
  client?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  endAt?: InputMaybe<Scalars['Date']>;
  name?: InputMaybe<Scalars['String']>;
  startAt?: InputMaybe<Scalars['Date']>;
};

export type UpdateTaskInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<Priority>;
  projectId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Status>;
  taskId: Scalars['String'];
  timing?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleSite>;
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  role?: Maybe<RoleSite>;
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type UsersRoles = {
  roleId: Scalars['String'];
  userId: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentInput: CommentInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Document: ResolverTypeWrapper<Document>;
  DocumentInput: DocumentInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  LoginUserInput: LoginUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  Priority: Priority;
  Project: ResolverTypeWrapper<Project>;
  ProjectInput: ProjectInput;
  ProjectRole: ResolverTypeWrapper<ProjectRole>;
  Query: ResolverTypeWrapper<{}>;
  RoleSite: RoleSite;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']>;
  Task: ResolverTypeWrapper<Task>;
  TaskInput: TaskInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateUserInput: UpdateUserInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UsersRoles: UsersRoles;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  CommentInput: CommentInput;
  Date: Scalars['Date'];
  Document: Document;
  DocumentInput: DocumentInput;
  ID: Scalars['ID'];
  LoginResponse: LoginResponse;
  LoginUserInput: LoginUserInput;
  Mutation: {};
  Project: Project;
  ProjectInput: ProjectInput;
  ProjectRole: ProjectRole;
  Query: {};
  String: Scalars['String'];
  Task: Task;
  TaskInput: TaskInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateUserInput: UpdateUserInput;
  Upload: Scalars['Upload'];
  User: User;
  UserInput: UserInput;
  UsersRoles: UsersRoles;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = {
  fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addDocument?: Resolver<ResolversTypes['Document'], ParentType, ContextType, RequireFields<MutationAddDocumentArgs, 'DocumentInput'>>;
  assignUsers?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAssignUsersArgs, 'projectId'>>;
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'commentInput'>>;
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'projectInput'>>;
  createProjectRole?: Resolver<ResolversTypes['ProjectRole'], ParentType, ContextType, RequireFields<MutationCreateProjectRoleArgs, 'roleName'>>;
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'taskInput'>>;
  deleteComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'commentId'>>;
  deleteDocument?: Resolver<ResolversTypes['Document'], ParentType, ContextType, RequireFields<MutationDeleteDocumentArgs, 'docId'>>;
  deleteProject?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'projectId'>>;
  deleteTask?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'taskId'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'userId'>>;
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'loginUserInput'>>;
  register?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'userInput'>>;
  updateDocument?: Resolver<ResolversTypes['Document'], ParentType, ContextType, RequireFields<MutationUpdateDocumentArgs, 'docId' | 'newName'>>;
  updateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'projectId' | 'updateProjectInput'>>;
  updateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'updateTaskInput'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'updateUserInput'>>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  client?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectRole'] = ResolversParentTypes['ProjectRole']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllDocumentsByProject?: Resolver<Maybe<Array<Maybe<ResolversTypes['Document']>>>, ParentType, ContextType, RequireFields<QueryGetAllDocumentsByProjectArgs, 'projectId'>>;
  getAllProjects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  getAllTasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  getAllUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  getCommentsByTask?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryGetCommentsByTaskArgs, 'taskId'>>;
  getDocumentById?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType, RequireFields<QueryGetDocumentByIdArgs, 'docId'>>;
  getProjectById?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<QueryGetProjectByIdArgs, 'projectId'>>;
  getProjectRoles?: Resolver<Array<Maybe<ResolversTypes['ProjectRole']>>, ParentType, ContextType>;
  getProjectsByUser?: Resolver<Array<Maybe<ResolversTypes['Project']>>, ParentType, ContextType>;
  getTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<QueryGetTaskArgs, 'taskId'>>;
  getTaskByProject?: Resolver<Array<Maybe<ResolversTypes['Task']>>, ParentType, ContextType, RequireFields<QueryGetTaskByProjectArgs, 'projectId'>>;
  getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'userId'>>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Priority'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  timing?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['RoleSite']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Document?: DocumentResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectRole?: ProjectRoleResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

