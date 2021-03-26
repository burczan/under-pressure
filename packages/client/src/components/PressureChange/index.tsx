import React from 'react';
import { Notification } from '../../common/components/Notification';

type PressureChangeProps = {
  value: number;
};

export const PressureChange = ({ value }: PressureChangeProps) => {
  return (
    <Notification color={(value >= 3 || value <= -3) ? 'is-warning' : 'is-success'}>
      <div className="has-text-weight-bold has-text-centered">
        {`Pressure change in last 4 hours: ${value.toFixed(1)} hPa`}
      </div>
    </Notification>
  );
};
