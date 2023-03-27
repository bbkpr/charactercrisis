import { AxiosRequestConfig } from 'axios';
import { Character } from '../models/character';

export const any = <T>(list: T[]): boolean => !isNil(list) && list.length > 0;

export type Nullish = null | undefined;

export type Maybe<T> = T | Nullish;

export type JestAxiosUnknownSpyInstance = jest.SpyInstance<
  Promise<unknown>,
  [url: string, config?: AxiosRequestConfig<unknown>]
>;

export const isNil = <T>(item: Maybe<T>): item is Nullish => item === undefined || item === null;

export const round = (num: number, decimals = 2): number => {
  const base = 10 ** decimals;
  return Math.round(num * base) / base;
};

export const isTruthy = (value: string | number | boolean) =>
  value != null && [true, 'true', 1, '1'].indexOf(value) > -1;

/**
 * Turn a 0 - 100 stat into a letter grade in [S, A, B, C, D]. Note that the S grade is greater-than 80, while the rest
 * are greater-than or equal to the low end of the score. I chose to keep the 0 - 100 score, even though there are now only 5 letter grades, so that
 * I can add +/- to the grades later, or if there's another reason to be specific.
 * @param value Stat score
 * @returns S, A, B, C, D. If unknown, return U.
 */
export const letterGrade = (value: number) => {
  return value > 80 ? 'S' : value >= 60 ? 'A' : value >= 40 ? 'B' : value >= 20 ? 'C' : value != null ? 'D' : 'U';
};

/**
 * Normalize 0 - 100 stat scores for display _numbers_ on `StatRadar`, so they are displayed evenly even if the
 * backing stat numbers aren't rounded (see `letterGrade` comments for more on the 0 - 100 scale)
 *
 * @param value Stat score
 * @returns The normalized stat score (1 - 5)
 */
export const normalizeStatScore = (value: number) => {
  return value > 80 ? 5 : value >= 60 ? 4 : value >= 40 ? 3 : value >= 20 ? 2 : value != null ? 1 : 0;
};

/**
 * Convert 1 - 5 stat scores to display _letters_ for values on  `StatRadar`.
 *
 * @param nStatScore Normalized Stat Score (1 - 5)
 * @returns The normalized stat score as a letter grade (S - D or U for unknown)
 */
export const normalizedLetterGrade = (nStatScore: number) => {
  return nStatScore === 5
    ? 'S'
    : nStatScore === 4
    ? 'A'
    : nStatScore === 3
    ? 'B'
    : nStatScore === 2
    ? 'C'
    : nStatScore === 1
    ? 'D'
    : 'U';
};

export const calculateScoreDifference = (c1: Character, c2: Character) => {
  let sum = 0;
  c1.character_stat.forEach((cs1) => {
    sum += Math.abs(cs1.value - c2.character_stat.find((cs2) => cs1.stat_id === cs2.stat_id).value);
  });
  return sum;
};
