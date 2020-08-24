import React from 'react';
import styled from 'styled-components';

const TabBase = styled.div<{ isActive: boolean }>`
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
  height: 40px;
  max-width: 180px;
  flex-grow: 1;
  font-size: 14px;
  line-height: 19px;
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.white : theme.colors.blue};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.blue : theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.blue};
  border-bottom: none;
  cursor: pointer;
  user-select: none;

  &:first-child {
    border-top-left-radius: 20px;
  }

  &:last-child {
    border-top-right-radius: 20px;
  }

  &:nth-child(2n) {
    border-left: none;
    border-right: none;
  }
`;

type Props = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const Tab = ({ isActive, children, onClick }: Props) => (
  <TabBase isActive={isActive} onClick={onClick}>
    {children}
  </TabBase>
);

export default Tab;
