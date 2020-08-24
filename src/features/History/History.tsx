import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Pagination, Loader } from 'components';
import { usePagination } from 'common/hooks';
import {
  dataSelector,
  isLoadingSelector,
  errorSelector,
  isErrorSelector,
} from './historySelectors';
import { fetchHistory } from './historySlice';
import { COLUMNS } from './constants';

const Wrapper = styled.div`
  min-height: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PaginationStyled = styled(Pagination)`
  margin: 50px 0 20px;
  justify-content: center;
`;

const ITEMS_PER_PAGE = 10;

const History = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(isLoadingSelector);
  const isError = useSelector(isErrorSelector);
  const error = useSelector(errorSelector);
  const data = useSelector(dataSelector);

  const shouldLoad = !data.length;

  const { page, total, onChangePage, items } = usePagination(
    data,
    ITEMS_PER_PAGE
  );

  const fetchHistoryItems = useCallback(() => dispatch(fetchHistory()), [
    dispatch,
  ]);

  useEffect(() => {
    if (shouldLoad) fetchHistoryItems();
  }, [fetchHistoryItems, shouldLoad]);

  if (isLoading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  if (isError) {
    return <Wrapper>{error}</Wrapper>;
  }

  return (
    <Wrapper>
      <Table columns={COLUMNS} data={items} />
      <PaginationStyled current={page} total={total} onChange={onChangePage} />
    </Wrapper>
  );
};

export default History;
