import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { currencyMask } from 'common/masks';
import { Label, Input, Select, Button, Loader } from 'components';
import {
  errorSelector,
  isErrorSelector,
  isLoadingSelector,
  partitionsSelector,
} from 'common/selectors/quoteSelectors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 58px;
  font-size: 16px;
  line-height: 22px;
  margin: 0 -10px;
  border-top-right-radius: 20px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
`;

const InputStyled = styled(Input)`
  border: 1px solid ${({ theme }) => theme.colors.blue};
  border-radius: 5px;
  height: 40px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80px;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: end;
  margin: 20px 20px 0;
  gap: 5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ButtonStyled = styled(Button)`
  margin-top: 20px;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
`;

const NetWorthText = styled.div`
  font-size: 12px;
  line-height: 16px;
`;

const NetWorth = styled.div`
  font-size: 20px;
  line-height: 27px;
`;

const getOptions = (obj: {}) => Object.keys(obj).map((currency) => ({
  value: currency,
  label: currency,
}));

const formatMoneyString = (digits: string) => Number(digits.replace(',', ''));

const Convertor = () => {
  const isLoading = useSelector(isLoadingSelector);
  const isError = useSelector(isErrorSelector);
  const error = useSelector(errorSelector);
  const partitions = useSelector(partitionsSelector);

  const [amount, setAmount] = useState('100');
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('EUR');
  const [result, calculate] = useState('');

  const handleChangeAmount = (event: React.FormEvent<HTMLInputElement>) =>
    setAmount(event.currentTarget.value);
  const handleChangeCurrencyFrom = (value: string) => {
    setCurrencyFrom(value);

    if (!partitions[value][currencyTo]) {
      setCurrencyTo(Object.keys(partitions[value])[0]);
    }
  };
  const handleChangeCurrencyTo = (value: string) => setCurrencyTo(value);
  const handleClickCalculate = () =>
    calculate(
      (
        formatMoneyString(amount) * partitions[currencyFrom][currencyTo]
      ).toFixed(2)
    );

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
      <Header>Конвертация валют</Header>
      <Form>
        <Field>
          <Label>Сумма</Label>
          <InputStyled
            mask={currencyMask}
            name="amount"
            value={amount}
            onChange={handleChangeAmount}
          />
        </Field>
        <SelectWrapper>
          <Select
            value={currencyFrom}
            options={getOptions(partitions)}
            disabled={[currencyFrom]}
            onSelect={handleChangeCurrencyFrom}
          />
          <Select
            value={currencyTo}
            options={getOptions(partitions[currencyFrom])}
            disabled={[currencyTo]}
            onSelect={handleChangeCurrencyTo}
          />
        </SelectWrapper>
        <ButtonStyled onClick={handleClickCalculate}>Рассчитать</ButtonStyled>
      </Form>
      {result && (
        <Result>
          <NetWorthText>Итого</NetWorthText>
          <NetWorth>{result}</NetWorth>
        </Result>
      )}
    </Wrapper>
  );
};

export default Convertor;
