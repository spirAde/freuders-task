import { takeLatest, put, call } from 'redux-saga/effects';
import { sorting } from 'common/utils';
import {
  fetchHistory,
  fetchHistorySuccess,
  fetchHistoryError,
  HistoryResponse,
} from './historySlice';
import { fetchHistoryRequest } from './historyApi';

export function* fetchHistorySaga() {
  try {
    const { data }: { data: HistoryResponse } = yield call(fetchHistoryRequest);

    yield put(fetchHistorySuccess(sorting(data.deals)));
  } catch (error) {
    yield put(fetchHistoryError(error));
  }
}

export default function* watchHistorySaga() {
  yield takeLatest(fetchHistory, fetchHistorySaga);
}
