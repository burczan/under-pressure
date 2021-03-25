import React from 'react';
import { Notification } from '../Notification';

type ErrorMessageProps = {
  children: React.ReactNode;
};

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <Notification color="is-warning">
      {children}
    </Notification>
  );
};
