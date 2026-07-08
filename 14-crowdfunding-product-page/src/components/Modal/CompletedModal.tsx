import classNames from 'classnames/bind';

import styles from './styles/CompletedModal.module.scss';

import CheckIcon from '@/assets/images/icons/icon-check.svg?react';

import { Modal } from '@/components/Modal';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

type CompletedModalProps = {
  open: boolean;
  onClose: () => void;
};

const CompletedModal = (props: CompletedModalProps) => {
  const { open, onClose } = props;

  return (
    <Modal
      className={cx('completed-modal')}
      open={open}
      title=""
      footer={null}
      showCloseIcon={false}
      onClose={onClose}
    >
      <CheckIcon />
      <p className={cx('completed-title')}>Thanks for your support!</p>
      <p className={cx('completed-desc')}>Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.</p>
      <Button onClick={onClose}>Got it!</Button>
    </Modal>
  );
};

export default CompletedModal;
