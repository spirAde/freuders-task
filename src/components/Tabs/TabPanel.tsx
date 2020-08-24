import React from 'react';
import styled from 'styled-components';

const Panel = styled.div``;

type Props = {
  value: string;
  title: string;
  children: React.ReactNode;
};

const TabPanel = ({ value, title, children }: Props) => (
  <Panel>{children}</Panel>
);

export default TabPanel;
