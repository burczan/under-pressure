import React from 'react';
import cx from 'classnames';
import { Color } from '../types';
import s from './style.module.css';

type NotificationProps = {
  children: React.ReactNode;
  color?: Color;
};

export const Notification = ({ children, color }: NotificationProps) => {
  return (
    <div className={cx('notification', color, s.center, s.width)}>
      {children}
    </div>
  );
};
