import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  icon?: React.ReactNode;
  rounded?: boolean;
  variant?: ButtonVariant;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const {
    icon,
    rounded,
    variant = 'primary',
    active = false,
    children,
    className,
    ...rest
  } = props;

  const customClass = {
    'btn-round': rounded,
    'active': active
  };

  return (
    <button
      className={cx('btn-container', `btn-${variant}`, className, customClass)}
      type="button"
      {...rest}
    >
      {icon && (<span className={cx('btn-icon')}>{icon}</span>)}
      <span className={cx('btn-text')}>{children}</span>
    </button>
  );
};

export default Button;
