import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx('attribution')}>
      <span>Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.</span>
      <span>Coded by <a href="https://github.com/lyrachiang/frontend-mentor-challenges" target="_blank">Lyra Chiang</a>.</span>
    </footer>
  );
};

export default Footer;
