import React, { FC } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_PROFILE = gql`
  query getProfile {
    profile {
      id
      name
      email
    }
  }
`;

export const ProfileExample: FC = () => {
  const { data, error, loading } = useQuery(GET_PROFILE);

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h3>Профиль</h3>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};
