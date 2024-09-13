export type Setter<T> = (value: T) => any;
export type AnyFn = (...args: any) => any;
export type AnyFnPromise = () => Promise<any>;
export type KeySetter<T> = (key: keyof T, value: T[keyof T]) => any;
