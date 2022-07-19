import React, { FC } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, split, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

export type ClientProps = {
  children: React.ReactChildren | React.ReactNode;
};

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export const Client: FC<ClientProps> = ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>;
