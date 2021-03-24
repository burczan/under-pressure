import React from 'react';
import cx from 'classnames';
import { Color } from '../types';

type HeroProps = {
  title: string;
  subtitle: string;
  color?: Color;
};

export const Hero = ({ title, subtitle, color }: HeroProps) => {
  return (
    <section className={cx('hero', color)}>
      <div className="hero-body">
        <div className="container has-text-centered">
          <p className="title is-1 is-spaced is-family-secondary">
            {title}
          </p>
          <p className="subtitle is-3 is-family-secondary">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};
