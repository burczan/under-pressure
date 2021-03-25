import React from 'react';
import { PressureDetails, WeatherHistory } from './components/PressureDetails';
import { Hero } from './common/components/Hero';
import { ErrorMessage } from './common/components/ErrorMessage';
import { LoadingSpinner } from './common/components/LoadingSpinner';
import { useDataFetching } from './common/hooks';

export const App = () => {
  const url = 'http://localhost:4000/weather_history';
  const { data, loading, error } = useDataFetching<WeatherHistory>(url);

  return (
    <>
      <div className="block">
        <Hero
          title="Under Pressure"
          subtitle="Pressure values from last 4 hours"
        />
      </div>
      <div className="columns is-centered">
        <div className="column is-half">
          {loading && (
            <div className="block has-text-centered">
              <LoadingSpinner />
            </div>
          )}
          {error && <ErrorMessage message="Could not fetch data."/>}
          {(!loading && !error && data) && <PressureDetails details={data} />}
        </div>
      </div>
    </>
  );
}
