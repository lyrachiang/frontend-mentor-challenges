import classNames from 'classnames/bind';

import styles from './OrderInfo.module.scss';

import { useCart } from '@/contexts/CartContext';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

import DeleteIcon from '@/assets/images/icons/icon-remove-item.svg?react';
import CarbonNeutralIcon from '@/assets/images/icons/icon-carbon-neutral.svg?react';
import { useState } from 'react';

const cx = classNames.bind(styles);

type OrderItemProps = {
  name: string;
  price: number;
  quantity: number;
};

const OrderItem = (props: OrderItemProps) => {
  const { name, price, quantity } = props;

  const { deleteItem } = useCart();

  return (
    <div className={cx('order-item-container')}>
      <div>
        <p className={cx('item-name')}>{name}</p>
        <div>
          <span className={cx('item-quantity')}>{`${quantity}x`}</span>
          <span className={cx('item-price')}>{`@ $${price.toFixed(2)}`}</span>
          <span className={cx('item-total-price')}>{`$${(quantity * price).toFixed(2)}`}</span>
        </div>
      </div>
      <Button
        className={cx('delete-btn')}
        icon={<DeleteIcon />}
        onClick={() => deleteItem(name)}
      />
    </div>
  );
};

const OrderInfo = () => {
  const { cartItems, totalPrice } = useCart();

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div>
        {cartItems.map((item) => {
          return (
            <OrderItem
              key={item.name}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          );
        })}
      </div>
      <div className={cx('order-total-price')}>
        <p className={cx('title')}>Order Total</p>
        <p className={cx('price')}>{`$${totalPrice}`}</p>
      </div>
      <div className={cx('order-note')}>
        <CarbonNeutralIcon />
        <p>This is a <span>carbon-neutral</span> delivery</p>
      </div>
      <Button className={cx('order-confirm-btn')} block={true} onClick={() => setShowModal(true)}>Confirm Order</Button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default OrderInfo;
