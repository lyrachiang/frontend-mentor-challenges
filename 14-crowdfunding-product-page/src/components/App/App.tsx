import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProductIntro, ProductFundingSummary, ProductList } from '@/components/Product';
import { RewardModal, CompletedModal } from '@/components/Modal';

const cx = classNames.bind(styles);

const App = () => {
  const [isOpenRewardModal, setIsOpenRewardModal] = useState<boolean>(false);
  const [isOpenCompletedModal, setIsOpenCompletedModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const onSelectProduct = (name: string) => {
    setSelectedProduct(name);
  };

  return (
    <div className={cx('app-container')}>
      <Header />
      <main className={cx('main-container')}>
        <ProductIntro
          setIsOpenRewardModal={setIsOpenRewardModal}
          onSelectProduct={onSelectProduct}
        />
        <ProductFundingSummary />
        <ProductList
          setIsOpenRewardModal={setIsOpenRewardModal}
          onSelectProduct={onSelectProduct}
        />
        <RewardModal
          open={isOpenRewardModal}
          selectedProduct={selectedProduct}
          setIsOpenCompletedModal={setIsOpenCompletedModal}
          onClose={() => setIsOpenRewardModal(false)}
          onSelectProduct={onSelectProduct}
        />
        <CompletedModal
          open={isOpenCompletedModal}
          onClose={() => setIsOpenCompletedModal(false)}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
