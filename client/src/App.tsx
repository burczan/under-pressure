import React from 'react';
import { Hero } from './components/Hero';
import { Message } from './components/Message';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useDataFetching } from './hooks';

type Result = {
  date: string | undefined,
  location: {
    name: string | undefined;
    latitude: string | undefined;
    longitud: string | undefined;
    altitude: string | undefined;
  };
  values: {
    hour: string;
    pressure: number;
    pressureUnit: string;
  }[]
};

export const App = () => {
  const { data, error, loading } = useDataFetching<Result>('http://localhost:4000/data');

  return (
    <>
      <div className="block">
        <Hero
          title="Under Pressure"
          subtitle={`Pressure values from last 4 hours for ${data?.location.name} station`}
        />
      </div>
      <div className="columns is-centered">
        <div className="column is-half">
          <Message
            header={loading
              ? 'Loading data for station...'
              : `${data?.date}, ${data?.location.name} (${data?.location.altitude})`
            }
            color={error ? 'is-warning' : undefined}
            messageClassName="is-size-5"
          >
            {loading && (
              <div className="block has-text-centered">
                <LoadingSpinner />
              </div>
            )}
            {error && <p>Could not fetch data.</p>}
            {(!loading && !error && data) && data.values.map(({ hour, pressure, pressureUnit }) => {
              return (
                <p key={hour}>
                  {`${hour}: ${pressure} ${pressureUnit}`}
                </p>
              )
            })}
          </Message>
        </div>
      </div>
    </>
  );
}
