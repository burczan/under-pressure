import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

type Output<Response> = {
  data: Response | null;
  loading: boolean;
  error: string | null;
};

export const useDataFetching = <ResponseType>(
  url: string,
  options?: AxiosRequestConfig,
): Output<ResponseType> => {
  const [data, setData] = useState<Output<ResponseType>['data']>(null);
  const [error, setError] = useState<Output<ResponseType>['error']>(null);
  const [loading, setLoading] = useState<Output<ResponseType>['loading']>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, options);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [options, url])


  return {
    data,
    loading,
    error,
  };
};
