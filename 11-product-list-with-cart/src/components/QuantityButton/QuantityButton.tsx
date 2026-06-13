import classNames from 'classnames/bind';

import styles from './QuantityButton.module.scss';

import { useCart } from '@/contexts/CartContext';
import Button from '@/components/Button';

import ReduceIcon from '@/assets/images/icons/icon-decrement-quantity.svg?react';
import AddIcon from '@/assets/images/icons/icon-increment-quantity.svg?react';

const cx = classNames.bind(styles);

type QuantityButtonProps = {
  name: string;
  quantity: number;
};

const QuantityButton = (props: QuantityButtonProps) => {
  const { name, quantity } = props;

  const { updateQuantity } = useCart();

  return (
    <div className={cx('quantity-btn-container')}>
      <Button className={cx('reduce-btn')} icon={<ReduceIcon />} onClick={() => updateQuantity(name, quantity - 1)} />
      <span>{quantity}</span>
      <Button className={cx('add-btn')} icon={<AddIcon />} onClick={() => updateQuantity(name, quantity + 1)} />
    </div>
  );
};

export default QuantityButton;
