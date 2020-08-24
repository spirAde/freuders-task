import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 1000px;
  width: 100%;
`;

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <Wrapper>
    <InnerWrapper>{children}</InnerWrapper>
  </Wrapper>
);

export default Layout;
