import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Table, Cell, Icon, Loader } from 'components';
import {
  isLoadingSelector,
  isErrorSelector,
  errorSelector,
  sortedAssetsSelector,
  favouritesSelector,
} from 'common/selectors/quoteSelectors';
import { fetchQuote, toggleFavourites } from 'common/slices/quoteSlice';
import { COLUMNS } from './constants';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 460px;
  width: 100%;
`;

const IconStyled = styled(Icon)`
  cursor: pointer;
`;

const CurrencyRates = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(isLoadingSelector);
  const isError = useSelector(isErrorSelector);
  const error = useSelector(errorSelector);
  const assets = useSelector(sortedAssetsSelector);
  const favourites = useSelector(favouritesSelector);

  const shouldLoad = !assets.length;

  const fetchAssets = useCallback(() => dispatch(fetchQuote()), [dispatch]);
  const handleToggleAsset = (asset: string) => () =>
    dispatch(toggleFavourites(asset));

  useEffect(() => {
    if (shouldLoad) fetchAssets();
  }, [fetchAssets, shouldLoad]);

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

  const renderCell = (row: Record<string, any>, key: string) => {
    if (key === 'star') {
      const iconName = favourites.includes(row.id) ? 'STAR_FILL' : 'STAR_EMPTY';

      return (
        <Cell key={`${row.id}-${key}`}>
          <IconStyled
            size={24}
            icon={iconName}
            onClick={handleToggleAsset(row.id)}
          />
        </Cell>
      );
    }

    return <Cell key={`${row.id}-${key}`}>{row[key]}</Cell>;
  };

  return (
    <Wrapper>
      <Table columns={COLUMNS} data={assets} renderCell={renderCell} />
    </Wrapper>
  );
};

export default CurrencyRates;
