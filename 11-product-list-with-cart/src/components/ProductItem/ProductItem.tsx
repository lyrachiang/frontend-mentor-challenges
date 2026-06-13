import classNames from 'classnames/bind';

import styles from './ProductItem.module.scss';

import { useCart } from '@/contexts/CartContext';
import Button from '@/components/Button';
import QuantityButton from '@/components/QuantityButton';

import { getImageUrl } from '@/utils/image';

import CartIcon from '@/assets/images/icons/icon-add-to-cart.svg?react';

const cx = classNames.bind(styles);

type ProductItemProps = {
  image: {
    desktop: string;
    tablet: string;
    mobile: string;
    thumbnail: string;
  };
  name: string;
  category: string;
  price: number;
};

const ProductItem = (props: ProductItemProps) => {
  const { image, name, category, price } = props;

  const { cartItems, addItem } = useCart();

  const currentQuantity = cartItems.filter(item => item.name === name)?.[0]?.quantity || 0;

  return (
    <div>
      <div className={cx('prod-image-container')}>
        <picture>
          <source srcSet={getImageUrl(image.desktop)} media="(min-width: 992px)" />
          <source srcSet={getImageUrl(image.tablet)} media="(min-width: 768px)" />
          <img className={cx('prod-image', { active: currentQuantity > 0 })} src={getImageUrl(image.mobile)} alt={name} />
        </picture>
        {currentQuantity > 0
          ? (<QuantityButton name={name} quantity={currentQuantity} />)
          : (<Button className={cx('add-cart-btn')} icon={<CartIcon />} onClick={() => addItem(props)}>Add to Cart</Button>)
        }
      </div>
      <h3 className={cx('prod-category')}>{category}</h3>
      <h4 className={cx('prod-name')}>{name}</h4>
      <p className={cx('prod-price')}>{`$${price.toFixed(2)}`}</p>
    </div>
  );
};

export default ProductItem;
