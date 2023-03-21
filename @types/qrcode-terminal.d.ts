declare module 'qrcode-terminal' {

  export interface GenerateOptions {
    small?: boolean;
  }
  export function generate(data: string, options?: GenerateOptions): void;
}