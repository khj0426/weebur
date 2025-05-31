import { useCallback, useEffect, useState } from "react";

const defaultTimeout = 1000 * 60 * 5;

interface Props {
  callback: () => void;
  events: string[];
  timeOut?: number;
}

export function useEventTimeout({
  timeOut = defaultTimeout,
  events,
  callback,
}: Props) {
  const [lastActivityTime, setLastActivityTime] = useState(() => new Date());

  const resetTimer = useCallback(() => {
    setLastActivityTime(new Date());
  }, []);

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    return function cleanup() {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [events, resetTimer]);

  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, timeOut);

    return function cleanup() {
      clearTimeout(timer);
    };
  }, [lastActivityTime, timeOut, callback]);
}
