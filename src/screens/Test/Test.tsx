import React, { FC } from 'react';
import { ProfileExample } from 'src/screens/Test/ProfileExample';
import { EditProfileExample } from 'src/screens/Test/EditProfileExample';
import { UsersExample } from 'src/screens/Test/UsersExample';
import { EditUserExample } from 'src/screens/Test/EditUserExample';
import { AddUserExample } from 'src/screens/Test/AddUserExample';
import { MessageExample } from 'src/screens/Test/MessageExample';

export const Test: FC = () => (
  <div>
    <ProfileExample />
    <hr />
    <EditProfileExample />
    <hr />

    <MessageExample />
    <hr />

    <UsersExample />
    <hr />
    <EditUserExample />
    <hr />
    <AddUserExample />
  </div>
);
