import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseBase } from 'common/types/api';
import { Deal } from 'common/types/common';

export type HistoryState = {
  isLoading: boolean;
  isError: boolean;
  error: string;
  data: Deal[];
};

export type HistoryResponse = ResponseBase & { deals: Deal[] };

export type HistorySuccessPayload = Deal[];

const initialState: HistoryState = {
  isLoading: false,
  isError: false,
  error: '',
  data: [],
};

const reducers = {
  fetchHistory(state: HistoryState) {
    state.isLoading = true;
    state.isError = false;
    state.error = '';
  },
  fetchHistorySuccess(
    state: HistoryState,
    action: PayloadAction<HistorySuccessPayload>
  ) {
    state.isLoading = false;
    state.data = action.payload;
  },
  fetchHistoryError(state: HistoryState, action: PayloadAction<string>) {
    state.isLoading = false;
    state.isError = true;
    state.error = action.payload;
  },
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers,
});

export const {
  fetchHistory,
  fetchHistorySuccess,
  fetchHistoryError,
} = historySlice.actions;
export default historySlice.reducer;
