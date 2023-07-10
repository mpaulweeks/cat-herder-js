import { useEffect, useRef } from "react";

// https://blog.logrocket.com/accessing-previous-props-state-react-hooks/
export function usePrevious<T>(value: T) {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
