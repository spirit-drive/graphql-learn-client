import React, { FormEventHandler, memo, useCallback } from 'react';
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import { Message, User } from 'src/server.types';

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

const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!) {
    sendMessage(text: $text) {
      id
      text
    }
  }
`;

const MESSAGE_SENT = gql`
  subscription onMessageSent {
    messageSent {
      id
      text
    }
  }
`;

export type EditProfileVariables = {
  email: string;
  name: string;
};

export type SendMessageVariables = {
  text: string;
};

export const Test = memo(() => {
  const { data, error, loading } = useQuery(GET);
  const [editProfile] = useMutation<User, EditProfileVariables>(EDIT_PROFILE);
  const [sendMessage] = useMutation<Message[], SendMessageVariables>(SEND_MESSAGE);

  const { data: subscribeData } = useSubscription(MESSAGE_SENT);

  const onSubmitEditProfile = useCallback<FormEventHandler>(
    (e) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const emailInput = target.elements.namedItem('email') as HTMLInputElement;
      const nameInput = target.elements.namedItem('name') as HTMLInputElement;
      editProfile({ variables: { email: emailInput.value, name: nameInput.value } });
    },
    [editProfile]
  );

  const onSubmitMessage = useCallback<FormEventHandler>(
    (e) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const textInput = target.elements.namedItem('text') as HTMLTextAreaElement;
      sendMessage({ variables: { text: textInput.value } });
    },
    [sendMessage]
  );

  if (loading) return <div>{loading}</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <div>Профиль</div>
      <div>{JSON.stringify(data)}</div>
      <div>Редактировать профиль</div>
      <form onSubmit={onSubmitEditProfile}>
        <div>email</div>
        <input type="text" name="email" />
        <div>name</div>
        <input type="text" name="name" />
        <div>
          <button type="submit">Редактировать профиль</button>
        </div>
      </form>
      <div>Сообщения</div>
      <div>
        {subscribeData?.messageSent?.map((msg: Message) => (
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
    </div>
  );
});
