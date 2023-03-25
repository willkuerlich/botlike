import z from 'zod';

export const zodTransformStringToBoolean = (val: string, ctx: z.RefinementCtx) => {
  const parsed = val.toLowerCase();
  if (parsed !== 'true' && parsed !== 'false') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${ctx.path}: "${val}" is not a boolean value`,
    });

    // This is a special symbol you can use to
    // return early from the transform function.
    // It has type `never` so it does not affect the
    // inferred return type.
    return z.NEVER;
  }
  return parsed;
};
