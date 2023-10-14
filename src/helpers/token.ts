export const getTokenFromLocalStorage = (): string => {
  const token = localStorage.getItem('token') || '{}';
  return JSON.parse(token);
};
