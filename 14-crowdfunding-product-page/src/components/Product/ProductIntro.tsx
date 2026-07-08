import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './styles/ProductIntro.module.scss';

import Button from '@/components/Button';

import ProductIcon from '@/assets/images/icons/icon-logo-mastercraft.svg?react';
import BookmarkIcon from '@/assets/images/icons/icon-bookmark.svg?react';

const cx = classNames.bind(styles);

type ProductIntroProps = {
  setIsOpenRewardModal: (isOpen: boolean) => void;
  onSelectProduct: (name: string) => void;
};

const ProductIntro = (props: ProductIntroProps) => {
  const { setIsOpenRewardModal, onSelectProduct } = props;

  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const onClickBackProject = () => {
    onSelectProduct('');
    setIsOpenRewardModal(true);
  };

  return (
    <section className={cx('product-intro-container')}>
      <div className={cx('product-icon')}><ProductIcon /></div>
      <h1 className={cx('product-name')}>Mastercraft Bamboo Monitor Riser</h1>
      <p className={cx('product-desc')}>A beautiful & handcrafted monitor stand to reduce neck and eye strain.</p>
      <div className={cx('btn-block')}>
        <Button onClick={onClickBackProject}>Back this project</Button>
        <Button
          icon={<BookmarkIcon />}
          variant="bookmark"
          active={bookmarked}
          onClick={() => setBookmarked((prev) => !prev)}
        >
          {bookmarked ? 'Bookmarked' : 'Bookmark'}
        </Button>
      </div>
    </section>
  );
};

export default ProductIntro;
