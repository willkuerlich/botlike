import { middleWarePipeline, NextFunction } from 'src/lib/middleware/middleware';

type DummyContext = {
  value: number;
  cb: (r: number) => void;
};

const doubleMiddleware = (ctx: DummyContext, next: NextFunction) => {
  ctx.value = ctx.value * 2;
  ctx.cb(ctx.value);
  next();
};

export const middlewareDemo = async () => {
  const pipeline = middleWarePipeline<DummyContext>();
  pipeline.push(doubleMiddleware);
  pipeline.push(doubleMiddleware);

  let val = -1;

  const cb = (v: number) => {
    val = v;
  };

  await pipeline.execute({ value: 1, cb });
  return val;
};
