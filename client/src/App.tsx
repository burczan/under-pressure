import React from 'react';
import { Hero } from './components/Hero';
import { Message } from './components/Message';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useDataFetching } from './hooks';

export const App = () => {
  const { data, error, loading } = useDataFetching<number[]>('http://localhost:4000/data');

  return (
    <>
      <div className="block">
        <Hero
          title="Under Pressure"
          subtitle="Pressure values from last 4 hours for Liberec station"
        />
      </div>
      <div className="columns is-centered">
        <div className="column is-half">
          <Message
            header="Station Liberec"
            color={error ? 'is-warning' : undefined}
            messageClassName="is-size-5"
          >
            {loading && (
              <div className="block has-text-centered">
                <LoadingSpinner />
              </div>
            )}
            {error && <p>Could not fetch data.</p>}
            {(!loading && !error && data) && data.map((value) => <p key={value}>{value}</p>)}
          </Message>
        </div>
      </div>
    </>
  );
}
