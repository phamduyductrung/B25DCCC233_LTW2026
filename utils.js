import { POINTS, RANKS } from './data';

export const calcScore = (answers) =>
  answers.filter((item) => item.correct).reduce((sum, item) => sum + POINTS[item.level], 0);

export const getRank = (score) => RANKS.find((item) => score >= item.min)?.title || RANKS[RANKS.length - 1].title;
