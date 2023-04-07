import React, { FC, FormEventHandler } from 'react';
import { gql, useMutation } from '@apollo/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Mutation, Query } from 'src/server.types';
import { GET_USERS } from './UsersExample';
import { AddUserVariables } from './types';

const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const AddUserExample: FC = () => {
  const [addUser, { loading, error }] = useMutation<Pick<Mutation, 'addUser'>, AddUserVariables>(ADD_USER);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const emailInput = target.elements.namedItem('email') as HTMLInputElement;
    const nameInput = target.elements.namedItem('name') as HTMLInputElement;
    const email = emailInput.value;
    const name = nameInput.value;
    target.reset();
    addUser({
      variables: { name, email },
      refetchQueries: [{ query: GET_USERS }],
      // update: (cache, result) => {
      //   const stored = cache.readQuery<Pick<Query, 'users'>>({ query: GET_USERS });
      //   const newData = {
      //     users: [...stored.users, result?.data?.addUser],
      //   };
      //   cache.writeQuery({ query: GET_USERS, data: newData });
      // },
    })
      .then((res) => console.log({ res }))
      .catch((err) => console.error(err));
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h3>Добавить пользователя</h3>
      <form onSubmit={onSubmit}>
        <div>email</div>
        <input type="text" name="email" />
        <div>name</div>
        <input type="text" name="name" />
        <div>
          <button type="submit">Добавить пользователя</button>
        </div>
      </form>
    </div>
  );
};
