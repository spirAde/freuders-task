import styled from 'styled-components';

const Cell = styled.div<{ width?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-basis: 0;
  height: 58px;

  ${({ width }) =>
    width
      ? `
    flex-basis: ${width};
  `
      : `flex-grow: 1;
  flex-basis: 0;`};
`;

export default Cell;
