/** Bot type registration
 *  Register newly created Bot version here
 **/
export const botTypes = ['default', 'test'] as const;

export type BotType = (typeof botTypes)[number];
