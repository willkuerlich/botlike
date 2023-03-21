import { createMachine, interpret } from 'xstate';

// https://xstate.js.org/docs/guides/guards.html#guards-condition-functions
// const isPromptValid = (context: any, event: any) => {
//   return context.foo && event.query && event.query.length > 0;
// };

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAUBOB7AtgBwC4FkBDAYwAsBLAOzADpj1KAzc1TKqAWns00MogDEAbQAMAXUShs6WOVzkGkkAA9EHACwB2GgEYAzOoBsmgEwidmgJzHN6gDQgAnmoCsADj01zxly5Eu9ES09AF8QhzQsPCIyKlpyCAAbMAFkACUAeXxkABVRCSQQaVl5RULVBA5DERp1HXc3Nx16tyM3XwdnSs1bGkMTK0sTPWa9FxMTMIiMHAISCmoabEJUWUpOXihyYg4AazBHAQA5DI58AEEAcQBJAGEOAGkAUQBNfKViuQVKJQqJnRoek0gVsOhM1kMhjchk6akMLnUNEsgREwwshh08Mm4RAkVmMQWtGWq3YHE22z2BwEFxu92eb3EHxkXzKoAq6n8fR0lksIjGhnU6gCOlhlXhiORIlRI00GKxU1xM2i8ziNFguBIu1J3F4-AEtyyADFrml8O9Cp9Sj9yogTOpPNURJogrZ1LywfYnK4RG4aAFgVKdCJLNC9KEFZR0BA4Eo8crYtQmSVvr81PUXDRNNyXDojDz2iYXKKONCTH1hvDmu1Q5YFXG5gn4kkwEmWda2XCAbKoQN6vChv0YV6xQikRy3KZDJZTEC60qG4Slis1htCFsdvsulJmVbUwgJtp3Jixk69AM+W5iz0M-orJp-RzrOHplEF6r6EwWGx1lwsLqIK2u42pUQbaFmlg5nmIbjDmxZ+L6CJNDm3jDAELhzq+BKquqmran+fAARaO4psBehuDUrrOuMgYQXocE+n66hIUGmKoWMYRhEAA */
  createMachine(
    {
      id: 'PromptMachine',
      tsTypes: {} as import('./PromptMachine.typegen').Typegen0,
      initial: 'idle',

      states: {
        idle: {
          on: {
            PROMPT: {
              target: 'parsing-magic-key',
              cond: 'isPromptValid',
              // cond: isPromptValid,
              // cond: (context, event) =>
              //   context.foo && event.query && event.query.length > 0,
            },
          },
        },

        'parsing-magic-key': {
          type: 'parallel',

          on: {
            'NO-MAGIC-KEY': 'idle',
            'MAGIC-KEY': 'stacking-command',
          },
        },

        'confirming-command': {
          always: 'idle',
        },

        'stacking-command': {
          on: {
            COMFIRM: 'confirming-command',
          },
        },
      },

      // schema: {
      //   context: {} as {},
      //   events: {} as PromptMachineEvents,
      // },
      context: {
        foo: 'not-bar',
      },

      predictableActionArguments: true,
      preserveActionOrder: true,
    },
    {
      guards: {
        isPromptValid: (context: { foo: string }, event: any, { cond }: any) => {
          return context.foo && event.query && event.query.length > 0;
        },
      },
    },
  );

// Edit your service(s) here
export const service = interpret(machine).onTransition((state) => {
  console.log('PromptMachine state: ', state.value);
});

const { initialState } = machine;
const nextState = machine.transition(initialState, 'PROMPT', { foo: 'another val' });

console.log(nextState.value);
