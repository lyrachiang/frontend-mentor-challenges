import classNames from 'classnames/bind';

import styles from './App.module.scss';

import FeatureIntro from '@/components/FeatureIntro';
import FeatureList from '@/components/FeatureList';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx('app-container')}>
      <main className={cx('main-container')}>
        <FeatureIntro />
        <FeatureList />
      </main>
      <Footer />
    </div>
  );
};

export default App;
