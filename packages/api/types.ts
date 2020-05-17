export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Character = {
   __typename?: 'Character';
  id: Scalars['String'];
  name: Scalars['String'];
  displayName: Scalars['String'];
  path: Path;
};

export type UserPreferences = {
   __typename?: 'UserPreferences';
  id: Scalars['String'];
  userId: Scalars['String'];
  practiceGoal: Scalars['Float'];
  why: Scalars['String'];
  codingAbility: Scalars['Float'];
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  profileImage: Scalars['String'];
  userPreferences?: Maybe<UserPreferences>;
  createdAt: Scalars['DateTime'];
};


export type Path = {
   __typename?: 'Path';
  id: Scalars['String'];
  name: Scalars['String'];
  icon: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['DateTime'];
  character: Character;
  characterId: Scalars['String'];
};

export type Module = {
   __typename?: 'Module';
  id: Scalars['String'];
  name: Scalars['String'];
  icon: Scalars['String'];
  type: Scalars['String'];
  previousId?: Maybe<Scalars['String']>;
  pathId: Scalars['String'];
  previous?: Maybe<Module>;
  path: Path;
};

export type Assignment = {
   __typename?: 'Assignment';
  id: Scalars['String'];
  description: Scalars['String'];
  moduleId: Scalars['String'];
  module: Module;
};

export type AssignmentFile = {
   __typename?: 'AssignmentFile';
  id: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  content: Scalars['String'];
  assignmentId: Scalars['String'];
  authorId: Scalars['String'];
  assignment: Assignment;
  author: User;
};

export type LoginOutput = {
   __typename?: 'LoginOutput';
  accessToken: Scalars['String'];
};

export type Friend = {
   __typename?: 'Friend';
  id: Scalars['String'];
  user1Id: Scalars['String'];
  user2Id: Scalars['String'];
  requested: Scalars['DateTime'];
  status: Scalars['String'];
  initiator: Scalars['String'];
  since?: Maybe<Scalars['DateTime']>;
  user1: User;
  user2: User;
};

export type FriendOutput = {
   __typename?: 'FriendOutput';
  id: Scalars['String'];
  user1Id: Scalars['String'];
  user2Id: Scalars['String'];
  requested: Scalars['DateTime'];
  status: Scalars['String'];
  initiator: Scalars['String'];
  since?: Maybe<Scalars['DateTime']>;
};

export type Query = {
   __typename?: 'Query';
  assignments: Array<Assignment>;
  moduleAssignments: Array<Assignment>;
  assignmentFiles: Array<AssignmentFile>;
  userAssignmentFiles: Array<AssignmentFile>;
  users: Array<User>;
  me: User;
  verifyToken: Scalars['Boolean'];
  getUserFriends: Array<Friend>;
  modules: Array<Module>;
  pathModules: Array<Module>;
  paths: Array<Path>;
  getPathByName: Path;
};


export type QueryModuleAssignmentsArgs = {
  moduleId: Scalars['String'];
};


export type QueryAssignmentFilesArgs = {
  assignmentId: Scalars['String'];
};


export type QueryUserAssignmentFilesArgs = {
  authorId: Scalars['String'];
};


export type QueryVerifyTokenArgs = {
  accessToken: Scalars['String'];
};


export type QueryGetUserFriendsArgs = {
  userId: Scalars['String'];
};


export type QueryPathModulesArgs = {
  pathId: Scalars['String'];
};


export type QueryGetPathByNameArgs = {
  name: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createAssignment: Assignment;
  updateAssignment: Assignment;
  deleteAssignment: Scalars['Boolean'];
  createAssignmentFile: AssignmentFile;
  updateAssignmentFile: AssignmentFile;
  deleteAssignmentFile: Scalars['Boolean'];
  createUser: User;
  updatePreferences: UserPreferences;
  login: LoginOutput;
  createFriendship: FriendOutput;
  respondToFriendRequest: Friend;
  deleteFriendship: Scalars['Boolean'];
  createModule: Module;
  updateModule: Module;
  deleteModule: Scalars['Boolean'];
  createPath: Path;
  joinPath: Scalars['Boolean'];
};


export type MutationCreateAssignmentArgs = {
  assignment: CreateAssignmentInput;
};


export type MutationUpdateAssignmentArgs = {
  update: UpdateAssignmentInput;
};


export type MutationDeleteAssignmentArgs = {
  assignmentId: Scalars['String'];
};


export type MutationCreateAssignmentFileArgs = {
  assignmentFile: CreateAssignmentFileInput;
};


export type MutationUpdateAssignmentFileArgs = {
  update: UpdateAssignmentFileInput;
};


export type MutationDeleteAssignmentFileArgs = {
  assignmentFileId: Scalars['String'];
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationUpdatePreferencesArgs = {
  preferences: UserPreferencesInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateFriendshipArgs = {
  friendInput: CreateFriendInput;
};


export type MutationRespondToFriendRequestArgs = {
  response: Scalars['String'];
  user2Id: Scalars['String'];
  user1Id: Scalars['String'];
};


export type MutationDeleteFriendshipArgs = {
  friendId: Scalars['String'];
};


export type MutationCreateModuleArgs = {
  module: CreateModuleInput;
};


export type MutationUpdateModuleArgs = {
  update: UpdateModuleInput;
};


export type MutationDeleteModuleArgs = {
  moduleId: Scalars['String'];
};


export type MutationCreatePathArgs = {
  character: CreateCharacterInput;
  path: PathInput;
};


export type MutationJoinPathArgs = {
  pathId: Scalars['String'];
};

export type CreateAssignmentInput = {
  description: Scalars['String'];
  moduleId: Scalars['String'];
};

export type UpdateAssignmentInput = {
  id: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  moduleId?: Maybe<Scalars['String']>;
};

export type CreateAssignmentFileInput = {
  name: Scalars['String'];
  type: Scalars['String'];
  content: Scalars['String'];
  assignmentId: Scalars['String'];
};

export type UpdateAssignmentFileInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  assignmentId?: Maybe<Scalars['String']>;
};

export type UserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserPreferencesInput = {
  practiceGoal?: Maybe<Scalars['Float']>;
  why?: Maybe<Scalars['String']>;
  codingAbility?: Maybe<Scalars['Float']>;
};

export type CreateFriendInput = {
  fromId: Scalars['String'];
  toId: Scalars['String'];
};

export type CreateModuleInput = {
  name: Scalars['String'];
  icon: Scalars['String'];
  type: Scalars['String'];
  previousId?: Maybe<Scalars['String']>;
  pathId: Scalars['String'];
};

export type UpdateModuleInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  type?: Maybe<ModuleType>;
  previousId?: Maybe<Scalars['String']>;
  pathId?: Maybe<Scalars['String']>;
};

export enum ModuleType {
  Assignment = 'assignment',
  Lesson = 'lesson'
}

export type CreateCharacterInput = {
  name: Scalars['String'];
  displayName: Scalars['String'];
};

export type PathInput = {
  name: Scalars['String'];
  icon: Scalars['String'];
  description: Scalars['String'];
};
