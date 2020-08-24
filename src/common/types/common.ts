export type Partition = Record<string, Record<string, number>>;

export type Asset = {
  id: string;
  quote: string;
  asset: string;
};

export type Deal = {
  asset: string;
  startDate: string;
  startQuote: string;
  finishDate: string;
  finishQuote: string;
  profit: string;
};
