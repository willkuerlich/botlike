/** Authentication type registration
 *  - legacySession is not supported
 **/
export const authenticationTypes = ['local', 'remote' /* , 'legacySession' */] as const;

export type AuthenticationType = (typeof authenticationTypes)[number];
