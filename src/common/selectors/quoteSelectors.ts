import { createSelector } from 'reselect';
import { RootState } from 'common/types/store';
import { pick, omit } from 'common/utils';
import { Partition } from 'common/types/common';

export const quoteSelector = (state: RootState) => state.quote;

export const isLoadingSelector = createSelector(
  quoteSelector,
  (quote) => quote.isLoading
);

export const isErrorSelector = createSelector(
  quoteSelector,
  (quote) => quote.isError
);

export const errorSelector = createSelector(
  quoteSelector,
  (quote) => quote.error
);

export const quoteDataSelector = createSelector(
  quoteSelector,
  (quote) => quote.data
);

export const assetsSelector = createSelector(
  quoteDataSelector,
  (data) => data.assets
);

export const favouritesSelector = createSelector(
  quoteDataSelector,
  (data) => data.favourites
);

export const sortedAssetsSelector = createSelector(
  assetsSelector,
  favouritesSelector,
  (assets, favourites) =>
    Object.values({ ...pick(assets, favourites), ...omit(assets, favourites) })
);

export const partitionsSelector = createSelector(assetsSelector, (assets) => {
  const add = (obj: Partition, from: string, to: string, rate: number) => ({
    ...obj,
    [from]: { ...(obj[from] || {}), [to]: rate },
  });

  return Object.values(assets).reduce((acc, item) => {
    const [from, to] = item.asset.split('/');
    return add(
      add(acc, from, to, Number(item.quote)),
      to,
      from,
      1 / Number(item.quote)
    );
  }, {} as Partition);
});
