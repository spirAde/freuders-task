import React from 'react';
import styled from 'styled-components';
import { Button } from 'components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1168px;
  padding: 22px 20px 0 20px;
  margin: 0 auto 30px auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Logo = styled.div`
  font-style: italic;
  font-weight: bold;
  font-size: 21px;
  line-height: 33px;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 20px;
  }
`;

const ButtonStyled = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.blue};
  border: 1px solid ${({ theme }) => theme.colors.blue};
  max-width: 130px;

  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.blue};
    border: 1px solid ${({ theme }) => theme.colors.blue};
  }
`;

type Props = {
  isLoggedIn: boolean;
  onClickLogout: () => void;
};

const Header = ({ isLoggedIn, onClickLogout }: Props) => (
  <Wrapper>
    <Logo>TEST SPA app</Logo>
    {isLoggedIn && <ButtonStyled onClick={onClickLogout}>Выход</ButtonStyled>}
  </Wrapper>
);

export default Header;
