import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type ButtonVariant = 'primary' | 'secondary' | 'default' | 'option' | 'select';

type ButtonProps = {
  icon?: React.ReactNode;
  block?: boolean;
  variant?: ButtonVariant;
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
    'active': active
  };

  return (
    <button
      className={cx('btn-container', `btn-${variant}`, className, customClass)}
      type="button"
      {...rest}
    >
      {children && <span className={cx('btn-text')}>{children}</span>}
      {icon && (<span className={cx('btn-icon')}>{icon}</span>)}
    </button>
  );
};

export default Button;
