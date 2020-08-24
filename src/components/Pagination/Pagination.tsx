import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Icon } from 'components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconStyled = styled(Icon)`
  cursor: pointer;
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 20px;
`;

const CurrentPage = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.blue};
  font-size: 16px;
  line-height: 22px;
  user-select: none;
  width: 36px;
`;

const TotalPages = styled.div`
  font-size: 16px;
  line-height: 22px;
  user-select: none;
`;

const Separator = styled.div`
  margin: 0 10px;
  user-select: none;
`;

type Props = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

const Pagination = ({ current, total, onChange, ...props }: Props) => {
  const theme = useTheme();

  const prev = Math.max(current - 1, 1);
  const next = Math.min(current + 1, total);

  const handleClickPrev = () => {
    if (prev === current) return;
    onChange(prev);
  };

  const handleClickNext = () => {
    if (next === current) return;
    onChange(next);
  };

  const isLeftIconDisabled = current === 1;
  const isRightIconDisabled = current === total;

  return (
    <Wrapper {...props}>
      <IconStyled
        icon="ARROW_LEFT"
        size={24}
        color={isLeftIconDisabled ? theme.colors.gray : theme.colors.blue}
        onClick={handleClickPrev}
      />
      <InnerWrapper>
        <CurrentPage>{current}</CurrentPage>
        <Separator>/</Separator>
        <TotalPages>{total}</TotalPages>
      </InnerWrapper>
      <IconStyled
        icon="ARROW_RIGHT"
        size={24}
        color={isRightIconDisabled ? theme.colors.gray : theme.colors.blue}
        onClick={handleClickNext}
      />
    </Wrapper>
  );
};

export default Pagination;
