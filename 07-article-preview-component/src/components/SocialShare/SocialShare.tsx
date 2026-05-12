import classNames from 'classnames/bind';

import styles from './SocialShare.module.scss';

import Button from '@/components/Button';

import FacebookIcon from '@/assets/images/icons/icon-facebook.svg?react';
import TwitterIcon from '@/assets/images/icons/icon-twitter.svg?react';
import PinterestIcon from '@/assets/images/icons/icon-pinterest.svg?react';

const cx = classNames.bind(styles);

const SocialShare = () => {
  const onClickShareSocialMedia = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={cx('social-share-container')}>
      <p className={cx('share-title')}>Share</p>
      <Button
        icon={<FacebookIcon />}
        rounded={true}
        variant = 'secondary'
        onClick={() => onClickShareSocialMedia('https://www.facebook.com/')}
      />
      <Button
        icon={<TwitterIcon />}
        rounded={true}
        variant = 'secondary'
        onClick={() => onClickShareSocialMedia('https://x.com/')}
      />
      <Button
        icon={<PinterestIcon />}
        rounded={true}
        variant = 'secondary'
        onClick={() => onClickShareSocialMedia('https://www.pinterest.com/')}
      />
    </div>
  );
};

export default SocialShare;
