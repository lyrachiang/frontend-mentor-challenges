import classNames from 'classnames/bind';

import styles from './Switch.module.scss';

const cx = classNames.bind(styles);

type SwitchProps = React.InputHTMLAttributes<HTMLInputElement>;

const Switch = (props: SwitchProps) => {
  const { ...rest } = props;

  return (
    <label className={cx('switch-container')}>
      <input type="checkbox" {...rest} />
      <span className={cx('slider')}></span>
    </label>
  );
};

export default Switch;
