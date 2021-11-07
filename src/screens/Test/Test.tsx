import React, { FormEventHandler, memo, useCallback } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { User } from 'src/server.types';

const GET = gql`
  query get {
    profile {
      id
      name
      email
    }
  }
`;

const EDIT_PROFILE = gql`
  mutation editProfile($name: String!, $email: String!) {
    editProfile(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export type MutationVariables = {
  email: string;
  name: string;
};

export const Test = memo(() => {
  const { data, error, loading } = useQuery(GET);
  const [editProfile] = useMutation<User, MutationVariables>(EDIT_PROFILE);

  const onSubmit = useCallback<FormEventHandler>(
    (e) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const emailInput = target.elements.namedItem('email') as HTMLInputElement;
      const nameInput = target.elements.namedItem('name') as HTMLInputElement;
      editProfile({ variables: { email: emailInput.value, name: nameInput.value } });
    },
    [editProfile]
  );

  if (loading) return <div>{loading}</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <div>Профиль</div>
      <div>{JSON.stringify(data)}</div>
      <div>Редактировать профиль</div>
      <form onSubmit={onSubmit}>
        <div>email</div>
        <input type="text" name="email" />
        <div>name</div>
        <input type="text" name="name" />
        <div>
          <button type="submit">Редактировать профиль</button>
        </div>
      </form>
    </div>
  );
});
