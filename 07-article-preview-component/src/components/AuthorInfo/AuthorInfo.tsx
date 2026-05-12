import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './AuthorInfo.module.scss';

import SocialShare from '@/components/SocialShare';
import Button from '@/components/Button';

import AuthorImg from '@/assets/images/avatar-michelle.jpg';
import ShareIcon from '@/assets/images/icons/icon-share.svg?react';

const cx = classNames.bind(styles);

const AuthorInfo = () => {
  const [showShareInfo, setShowShareInfo] = useState<boolean>(false);

  return (
    <div className={cx('author-info-container')}>
      <div className={cx('author-desc')}>
        <img className={cx('author-img')} src={AuthorImg} alt="Michelle Appleton" />
        <div>
          <p className={cx('author-name')}>Michelle Appleton</p>
          <p className={cx('author-date')}>28 Jun 2020</p>
        </div>
      </div>
      {showShareInfo && <SocialShare />}
      <Button
        className={'share-btn'}
        icon={<ShareIcon />}
        rounded={true}
        variant = 'primary'
        active={showShareInfo}
        onClick={() => setShowShareInfo(prev => !prev)}
      />
    </div>
  );
};

export default AuthorInfo;
