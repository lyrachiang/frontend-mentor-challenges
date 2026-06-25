import classNames from 'classnames/bind';

import styles from './FormField.module.scss';

const cx = classNames.bind(styles);

type FormFieldProps = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormField = (props: FormFieldProps) => {
  const {
    id,
    label,
    icon,
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
        <div className={cx('label-container')}>
          <label className={cx('label')} htmlFor={id}>{label}</label>
          {hasError && (<span className={cx('error-msg')}>{errorMessage}</span>)}
        </div>
        <div className={cx('input-container')}>
          {icon && (<span className={cx('input-icon')}>{icon}</span>)}
          <input
            id={id}
            name={id}
            type="number"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            {...rest}
          />
        </div>
      </div>
    </div>
  );
};

export default FormField;
