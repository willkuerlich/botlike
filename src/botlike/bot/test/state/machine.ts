import { createMachine, interpret } from 'xstate';
// const initialContextValue = 1;
// const fooMachine = createMachine({
//   id: 'nameOf',
//   tsTypes: {} as import("./machine.typegen").Typegen0,
//   schema: {
//     context: {} as { foo: number },
//     events: {} as { type: 'eventType' },
//   },
//   context: {
//     foo: 1,
//   },
//   initial: 'initialState',
//   states: {
//     initialState: {},
//   },
// });

interface ToggleContext {
  count: number;
}

type ToggleEvent = {
  type: 'PROMPT';
};

// Edit your machine(s) here
const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDo8MAXbANzAGIAVAeQHEGAZAUQG0AGAXUVAAcA9rGxlBuPiAAeiAIyyATAU6zOAFgAcANjWytAZgCcCgKwmANCACeiBZyUB2WRpP7OWk2sOcHC-QF9-SzQsPEJSCmp6JjYuXiQQIRExCQSZBAVDQwJZQzUVPQ0NPwU1SxsEYuVdBxNZNVK1Ay1ZQOCMHHwCACdUCGxBAEF0MkpaRhYOHkkk0QHU0HTNLQJ9YucWw08HNTLrW3sCJxc3Dy8fP0CgkFxBCDhJEM6wGeE58Ul0gFotcsQvkwEXZGBTONz6LTGfRqNogJ5hIi4CKUV7JeafRANP6VBwEMxadwqMwlHaw+FdZEvBKzFIYhBmWSrBSZdxeXT5X77BDeZQmAkE2TE-QKBxaMkdBG9fpDEaRVHvBbSWw8kwaPKcIo7OqyBzYuyOHxaByGHYnOpiq5AA */
  createMachine(
    /* <ToggleContext, ToggleEvent> */ {
      id: 'machine',
      tsTypes: {} as import('./machine.typegen').Typegen0,
      predictableActionArguments: true, // https://xstate.js.org/docs/guides/actions.html
      // schema: {
      //   context: {} as { foo: number },
      //   events: {} as { type: 'eventType' },
      // },
      schema: {
        context: {} as {},
        events: {} as MachineEvents,
      },
      context: {
        count: 0,
      },
      initial: 'inactive',
      states: {
        inactive: {
          on: { PROMPT: 'radioActive' },
        },

        active: {
          on: { PROMPT: 'inactive' },
        },

        radioActive: {
          on: {
            PROMPT: 'active',
          },
        },
      },
    },
  );

// Edit your service(s) here
export const service = interpret(machine).onTransition((state) => {
  console.log(state.value);
});

export type MachineEvents = { type: 'PROMPT' };

// service.start();

// service.send("TOGGLE");
// service.send("TOGGLE");
