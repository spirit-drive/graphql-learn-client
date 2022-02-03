import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type Money = {
  __typename?: 'Money';
  amount: Scalars['Int'];
  currency: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: Array<Maybe<User>>;
  editProfile: User;
  editUser: User;
  sendMessage?: Maybe<Array<Maybe<Message>>>;
};


export type MutationAddUserArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
};


export type MutationEditProfileArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
};


export type MutationEditUserArgs = {
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationSendMessageArgs = {
  text: Scalars['String'];
};

export type Percent = {
  __typename?: 'Percent';
  percent: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  messages: Array<Maybe<Message>>;
  profile?: Maybe<User>;
  unionValues: Array<Maybe<UnionValue>>;
  users: Array<Maybe<User>>;
};


export type QueryUsersArgs = {
  filters?: Maybe<UserFilters>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageWasSent?: Maybe<Array<Maybe<Message>>>;
};

export type UnionValue = Money | Percent;

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UserFilters = {
  ids: Array<Scalars['ID']>;
};
