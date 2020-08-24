import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { errorSelector } from 'common/selectors/userSelectors';
import { login } from 'common/slices/userSlice';
import { LoginForm } from './LoginForm';
import { Values } from './types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  min-height: 400px;
  max-width: 480px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 27px;
  padding: 17px 0 16px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 20px 20px 0 0;
  max-width: 480px;
  width: 100%;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 60px 0 60px;
`;

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector(errorSelector);

  const handleSubmit = (values: Values) => dispatch(login(values));

  return (
    <Wrapper>
      <Header>Вход в личный кабинет</Header>
      <InnerWrapper>
        <LoginForm error={error} onSubmit={handleSubmit} />
      </InnerWrapper>
    </Wrapper>
  );
};

export default Login;
