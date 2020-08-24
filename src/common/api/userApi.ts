import axios from 'common/axios';
import { UserLoginData, LoginResponse } from 'common/slices/userSlice';

export const loginUserRequest = ({
  email,
  password,
}: UserLoginData): Promise<LoginResponse> =>
  axios.post('', {
    action: 'login',
    login: email,
    password,
  });
