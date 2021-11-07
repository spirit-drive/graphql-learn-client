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

export type Mutation = {
  __typename?: 'Mutation';
  editProfile: User;
  sendMessage?: Maybe<Array<Maybe<Message>>>;
};


export type MutationEditProfileArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
};


export type MutationSendMessageArgs = {
  text: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  messages: Array<Maybe<Message>>;
  profile?: Maybe<User>;
  users: Array<Maybe<User>>;
};


export type QueryUsersArgs = {
  filters?: Maybe<UserFilters>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageSent?: Maybe<Array<Maybe<Message>>>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UserFilters = {
  ids: Array<Scalars['ID']>;
};
