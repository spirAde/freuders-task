import { Deal } from 'common/types/common';

const ITEMS_PER_PAGE = 10;
const MIN_PROFIT = 0;
const MAX_PROFIT = 100;

export function pick<T>(
  object: Record<string, T>,
  keys: string[]
): Record<string, T> {
  return keys.reduce((obj, key) => {
    if (object && Reflect.has(object, key)) {
      obj[key] = object[key];
    }

    return obj;
  }, {} as Record<string, T>);
}

export function omit<T>(
  object: Record<string, T>,
  keys: string[]
): Record<string, T> {
  return keys.reduce((obj, key) => {
    if (object && Reflect.has(object, key)) {
      return obj;
    }

    obj[key] = object[key];
    return obj;
  }, object as Record<string, T>);
}

export function uuid() {
  return Math.random().toString(36).substr(2, 9);
}

export function formatDate(dateStr: string, pattern: string) {
  const dateObj = new Date(dateStr);

  const year = String(dateObj.getFullYear()).slice(-2);
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const date = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth()).padStart(2, '0');

  return pattern
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', date)
    .replace('HH', hours)
    .replace('mm', minutes);
}

type SplittedItems = {
  loss: Deal[];
  profit: Deal[];
  rest: Deal[];
};

function split(items: Deal[]) {
  return items.reduce<SplittedItems>(
    (accumulator, item) => {
      const profit = +item.profit;

      if (profit < MIN_PROFIT) {
        accumulator.loss.push(item);
        return accumulator;
      }

      if (profit > MAX_PROFIT) {
        accumulator.profit.push(item);
        return accumulator;
      }

      accumulator.rest.push(item);
      return accumulator;
    },
    {
      loss: [],
      profit: [],
      rest: [],
    }
  );
}

function calculateStep(count: number, itemsPerPage: number) {
  return Math.floor(count / itemsPerPage);
}

function calculateSteps(items: SplittedItems) {
  const { loss, profit, rest } = items;
  return {
    lossStep: calculateStep(loss.length, ITEMS_PER_PAGE),
    profitStep: calculateStep(profit.length, ITEMS_PER_PAGE),
    restStep: calculateStep(rest.length, ITEMS_PER_PAGE),
  };
}

export function sorting(items: Deal[]) {
  const getSlice = (arr: Deal[], step: number, isLast: boolean) =>
    arr.splice(0, isLast ? arr.length : step);

  const splitted = split(items);
  const { loss, profit, rest } = splitted;
  const { lossStep, profitStep, restStep } = calculateSteps(splitted);

  const chunksLength = Math.ceil(items.length / ITEMS_PER_PAGE);

  return Array.from({ length: chunksLength }, (_, index) => {
    const isLast = index === chunksLength - 1;
    const chunk = [
      ...getSlice(loss, lossStep, isLast),
      ...getSlice(profit, profitStep, isLast),
      ...getSlice(rest, restStep, isLast),
    ];

    chunk.sort(
      (a, b) =>
        new Date(b.finishDate).getTime() - new Date(a.finishDate).getTime()
    );

    return chunk.map((item) => ({
      ...item,
      startDate: formatDate(item.startDate, 'HH:mm DD.MM.YYYY'),
      finishDate: formatDate(item.finishDate, 'HH:mm DD.MM.YYYY'),
    }));
  }).flat();
}
