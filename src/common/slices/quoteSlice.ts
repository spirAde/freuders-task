import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseBase } from 'common/types/api';

export type Asset = {
  asset: string;
  startDate: string;
  quote: string;
};

export type QuoteState = {
  isLoading: boolean;
  isError: boolean;
  error: string;
  data: {
    assets: Record<string, Asset>;
    favourites: string[];
  };
};

export type QuoteResponse = ResponseBase & { assets: Asset[] };

export type QuoteSuccessPayload = Record<string, Asset>;

const initialState: QuoteState = {
  isLoading: false,
  isError: false,
  error: '',
  data: {
    assets: {},
    favourites: [],
  },
};

const reducers = {
  fetchQuote(state: QuoteState) {
    state.isLoading = true;
    state.isError = false;
    state.error = '';
  },
  fetchQuoteSuccess(
    state: QuoteState,
    action: PayloadAction<QuoteSuccessPayload>
  ) {
    state.isLoading = false;
    state.data.assets = action.payload;
  },
  fetchQuoteError(state: QuoteState, action: PayloadAction<string>) {
    state.isLoading = false;
    state.isError = true;
    state.error = action.payload;
  },
  toggleFavourites(state: QuoteState, action: PayloadAction<string>) {
    state.data.favourites = state.data.favourites.includes(action.payload)
      ? state.data.favourites.filter((asset) => asset !== action.payload)
      : state.data.favourites.concat(action.payload);
  },
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers,
});

export const {
  fetchQuote,
  fetchQuoteSuccess,
  fetchQuoteError,
  toggleFavourites,
} = quoteSlice.actions;
export default quoteSlice.reducer;
