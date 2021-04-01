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
