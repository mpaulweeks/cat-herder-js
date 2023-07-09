import { PropsWithChildren, createContext, useCallback, useContext, useState } from "react";

// inspired by context + reducer but simplified
// https://react.dev/learn/scaling-up-with-reducer-and-context

export type ErrorMessage = string;

type ErrorsApi = {
  errors: ErrorMessage[];
  add(err: ErrorMessage): void;
  remove(err: ErrorMessage): void;
}

const ErrorsContext = createContext<ErrorsApi>({
  errors: [],
  add: console.log,
  remove: console.log,
});

export function useErrors() {
  return useContext(ErrorsContext);
}

export function ErrorsProvider(props: PropsWithChildren) {
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const add = useCallback((err: ErrorMessage) => {
    setErrors(old => old.concat(err));
  }, [setErrors]);
  const remove = useCallback((err: ErrorMessage) => {
    setErrors(old => old.filter(elm => elm != err));
  }, [setErrors]);

  const api: ErrorsApi = { errors, add, remove };

  return (
    <ErrorsContext.Provider value={api}>
        {props.children}
    </ErrorsContext.Provider>
  );
}
