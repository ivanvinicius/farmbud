import { ValidationError } from 'yup';

interface IValidationError {
  [key: string]: string;
}

export default function getValidationErrors(
  err: ValidationError,
): IValidationError {
  const validationErrors: IValidationError = {};

  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
