import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseBase } from 'common/types/api';
import { AUTH_TOKEN } from 'common/constants';

export type UserLoginData = {
  email: string;
  password: string;
};

export type LoginResponse = ResponseBase;

export type UserState = {
  isLoading: boolean;
  isError: boolean;
  error: string;
  data: {
    isLoggedIn: boolean;
  };
};

const initialState: UserState = {
  isLoading: false,
  isError: false,
  error: '',
  data: {
    isLoggedIn: !!localStorage.getItem(AUTH_TOKEN),
  },
};

const reducers = {
  login(state: UserState, action: PayloadAction<UserLoginData>) {
    state.isLoading = true;
    state.isError = false;
    state.error = '';
  },
  loginSuccess(state: UserState) {
    state.isLoading = false;
    state.data.isLoggedIn = true;
  },
  loginError(state: UserState, action: PayloadAction<string>) {
    state.isLoading = false;
    state.isError = true;
    state.error = action.payload;
  },
  logout(state: UserState) {
    state.data.isLoggedIn = false;
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
});

export const { login, loginSuccess, loginError, logout } = userSlice.actions;
export default userSlice.reducer;
