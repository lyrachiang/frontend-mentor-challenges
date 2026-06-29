import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Notification.module.scss';

import NotificationItem from '@/components/NotificationItem';

import notificationData from '@/data/notification.json';

const cx = classNames.bind(styles);

const Notification = () => {
  const [notifications, setNotifications] = useState(notificationData);

  const notifyCount = notifications.filter(item => !item.hasRead).length || 0;

  const onClickMarkAllBtn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    setNotifications((prev) => {
      return prev.map(item => ({
        ...item,
        hasRead: true
      }));
    });
  };

  const onClickNotification = (e: React.MouseEvent<HTMLDivElement>, name: string) => {
    e.preventDefault();

    setNotifications((prev) => {
      const isExits = prev.find(item => item.name === name);

      if (isExits) {
        return prev.map((item) => {
          if (item.name === name) {
            return { ...item, hasRead: true };
          }

          return item;
        });
      }

      return prev;
    });
  };

  return (
    <div className={cx('notification-container')}>
      <div className={cx('notification-header')}>
        <div>
          <h1 className={cx('title')}>Notifications</h1>
          <span className={cx('notify-count')}>{notifyCount}</span>
        </div>
        <a className={cx('mark-btn')} href="#" onClick={onClickMarkAllBtn}>Mark all as read</a>
      </div>
      <div>
        {notifications.map((item) => {
          return (
            <NotificationItem
              key={item.name}
              dataSource={item}
              onClickNotification={onClickNotification}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notification;
