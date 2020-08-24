import { all, fork } from 'redux-saga/effects';
import { userSaga, quoteSaga } from 'common/sagas';
import { historySaga } from 'features/History';

export default function* rootSaga() {
  yield all([userSaga, quoteSaga, historySaga].map((saga) => fork(saga)));
}
