import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Product from '@/components/Product';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx('app-container')}>
      <main className={cx('main-container')}>
        <Product />
        <Cart />
      </main>
      <Footer />
    </div>
  );
};

export default App;
