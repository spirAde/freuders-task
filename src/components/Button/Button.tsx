import React from 'react';
import styled from 'styled-components';
import { Icon, ICONS } from 'components/Icon';

const ButtonBase = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  min-width: fit-content;
  padding: 9px 31px 9px 32px;
  border-radius: 20px;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueLight};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.blueDark};
  }
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 22px;
  margin: 0 6px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: keyof typeof ICONS;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({
  children,
  icon,
  onClick,
  type = 'button',
  ...props
}: Props) => (
  <ButtonBase type={type} onClick={onClick} {...props}>
    <Text>{children}</Text>
    {icon && (
      <IconWrapper>
        <Icon icon={icon} color="#FFF" size={16} />
      </IconWrapper>
    )}
  </ButtonBase>
);

export default Button;
