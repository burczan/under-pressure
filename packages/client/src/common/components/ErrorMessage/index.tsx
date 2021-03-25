import React from 'react';
import cx from 'classnames';
import s from './style.module.css';

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className={cx('notification is-warning', s.center, s.width)}>
      {message}
    </div>
  );
};
