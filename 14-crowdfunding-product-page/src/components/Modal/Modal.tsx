import { useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './styles/Modal.module.scss';

import CloseIcon from '@/assets/images/icons/icon-close-modal.svg?react';

const cx = classNames.bind(styles);

type ModalProps = {
  className: string;
  width?: number;
  open: boolean;
  title: string;
  footer: React.ReactNode;
  showCloseIcon?: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = (props: ModalProps) => {
  const {
    className,
    width = 520,
    open,
    title,
    footer,
    showCloseIcon = true,
    onClose,
    children
  } = props;

  useEffect(() => {
    if (!open) {
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className={cx('modal-container', className)}>
      <div className={cx('modal-mask')}></div>
      <div className={cx('modal-wrap')}>
        <div className={cx('modal-content')} style={{ width: `${width}px` }}>
          {showCloseIcon && (<CloseIcon className={cx('close-btn')} onClick={onClose} />)}
          <div className={cx('modal-header')}>{title}</div>
          <div className={cx('modal-body')}>
            {children}
          </div>
          {footer && (<div className={cx('modal-footer')}>{footer}</div>)}
        </div>
      </div>
    </div>
  );
};

export default Modal;
