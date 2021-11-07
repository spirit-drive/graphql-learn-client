import React, { memo } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';

export type Props = {
  children: React.ReactChildren | React.ReactNode;
};

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const Client = memo<Props>(({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>);
