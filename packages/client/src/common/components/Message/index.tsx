import React from 'react';
import cx from 'classnames';
import { Color } from '../types';

type MessageProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  color?: Color;
  messageClassName?: string;
};

export const Message = ({
  children,
  header,
  color,
  messageClassName,
}: MessageProps) => {
  return (
    <article className={cx('message', color, messageClassName)}>
      {header && (
        <div className="message-header">
          {header}
        </div>
      )}
      <div className="message-body">
        {children}
      </div>
    </article>
  );
};
