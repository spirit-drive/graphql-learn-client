import * as React from 'react';
import { Test } from 'src/screens/Test';
import { Client } from './client';

export const App: React.FC = () => (
  <Client>
    <Test />
  </Client>
);
