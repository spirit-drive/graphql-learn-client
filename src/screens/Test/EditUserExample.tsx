import React, { FC, FormEventHandler } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Mutation } from 'src/server.types';
import { EditUserVariables } from './types';

const EDIT_USER = gql`
  mutation editUsers($id: ID!, $name: String!, $email: String!) {
    editUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const EditUserExample: FC = () => {
  const [editUser, { error, loading }] = useMutation<Pick<Mutation, 'editUser'>, EditUserVariables>(EDIT_USER);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const idInput = target.elements.namedItem('id') as HTMLInputElement;
    const emailInput = target.elements.namedItem('email') as HTMLInputElement;
    const nameInput = target.elements.namedItem('name') as HTMLInputElement;
    const id = idInput.value;
    const email = emailInput.value;
    const name = nameInput.value;
    target.reset();
    editUser({
      variables: { name, email, id },
      optimisticResponse: {
        editUser: {
          id,
          name,
          email,
          __typename: 'User',
        },
      },
    })
      .then((res) => console.log({ res }))
      .catch((err) => console.error(err));
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h3>Редактировать пользователя</h3>
      <form onSubmit={onSubmit}>
        <div>id</div>
        <input type="text" name="id" />
        <div>email</div>
        <input type="text" name="email" />
        <div>name</div>
        <input type="text" name="name" />
        <div>
          <button type="submit">Редактировать пользователя</button>
        </div>
      </form>
    </div>
  );
};
