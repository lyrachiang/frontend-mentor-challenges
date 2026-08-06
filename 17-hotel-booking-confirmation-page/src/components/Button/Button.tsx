import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type ButtonVariant = 'primary' | 'secondary' | 'copy' ;

type ButtonProps = {
  icon?: React.ReactNode;
  block?: boolean;
  variant?: ButtonVariant;
  active?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const {
    icon,
    block,
    variant = 'primary',
    active = false,
    children,
    className,
    ref,
    ...rest
  } = props;

  const customClass = {
    'btn-block': block,
    'active': active
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
    </button>
  );
};

export default Button;
