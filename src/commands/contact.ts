import type { Command } from './CommandTypes';
import { emailAddress } from '../api/api';

export const email: Command = {
  args: ['*'],
  functionCall: () => {
    window.open(`mailto:${emailAddress}`);
  },
};
