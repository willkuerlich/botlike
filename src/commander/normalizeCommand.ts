export const normalizeCommand = (message: string, prefix: string) => {
  const command = message.startsWith(`${prefix}?`)
    ? message.replace(`${prefix}?`, '?')
    : message.startsWith(`${prefix} `)
    ? message.replace(`${prefix} `, '') // X-FIXME: extra hack convert command like !image => ! image
    : message.replace(`${prefix}`, '');

  return { command };
};
