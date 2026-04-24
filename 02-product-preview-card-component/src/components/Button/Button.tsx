import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type ButtonProps = {
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const { icon, children, className, ...rest } = props;

  return (
    <button
      className={cx('btn-container', className)}
      {...rest}
    >
      {icon && (<span className={cx('icon')}>{icon}</span>)}
      <span className={cx('text')}>{children}</span>
    </button>
  );
};

export default Button;
