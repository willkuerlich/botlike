/** GPT3 codex model type registration - Register newly created codex models here
 *  - https://beta.openai.com/docs/models/codex
 **/
export const CodexModelTypes = [
  'code-davinci-002', // Most capable Codex model. Particularly good at translating natural language to code. In addition to completing code, also supports inserting completions within code.
  'code-cushman-001', // Almost as capable as Davinci Codex, but slightly faster. This speed advantage may make it preferable for real-time applications.
] as const;

// export const defaultCodexModel: Gpt3CodexModelType = 'code-davinci-002';
export const defaultCodexModel: CodexModelType = 'code-cushman-001';
export const defaultCodexModelMaxTokens: number = 500; // davinci = 8k | cushman = 2,048

export type CodexModelType = (typeof CodexModelTypes)[number];
