import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const styleMap = {
  sedans: 'btn-gold',
  suvs: 'btn-cyan',
  luxury: 'btn-green'
};

type ButtonProps = {
  id: keyof typeof styleMap
};

const Button = (props: ButtonProps) => {
  const { id } = props;
  const customClass = styleMap[id];

  const onClickBtn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <a
      className={cx('btn-container', customClass)}
      href="#"
      onClick={onClickBtn}
    >
      Learn More
    </a>
  );
};

export default Button;
