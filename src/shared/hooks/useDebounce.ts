import { EventType } from '../../types/EventType';

export const useDebounce = (callBack: (event: EventType) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(event: EventType) {
    const later = () => {
      clearTimeout(timeout);
      callBack(event);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
