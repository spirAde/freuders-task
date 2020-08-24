import { takeLatest, put, call } from 'redux-saga/effects';
import {
  login,
  loginSuccess,
  loginError,
  logout,
} from 'common/slices/userSlice';
import { loginUserRequest } from 'common/api/userApi';
import { AUTH_TOKEN } from 'common/constants';

export function* loginSaga({ payload }: ReturnType<typeof login>) {
  try {
    yield call(loginUserRequest, payload);
    yield call([localStorage, 'setItem'], AUTH_TOKEN, 'true');
    yield put(loginSuccess());
  } catch (error) {
    yield put(loginError(error));
  }
}

export function* logoutSaga() {
  yield call([localStorage, 'removeItem'], AUTH_TOKEN);
}

export default function* watchUserSaga() {
  yield takeLatest(login, loginSaga);
  yield takeLatest(logout, logoutSaga);
}
