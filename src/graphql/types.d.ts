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
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  createTask: Task;
  deleteProject?: Maybe<Scalars['Boolean']>;
  deleteTask?: Maybe<Scalars['Boolean']>;
  updateProject: Project;
  updateTask: Task;
};


export type MutationCreateProjectArgs = {
  projectInput: ProjectInput;
};


export type MutationCreateTaskArgs = {
  taskInput: TaskInput;
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['String'];
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  projectId: Scalars['String'];
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateTaskArgs = {
  updateTaskInput: UpdateTaskInput;
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

export type Query = {
  __typename?: 'Query';
  getAllProjects: Array<Project>;
  getAllTasks: Array<Task>;
  getProject: Project;
  getTask: Task;
};


export type QueryGetProjectArgs = {
  projectId: Scalars['String'];
};


export type QueryGetTaskArgs = {
  taskId: Scalars['String'];
};

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
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Priority: Priority;
  Project: ResolverTypeWrapper<Project>;
  ProjectInput: ProjectInput;
  Query: ResolverTypeWrapper<{}>;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']>;
  Task: ResolverTypeWrapper<Task>;
  TaskInput: TaskInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateTaskInput: UpdateTaskInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  ID: Scalars['ID'];
  Mutation: {};
  Project: Project;
  ProjectInput: ProjectInput;
  Query: {};
  String: Scalars['String'];
  Task: Task;
  TaskInput: TaskInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateTaskInput: UpdateTaskInput;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'projectInput'>>;
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'taskInput'>>;
  deleteProject?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'projectId'>>;
  deleteTask?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'taskId'>>;
  updateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'projectId' | 'updateProjectInput'>>;
  updateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'updateTaskInput'>>;
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

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllProjects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  getAllTasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  getProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<QueryGetProjectArgs, 'projectId'>>;
  getTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<QueryGetTaskArgs, 'taskId'>>;
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

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
};

