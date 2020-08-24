import React from 'react';
import styled from 'styled-components';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';

type Props = {
  value: string;
  name?: string;
  type?: 'text' | 'password';
  onChange?: React.FormEventHandler<HTMLInputElement>;
  inputRef?: React.Ref<MaskedInput>;
} & MaskedInputProps;

const InputBase = styled(({ mask, inputRef, ...rest }: Props) =>
  mask ? (
    <MaskedInput
      {...rest}
      ref={inputRef}
      mask={mask}
      guide={false}
      keepCharPositions={false}
    />
  ) : (
    <input {...rest} />
  )
)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 9px 10px;
  font-size: 16px;
  line-height: 22px;
`;

const Input = ({ name, value, type = 'text', onChange, ...props }: Props) => (
  <InputBase
    name={name}
    value={value}
    type={type}
    onChange={onChange}
    {...props}
  />
);

export default Input;
