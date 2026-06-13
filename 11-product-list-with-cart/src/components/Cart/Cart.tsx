import classNames from 'classnames/bind';

import styles from './Cart.module.scss';

import { useCart } from '@/contexts/CartContext';
import OrderInfo from '@/components/OrderInfo';

import EmptyCartIcon from '@/assets/images/icons/illustration-empty-cart.svg';

const cx = classNames.bind(styles);

const Cart = () => {
  const { cartItems, totalQuantity } = useCart();

  return (
    <section className={cx('cart-container')}>
      <h2 className={cx('cart-title')}>{`Your Cart (${totalQuantity})`}</h2>
      {cartItems.length
        ? (<OrderInfo />)
        : (
          <>
            <img className={cx('cart-image')} src={EmptyCartIcon} alt="empty cart"/>
            <p className={cx('cart-desc')}>Your added items will appear here</p>
          </>
        )
      }
    </section>
  );
};

export default Cart;
