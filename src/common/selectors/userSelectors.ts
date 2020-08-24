import { createSelector } from 'reselect';
import { RootState } from 'common/types/store';

export const userSelector = (state: RootState) => state.user;

export const errorSelector = createSelector(userSelector, (user) => user.error);

export const userDataSelector = createSelector(
  userSelector,
  (user) => user.data
);

export const isLoggedInSelector = createSelector(
  userDataSelector,
  (data) => data.isLoggedIn
);
