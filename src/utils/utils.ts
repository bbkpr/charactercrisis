import { AxiosRequestConfig } from 'axios';
import { not } from 'ramda';

export const any = <T>(list: T[]): boolean => !isNil(list) && list.length > 0;

export type Nullish = null | undefined;

export type Maybe<T> = T | Nullish;

export type JestAxiosUnknownSpyInstance = jest.SpyInstance<
  Promise<unknown>,
  [url: string, config?: AxiosRequestConfig<unknown>]
>;

export const isNil = <T>(item: Maybe<T>): item is Nullish => item === undefined || item === null;

export const isNotNil = <T>(item: Maybe<T>): item is T => not(isNil(item));

export const round = (num: number, decimals = 2): number => {
  const base = 10 ** decimals;
  return Math.round(num * base) / base;
};

export const isTruthy = (value: string | number | boolean) =>
  value != null && [true, 'true', 1, '1'].indexOf(value) > -1;

/** Turn a 0 - 100 score into a letter grade in [S, A, B, C, D] */
export const letterGrade = (value: number) => {
  return value >= 80 ? 'S' : value >= 60 ? 'A' : value >= 40 ? 'B' : value >= 20 ? 'C' : 'D';
};
