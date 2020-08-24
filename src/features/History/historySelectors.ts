import { createSelector } from 'reselect';
import { RootState } from 'common/types/store';

export const historySelector = (state: RootState) => state.history;

export const isLoadingSelector = createSelector(
  historySelector,
  (history) => history.isLoading
);

export const isErrorSelector = createSelector(
  historySelector,
  (history) => history.isError
);

export const errorSelector = createSelector(
  historySelector,
  (history) => history.error
);

export const dataSelector = createSelector(
  historySelector,
  (history) => history.data
);
