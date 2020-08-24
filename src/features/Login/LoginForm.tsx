import React from 'react';
import styled from 'styled-components';
import { useFormik, FormikHelpers } from 'formik';
import { Input, Button, Label } from 'components';
import { schema } from './schema';
import { initialValues } from './constants';
import { Values } from './types';

const Form = styled.form`
  width: 250px;
`;

const FormWrapper = styled.div`
  position: relative;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ButtonStyled = styled(Button)`
  margin-top: 50px;
  width: 100%;
`;

const FieldError = styled.div`
  position: absolute;
  bottom: -18px;
  color: ${({ theme }) => theme.colors.red};
`;

const FormError = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.colors.red};
  bottom: -20px;
`;

type Props = {
  error: string;
  onSubmit: (values: Values, formikBag: FormikHelpers<Values>) => void;
};

export const LoginForm = ({ error, onSubmit }: Props) => {
  const { values, errors, handleSubmit, handleChange } = useFormik({
    onSubmit,
    initialValues,
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <FormWrapper>
        <Field>
          <Label>Логин</Label>
          <Input
            name="email"
            placeholder="user@mail.ru"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <FieldError>{errors.email}</FieldError>}
        </Field>
        <Field>
          <Label>Пароль</Label>
          <Input
            name="password"
            type="password"
            placeholder="*********"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <FieldError>{errors.password}</FieldError>}
        </Field>
        <ButtonStyled type="submit" icon="ARROW_RIGHT">
          Вход
        </ButtonStyled>
        {error && <FormError>{error}</FormError>}
      </FormWrapper>
    </Form>
  );
};
