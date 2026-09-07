import classNames from 'classnames/bind';

import styles from './styles/Hero.module.scss';

import { type City } from '@/types';
import Search from '@/components/Search';

const cx = classNames.bind(styles);

type HeroProps = {
  onSearchCity: (city: City) => void;
};

const Hero = (props: HeroProps) => {
  const { onSearchCity } = props;

  return (
    <div className={cx('hero-page')}>
      <h2 className={cx('title')}>How's the sky looking today?</h2>
      <Search onSearchCity={onSearchCity} />
    </div>
  );
};

export default Hero;
