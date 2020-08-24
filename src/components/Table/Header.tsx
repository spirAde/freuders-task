import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { Column } from './types';

const Wrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  border-top-right-radius: 20px;
  height: 60px;
`;

type Props = {
  columns: Column[];
};

const Header = ({ columns }: Props) => {
  const renderedCells = columns.map(({ label, width }, index) => (
    <Cell key={`header-cell-${index}`} width={width}>
      {label}
    </Cell>
  ));

  return <Wrapper>{renderedCells}</Wrapper>;
};

export default Header;
