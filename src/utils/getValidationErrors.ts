import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}
export default (err: ValidationError): Errors =>
  err.inner.reduce<Errors>(
    (prev, curr) => ({ ...prev, [curr.path]: curr.message }),
    {},
  );
