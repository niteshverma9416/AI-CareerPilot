export type AsyncFunction<TArgs extends unknown[] = unknown[], TResult = unknown> =
  (...args: TArgs) => Promise<TResult>;
