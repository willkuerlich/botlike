import type {
  CommandRequestData,
  CreateCommandRequest,
} from 'src/commander/commander.types';

// X-FIXME: remove

export const composeCommandRequest = ({
  commandInfo,
  networkInfo,
  userInfo,
  submitMessageHandler,
  services,
}: CreateCommandRequest): CommandRequestData => ({
  commandInfo,
  networkInfo,
  userInfo,
  submitMessageHandler,
  services,
});
