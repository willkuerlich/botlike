// X-TODO: any args

/** just to have a base type to extend from */
export interface BaseEventBindings extends Record<string, (...args: any) => void> {
  [k: string]: (...args: any) => void;
}

export interface BaseAdapterConfig<TEventBindings extends BaseEventBindings> {
  eventBindings: Partial<TEventBindings>;
  // store
  // state or only 1 of them
}
