import React, { FormEventHandler, memo, useCallback, useEffect } from 'react';
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import { Subscription, User } from 'src/server.types';

const GET_PROFILE = gql`
  query getProfile {
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

const MESSAGE_WAS_SENT = gql`
  subscription onMessageWasSent {
    messageWasSent {
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
  const { data, error, loading } = useQuery(GET_PROFILE);
  const [editProfile, { data: editProfileData, error: editProfileError }] = useMutation<User, EditProfileVariables>(
    EDIT_PROFILE
  );

  useEffect(() => {
    console.log({ editProfileData });
  }, [editProfileData]);

  const { data: subscribeData, error: subscribeError } = useSubscription<Subscription>(MESSAGE_WAS_SENT);

  const onSubmitEditProfile = useCallback<FormEventHandler>(
    (e) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const emailInput = target.elements.namedItem('email') as HTMLInputElement;
      const nameInput = target.elements.namedItem('name') as HTMLInputElement;
      const email = emailInput.value;
      const name = nameInput.value;
      editProfile({ variables: { name, email } });
    },
    [editProfile]
  );

  const onSubmitMessage = useCallback<FormEventHandler>((e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const textInput = target.elements.namedItem('text') as HTMLTextAreaElement;
    console.log({ textInput });
  }, []);

  if (loading) return <div>loading...</div>;
  if (error || subscribeError || editProfileError)
    return <div>{(error || subscribeError || editProfileError).message}</div>;

  return (
    <div>
      <div>Профиль</div>
      <div>{JSON.stringify(data)}</div>
      <hr />

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
      <hr />

      <div>Сообщения</div>
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
    </div>
  );
});
