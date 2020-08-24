import * as yup from 'yup';

const PASSWORD_REGEXP = /^[a-zA-Z0-9_]{7,}$/;

const ERRORS = {
  REQUIRED: 'Обязательное поле',
  EMAIL: 'Введите корректный емайл',
  PASSWORD: {
    MIN_LENGTH: 'Минимум 7 символов',
    FORMAT: 'Латинские буквы, цифры и _',
  },
};

export const schema = yup.object({
  email: yup.string().email(ERRORS.EMAIL).required(ERRORS.REQUIRED),
  password: yup
    .string()
    .matches(PASSWORD_REGEXP, ERRORS.PASSWORD.FORMAT)
    .min(7, ERRORS.PASSWORD.MIN_LENGTH)
    .required(ERRORS.REQUIRED),
});
