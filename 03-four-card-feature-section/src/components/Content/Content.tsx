import classNames from 'classnames/bind';

import styles from './Content.module.scss';

import FeatureIntro from '@/components/FeatureIntro';
import FeatureList from '@/components/FeatureList';

const cx = classNames.bind(styles);

const Content = () => {
  return (
    <div className={cx('content-container')}>
      <FeatureIntro />
      <FeatureList />
    </div>
  );
};

export default Content;
