import { takeLatest, put, call } from 'redux-saga/effects';
import {
  fetchQuote,
  fetchQuoteSuccess,
  fetchQuoteError,
  QuoteResponse,
} from 'common/slices/quoteSlice';
import { fetchQuoteRequest } from 'common/api/quoteApi';
import { uuid, formatDate } from 'common/utils';

export function* fetchQuoteSaga() {
  try {
    const { data }: { data: QuoteResponse } = yield call(fetchQuoteRequest);

    const assets = data.assets.reduce((accumulator, asset) => {
      const id = uuid();
      return {
        ...accumulator,
        [id]: {
          id,
          ...asset,
          startDate: formatDate(asset.startDate, 'DD.MM.YYYY'),
        },
      };
    }, {});

    yield put(fetchQuoteSuccess(assets));
  } catch (error) {
    yield put(fetchQuoteError(error));
  }
}

export default function* watchQuoteSaga() {
  yield takeLatest(fetchQuote, fetchQuoteSaga);
}
