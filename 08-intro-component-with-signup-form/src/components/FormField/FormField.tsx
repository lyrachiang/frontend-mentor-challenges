import classNames from 'classnames/bind';

import styles from './FormField.module.scss';

import ErrorIcon from '@/assets/images/icons/icon-error.svg?react';

const cx = classNames.bind(styles);

type FormFieldProps = {
  id: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormField = (props: FormFieldProps) => {
  const {
    id,
    type,
    value,
    placeholder,
    onChange,
    errorMessage,
    ...rest
  } = props;

  const hasError = Boolean(errorMessage);

  return (
    <div className={cx('form-field')}>
      <div className={cx('input-wrapper', { 'input-error': hasError })}>
        <input
          name={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          {...rest}
        />
        {hasError && <ErrorIcon />}
      </div>
      {hasError && (<p className={cx('error-msg')}>{errorMessage}</p>)}
    </div>
  );
};

export default FormField;
