import classNames from 'classnames/bind';

import styles from './Content.module.scss';

import Product from '@/components/Product';

const cx = classNames.bind(styles);

const Content = () => {
  return (
    <div className={cx('content-container')}>
      <Product />
    </div>
  );
};

export default Content;
