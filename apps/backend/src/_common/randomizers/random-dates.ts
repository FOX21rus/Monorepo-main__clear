import { randInt } from './rand-int';

export const randomDates = (
  maxRangeYears: number,
  spreadYears: number,
  isPast: boolean,
) => {
  const now = Date.now();
  const rangeMs = maxRangeYears * 365 * 24 * 60 * 60 * 1000;
  const spreadMs = spreadYears * 365 * 24 * 60 * 60 * 1000;
  const delta =
    Math.sign(rangeMs) *
    randInt(Math.round(Math.abs(rangeMs) / 10), Math.abs(rangeMs));
  const startMs = isPast ? now - delta : now + delta;
  const finishMs =
    startMs +
    Math.sign(spreadMs) *
      randInt(Math.round(Math.abs(spreadMs) / 10), Math.abs(spreadMs));
  return {
    start: new Date(startMs),
    finish: new Date(finishMs),
  };
};
