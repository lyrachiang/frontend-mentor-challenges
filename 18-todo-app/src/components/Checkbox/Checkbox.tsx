import classNames from 'classnames/bind';

import styles from './Checkbox.module.scss';

const cx = classNames.bind(styles);

type CheckboxProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = (props: CheckboxProps) => {
  const { label, ...rest } = props;

  return (
    <label className={cx('checkbox-container')}>
      <input type='checkbox' {...rest} />
      <span className={cx('checkmark')}></span>
      <span className={cx('label')}>{label}</span>
    </label>
  );
};

export default Checkbox;
