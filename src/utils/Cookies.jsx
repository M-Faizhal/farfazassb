import { useCookies } from 'react-cookie';

export const useToken = () => {
  const [cookies] = useCookies([import.meta.env.VITE_COOKIES_NAME]);

  const getToken = () => {
    return cookies[import.meta.env.VITE_COOKIES_NAME] || null;
  };

  return { getToken };
};
