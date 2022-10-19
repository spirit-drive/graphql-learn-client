import React, { FC, FormEventHandler } from 'react';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { Mutation, Subscription } from 'src/server.types';
import { SendMessageVariables } from './types';

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

export const MessageExample: FC = () => {
  const [sendMessage, { error: mutationError, loading: mutationLoading }] = useMutation<
    Pick<Mutation, 'sendMessage'>,
    SendMessageVariables
  >(SEND_MESSAGE);

  const { data: subscribeData, error, loading } = useSubscription<Subscription>(MESSAGE_WAS_SENT);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const textInput = target.elements.namedItem('text') as HTMLTextAreaElement;
    const text = textInput.value;
    target.reset();
    sendMessage({ variables: { text } });
  };

  if (loading || mutationLoading) return <div>loading...</div>;
  if (error || mutationError) return <div>{(error || mutationError).message}</div>;

  return (
    <div>
      <h3>Сообщения</h3>
      <div>
        {subscribeData?.messageWasSent?.map((msg) => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <div>Текст</div>
        <textarea name="text" />
        <div>
          <button type="submit">Отправить</button>
        </div>
      </form>
    </div>
  );
};
