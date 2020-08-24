import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from 'common/hooks';
import { Icon } from 'components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 80px;
`;

const SelectedOption = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 10px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.blue};
  cursor: pointer;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  ${({ isOpen }) =>
    !isOpen &&
    `
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  `};
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.blue};
  border-radius: 0 0 5px 5px;
  border-top: none;
`;

const OptionBox = styled.div<{ isDisabled: boolean }>`
  padding: 4px 10px;
  font-size: 16px;
  line-height: 22px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ isDisabled, theme }) =>
    isDisabled ? theme.colors.gray : theme.colors.black};
  cursor: pointer;

  &:last-child {
    border-radius: 0 0 5px 5px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.purple};
  }
`;

type Option = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  options: Option[];
  disabled?: string[];
  onSelect: (value: string) => void;
};

const DEFAULT_OPTION = { value: '', label: '' };

const Select = ({ value, options, disabled = [], onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClickOutside = () => setIsOpen(false);

  const handleClickOption = (selectedValue: string) => {
    if (disabled?.includes(selectedValue)) {
      return;
    }

    handleToggle();
    onSelect(selectedValue);
  };

  useOnClickOutside(nodeRef, handleClickOutside);

  const renderedOptions = options.map((option) => {
    const isDisabled = disabled.includes(option.value);

    return (
      <OptionBox
        key={option.value}
        isDisabled={isDisabled}
        onClick={() => handleClickOption(option.value)}
      >
        {option.label}
      </OptionBox>
    );
  });

  const selectedOption =
    options.find((option) => option.value === value) || DEFAULT_OPTION;

  const iconName = isOpen ? 'CHEVRON_UP' : 'CHEVRON_DOWN';

  return (
    <Wrapper ref={nodeRef}>
      <SelectedOption isOpen={isOpen} onClick={handleToggle}>
        {selectedOption.label}
        <Icon icon={iconName} size={16} />
      </SelectedOption>
      {isOpen && <OptionList>{renderedOptions}</OptionList>}
    </Wrapper>
  );
};

export default Select;
