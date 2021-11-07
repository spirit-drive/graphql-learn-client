import React, { FormEventHandler, memo, useCallback } from 'react';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { Subscription } from 'src/server.types';

const GET = gql`
  query get {
    profile {
      id
      name
      email
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

  const { data: subscribeData } = useSubscription<Subscription>(MESSAGE_SENT);

  const onSubmitEditProfile = useCallback<FormEventHandler>((e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const emailInput = target.elements.namedItem('email') as HTMLInputElement;
    const nameInput = target.elements.namedItem('name') as HTMLInputElement;
    console.log({ emailInput, nameInput });
  }, []);

  const onSubmitMessage = useCallback<FormEventHandler>((e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const textInput = target.elements.namedItem('text') as HTMLTextAreaElement;
    console.log({ textInput });
  }, []);

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
        {subscribeData?.messageSent?.map((msg) => (
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
