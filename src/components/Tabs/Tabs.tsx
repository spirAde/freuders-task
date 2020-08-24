import React from 'react';
import styled from 'styled-components';
import Tab from './Tab';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TabsRow = styled.div`
  display: flex;
`;

const TabPanel = styled.div`
  border-radius: 0 20px 20px 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;

type ChildProps = {
  value: string;
  title: string;
};

type ReactChild = React.ReactElement<ChildProps> | React.ReactElement;

type Props = {
  active: string;
  children: React.ReactElement[];
  onChange: (value: string) => void;
};

const Tabs = ({ active, onChange, children }: Props) => {
  const renderedTabs = React.Children.map(
    children,
    ({ props: { value, title } }: ReactChild) => {
      const isActive = value === active;

      return (
        <Tab isActive={isActive} key={value} onClick={() => onChange(value)}>
          {title}
        </Tab>
      );
    }
  );

  const renderedPanel = React.Children.toArray(children).find(
    // @ts-ignore
    ({ props: { value } }) => value === active
  );

  return (
    <Wrapper>
      <TabsRow>{renderedTabs}</TabsRow>
      <TabPanel>{renderedPanel}</TabPanel>
    </Wrapper>
  );
};

export default Tabs;
