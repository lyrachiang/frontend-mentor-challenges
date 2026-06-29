import classNames from 'classnames/bind';

import styles from './NotificationItem.module.scss';

import { getImageUrl } from '@/utils/image';

const cx = classNames.bind(styles);

type NotificationItem = {
  avatar: string;
  name: string;
  type: number;
  postName: string;
  groupName: string;
  message: string;
  picture: string;
  displayTime: string;
  hasRead: boolean;
};

type NotificationItemType = {
  dataSource: NotificationItem,
  onClickNotification: (
    e: React.MouseEvent<HTMLAnchorElement>,
    name: string
  ) => void;
};

const typeMap: Record<number, string> = {
  1: 'reacted to your recent post',
  2: 'followed you',
  3: 'has joined your group',
  4: 'sent you a private message',
  5: 'commented on your picture',
  6: 'left the group'
};

const getMessageRender = (type: number, name: string, postName: string, groupName: string, hasRead: boolean) => {
  const typeMessage = typeMap[type];
  
  switch (type) {
    case 1:
      return (
        <>
          <a className={cx('user-name')} href="#">{name}</a>
          <span className={cx('message')}>{typeMessage}</span>
          <a className={cx('post-name')} href="#">{postName}</a>
          {!hasRead && <span className={cx('notify')}></span>}
        </>
      );
    case 3:
    case 6:
      return (
        <>
          <a className={cx('user-name')} href="#">{name}</a>
          <span className={cx('message')}>{typeMessage}</span>
          <a className={cx('group-name')} href="#">{groupName}</a>
          {!hasRead && <span className={cx('notify')}></span>}
        </>
      );
    default:
      return (
        <>
          <a className={cx('user-name')} href="#">{name}</a>
          <span className={cx('message')}>{typeMessage}</span>
          {!hasRead && <span className={cx('notify')}></span>}
        </>
      );
  }
};

const NotificationItem = (props: NotificationItemType) => {
  const { dataSource, onClickNotification } = props;
  const {
    avatar,
    name,
    type,
    postName,
    groupName,
    message,
    picture,
    displayTime,
    hasRead
  } = dataSource;

  return (
    <a className={cx('notification-item-container', { active: !hasRead })} href="#" onClick={(e) => onClickNotification(e, name)}>
      <img className={cx('avatar-image')} src={getImageUrl(avatar)} alt={name} />
      <div className={cx('message-info')}>
        <div>
          <div>
            <p className={cx('message-content')}>{getMessageRender(type, name, postName, groupName, hasRead)}</p>
            <p className={cx('display-time')}>{displayTime}</p>
          </div>
          {picture && <img src={getImageUrl(picture)} alt="picture" />}
        </div>
        {message && <a className={cx('private-message')} href="#">{message}</a>}
      </div>
    </a>
  );
};

export default NotificationItem;
