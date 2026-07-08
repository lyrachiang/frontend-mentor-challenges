import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type ButtonProps = {
  icon?: React.ReactNode;
  block?: boolean;
  variant?: 'primary' | 'bookmark' | 'reward';
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const {
    icon,
    block,
    variant = 'primary',
    active = false,
    children,
    className,
    ...rest
  } = props;

  const customClass = {
    'btn-block': block,
    [`btn-${variant}`]: true,
    'active': active
  };

  return (
    <button
      className={cx('btn-container', className, customClass)}
      type="button"
      {...rest}
    >
      {icon && (<span className={cx('btn-icon')}>{icon}</span>)}
      {children && <span className={cx('btn-text')}>{children}</span>}
    </button>
  );
};

export default Button;
