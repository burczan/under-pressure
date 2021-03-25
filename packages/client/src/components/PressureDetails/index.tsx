import React from 'react';
import { Message } from '../../common/components/Message';

export type WeatherHistory = {
  date: string | undefined,
  location: {
    name: string | undefined;
    latitude: string | undefined;
    longitud: string | undefined;
    altitude: string | undefined;
  };
  pressure: {
    hour: string;
    value: number;
    unit: string;
  }[]
};


type PressureDetailsProps = {
  details: WeatherHistory;
};

export const PressureDetails = ({ details }: PressureDetailsProps) => {
  return (
    <Message
      header={`${details.date}, ${details.location.name} (${details.location.altitude})`}
      messageClassName="is-size-5"
    >
      {details.pressure.map(({ hour, value, unit }) => {
        return (
          <p key={hour}>
            {`${hour}: ${value} ${unit}`}
          </p>
        )
      })}
    </Message>
  );
}
