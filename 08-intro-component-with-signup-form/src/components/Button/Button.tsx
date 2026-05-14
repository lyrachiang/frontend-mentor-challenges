import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  block?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const {
    icon,
    type = 'button',
    block,
    children,
    className,
    ...rest
  } = props;

  const customClass = {
    'btn-block': block
  };

  return (
    <button
      className={cx('btn-container', className, customClass)}
      type={type}
      {...rest}
    >
      {icon && (<span className={cx('btn-icon')}>{icon}</span>)}
      <span className={cx('btn-text')}>{children}</span>
    </button>
  );
};

export default Button;
