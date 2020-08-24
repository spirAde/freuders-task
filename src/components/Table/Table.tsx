import React from 'react';
import styled from 'styled-components';
import { Scrollbar } from 'react-scrollbars-custom';
import Header from './Header';
import Row from './Row';
import { Column } from './types';

const DataGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RowsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 30px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0 0 20px 20px;
  max-height: 400px;
`;

type Props = {
  columns: Column[];
  data: any[];
  renderCell?: (row: Record<string, any>, key: string) => React.ReactElement;
  minHeight?: number;
};

const Table = ({
  columns,
  data,
  renderCell,
  minHeight = 400,
  ...props
}: Props) => {
  const renderedRows = data.map((row, index) => (
    <Row
      key={row.id || `row-${index}`}
      row={row}
      columns={columns}
      renderCell={renderCell}
    />
  ));

  return (
    <DataGrid {...props}>
      <Header columns={columns} />
      <Scrollbar style={{ height: minHeight }}>
        <RowsWrapper>{renderedRows}</RowsWrapper>
      </Scrollbar>
    </DataGrid>
  );
};

export default Table;
