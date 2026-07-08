import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './styles/RewardModal.module.scss';

import { useReward } from '@/contexts/RewardContext';
import { Modal } from '@/components/Modal';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

type RewardItemProps = {
  name: string;
  desc: string;
  pledgeAmount?: number;
  stock?: number;
  selectedProduct: string;
  setIsOpenCompletedModal: (isOpen: boolean) => void;
  onSelect: (name: string) => void;
  onClose: () => void;
};

type RewardModalProps = {
  open: boolean;
  selectedProduct: string;
  setIsOpenCompletedModal: (isOpen: boolean) => void;
  onClose: () => void;
  onSelectProduct: (name: string) => void;
};

const RewardItem = (props: RewardItemProps) => {
  const {
    name,
    desc,
    pledgeAmount,
    stock,
    selectedProduct,
    setIsOpenCompletedModal,
    onSelect,
    onClose
  } = props;
  const { updateReward, updateBackers } = useReward();

  const [currentPledge, setCurrentPledge] = useState<number | string>(pledgeAmount ?? '');

  const onSelectReward = (e: React.MouseEvent | React.ChangeEvent<HTMLInputElement>, name: string) => {
    e.preventDefault();

    if (typeof stock !== 'undefined' && stock === 0) {
      return;
    }

    onSelect(name);
  };

  const onClickContinue = ( name: string, pledgeAmount: number) => {
    if (name === 'Pledge with no reward') {
      updateBackers();
    } else {
      updateReward(name, pledgeAmount);
    }

    onClose();
    setIsOpenCompletedModal(true);
  };

  return (
    <article
      className={cx('reward-item-container', { 'sold-out': stock === 0, 'active': selectedProduct === name })}
      onClick={(e) => onSelectReward(e, name)}
    >
      <label className={cx('reward-item-info')} htmlFor={name}>
        <div>
          <div className={cx('reward-item-radio')}>
            <input
              id={name}
              type="radio"
              name="rewardItem" 
              value={name}
              checked={selectedProduct === name}
              disabled={stock === 0}
              onChange={(e) => onSelectReward(e, name)}
            />
            <span className={cx('checkmark')}></span>
          </div>
          <div className={cx('reward-item-header')}>
            <p>
              <span className={cx('item-name')}>{name}</span>
              {pledgeAmount && (<span className={cx('item-pledge')}>{`Pledge $${pledgeAmount} or more`}</span>)}
            </p>
            {typeof stock !== 'undefined' && (
              <p className={cx('item-stock')}>
                <span className={cx('count')}>{stock}</span>
                <span>left</span>
              </p>
            )}
          </div>
        </div>
        <p className={cx('reward-item-desc')}>{desc}</p>
        {typeof stock !== 'undefined' && (
          <p className={cx('item-stock', 'mobile')}>
            <span className={cx('count')}>{stock}</span>
            <span>left</span>
          </p>
        )}
      </label>
      {selectedProduct === name
        && (typeof stock === 'undefined' || stock > 0)
        && (
          <div className={cx('reward-item-option')}>
            {pledgeAmount && (<p className={cx('pledge-title')}>Enter your pledge</p>)}
            <div className={cx('reward-setting')}>
              {pledgeAmount && (
                <div className={cx('pledge-input')}>
                  <span>$</span>
                  <input
                    type="number"
                    min={pledgeAmount}
                    value={currentPledge}
                    onChange={(e) => setCurrentPledge(e.target.value)}
                  />
                </div>
              )}
              <Button
                className={cx('continue-btn')}
                disabled={typeof pledgeAmount !== 'undefined' && (Number(currentPledge) === 0 || Number(currentPledge) < pledgeAmount)}
                onClick={() => onClickContinue(name, Number(currentPledge))}
              >
                Continue
              </Button>
            </div>
          </div>
        )}
    </article>
  );
};

const RewardModal = (props: RewardModalProps) => {
  const {
    open,
    selectedProduct = '',
    setIsOpenCompletedModal,
    onClose,
    onSelectProduct
  } = props;

  const { productItems } = useReward();

  return (
    <Modal
      className={cx('reward-modal')}
      width={660}
      open={open}
      title="Back this project"
      footer={null}
      onClose={onClose}
    >
      <p className={cx('reward-desc')}>Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?</p>
      <div className={cx('reward-list-container')}>
        <RewardItem
          name="Pledge with no reward"
          desc="Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email."
          selectedProduct={selectedProduct}
          setIsOpenCompletedModal={setIsOpenCompletedModal}
          onSelect={onSelectProduct}
          onClose={onClose}
        />
        {productItems.map((item) => {
          return (
            <RewardItem
              key={item.name}
              name={item.name}
              desc={item.desc}
              pledgeAmount={item.pledgeAmount}
              stock={item.stock}
              selectedProduct={selectedProduct}
              setIsOpenCompletedModal={setIsOpenCompletedModal}
              onSelect={onSelectProduct}
              onClose={onClose}
            />
          );
        })}
      </div>
    </Modal>
  );
};

export default RewardModal;
