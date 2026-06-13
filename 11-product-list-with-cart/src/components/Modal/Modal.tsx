import { useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Modal.module.scss';

import { useCart } from '@/contexts/CartContext';
import Button from '@/components/Button';

import { getImageUrl } from '@/utils/image';

import OrderConfirmedIcon from '@/assets/images/icons/icon-order-confirmed.svg';

const cx = classNames.bind(styles);

type ConfirmItemProps = {
  image: {
    desktop: string;
    tablet: string;
    mobile: string;
    thumbnail: string;
  };
  name: string;
  price: number;
  quantity: number;
};

const ConfirmItem = (props: ConfirmItemProps) => {
  const { image, name, price, quantity } = props;

  return (
    <div className={cx('confirm-item-container')}>
      <div className={cx('confirm-item-info')}>
        <img className={cx('item-image')} src={getImageUrl(image.thumbnail)} alt={name} />
        <div>
          <p className={cx('item-name')}>{name}</p>
          <div>
            <span className={cx('item-quantity')}>{`${quantity}x`}</span>
            <span className={cx('item-price')}>{`@ $${price.toFixed(2)}`}</span>
          </div>
        </div>
      </div>
      <div className={cx('item-total-price')}>{`$${(quantity * price).toFixed(2)}`}</div>
    </div>
  );
};

type ModalProps = {
  onClose: () => void;
};

const Modal = (props: ModalProps) => {
  const { onClose } = props;

  const { cartItems, clearCart, totalPrice } = useCart();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={cx('modal-container')} onClick={onClose}>
      <div className={cx('modal-mask')}></div>
      <div className={cx('modal-wrap')}>
        <div className={cx('modal-content', 'confirmed-container')} onClick={(e) => e.stopPropagation()}>
          <img src={OrderConfirmedIcon} alt="Order Confirmed" />
          <h2 className={cx('confirmed-title')}>Order Confirmed</h2>
          <p className={cx('confirmed-desc')}>We hope you enjoy your food!</p>
          <div className={cx('confirmed-detail')}>
            <div className={cx('confirmed-list')}>{cartItems.map((item) => {
              return (
                <ConfirmItem
                  key={item.name}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                />
              );
            })}</div>
            <div className={cx('confirmed-total-price')}>
              <p className={cx('title')}>Order Total</p>
              <p className={cx('price')}>{`$${totalPrice}`}</p>
            </div>
          </div>
          <Button className={cx('start-new-order-btn')} block={true} onClick={clearCart}>Start New Order</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
