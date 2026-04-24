import classNames from 'classnames/bind';

import styles from './Product.module.scss';

import Button from '@/components/Button';

import PerfumeDesktopImg from '@/assets/images/image-product-desktop.jpg';
import PerfumeMobileImg from '@/assets/images/image-product-mobile.jpg';
import CartIcon from '@/assets/images/icons/icon-cart.svg?react';

const cx = classNames.bind(styles);

const Product = () => {
  return (
    <article className={cx('product-container')}>
      <picture className={cx('image')}>
        <source srcSet={PerfumeMobileImg} media="(max-width: 768px)" />
        <img src={PerfumeDesktopImg} alt="Gabrielle Essence Eau De Parfum" />
      </picture>
      <div className={cx('info')}>
        <p className={cx('category')}>Perfume</p>
        <h2 className={cx('title')}>Gabrielle Essence Eau De Parfum</h2>
        <p className={cx('detail')}>A floral, solar and voluptuous interpretation composed by Olivier Polge, Perfumer-Creator for the House of CHANEL.</p>
        <div className={cx('price')}>
          <p className={cx('price-current')}>$149.99</p>
          <p className={cx('price-original')}>$169.99</p>
        </div>
        <Button className='cart' icon={<CartIcon />}>Add to Cart</Button>
      </div>
    </article>
  );
};

export default Product;
