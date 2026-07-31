import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type ButtonVariant = 'primary' | 'secondary' | 'nav' | 'copy' ;

type ButtonProps = {
  icon?: React.ReactNode;
  block?: boolean;
  variant?: ButtonVariant;
  active?: boolean;
  suffix?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const {
    icon,
    block,
    variant = 'primary',
    active = false,
    suffix,
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
      {variant === 'nav'
        ? (
          <>
            <span>  
              {icon && (<span className={cx('btn-icon')}>{icon}</span>)}
              {children && <span className={cx('btn-text')}>{children}</span>}
            </span>
            {suffix && (<span className={cx('btn-suffix')}>{suffix}</span>)}
          </>
        )
        : (
          <>
            {icon && (<span className={cx('btn-icon')}>{icon}</span>)}
            {children && <span className={cx('btn-text')}>{children}</span>}
          </>
        )
      }
    </button>
  );
};

export default Button;
