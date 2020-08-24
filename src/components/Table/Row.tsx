import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { Column, Row as RowType } from './types';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

  &:last-child {
    border-bottom: none;
  }
`;

type Props = {
  row: Record<string, any>;
  columns: Column[];
  renderCell?: (row: RowType, key: string) => React.ReactElement;
};

const defaultRenderCell = (row: RowType, key: string) => (
  <Cell key={`${row.id}-${key}`}>{row[key]}</Cell>
);

const Row = ({ row, columns, renderCell }: Props) => {
  const renderedCells = columns.map(({ key, width }) => {
    const renderCellFn = renderCell || defaultRenderCell;
    return width
      ? React.cloneElement(renderCellFn(row, key), { width })
      : renderCellFn(row, key);
  });

  return <Wrapper>{renderedCells}</Wrapper>;
};

export default Row;
