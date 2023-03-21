declare module 'wwebjs-mongo' {
  import mongoose from 'mongoose';

  export interface MongoStoreArgs {
    mongoose: typeof import('mongoose');
  }

  export class MongoStore {
    constructor(args: MongoStoreArgs);

    sessionExists(): boolean | Promise<boolean>;
    // X-TODO: provide exact signatures for:
    delete(): void;
    save(): void;
    extract(): void;
  }
}
