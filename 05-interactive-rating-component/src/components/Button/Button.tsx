import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type ButtonVariant = 'primary' | 'secondary' | 'rating';

type ButtonProps = {
  icon?: React.ReactNode;
  rounded?: boolean;
  block?: boolean;
  variant?: ButtonVariant;
  active?: boolean; 
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const {
    icon,
    rounded,
    block,
    variant = 'primary',
    active = false,
    children,
    className,
    ...rest
  } = props;

  const customClass = {
    'btn-round': rounded,
    'btn-block': block,
    'active': active
  };

  return (
    <button
      className={cx('btn-container', `btn-${variant}`, className, customClass)}
      {...rest}
    >
      {icon && (<span className={cx('btn-icon')}>{icon}</span>)}
      <span className={cx('btn-text')}>{children}</span>
    </button>
  );
};

export default Button;
