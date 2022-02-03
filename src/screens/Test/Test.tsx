import React, { FormEventHandler, memo, useCallback, useEffect } from 'react';
import { gql, useLazyQuery, useMutation, useQuery, useSubscription } from '@apollo/client';
import { Mutation, Subscription } from 'src/server.types';

const GET_PROFILE = gql`
  query getProfile {
    profile {
      id
      name
      email
    }
  }
`;

const GET_USERS = gql`
  query getUsers {
    users {
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

const EDIT_USER = gql`
  mutation editUsers($id: ID!, $name: String!, $email: String!) {
    editUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const MESSAGE_WAS_SENT = gql`
  subscription onMessageWasSent {
    messageWasSent {
      id
      text
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!) {
    sendMessage(text: $text) {
      id
      text
    }
  }
`;

export type EditProfileVariables = {
  email: string;
  name: string;
};

export type AddUserVariables = {
  email: string;
  name: string;
};

export type EditUserVariables = {
  id: string;
  email: string;
  name: string;
};

export type SendMessageVariables = {
  text: string;
};

export const Test = memo(() => {
  const { data, error, loading } = useQuery(GET_PROFILE);
  const [getUsers, { data: usersData }] = useLazyQuery(GET_USERS);
  const [editProfile, { error: editProfileError }] = useMutation<Pick<Mutation, 'editProfile'>, EditProfileVariables>(
    EDIT_PROFILE
  );
  const [editUser, { error: editUserError }] = useMutation<Pick<Mutation, 'editUser'>, EditUserVariables>(EDIT_USER);
  const [addUser] = useMutation<Pick<Mutation, 'addUser'>, AddUserVariables>(ADD_USER);
  const [sendMessage] = useMutation<Pick<Mutation, 'sendMessage'>, SendMessageVariables>(SEND_MESSAGE);

  const { data: subscribeData, error: subscribeError } = useSubscription<Subscription>(MESSAGE_WAS_SENT);

  useEffect(() => {
    console.log(editUserError);
  }, [editUserError]);

  const onSubmitEditProfile = useCallback<FormEventHandler>(
    (e) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const emailInput = target.elements.namedItem('email') as HTMLInputElement;
      const nameInput = target.elements.namedItem('name') as HTMLInputElement;
      const email = emailInput.value;
      const name = nameInput.value;
      target.reset();
      editProfile({ variables: { name, email } });
    },
    [editProfile]
  );

  const onSubmitEditUser = useCallback<FormEventHandler>(
    (e) => {
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
    },
    [editUser]
  );

  const onSubmitAddUser = useCallback<FormEventHandler>(
    (e) => {
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
    },
    [addUser]
  );

  const onSubmitMessage = useCallback<FormEventHandler>(
    (e) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const textInput = target.elements.namedItem('text') as HTMLTextAreaElement;
      const text = textInput.value;
      target.reset();
      sendMessage({ variables: { text } });
    },
    [sendMessage]
  );

  if (loading) return <div>loading...</div>;
  if (error || subscribeError || editProfileError)
    return <div>{(error || subscribeError || editProfileError).message}</div>;

  return (
    <div>
      <h3>Профиль</h3>
      <div>{JSON.stringify(data)}</div>
      <hr />

      <h3>Редактировать профиль</h3>
      <form onSubmit={onSubmitEditProfile}>
        <div>email</div>
        <input type="text" name="email" />
        <div>name</div>
        <input type="text" name="name" />
        <div>
          <button type="submit">Редактировать профиль</button>
        </div>
      </form>
      <hr />

      <h3>Сообщения</h3>
      <div>
        {subscribeData?.messageWasSent?.map((msg) => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
      <form onSubmit={onSubmitMessage}>
        <div>Текст</div>
        <textarea name="text" />
        <div>
          <button type="submit">Отправить</button>
        </div>
      </form>

      <h3>Пользователи</h3>
      <button type="button" onClick={() => getUsers()}>
        Запросить пользователей
      </button>
      <div style={{ whiteSpace: 'break-spaces' }}>{JSON.stringify(usersData, null, 2)}</div>
      <hr />

      <h3>Редактировать пользователя</h3>
      <form onSubmit={onSubmitEditUser}>
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
      <hr />

      <h3>Добавить пользователя</h3>
      <form onSubmit={onSubmitAddUser}>
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
});
