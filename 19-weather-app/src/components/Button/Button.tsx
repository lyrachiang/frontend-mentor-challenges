import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type ButtonVariant = 'primary' | 'default';

type ButtonProps = {
  icon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  block?: boolean;
  variant?: ButtonVariant;
  ref?: React.Ref<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const {
    icon,
    suffixIcon,
    block,
    variant = 'primary',
    children,
    className,
    ref,
    ...rest
  } = props;

  const customClass = {
    'btn-block': block
  };

  return (
    <button
      ref={ref}
      className={cx('btn-container', `btn-${variant}`, className, customClass)}
      type="button"
      {...rest}
    >
      {icon && (<span className={cx('btn-icon')}>{icon}</span>)}
      {children && <span className={cx('btn-text')}>{children}</span>}
      {suffixIcon && (<span className={cx('btn-suffix-icon')}>{suffixIcon}</span>)}
    </button>
  );
};

export default Button;
