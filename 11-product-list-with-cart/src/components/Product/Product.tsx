import classNames from 'classnames/bind';

import styles from './Product.module.scss';

import ProductItem from '@/components/ProductItem';

import productData from '@/data/product.json';

const cx = classNames.bind(styles);

const Product = () => {
  return (
    <section className={cx('prod-container')}>
      <h1 className={cx('prod-title')}>Desserts</h1>
      <div className={cx('prod-list-container')}>
        {productData.map((item) => {
          return (
            <ProductItem
              key={item.name}
              image={item.image}
              name={item.name}
              category={item.category}
              price={item.price}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Product;
