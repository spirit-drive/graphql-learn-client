import React, { FC, FormEventHandler } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Mutation } from 'src/server.types';
import { EditProfileVariables } from './types';

const EDIT_PROFILE = gql`
  mutation editProfile($name: String!, $email: String!) {
    editProfile(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const EditProfileExample: FC = () => {
  const [editProfile, { error, loading }] = useMutation<Pick<Mutation, 'editProfile'>, EditProfileVariables>(
    EDIT_PROFILE
  );
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const emailInput = target.elements.namedItem('email') as HTMLInputElement;
    const nameInput = target.elements.namedItem('name') as HTMLInputElement;
    const email = emailInput.value;
    const name = nameInput.value;
    target.reset();
    editProfile({ variables: { name, email } });
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h3>Редактировать профиль</h3>
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
};
