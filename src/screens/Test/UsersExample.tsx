import React, { FC } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
      email
    }
  }
`;

export const UsersExample: FC = () => {
  const [getUsers, { data, error, loading }] = useLazyQuery(GET_USERS);

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h3>Пользователи</h3>
      <button type="button" onClick={() => getUsers()}>
        Запросить пользователей
      </button>
      <div style={{ whiteSpace: 'break-spaces' }}>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
};
